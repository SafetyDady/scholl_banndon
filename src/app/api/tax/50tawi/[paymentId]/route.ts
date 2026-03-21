import { NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import * as path from 'path'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import THBText from 'thai-baht-text'

const THAI_MONTHS = [
  '', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

function isJuristicPerson(name: string): boolean {
  const prefixes = ['บริษัท', 'หจก', 'ห้างหุ้นส่วน', 'สมาคม', 'มูลนิธิ']
  return prefixes.some(p => name.includes(p))
}

// Cell mapping for all 4 copies
// Copy 1: col A-R  |  Copy 2: col T-AK  |  Copy 3: col AM-BD  |  Copy 4: col BF-BW
const CELL_MAP = {
  // เลขที่เอกสาร
  runNo:          ['Q3',   'AJ3',  'BC3',  'BV3'],
  // ผู้หัก (โรงเรียน)
  schoolName:     ['C6',   'V6',   'AO6',  'BH6'],
  schoolTaxId:    ['P6',   'AI6',  'BB6',  'BU6'],
  schoolAddress:  ['C8',   'V8',   'AO8',  'BH8'],
  schoolIdCard:   ['P5',   'AI5',  'BB5',  'BU5'],
  // ผู้ถูกหัก (ผู้รับจ้าง)
  payeeName:      ['C12',  'V12',  'AO12', 'BH12'],
  payeeTaxId:     ['P12',  'AI12', 'BB12', 'BU12'],
  payeeAddress:   ['C14',  'V14',  'AO14', 'BH14'],
  payeeIdCard:    ['P11',  'AI11', 'BB11', 'BU11'],
  // ลำดับที่
  seqNo:          ['B16',  'U16',  'AN16', 'BG16'],
  // ภ.ง.ด. checkbox
  pgd3a:          ['J18',  'AC18', 'AV18', 'BO18'], // ภ.ง.ด.3ก (บุคคลธรรมดา)
  pgd53:          ['M18',  'AF18', 'AY18', 'BR18'], // ภ.ง.ด.53 (นิติบุคคล)
  // ข้อ 6: อื่นๆ (ระบุ)
  itemDesc:       ['E46',  'X46',  'AQ46', 'BJ46'],
  itemDate:       ['M46',  'AF46', 'AY46', 'BR46'],
  itemAmount:     ['O46',  'AH46', 'BA46', 'BT46'],
  itemTax:        ['Q46',  'AJ46', 'BC46', 'BV46'],
  // รวมยอด (SUM ถูกตัดออก ต้องกรอกตรง)
  totalAmount:    ['O48',  'AH48', 'BA48', 'BT48'],
  totalTax:       ['Q48',  'AJ48', 'BC48', 'BV48'],
  totalTaxText:   ['I50',  'AB50', 'AU50', 'BN50'],
  // วันที่ออก
  issueDate:      ['G59',  'Z59',  'AS59', 'BL59'],
  // ผู้จ่ายเงิน checkbox (A55 area)
  payerCheck:     ['A56',  'T56',  'AM56', 'BF56'],
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { paymentId } = await params
    const id = Number(paymentId)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    // Get payment record
    const payment = await prisma.paymentRecord.findUnique({
      where: { id },
      include: {
        contractor: true,
        disbursementItem: {
          include: {
            disbursementGroup: {
              include: { approvalRequest: true },
            },
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment record not found' }, { status: 404 })
    }

    // Get school info
    const schoolInfoRows = await prisma.schoolInfo.findMany()
    const schoolInfo: Record<string, string> = {}
    for (const row of schoolInfoRows) {
      schoolInfo[row.key] = row.value
    }

    // Load Excel template
    const templatePath = path.join(process.cwd(), 'public', 'templates', '50tawi_template.xlsx')
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(templatePath)
    const ws = workbook.getWorksheet('3%')

    if (!ws) {
      return NextResponse.json({ error: 'Template sheet not found' }, { status: 500 })
    }

    // === Prepare data ===
    // Try contractor first, then search by name if contractorId is null
    let contractor = payment.contractor
    if (!contractor && payment.payeeName) {
      contractor = await prisma.contractor.findFirst({
        where: { name: { contains: payment.payeeName } },
      })
    }
    const payeeName = contractor?.name || payment.payeeName
    const payeeTaxId = contractor?.taxId || ''
    const payeeAddress = contractor?.address || ''
    const schoolName = schoolInfo['school_name'] || 'โรงเรียนวัดบ้านดอน'
    const schoolAddress = schoolInfo['school_address'] || ''
    const schoolTaxId = schoolInfo['school_tax_id'] || ''
    const isJuristic = isJuristicPerson(payeeName)

    const payDate = new Date(payment.paymentDate)
    const payDateOnly = new Date(payDate.getFullYear(), payDate.getMonth(), payDate.getDate())

    // === Helper: set cell with font color (clears any existing formula) ===
    // ⚠ ExcelJS bug: เซลล์ที่ style เหมือนกันใน template จะ share reference
    // ต้อง deep-clone style ก่อน เพื่อตัด sharing ไม่ให้เซลล์อื่นโดนเปลี่ยนตาม
    const setCell = (cellRef: string, value: string | number | Date, fontColor: string, fontSize: number = 10) => {
      const c = ws.getCell(cellRef)
      // Deep-clone style เพื่อตัด shared reference กับเซลล์อื่นใน template
      c.style = JSON.parse(JSON.stringify(c.style))
      c.value = null
      c.value = value
      c.font = { name: 'Leelawadee', size: fontSize, color: { argb: fontColor } }
    }

    // === Clear ALL formula cells in entire sheet ===
    // เราจะกรอกข้อมูลตรงทั้ง 4 ฉบับ ไม่ต้องพึ่งสูตร
    ws.eachRow({ includeEmpty: false }, (row) => {
      row.eachCell({ includeEmpty: false }, (cell) => {
        const v = cell.value as Record<string, unknown> | null
        if (v && typeof v === 'object' && ('formula' in v || 'sharedFormula' in v)) {
          cell.value = null
        }
      })
    })

    // === Fill all 4 copies ===
    for (let i = 0; i < 4; i++) {
      // ฉบับที่ 1 = สีน้ำเงิน, ฉบับที่ 2-4 = สีดำ
      // ARGB: FF = alpha opaque, 0000B0 = dark blue
      const color = i === 0 ? 'FF0000B0' : 'FF000000'

      // เลขที่เอกสาร
      setCell(CELL_MAP.runNo[i], payment.id, color)

      // ผู้หัก (โรงเรียน)
      setCell(CELL_MAP.schoolName[i], schoolName, color, 12)
      setCell(CELL_MAP.schoolTaxId[i], schoolTaxId, color)
      setCell(CELL_MAP.schoolAddress[i], schoolAddress, color, 12)

      // ผู้ถูกหัก (ผู้รับจ้าง)
      setCell(CELL_MAP.payeeName[i], payeeName, color, 12)
      setCell(CELL_MAP.payeeTaxId[i], payeeTaxId, color)
      setCell(CELL_MAP.payeeAddress[i], payeeAddress, color, 12)

      // ลำดับที่
      setCell(CELL_MAP.seqNo[i], payment.id, color)

      // ภ.ง.ด. — บุคคลธรรมดา = ภ.ง.ด.3ก (J18), นิติบุคคล = ภ.ง.ด.53 (M18)
      if (!isJuristic) {
        // บุคคลธรรมดา → ภ.ง.ด.3ก
        setCell(CELL_MAP.pgd3a[i], 'X', color)
        setCell(CELL_MAP.pgd53[i], '', color) // clear ภ.ง.ด.53
      } else {
        // นิติบุคคล → ภ.ง.ด.53
        setCell(CELL_MAP.pgd3a[i], '', color) // clear ภ.ง.ด.3ก
        setCell(CELL_MAP.pgd53[i], 'X', color)
      }

      // ข้อ 6: อื่นๆ (ค่าจ้าง/ค่าบริการ)
      setCell(CELL_MAP.itemDesc[i], 'ค่าจ้าง/ค่าบริการ', color)
      setCell(CELL_MAP.itemDate[i], payDateOnly, color)
      setCell(CELL_MAP.itemAmount[i], payment.amount, color)
      setCell(CELL_MAP.itemTax[i], payment.taxWithheld, color)

      // วันที่ออกหนังสือ = วันที่จ่ายเงิน
      setCell(CELL_MAP.issueDate[i], payDateOnly, color)

      // รวมเงินที่จ่าย + รวมภาษี (สูตร SUM ถูกตัดแล้ว)
      setCell(CELL_MAP.totalAmount[i], payment.amount, color)
      setCell(CELL_MAP.totalTax[i], payment.taxWithheld, color)

      // รวมเงินภาษี (ตัวอักษร) — BAHTTEXT ถูกตัดแล้ว
      try {
        const taxText = `-- ${THBText(payment.taxWithheld)} --`
        setCell(CELL_MAP.totalTaxText[i], taxText, color)
      } catch {
        setCell(CELL_MAP.totalTaxText[i], `-- ${payment.taxWithheld} บาท --`, color)
      }

      // ผู้จ่ายเงิน: หัก ณ ที่จ่าย
      setCell(CELL_MAP.payerCheck[i], 'X', color)
    }

    // === Generate Excel buffer ===
    const buffer = await workbook.xlsx.writeBuffer()

    // Update payment record
    await prisma.paymentRecord.update({
      where: { id },
      data: {
        taxCertificateNo: String(payment.id),
        taxCertificateDate: payDateOnly,
      },
    })

    // Return Excel file
    const day = payDate.getDate().toString()
    const month = THAI_MONTHS[payDate.getMonth() + 1]
    const buddhistYear = (payDate.getFullYear() + 543).toString()
    const fileName = `50ทวิ_${payeeName}_${day}${month}${buddhistYear}.xlsx`

    return new Response(Buffer.from(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Content-Length': String(buffer.byteLength),
      },
    })
  } catch (error) {
    console.error('50 Tawi Excel error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
