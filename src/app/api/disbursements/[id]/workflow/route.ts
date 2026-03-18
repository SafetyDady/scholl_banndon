import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { WORKFLOW_STEPS } from '@/lib/constants'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { action, comment } = body

    if (!action || !['SUBMIT', 'APPROVE', 'REJECT', 'COMPLETE'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be SUBMIT, APPROVE, REJECT, or COMPLETE' },
        { status: 400 },
      )
    }

    const disbursement = await prisma.disbursement.findUnique({
      where: { id: Number(id) },
    })

    if (!disbursement) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (disbursement.status === 'REJECTED' || disbursement.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Cannot perform actions on a rejected or completed disbursement' },
        { status: 400 },
      )
    }

    const currentStep = disbursement.currentStep
    let newStatus = disbursement.status
    let newStep = currentStep
    let stepName = WORKFLOW_STEPS[currentStep - 1]?.name ?? ''

    // Step 1 (DRAFT) -> SUBMIT -> move to step 2 (PENDING_APPROVAL)
    if (currentStep === 1 && action === 'SUBMIT') {
      if (session.role !== 'FINANCE_OFFICER') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      newStep = 2
      newStatus = 'PENDING_APPROVAL'
      stepName = WORKFLOW_STEPS[1].name
    }
    // Step 2 (PENDING_APPROVAL) -> APPROVE -> move to step 3 (APPROVED then WITHDRAWN status)
    else if (currentStep === 2 && action === 'APPROVE') {
      if (session.role !== 'VICE_PRINCIPAL' && session.role !== 'PRINCIPAL') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      newStep = 3
      newStatus = 'APPROVED'
      stepName = WORKFLOW_STEPS[1].name
    }
    // Step 2 (PENDING_APPROVAL) -> REJECT
    else if (currentStep === 2 && action === 'REJECT') {
      if (session.role !== 'VICE_PRINCIPAL' && session.role !== 'PRINCIPAL') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      newStatus = 'REJECTED'
      stepName = WORKFLOW_STEPS[1].name
    }
    // Steps 3-7 -> COMPLETE -> advance step
    else if (currentStep >= 3 && currentStep <= 7 && action === 'COMPLETE') {
      if (session.role !== 'FINANCE_OFFICER') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      const currentStepDef = WORKFLOW_STEPS[currentStep - 1]
      stepName = currentStepDef.name

      if (currentStep < 7) {
        newStep = currentStep + 1
        const nextStepDef = WORKFLOW_STEPS[currentStep] // next step (0-indexed = currentStep)
        newStatus = nextStepDef.status
      } else {
        // Step 7 completed
        newStatus = 'COMPLETED'
      }
    } else {
      return NextResponse.json(
        { error: `Invalid action "${action}" for current step ${currentStep}` },
        { status: 400 },
      )
    }

    // Update disbursement and create workflow action in a transaction
    const updated = await prisma.$transaction(async (tx) => {
      await tx.workflowAction.create({
        data: {
          disbursementId: Number(id),
          stepNumber: currentStep,
          stepName,
          action,
          comment: comment || null,
          performedById: session.id,
        },
      })

      return tx.disbursement.update({
        where: { id: Number(id) },
        data: {
          currentStep: newStep,
          status: newStatus,
        },
        include: {
          budgetType: { select: { id: true, name: true, code: true } },
          createdBy: { select: { id: true, fullName: true } },
          workflowActions: {
            include: { performedBy: { select: { fullName: true } } },
            orderBy: { performedAt: 'asc' },
          },
        },
      })
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Workflow POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
