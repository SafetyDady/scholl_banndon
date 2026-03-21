import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import * as path from 'path'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getCurrentFiscalYear } from '@/lib/utils'

const THAI_MONTHS = [
  '', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

// Row mapping for balance report template
// Row 6: เงินงบประมาณ (header only)
// Row 7: เงินรายได้แผ่นดิน
// Rows 8-11: ดอกเบี้ย sub-items (C column)
// Row 12: เงินนอกงบประมาณ (header only)
// Rows 13-34: non-budget items (C column, some with D/E sub-items)
// Row 35: รวมเงินนอกงบประมาณคงเหลือ
// Row 36: รวมทั้งสิ้น

// Column mapping: H=8(CASH), I=9(BANK), J=10(DEPT), K=11(SUM), L=12(CHANGE)
const COL_MAP: Record<string, number> = {
  CASH: 8,  // H
  BANK: 9,  // I
  DEPT: 10, // J
}
const COL_SUM = 11  // K
const COL_CHANGE = 12 // L

// Starting data row for BUDGET_REVENUE items (after header row 6)
const BUDGET_REVENUE_START_ROW = 7
// Starting data row for NON_BUDGET items (after header row 12)
const NON_BUDGET_START_ROW = 13
// Totals rows
const NON_BUDGET_TOTAL_ROW = 35
const GRAND_TOTAL_ROW = 36

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { date } = await params

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
    }

    const reportDate = new Date(`${date}T00:00:00.000Z`)
    const fiscalYear = getCurrentFiscalYear()

    // Check if already issued
    const existing = await prisma.balanceReportIssued.findUnique({
      where: { reportDate_fiscalYear: { reportDate, fiscalYear } },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'รายงานวันนี้ออกแล้ว' },
        { status: 409 },
      )
    }

    // Verify there are bank statements for this date
    const statementsCount = await prisma.bankStatement.count({
      where: {
        transactionDate: {
          gte: new Date(`${date}T00:00:00.000Z`),
          lte: new Date(`${date}T23:59:59.999Z`),
        },
      },
    })

    if (statementsCount === 0) {
      return NextResponse.json(
        { error: 'ไม่พบรายการเคลื่อนไหวในวันที่นี้' },
        { status: 404 },
      )
    }

    const record = await prisma.balanceReportIssued.create({
      data: {
        reportDate,
        fiscalYear,
        issuedById: session.id,
      },
    })

    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    console.error('Balance issue POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { date } = await params

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
    }

    const [yearStr, monthStr, dayStr] = date.split('-')
    const year = Number(yearStr)
    const month = Number(monthStr) - 1 // 0-indexed
    const day = Number(dayStr)
    const reportDateEnd = new Date(`${date}T23:59:59.999Z`)
    const reportDateStart = new Date(`${date}T00:00:00.000Z`)

    // === Load all data in parallel ===
    const [schoolInfoRows, templates, todayStatements] = await Promise.all([
      prisma.schoolInfo.findMany(),
      prisma.balanceReportTemplate.findMany({
        where: { isActive: true },
        include: {
          children: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
              sourceBankAccount: true,
              sourceBudgetType: true,
            },
          },
          sourceBankAccount: true,
          sourceBudgetType: true,
        },
        orderBy: { sortOrder: 'asc' },
      }),
      // Bank statements for the report date (for change column)
      prisma.bankStatement.findMany({
        where: {
          transactionDate: {
            gte: reportDateStart,
            lte: reportDateEnd,
          },
        },
        include: {
          bankAccount: true,
        },
      }),
    ])

    // Build school info map
    const schoolInfo: Record<string, string> = {}
    for (const row of schoolInfoRows) {
      schoolInfo[row.key] = row.value
    }

    // === Calculate balance for each template item ===
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type TemplateItem = any

    async function calculateBalance(item: TemplateItem): Promise<number> {
      if (item.sourceType === 'BANK_ACCOUNT' && item.sourceBankAccountId) {
        // Latest BankStatement.balance for that account up to report date
        const latestStatement = await prisma.bankStatement.findFirst({
          where: {
            bankAccountId: item.sourceBankAccountId,
            transactionDate: { lte: reportDateEnd },
          },
          orderBy: [
            { transactionDate: 'desc' },
            { id: 'desc' },
          ],
        })
        return latestStatement?.balance ?? item.openingBalance
      }

      if (item.sourceType === 'BUDGET_TYPE' && item.sourceBudgetTypeId) {
        // openingBalance + SUM(deposits) - SUM(withdrawals) from BankStatement
        // linked to bank accounts associated with that budget type
        const budgetType = await prisma.budgetType.findUnique({
          where: { id: item.sourceBudgetTypeId },
          select: { bankAccountId: true },
        })

        if (budgetType?.bankAccountId) {
          const result = await prisma.bankStatement.aggregate({
            where: {
              bankAccountId: budgetType.bankAccountId,
              transactionDate: { lte: reportDateEnd },
            },
            _sum: {
              deposit: true,
              withdrawal: true,
            },
          })
          const totalDeposits = result._sum.deposit ?? 0
          const totalWithdrawals = result._sum.withdrawal ?? 0
          return item.openingBalance + totalDeposits - totalWithdrawals
        }
        return item.openingBalance
      }

      // MANUAL: use openingBalance
      return item.openingBalance
    }

    // Calculate change for that day by bank account
    function getDayChange(bankAccountId: number | null): number {
      if (!bankAccountId) return 0
      return todayStatements
        .filter(s => s.bankAccountId === bankAccountId)
        .reduce((sum, s) => sum + s.deposit - s.withdrawal, 0)
    }

    function getBankAccountIdForItem(item: TemplateItem): number | null {
      if (item.sourceType === 'BANK_ACCOUNT') return item.sourceBankAccountId
      if (item.sourceType === 'BUDGET_TYPE' && item.sourceBudgetType?.bankAccountId) {
        return item.sourceBudgetType.bankAccountId
      }
      return null
    }

    // === Load Excel template ===
    const templatePath = path.join(process.cwd(), 'public', 'templates', 'balance_report_template.xlsx')
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(templatePath)
    const ws = workbook.getWorksheet('060369')

    if (!ws) {
      return NextResponse.json({ error: 'Template sheet "060369" not found' }, { status: 500 })
    }

    // Rename sheet to match report date (ddMMyy Buddhist)
    const dd = dayStr
    const mm = monthStr
    const buddhistYear = year + 543
    const yy = String(buddhistYear).slice(-2)
    ws.name = `${dd}${mm}${yy}`

    // === Clear ALL formula cells first (lesson learned from 50 tawi) ===
    ws.eachRow({ includeEmpty: false }, (row) => {
      row.eachCell({ includeEmpty: false }, (cell) => {
        const v = cell.value as Record<string, unknown> | null
        if (v && typeof v === 'object' && ('formula' in v || 'sharedFormula' in v)) {
          cell.value = null
        }
      })
    })

    // === Helper: set cell with blue font (deep-clone style to avoid shared reference bug) ===
    const fontColor = 'FF0000B0' // dark blue
    const setCell = (row: number, col: number, value: string | number | null, fontSize: number = 10) => {
      const c = ws.getCell(row, col)
      // Deep-clone style to break shared reference with other cells in template
      c.style = JSON.parse(JSON.stringify(c.style))
      c.value = null
      if (value !== null && value !== undefined) {
        c.value = value
      }
      c.font = { name: 'Leelawadee', size: fontSize, color: { argb: fontColor } }
    }

    const setCellRef = (cellRef: string, value: string | number | null, fontSize: number = 10) => {
      const c = ws.getCell(cellRef)
      c.style = JSON.parse(JSON.stringify(c.style))
      c.value = null
      if (value !== null && value !== undefined) {
        c.value = value
      }
      c.font = { name: 'Leelawadee', size: fontSize, color: { argb: fontColor } }
    }

    // === Fill header ===
    // B3: ณ วันที่ [date]
    const thaiMonth = THAI_MONTHS[month + 1]
    const dateText = `ณ วันที่ ${day} ${thaiMonth}  ${buddhistYear}`
    setCellRef('B3', dateText)

    // === Separate templates by section ===
    const budgetRevenueItems = templates.filter(t => t.section === 'BUDGET_REVENUE' && t.parentId === null)
    const nonBudgetItems = templates.filter(t => t.section === 'NON_BUDGET' && t.parentId === null)

    // === Fill BUDGET_REVENUE section (rows 7-11) ===
    let budgetRevRow = BUDGET_REVENUE_START_ROW
    let budgetTotalCash = 0
    let budgetTotalBank = 0
    let budgetTotalDept = 0

    for (const item of budgetRevenueItems) {
      const balance = await calculateBalance(item)
      const col = COL_MAP[item.column] || COL_MAP.BANK
      const change = getDayChange(getBankAccountIdForItem(item))

      if (balance !== 0) {
        setCell(budgetRevRow, col, balance)
      }
      // K = sum of H+I+J for this row
      const cashVal = col === COL_MAP.CASH ? balance : 0
      const bankVal = col === COL_MAP.BANK ? balance : 0
      const deptVal = col === COL_MAP.DEPT ? balance : 0
      const rowSum = cashVal + bankVal + deptVal
      if (rowSum !== 0) setCell(budgetRevRow, COL_SUM, rowSum)
      if (change !== 0) setCell(budgetRevRow, COL_CHANGE, change)

      budgetTotalCash += cashVal
      budgetTotalBank += bankVal
      budgetTotalDept += deptVal

      // Handle children (sub-items)
      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          budgetRevRow++
          const childBalance = await calculateBalance(child)
          const childCol = COL_MAP[child.column] || COL_MAP.BANK
          const childChange = getDayChange(getBankAccountIdForItem(child))

          if (childBalance !== 0) {
            setCell(budgetRevRow, childCol, childBalance)
          }
          const cCash = childCol === COL_MAP.CASH ? childBalance : 0
          const cBank = childCol === COL_MAP.BANK ? childBalance : 0
          const cDept = childCol === COL_MAP.DEPT ? childBalance : 0
          const cSum = cCash + cBank + cDept
          if (cSum !== 0) setCell(budgetRevRow, COL_SUM, cSum)
          if (childChange !== 0) setCell(budgetRevRow, COL_CHANGE, childChange)

          budgetTotalCash += cCash
          budgetTotalBank += cBank
          budgetTotalDept += cDept
        }
      }
      budgetRevRow++
    }

    // === Fill NON_BUDGET section (rows 13-34) ===
    let nonBudgetRow = NON_BUDGET_START_ROW
    let nonBudgetTotalCash = 0
    let nonBudgetTotalBank = 0
    let nonBudgetTotalDept = 0

    for (const item of nonBudgetItems) {
      const balance = await calculateBalance(item)
      const col = COL_MAP[item.column] || COL_MAP.BANK
      const change = getDayChange(getBankAccountIdForItem(item))

      if (balance !== 0) {
        setCell(nonBudgetRow, col, balance)
      }
      const cashVal = col === COL_MAP.CASH ? balance : 0
      const bankVal = col === COL_MAP.BANK ? balance : 0
      const deptVal = col === COL_MAP.DEPT ? balance : 0
      const rowSum = cashVal + bankVal + deptVal
      if (rowSum !== 0) setCell(nonBudgetRow, COL_SUM, rowSum)
      if (change !== 0) setCell(nonBudgetRow, COL_CHANGE, change)

      nonBudgetTotalCash += cashVal
      nonBudgetTotalBank += bankVal
      nonBudgetTotalDept += deptVal

      // Handle children (sub-items)
      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          nonBudgetRow++
          const childBalance = await calculateBalance(child)
          const childCol = COL_MAP[child.column] || COL_MAP.BANK
          const childChange = getDayChange(getBankAccountIdForItem(child))

          if (childBalance !== 0) {
            setCell(nonBudgetRow, childCol, childBalance)
          }
          const cCash = childCol === COL_MAP.CASH ? childBalance : 0
          const cBank = childCol === COL_MAP.BANK ? childBalance : 0
          const cDept = childCol === COL_MAP.DEPT ? childBalance : 0
          const cSum = cCash + cBank + cDept
          if (cSum !== 0) setCell(nonBudgetRow, COL_SUM, cSum)
          if (childChange !== 0) setCell(nonBudgetRow, COL_CHANGE, childChange)

          nonBudgetTotalCash += cCash
          nonBudgetTotalBank += cBank
          nonBudgetTotalDept += cDept
        }
      }
      nonBudgetRow++
    }

    // === Fill totals ===
    // Row 35: รวมเงินนอกงบประมาณคงเหลือ
    if (nonBudgetTotalCash !== 0) setCell(NON_BUDGET_TOTAL_ROW, COL_MAP.CASH, nonBudgetTotalCash)
    if (nonBudgetTotalBank !== 0) setCell(NON_BUDGET_TOTAL_ROW, COL_MAP.BANK, nonBudgetTotalBank)
    if (nonBudgetTotalDept !== 0) setCell(NON_BUDGET_TOTAL_ROW, COL_MAP.DEPT, nonBudgetTotalDept)
    const nonBudgetTotal = nonBudgetTotalCash + nonBudgetTotalBank + nonBudgetTotalDept
    if (nonBudgetTotal !== 0) setCell(NON_BUDGET_TOTAL_ROW, COL_SUM, nonBudgetTotal)

    // Row 36: รวมทั้งสิ้น
    const grandCash = budgetTotalCash + nonBudgetTotalCash
    const grandBank = budgetTotalBank + nonBudgetTotalBank
    const grandDept = budgetTotalDept + nonBudgetTotalDept
    if (grandCash !== 0) setCell(GRAND_TOTAL_ROW, COL_MAP.CASH, grandCash)
    if (grandBank !== 0) setCell(GRAND_TOTAL_ROW, COL_MAP.BANK, grandBank)
    if (grandDept !== 0) setCell(GRAND_TOTAL_ROW, COL_MAP.DEPT, grandDept)
    const grandTotal = grandCash + grandBank + grandDept
    if (grandTotal !== 0) setCell(GRAND_TOTAL_ROW, COL_SUM, grandTotal)

    // === Fill signatures from SchoolInfo ===
    // I38: เจ้าหน้าที่การเงิน (ผู้รายงาน)
    if (schoolInfo['finance_officer_name']) {
      setCellRef('I38', schoolInfo['finance_officer_name'])
    }

    // C43, G43, J43: กรรมการ 3 คน
    if (schoolInfo['committee_1_name']) {
      setCellRef('C43', schoolInfo['committee_1_name'])
    }
    if (schoolInfo['committee_2_name']) {
      setCellRef('G43', schoolInfo['committee_2_name'])
    }
    if (schoolInfo['committee_3_name']) {
      setCellRef('J43', schoolInfo['committee_3_name'])
    }

    // E46: รอง ผอ., I46: ผอ.
    if (schoolInfo['vice_principal_name']) {
      setCellRef('E46', schoolInfo['vice_principal_name'])
    }
    if (schoolInfo['principal_name']) {
      setCellRef('I46', schoolInfo['principal_name'])
    }

    // === Generate Excel buffer ===
    const buffer = await workbook.xlsx.writeBuffer()

    // Return as .xlsx download
    const fileName = `รายงานเงินคงเหลือ_${day}${thaiMonth}${buddhistYear}.xlsx`

    return new Response(Buffer.from(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Content-Length': String(buffer.byteLength),
      },
    })
  } catch (error) {
    console.error('Balance report Excel error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
