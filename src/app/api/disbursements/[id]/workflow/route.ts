import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { WORKFLOW_STEPS } from '@/lib/constants'

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
    const numId = Number(id)
    const body = await request.json()
    const { action, comment, paymentData } = body

    if (!action || !['SUBMIT', 'APPROVE', 'REJECT', 'COMPLETE', 'REVERSE'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be SUBMIT, APPROVE, REJECT, COMPLETE, or REVERSE' },
        { status: 400 },
      )
    }

    const approvalRequest = await prisma.approvalRequest.findUnique({
      where: { id: numId },
      include: {
        disbursementGroups: {
          include: { items: true },
        },
      },
    })

    if (!approvalRequest) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const currentStep = approvalRequest.currentStep
    let newStatus = approvalRequest.status
    let newStep = currentStep
    const stepName = WORKFLOW_STEPS[currentStep - 1]?.name ?? ''

    // ===== REVERSE =====
    if (action === 'REVERSE') {
      if (currentStep <= 1) {
        return NextResponse.json(
          { error: 'ไม่สามารถย้อนกลับจากขั้นตอนแรกได้' },
          { status: 400 },
        )
      }

      if (approvalRequest.status === 'COMPLETED') {
        return NextResponse.json(
          { error: 'ไม่สามารถย้อนกลับรายการที่เสร็จสิ้นแล้ว' },
          { status: 400 },
        )
      }

      if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      // Step 4 reverse requires comment
      if (currentStep === 4 && !comment) {
        return NextResponse.json(
          { error: 'กรุณาระบุเหตุผลในการย้อนกลับ' },
          { status: 400 },
        )
      }

      const prevStep = currentStep - 1
      const prevStepDef = WORKFLOW_STEPS[prevStep - 1]
      const prevStatus = prevStepDef?.status ?? 'DRAFT'

      const updated = await prisma.$transaction(async (tx) => {
        await tx.workflowAction.create({
          data: {
            approvalRequestId: numId,
            stepNumber: currentStep,
            stepName,
            action: 'REVERSE',
            comment: comment || null,
            performedById: session.id,
          },
        })

        return tx.approvalRequest.update({
          where: { id: numId },
          data: {
            currentStep: prevStep,
            status: prevStatus,
          },
          include: includeFullDetail,
        })
      })

      return NextResponse.json(updated)
    }

    // ===== NORMAL ACTIONS =====
    if (approvalRequest.status === 'REJECTED' || approvalRequest.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'ไม่สามารถดำเนินการกับรายการที่ไม่อนุมัติหรือเสร็จสิ้นแล้ว' },
        { status: 400 },
      )
    }

    // Step 1 (DRAFT) -> SUBMIT
    if (currentStep === 1 && action === 'SUBMIT') {
      if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      // Check WorkflowSetting for approval_mode
      const modeSetting = await prisma.workflowSetting.findUnique({
        where: { key: 'approval_mode' },
      })
      const approvalMode = modeSetting?.value ?? 'approval'

      if (approvalMode === 'self') {
        // Self mode: auto-approve, skip step 2, go straight to step 3
        newStep = 3
        newStatus = 'APPROVED'

        await prisma.$transaction(async (tx) => {
          await tx.workflowAction.create({
            data: {
              approvalRequestId: numId,
              stepNumber: 1,
              stepName: WORKFLOW_STEPS[0].name,
              action: 'SUBMIT',
              comment: comment || null,
              performedById: session.id,
            },
          })
          await tx.workflowAction.create({
            data: {
              approvalRequestId: numId,
              stepNumber: 2,
              stepName: WORKFLOW_STEPS[1].name,
              action: 'APPROVE',
              comment: 'อนุมัติอัตโนมัติ (โหมดอนุมัติตนเอง)',
              performedById: session.id,
            },
          })
          await tx.approvalRequest.update({
            where: { id: numId },
            data: { currentStep: newStep, status: newStatus },
          })
        })

        const result = await prisma.approvalRequest.findUnique({
          where: { id: numId },
          include: includeFullDetail,
        })
        return NextResponse.json(result)
      } else {
        newStep = 2
        newStatus = 'PENDING_APPROVAL'
      }
    }
    // Step 2 (PENDING_APPROVAL) -> APPROVE
    else if (currentStep === 2 && (action === 'APPROVE' || action === 'COMPLETE')) {
      const modeSetting2 = await prisma.workflowSetting.findUnique({
        where: { key: 'approval_mode' },
      })
      const approvalMode2 = modeSetting2?.value ?? 'approval'

      if (approvalMode2 === 'self') {
        if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
      } else {
        if (!['VICE_PRINCIPAL', 'PRINCIPAL', 'ADMIN'].includes(session.role)) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
      }
      newStep = 3
      newStatus = 'APPROVED'
    }
    // Step 2 (PENDING_APPROVAL) -> REJECT
    else if (currentStep === 2 && action === 'REJECT') {
      const modeSetting3 = await prisma.workflowSetting.findUnique({
        where: { key: 'approval_mode' },
      })
      const approvalMode3 = modeSetting3?.value ?? 'approval'

      if (approvalMode3 === 'self') {
        if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
      } else {
        if (!['VICE_PRINCIPAL', 'PRINCIPAL', 'ADMIN'].includes(session.role)) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
      }
      if (!comment) {
        return NextResponse.json(
          { error: 'กรุณาระบุเหตุผลที่ไม่อนุมัติ' },
          { status: 400 },
        )
      }
      newStatus = 'REJECTED'
    }
    // Step 3 -> COMPLETE (เบิกเงินแล้ว)
    else if (currentStep === 3 && action === 'COMPLETE') {
      if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      newStep = 4
      newStatus = 'WITHDRAWN'
    }
    // Step 4 -> COMPLETE (นำจ่ายแล้ว = จบ)
    else if (currentStep === 4 && action === 'COMPLETE') {
      if (!['FINANCE_OFFICER', 'ADMIN'].includes(session.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      newStatus = 'COMPLETED'
    }
    else {
      return NextResponse.json(
        { error: `ไม่สามารถดำเนินการ "${action}" ในขั้นตอนที่ ${currentStep} ได้` },
        { status: 400 },
      )
    }

    // Update in transaction
    const updated = await prisma.$transaction(async (tx) => {
      // Step 4: Save payment records + update item totals
      if (currentStep === 4 && paymentData && Array.isArray(paymentData)) {
        // Group by itemId to update totals
        const itemTotals: Record<number, { taxWithheld: number; netAmount: number; payeeNames: string[] }> = {}

        for (const pd of paymentData) {
          if (!pd.itemId) continue

          // Create PaymentRecord for each payee
          await tx.paymentRecord.create({
            data: {
              disbursementItemId: pd.itemId,
              paymentDate: new Date(pd.paymentDate),
              contractorId: pd.contractorId || null,
              payeeName: pd.payeeName || '',
              amount: Number(pd.amount) || 0,
              taxPercent: Number(pd.taxPercent) || 0,
              taxWithheld: Number(pd.taxWithheld) || 0,
              netAmount: Number(pd.netAmount) || 0,
            },
          })

          // Accumulate totals per item
          if (!itemTotals[pd.itemId]) {
            itemTotals[pd.itemId] = { taxWithheld: 0, netAmount: 0, payeeNames: [] }
          }
          itemTotals[pd.itemId].taxWithheld += Number(pd.taxWithheld) || 0
          itemTotals[pd.itemId].netAmount += Number(pd.netAmount) || 0
          if (pd.payeeName) itemTotals[pd.itemId].payeeNames.push(pd.payeeName)
        }

        // Update DisbursementItem with aggregated totals
        for (const [itemId, totals] of Object.entries(itemTotals)) {
          await tx.disbursementItem.update({
            where: { id: Number(itemId) },
            data: {
              payeeName: totals.payeeNames.join(', '),
              taxWithheld: totals.taxWithheld,
              netAmount: totals.netAmount,
            },
          })
        }
      }

      await tx.workflowAction.create({
        data: {
          approvalRequestId: numId,
          stepNumber: currentStep,
          stepName,
          action,
          comment: comment || null,
          performedById: session.id,
        },
      })

      return tx.approvalRequest.update({
        where: { id: numId },
        data: {
          currentStep: newStep,
          status: newStatus,
        },
        include: includeFullDetail,
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
