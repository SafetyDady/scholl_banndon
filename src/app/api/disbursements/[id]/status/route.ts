import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Admin only
    if (session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'เฉพาะ Admin เท่านั้น' }, { status: 403 })
    }

    const { id } = await params
    const numId = Number(id)
    const body = await request.json()
    const { status, currentStep, comment } = body

    if (!status || !currentStep || !comment) {
      return NextResponse.json(
        { error: 'กรุณาระบุ status, step และเหตุผล' },
        { status: 400 },
      )
    }

    const approvalRequest = await prisma.approvalRequest.findUnique({
      where: { id: numId },
    })

    if (!approvalRequest) {
      return NextResponse.json({ error: 'ไม่พบรายการ' }, { status: 404 })
    }

    const oldStatus = approvalRequest.status
    const oldStep = approvalRequest.currentStep

    // Update in transaction
    const updated = await prisma.$transaction(async (tx) => {
      // Log the admin action
      await tx.workflowAction.create({
        data: {
          approvalRequestId: numId,
          stepNumber: oldStep,
          stepName: `Admin แก้ไข: ${oldStatus}(Step ${oldStep}) → ${status}(Step ${currentStep})`,
          action: 'ADMIN_OVERRIDE',
          comment,
          performedById: session.id,
        },
      })

      return tx.approvalRequest.update({
        where: { id: numId },
        data: { status, currentStep: Number(currentStep) },
      })
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Admin status change error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
