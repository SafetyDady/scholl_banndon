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
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (dateFrom || dateTo) {
      where.reconcileDate = {}
      if (dateFrom) {
        where.reconcileDate.gte = new Date(dateFrom)
      }
      if (dateTo) {
        const toDate = new Date(dateTo)
        toDate.setHours(23, 59, 59, 999)
        where.reconcileDate.lte = toDate
      }
    }

    const data = await prisma.reconciliation.findMany({
      where,
      include: {
        bankAccount: {
          select: { id: true, bankName: true, accountNumber: true, accountName: true },
        },
        createdBy: {
          select: { id: true, fullName: true },
        },
      },
      orderBy: { reconcileDate: 'desc' },
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Reconciliation GET error:', error)
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

    const body = await request.json()
    const { reconcileDate, bankAccountId, systemBalance, actualBalance, remark } = body

    if (!reconcileDate || !bankAccountId || systemBalance == null || actualBalance == null) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
        { status: 400 },
      )
    }

    const difference = Number(actualBalance) - Number(systemBalance)
    const isMatched = Math.abs(difference) < 0.01

    const reconciliation = await prisma.reconciliation.upsert({
      where: {
        reconcileDate_bankAccountId: {
          reconcileDate: new Date(reconcileDate),
          bankAccountId: Number(bankAccountId),
        },
      },
      update: {
        systemBalance: Number(systemBalance),
        actualBalance: Number(actualBalance),
        difference,
        isMatched,
        remark: remark || null,
        createdById: session.id,
      },
      create: {
        reconcileDate: new Date(reconcileDate),
        bankAccountId: Number(bankAccountId),
        systemBalance: Number(systemBalance),
        actualBalance: Number(actualBalance),
        difference,
        isMatched,
        remark: remark || null,
        createdById: session.id,
      },
      include: {
        bankAccount: {
          select: { id: true, bankName: true, accountNumber: true, accountName: true },
        },
        createdBy: {
          select: { id: true, fullName: true },
        },
      },
    })

    return NextResponse.json(reconciliation, { status: 201 })
  } catch (error) {
    console.error('Reconciliation POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
