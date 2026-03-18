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
    const budgetTypeId = searchParams.get('budgetTypeId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))

    const where: Record<string, unknown> = { fiscalYear }

    if (budgetTypeId) {
      where.budgetTypeId = Number(budgetTypeId)
    }
    if (status) {
      where.status = status
    }
    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { memoNumber: { contains: search, mode: 'insensitive' } },
        { payeeName: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.disbursement.findMany({
        where,
        include: {
          budgetType: { select: { id: true, name: true, code: true } },
          createdBy: { select: { id: true, fullName: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.disbursement.count({ where }),
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
    if (session.role !== 'FINANCE_OFFICER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const {
      requestDate,
      memoNumber,
      budgetTypeId,
      description,
      amount,
      taxWithheld = 0,
      payeeName,
      payeeTaxId,
      payeeAddress,
      note,
    } = body

    if (!requestDate || !budgetTypeId || !description || amount == null) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const fiscalYear = getCurrentFiscalYear()
    const netAmount = amount - taxWithheld

    // Auto-assign sequence number for this fiscal year
    const lastDisbursement = await prisma.disbursement.findFirst({
      where: { fiscalYear },
      orderBy: { sequenceNumber: 'desc' },
      select: { sequenceNumber: true },
    })
    const sequenceNumber = (lastDisbursement?.sequenceNumber ?? 0) + 1

    const step1 = WORKFLOW_STEPS[0]

    const disbursement = await prisma.disbursement.create({
      data: {
        sequenceNumber,
        fiscalYear,
        requestDate: new Date(requestDate),
        memoNumber: memoNumber || null,
        budgetTypeId: Number(budgetTypeId),
        description,
        amount: Number(amount),
        taxWithheld: Number(taxWithheld),
        netAmount,
        payeeName: payeeName || null,
        payeeTaxId: payeeTaxId || null,
        payeeAddress: payeeAddress || null,
        note: note || null,
        currentStep: 1,
        status: 'DRAFT',
        createdById: session.id,
        workflowActions: {
          create: {
            stepNumber: step1.number,
            stepName: step1.name,
            action: 'CREATE',
            comment: 'สร้างรายการเบิกจ่ายใหม่',
            performedById: session.id,
          },
        },
      },
      include: {
        budgetType: { select: { id: true, name: true, code: true } },
        createdBy: { select: { id: true, fullName: true } },
        workflowActions: {
          include: { performedBy: { select: { fullName: true } } },
        },
      },
    })

    return NextResponse.json(disbursement, { status: 201 })
  } catch (error) {
    console.error('Disbursements POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
