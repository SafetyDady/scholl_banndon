import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getCurrentFiscalYear } from '@/lib/utils'
import { WORKFLOW_STEPS } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const fiscalYear = Number(searchParams.get('fiscalYear')) || getCurrentFiscalYear()
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { fiscalYear }

    if (status) {
      where.status = status
    }
    if (search) {
      where.OR = [
        { memoNumber: { contains: search, mode: 'insensitive' } },
        { note: { contains: search, mode: 'insensitive' } },
        {
          disbursementGroups: {
            some: {
              items: {
                some: {
                  OR: [
                    { description: { contains: search, mode: 'insensitive' } },
                    { payeeName: { contains: search, mode: 'insensitive' } },
                  ],
                },
              },
            },
          },
        },
      ]
    }

    const hasTax = searchParams.get('hasTax') === 'true'

    if (hasTax) {
      where.disbursementGroups = {
        some: {
          items: {
            some: {
              taxWithheld: { gt: 0 },
            },
          },
        },
      }
    }

    const [data, total] = await Promise.all([
      prisma.approvalRequest.findMany({
        where,
        include: {
          disbursementGroups: {
            include: {
              budgetType: { select: { id: true, name: true, code: true } },
              ...(hasTax ? { items: { orderBy: { sortOrder: 'asc' as const } } } : {}),
            },
            orderBy: { sortOrder: 'asc' },
          },
          createdBy: { select: { id: true, fullName: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.approvalRequest.count({ where }),
    ])

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Disbursements GET error:', error)
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
    const { requestDate, memoNumber, note, groups } = body

    if (!requestDate || !groups || !Array.isArray(groups) || groups.length === 0) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (วันที่ และรายการเบิกจ่าย)' },
        { status: 400 },
      )
    }

    // Validate groups
    for (const group of groups) {
      if (!group.budgetTypeId || !group.items || !Array.isArray(group.items) || group.items.length === 0) {
        return NextResponse.json(
          { error: 'แต่ละกลุ่มต้องมีประเภทเงินและรายการอย่างน้อย 1 รายการ' },
          { status: 400 },
        )
      }
      for (const item of group.items) {
        if (!item.description || item.amount == null || item.amount <= 0) {
          return NextResponse.json(
            { error: 'แต่ละรายการต้องมีรายละเอียดและจำนวนเงินที่ถูกต้อง' },
            { status: 400 },
          )
        }
      }
    }

    const fiscalYear = getCurrentFiscalYear()

    // Auto-assign sequence number for this fiscal year
    const lastRequest = await prisma.approvalRequest.findFirst({
      where: { fiscalYear },
      orderBy: { sequenceNumber: 'desc' },
      select: { sequenceNumber: true },
    })
    const sequenceNumber = (lastRequest?.sequenceNumber ?? 0) + 1

    // Compute totals
    let totalAmount = 0
    const groupsData = groups.map((group: { budgetTypeId: number; items: { description: string; amount: number; taxWithheld?: number; payeeName?: string; payeeTaxId?: string; payeeAddress?: string; note?: string }[] }, gIndex: number) => {
      let subtotal = 0
      const itemsData = group.items.map((item: { description: string; amount: number; taxWithheld?: number; payeeName?: string; payeeTaxId?: string; payeeAddress?: string; note?: string }, iIndex: number) => {
        const amount = Number(item.amount)
        const taxWithheld = Number(item.taxWithheld ?? 0)
        const netAmount = amount - taxWithheld
        subtotal += netAmount
        return {
          description: item.description,
          amount,
          taxWithheld,
          netAmount,
          payeeName: item.payeeName || null,
          payeeTaxId: item.payeeTaxId || null,
          payeeAddress: item.payeeAddress || null,
          note: item.note || null,
          sortOrder: iIndex,
        }
      })
      totalAmount += subtotal
      return {
        budgetTypeId: Number(group.budgetTypeId),
        subtotal,
        sortOrder: gIndex,
        items: { create: itemsData },
      }
    })

    const step1 = WORKFLOW_STEPS[0]

    const approvalRequest = await prisma.approvalRequest.create({
      data: {
        sequenceNumber,
        fiscalYear,
        requestDate: new Date(requestDate),
        memoNumber: memoNumber || null,
        totalAmount,
        note: note || null,
        currentStep: 1,
        status: 'DRAFT',
        createdById: session.id,
        disbursementGroups: {
          create: groupsData,
        },
        workflowActions: {
          create: {
            stepNumber: step1.number,
            stepName: step1.name,
            action: 'CREATE',
            comment: 'สร้างบันทึกขออนุมัติใหม่',
            performedById: session.id,
          },
        },
      },
      include: {
        disbursementGroups: {
          include: {
            budgetType: { select: { id: true, name: true, code: true } },
            items: { orderBy: { sortOrder: 'asc' } },
          },
          orderBy: { sortOrder: 'asc' },
        },
        createdBy: { select: { id: true, fullName: true } },
        workflowActions: {
          include: { performedBy: { select: { fullName: true } } },
          orderBy: { performedAt: 'asc' },
        },
      },
    })

    return NextResponse.json(approvalRequest, { status: 201 })
  } catch (error) {
    console.error('Disbursements POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
