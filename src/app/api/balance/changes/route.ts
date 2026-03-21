import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getCurrentFiscalYear } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const fiscalYear = Number(searchParams.get('fiscalYear')) || getCurrentFiscalYear()

    // Thai fiscal year: Oct 1 (CE year - 1) to Sep 30 (CE year)
    const ceYear = fiscalYear - 543
    const fiscalStart = new Date(`${ceYear - 1}-10-01T00:00:00.000Z`)
    const fiscalEnd = new Date(`${ceYear}-09-30T23:59:59.999Z`)

    // Get all bank statements within fiscal year, grouped by date
    const statements = await prisma.bankStatement.findMany({
      where: {
        transactionDate: { gte: fiscalStart, lte: fiscalEnd },
      },
      include: {
        bankAccount: {
          select: { id: true, bankName: true, accountNumber: true, accountName: true },
        },
      },
      orderBy: { transactionDate: 'desc' },
    })

    // Get all issued reports for this fiscal year
    const issuedReports = await prisma.balanceReportIssued.findMany({
      where: { fiscalYear },
      select: { reportDate: true, issuedAt: true },
    })

    // Build a map of issued dates (normalize to date string)
    const issuedMap = new Map<string, Date>()
    for (const report of issuedReports) {
      const dateKey = report.reportDate.toISOString().slice(0, 10)
      issuedMap.set(dateKey, report.issuedAt)
    }

    // Group statements by transactionDate
    const dateMap = new Map<string, typeof statements>()
    for (const stmt of statements) {
      const dateKey = stmt.transactionDate.toISOString().slice(0, 10)
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, [])
      }
      dateMap.get(dateKey)!.push(stmt)
    }

    // Build response
    const dates = Array.from(dateMap.entries()).map(([dateKey, stmts]) => {
      const movements = stmts.map((s) => ({
        id: s.id,
        bankAccount: {
          id: s.bankAccount.id,
          bankName: s.bankAccount.bankName,
          accountNumber: s.bankAccount.accountNumber,
          accountName: s.bankAccount.accountName,
        },
        withdrawal: s.withdrawal,
        deposit: s.deposit,
        description: s.description,
      }))

      const isIssued = issuedMap.has(dateKey)
      const issuedAt = issuedMap.get(dateKey) ?? null

      return {
        date: dateKey,
        movements,
        isIssued,
        issuedAt,
      }
    })

    // Sort by date descending
    dates.sort((a, b) => b.date.localeCompare(a.date))

    return NextResponse.json({ dates, fiscalYear })
  } catch (error) {
    console.error('Balance changes API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
