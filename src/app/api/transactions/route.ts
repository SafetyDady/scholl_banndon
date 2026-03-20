import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bankAccountId = searchParams.get('bankAccountId')
    const type = searchParams.get('type')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (bankAccountId) {
      where.bankAccountId = Number(bankAccountId)
    }
    if (type && (type === 'IN' || type === 'OUT')) {
      where.type = type
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
      prisma.moneyTransaction.findMany({
        where,
        include: {
          bankAccount: {
            select: { id: true, bankName: true, accountNumber: true, accountName: true },
          },
          budgetType: {
            select: { id: true, name: true, code: true, category: true },
          },
          createdBy: {
            select: { id: true, fullName: true },
          },
        },
        orderBy: { transactionDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.moneyTransaction.count({ where }),
    ])

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Transactions GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { type, bankAccountId, budgetTypeId, amount, description, transactionDate, approvalRequestId, note } = body

    if (!type || !bankAccountId || !budgetTypeId || !amount || !description || !transactionDate) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
        { status: 400 },
      )
    }

    if (type !== 'IN' && type !== 'OUT') {
      return NextResponse.json(
        { error: 'ประเภทรายการไม่ถูกต้อง' },
        { status: 400 },
      )
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { error: 'จำนวนเงินต้องมากกว่า 0' },
        { status: 400 },
      )
    }

    const transaction = await prisma.moneyTransaction.create({
      data: {
        type,
        bankAccountId: Number(bankAccountId),
        budgetTypeId: Number(budgetTypeId),
        amount: Number(amount),
        description,
        transactionDate: new Date(transactionDate),
        approvalRequestId: approvalRequestId ? Number(approvalRequestId) : null,
        note: note || null,
        createdById: session.id,
      },
      include: {
        bankAccount: {
          select: { id: true, bankName: true, accountNumber: true, accountName: true },
        },
        budgetType: {
          select: { id: true, name: true, code: true, category: true },
        },
        createdBy: {
          select: { id: true, fullName: true },
        },
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Transactions POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
