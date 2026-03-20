import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (!['FINANCE_OFFICER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { statementId, approvalRequestId } = body

    if (!statementId || !approvalRequestId) {
      return NextResponse.json(
        { error: 'กรุณาระบุรายการสมุดบัญชีและรายการขออนุมัติ' },
        { status: 400 },
      )
    }

    const statement = await prisma.bankStatement.findUnique({
      where: { id: Number(statementId) },
    })

    if (!statement) {
      return NextResponse.json(
        { error: 'ไม่พบรายการสมุดบัญชี' },
        { status: 404 },
      )
    }

    const approvalRequest = await prisma.approvalRequest.findUnique({
      where: { id: Number(approvalRequestId) },
    })

    if (!approvalRequest) {
      return NextResponse.json(
        { error: 'ไม่พบรายการขออนุมัติ' },
        { status: 404 },
      )
    }

    const updated = await prisma.bankStatement.update({
      where: { id: Number(statementId) },
      data: {
        approvalRequestId: Number(approvalRequestId),
        matchStatus: 'MANUAL',
      },
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
    console.error('BankStatement match error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
