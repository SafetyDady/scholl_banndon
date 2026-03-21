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
    const templateId = parseInt(id, 10)
    if (isNaN(templateId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const {
      name,
      section,
      parentId,
      column,
      sourceType,
      sourceBankAccountId,
      sourceBudgetTypeId,
      openingBalance,
      sortOrder,
    } = body

    if (!name || !section) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 },
      )
    }

    const template = await prisma.balanceReportTemplate.update({
      where: { id: templateId },
      data: {
        name,
        section,
        parentId: parentId || null,
        column: column || 'BANK',
        sourceType: sourceType || 'BUDGET_TYPE',
        sourceBankAccountId: sourceBankAccountId || null,
        sourceBudgetTypeId: sourceBudgetTypeId || null,
        openingBalance: openingBalance ?? 0,
        sortOrder: sortOrder ?? undefined,
      },
      include: {
        parent: true,
        children: true,
        sourceBankAccount: true,
        sourceBudgetType: true,
      },
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error('Balance template PUT error:', error)
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
    const templateId = parseInt(id, 10)
    if (isNaN(templateId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    // Soft delete: set isActive = false
    await prisma.balanceReportTemplate.update({
      where: { id: templateId },
      data: { isActive: false },
    })

    // Also soft delete children
    await prisma.balanceReportTemplate.updateMany({
      where: { parentId: templateId },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Balance template DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
