import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const templates = await prisma.balanceReportTemplate.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        sourceBankAccount: true,
        sourceBudgetType: true,
      },
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('Balance template GET error:', error)
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

    // Auto-calculate sortOrder if not provided
    let finalSortOrder = sortOrder
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await prisma.balanceReportTemplate.findFirst({
        where: { isActive: true, section },
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true },
      })
      finalSortOrder = (maxOrder?.sortOrder ?? -1) + 1
    }

    const template = await prisma.balanceReportTemplate.create({
      data: {
        name,
        section,
        parentId: parentId || null,
        column: column || 'BANK',
        sourceType: sourceType || 'BUDGET_TYPE',
        sourceBankAccountId: sourceBankAccountId || null,
        sourceBudgetTypeId: sourceBudgetTypeId || null,
        openingBalance: openingBalance ?? 0,
        sortOrder: finalSortOrder,
      },
      include: {
        parent: true,
        children: true,
        sourceBankAccount: true,
        sourceBudgetType: true,
      },
    })

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error('Balance template POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
