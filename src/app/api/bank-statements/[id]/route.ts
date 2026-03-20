import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
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
    const statementId = Number(id)

    const existing = await prisma.bankStatement.findUnique({
      where: { id: statementId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'ไม่พบรายการสมุดบัญชี' },
        { status: 404 },
      )
    }

    const body = await request.json()
    const { description, approvalRequestId, matchStatus } = body

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {}

    if (description !== undefined) {
      updateData.description = description || null
    }

    if (approvalRequestId !== undefined) {
      if (approvalRequestId) {
        const ar = await prisma.approvalRequest.findUnique({
          where: { id: Number(approvalRequestId) },
        })
        if (!ar) {
          return NextResponse.json(
            { error: 'ไม่พบรายการขออนุมัติ' },
            { status: 404 },
          )
        }
        updateData.approvalRequestId = Number(approvalRequestId)
      } else {
        updateData.approvalRequestId = null
      }
    }

    if (matchStatus !== undefined) {
      if (!['MATCHED', 'UNMATCHED', 'MANUAL'].includes(matchStatus)) {
        return NextResponse.json(
          { error: 'สถานะไม่ถูกต้อง' },
          { status: 400 },
        )
      }
      updateData.matchStatus = matchStatus
    }

    const updated = await prisma.bankStatement.update({
      where: { id: statementId },
      data: updateData,
      include: {
        bankAccount: {
          select: { id: true, bankName: true, accountNumber: true, accountName: true },
        },
        approvalRequest: {
          select: { id: true, memoNumber: true, totalAmount: true, status: true },
        },
        createdBy: {
          select: { id: true, fullName: true },
        },
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('BankStatement PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
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
    const statementId = Number(id)

    const existing = await prisma.bankStatement.findUnique({
      where: { id: statementId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'ไม่พบรายการสมุดบัญชี' },
        { status: 404 },
      )
    }

    await prisma.bankStatement.delete({
      where: { id: statementId },
    })

    return NextResponse.json({ message: 'ลบรายการสำเร็จ' })
  } catch (error) {
    console.error('BankStatement DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
