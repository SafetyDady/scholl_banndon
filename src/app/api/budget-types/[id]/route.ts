import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (!['FINANCE_OFFICER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const budgetTypeId = parseInt(id, 10)
    if (isNaN(budgetTypeId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const { name, code, category, parentId, bankAccountId, sortOrder } = body

    if (!name || !code) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อและรหัส' },
        { status: 400 },
      )
    }

    const budgetType = await prisma.budgetType.update({
      where: { id: budgetTypeId },
      data: {
        name,
        code,
        category: category || 'NON_BUDGET',
        parentId: parentId ? parseInt(parentId, 10) : null,
        bankAccountId: bankAccountId ? parseInt(bankAccountId, 10) : null,
        sortOrder: sortOrder ?? 0,
      },
    })

    return NextResponse.json(budgetType)
  } catch (error) {
    console.error('Budget type PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (!['FINANCE_OFFICER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const budgetTypeId = parseInt(id, 10)
    if (isNaN(budgetTypeId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.budgetType.update({
      where: { id: budgetTypeId },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Budget type DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
