import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getCurrentFiscalYear } from '@/lib/utils'

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const fiscalYear = Number(searchParams.get('fiscalYear')) || getCurrentFiscalYear()

    // Fiscal year boundaries (Oct 1 - Sep 30)
    const ceYear = fiscalYear - 543
    const startDate = new Date(ceYear - 1, 9, 1) // Oct 1 previous year
    const endDate = new Date(ceYear, 8, 30, 23, 59, 59) // Sep 30

    // Get all PaymentRecords with tax > 0 in this fiscal year
    const payments = await prisma.paymentRecord.findMany({
      where: {
        taxWithheld: { gt: 0 },
        paymentDate: { gte: startDate, lte: endDate },
      },
      orderBy: { paymentDate: 'asc' },
    })

    // Group by month
    const monthMap = new Map<string, {
      month: number
      year: number
      count: number
      totalAmount: number
      totalTax: number
    }>()

    for (const p of payments) {
      const d = new Date(p.paymentDate)
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      const key = `${year}-${String(month).padStart(2, '0')}`

      const existing = monthMap.get(key) ?? {
        month,
        year,
        count: 0,
        totalAmount: 0,
        totalTax: 0,
      }
      existing.count += 1
      existing.totalAmount += p.amount
      existing.totalTax += p.taxWithheld
      monthMap.set(key, existing)
    }

    // Get TaxSubmission records for this fiscal year
    const submissions = await prisma.taxSubmission.findMany({
      where: { year: { gte: ceYear - 1, lte: ceYear } },
    })

    const submissionMap = new Map<string, typeof submissions[0]>()
    for (const s of submissions) {
      submissionMap.set(`${s.year}-${String(s.month).padStart(2, '0')}`, s)
    }

    // Combine
    const summary = Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, data]) => {
        const sub = submissionMap.get(key)
        return {
          ...data,
          status: sub?.status || 'PENDING',
          submittedDate: sub?.submittedDate || null,
          receiptNo: sub?.receiptNo || null,
          submissionId: sub?.id || null,
        }
      })

    return NextResponse.json({ summary, fiscalYear })
  } catch (error) {
    console.error('Tax summary error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: บันทึกนำส่งภาษี
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { month, year, totalAmount, totalTax, submittedDate, receiptNo } = body

    if (!month || !year) {
      return NextResponse.json({ error: 'Missing month/year' }, { status: 400 })
    }

    const result = await prisma.taxSubmission.upsert({
      where: { month_year: { month, year } },
      update: {
        totalAmount: Number(totalAmount) || 0,
        totalTax: Number(totalTax) || 0,
        submittedDate: submittedDate ? new Date(submittedDate) : new Date(),
        receiptNo: receiptNo || null,
        status: 'SUBMITTED',
      },
      create: {
        month,
        year,
        totalAmount: Number(totalAmount) || 0,
        totalTax: Number(totalTax) || 0,
        submittedDate: submittedDate ? new Date(submittedDate) : new Date(),
        receiptNo: receiptNo || null,
        status: 'SUBMITTED',
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Tax submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
