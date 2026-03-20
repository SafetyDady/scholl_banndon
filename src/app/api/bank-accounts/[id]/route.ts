import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
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
    const bankAccountId = parseInt(id, 10)
    if (isNaN(bankAccountId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const { bankName, accountNumber, accountName, branch, accountType } = body

    if (!bankName || !accountNumber || !accountName) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 },
      )
    }

    const existing = await prisma.bankAccount.findFirst({
      where: {
        accountNumber,
        id: { not: bankAccountId },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'เลขที่บัญชีนี้มีอยู่ในระบบแล้ว' },
        { status: 400 },
      )
    }

    const bankAccount = await prisma.bankAccount.update({
      where: { id: bankAccountId },
      data: {
        bankName,
        accountNumber,
        accountName,
        branch: branch || null,
        accountType: accountType || 'SAVINGS',
      },
    })

    return NextResponse.json(bankAccount)
  } catch (error) {
    console.error('Bank account PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: Request,
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
    const bankAccountId = parseInt(id, 10)
    if (isNaN(bankAccountId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.bankAccount.update({
      where: { id: bankAccountId },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Bank account DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
