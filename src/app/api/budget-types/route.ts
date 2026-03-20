import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const budgetTypes = await prisma.budgetType.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        bankAccount: {
          select: {
            id: true,
            bankName: true,
            accountNumber: true,
            accountName: true,
          },
        },
        parent: {
          select: { id: true, name: true },
        },
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          select: {
            id: true,
            name: true,
            code: true,
            category: true,
            sortOrder: true,
            bankAccountId: true,
            parentId: true,
            bankAccount: {
              select: {
                id: true,
                bankName: true,
                accountNumber: true,
                accountName: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(budgetTypes)
  } catch (error) {
    console.error('Budget types GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (!['FINANCE_OFFICER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, code, category, parentId, bankAccountId, sortOrder } = body

    if (!name || !code) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อและรหัส' },
        { status: 400 },
      )
    }

    const budgetType = await prisma.budgetType.create({
      data: {
        name,
        code,
        category: category || 'NON_BUDGET',
        parentId: parentId ? parseInt(parentId, 10) : null,
        bankAccountId: bankAccountId ? parseInt(bankAccountId, 10) : null,
        sortOrder: sortOrder ?? 0,
      },
    })

    return NextResponse.json(budgetType, { status: 201 })
  } catch (error) {
    console.error('Budget types POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
