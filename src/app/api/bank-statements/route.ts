import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bankAccountId = searchParams.get('bankAccountId')

    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 50))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    // bankAccountId is optional — if not provided, show all accounts
    if (bankAccountId) {
      where.bankAccountId = Number(bankAccountId)
    }

    if (dateFrom || dateTo) {
      where.transactionDate = {}
      if (dateFrom) {
        where.transactionDate.gte = new Date(dateFrom)
      }
      if (dateTo) {
        const toDate = new Date(dateTo)
        toDate.setHours(23, 59, 59, 999)
        where.transactionDate.lte = toDate
      }
    }

    const [data, total] = await Promise.all([
      prisma.bankStatement.findMany({
        where,
        include: {
          bankAccount: {
            select: { id: true, bankName: true, accountNumber: true, accountName: true },
          },
          approvalRequest: {
            select: { id: true, memoNumber: true, totalAmount: true, status: true, requestDate: true },
          },
          createdBy: {
            select: { id: true, fullName: true },
          },
        },
        orderBy: { transactionDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.bankStatement.count({ where }),
    ])

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('BankStatements GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (!['FINANCE_OFFICER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { bankAccountId, entries } = body

    if (!bankAccountId || !entries || !Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 },
      )
    }

    const bankAccount = await prisma.bankAccount.findUnique({
      where: { id: Number(bankAccountId) },
    })

    if (!bankAccount) {
      return NextResponse.json(
        { error: 'ไม่พบบัญชีธนาคาร' },
        { status: 404 },
      )
    }

    const results = []

    for (const entry of entries) {
      const { transactionDate, withdrawal, deposit, balance, description } = entry
      const withdrawalNum = Number(withdrawal) || 0
      const depositNum = Number(deposit) || 0
      const balanceNum = Number(balance) || 0

      if (!transactionDate || (withdrawalNum === 0 && depositNum === 0)) {
        continue
      }

      let approvalRequestId: number | null = null
      let matchStatus = 'UNMATCHED'

      // Auto-match: for withdrawals, try to find matching ApprovalRequest
      if (withdrawalNum > 0) {
        const txDate = new Date(transactionDate)
        const dateRangeStart = new Date(txDate)
        dateRangeStart.setDate(dateRangeStart.getDate() - 7)
        const dateRangeEnd = new Date(txDate)
        dateRangeEnd.setDate(dateRangeEnd.getDate() + 7)

        const matchedRequest = await prisma.approvalRequest.findFirst({
          where: {
            status: {
              in: ['WITHDRAWN', 'PAID', 'TAX_ISSUED', 'BALANCE_REPORTED', 'COMPLETED'],
            },
            totalAmount: {
              gte: withdrawalNum - 0.01,
              lte: withdrawalNum + 0.01,
            },
            requestDate: {
              gte: dateRangeStart,
              lte: dateRangeEnd,
            },
            disbursementGroups: {
              some: {
                budgetType: {
                  bankAccountId: Number(bankAccountId),
                },
              },
            },
            // Don't match if already matched to another statement
            bankStatements: {
              none: {},
            },
          },
          orderBy: {
            requestDate: 'desc',
          },
        })

        if (matchedRequest) {
          approvalRequestId = matchedRequest.id
          matchStatus = 'MATCHED'
        }
      } else if (depositNum > 0) {
        // Deposits are set to MANUAL so user can link later
        matchStatus = 'MANUAL'
      }

      const statement = await prisma.bankStatement.create({
        data: {
          bankAccountId: Number(bankAccountId),
          transactionDate: new Date(transactionDate),
          withdrawal: withdrawalNum,
          deposit: depositNum,
          balance: balanceNum,
          description: description || null,
          approvalRequestId,
          matchStatus,
          createdById: user.id,
        },
        include: {
          bankAccount: {
            select: { id: true, bankName: true, accountNumber: true, accountName: true },
          },
          approvalRequest: {
            select: { id: true, memoNumber: true, totalAmount: true, status: true },
          },
          createdBy: {
            select: { id: true, fullName: true },
          },
        },
      })

      results.push(statement)
    }

    return NextResponse.json(
      { data: results, count: results.length },
      { status: 201 },
    )
  } catch (error) {
    console.error('BankStatements POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
