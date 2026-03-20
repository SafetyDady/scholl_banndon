import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

const includeFullDetail = {
  disbursementGroups: {
    include: {
      budgetType: {
        select: {
          id: true,
          name: true,
          code: true,
          category: true,
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
      items: {
        orderBy: { sortOrder: 'asc' as const },
        include: {
          paymentRecords: {
            include: { contractor: true },
            orderBy: { createdAt: 'asc' as const },
          },
        },
      },
    },
    orderBy: { sortOrder: 'asc' as const },
  },
  createdBy: { select: { id: true, fullName: true } },
  workflowActions: {
    include: { performedBy: { select: { fullName: true } } },
    orderBy: { performedAt: 'asc' as const },
  },
}

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

    const approvalRequest = await prisma.approvalRequest.findUnique({
      where: { id: Number(id) },
      include: includeFullDetail,
    })

    if (!approvalRequest) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(approvalRequest)
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
    if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const numId = Number(id)

    const existing = await prisma.approvalRequest.findUnique({
      where: { id: numId },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    if (existing.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'แก้ไขได้เฉพาะรายการที่เป็นร่างเท่านั้น' },
        { status: 400 },
      )
    }

    const body = await request.json()
    const { requestDate, memoNumber, note, groups } = body

    // Build update data for the top-level fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {}
    if (requestDate !== undefined) updateData.requestDate = new Date(requestDate)
    if (memoNumber !== undefined) updateData.memoNumber = memoNumber || null
    if (note !== undefined) updateData.note = note || null

    // If groups are provided, delete old and create new
    if (groups && Array.isArray(groups) && groups.length > 0) {
      // Delete old groups (cascade deletes items)
      await prisma.disbursementGroup.deleteMany({
        where: { approvalRequestId: numId },
      })

      // Compute totals and create new groups
      let totalAmount = 0
      for (let gIndex = 0; gIndex < groups.length; gIndex++) {
        const group = groups[gIndex]
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

        await prisma.disbursementGroup.create({
          data: {
            approvalRequestId: numId,
            budgetTypeId: Number(group.budgetTypeId),
            subtotal,
            sortOrder: gIndex,
            items: { create: itemsData },
          },
        })
      }
      updateData.totalAmount = totalAmount
    }

    const updated = await prisma.approvalRequest.update({
      where: { id: numId },
      data: updateData,
      include: includeFullDetail,
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
    if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const numId = Number(id)

    const existing = await prisma.approvalRequest.findUnique({
      where: { id: numId },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    if (existing.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'ลบได้เฉพาะรายการที่เป็นร่างเท่านั้น' },
        { status: 400 },
      )
    }

    // Cascade delete: groups -> items are handled by onDelete: Cascade
    // WorkflowActions also cascade
    await prisma.approvalRequest.delete({
      where: { id: numId },
    })

    return NextResponse.json({ message: 'ลบรายการเรียบร้อยแล้ว' })
  } catch (error) {
    console.error('Disbursement DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
