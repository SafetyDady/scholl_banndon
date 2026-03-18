import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { id } = await params

    const disbursement = await prisma.disbursement.findUnique({
      where: { id: Number(id) },
      include: {
        budgetType: { select: { id: true, name: true, code: true } },
        createdBy: { select: { id: true, fullName: true } },
        workflowActions: {
          include: { performedBy: { select: { fullName: true } } },
          orderBy: { performedAt: 'asc' },
        },
      },
    })

    if (!disbursement) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(disbursement)
  } catch (error) {
    console.error('Disbursement GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    if (session.role !== 'FINANCE_OFFICER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    const existing = await prisma.disbursement.findUnique({
      where: { id: Number(id) },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    if (existing.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'Can only edit disbursements in DRAFT status' },
        { status: 400 },
      )
    }

    const body = await request.json()
    const {
      requestDate,
      memoNumber,
      budgetTypeId,
      description,
      amount,
      taxWithheld,
      payeeName,
      payeeTaxId,
      payeeAddress,
      note,
    } = body

    const updateData: Record<string, unknown> = {}

    if (requestDate !== undefined) updateData.requestDate = new Date(requestDate)
    if (memoNumber !== undefined) updateData.memoNumber = memoNumber || null
    if (budgetTypeId !== undefined) updateData.budgetTypeId = Number(budgetTypeId)
    if (description !== undefined) updateData.description = description
    if (payeeName !== undefined) updateData.payeeName = payeeName || null
    if (payeeTaxId !== undefined) updateData.payeeTaxId = payeeTaxId || null
    if (payeeAddress !== undefined) updateData.payeeAddress = payeeAddress || null
    if (note !== undefined) updateData.note = note || null

    if (amount !== undefined || taxWithheld !== undefined) {
      const newAmount = amount !== undefined ? Number(amount) : existing.amount
      const newTax = taxWithheld !== undefined ? Number(taxWithheld) : existing.taxWithheld
      updateData.amount = newAmount
      updateData.taxWithheld = newTax
      updateData.netAmount = newAmount - newTax
    }

    const updated = await prisma.disbursement.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        budgetType: { select: { id: true, name: true, code: true } },
        createdBy: { select: { id: true, fullName: true } },
        workflowActions: {
          include: { performedBy: { select: { fullName: true } } },
          orderBy: { performedAt: 'asc' },
        },
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Disbursement PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    if (session.role !== 'FINANCE_OFFICER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    const existing = await prisma.disbursement.findUnique({
      where: { id: Number(id) },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    if (existing.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'Can only delete disbursements in DRAFT status' },
        { status: 400 },
      )
    }

    // Delete workflow actions first, then the disbursement
    await prisma.workflowAction.deleteMany({
      where: { disbursementId: Number(id) },
    })
    await prisma.disbursement.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('Disbursement DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
