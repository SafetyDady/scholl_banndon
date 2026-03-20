import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const bankAccounts = await prisma.bankAccount.findMany({
      where: { isActive: true },
      orderBy: { bankName: 'asc' },
    })

    return NextResponse.json(bankAccounts)
  } catch (error) {
    console.error('Bank accounts GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (!['FINANCE_OFFICER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { bankName, accountNumber, accountName, branch, accountType } = body

    if (!bankName || !accountNumber || !accountName) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 },
      )
    }

    const existing = await prisma.bankAccount.findUnique({
      where: { accountNumber },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'เลขที่บัญชีนี้มีอยู่ในระบบแล้ว' },
        { status: 400 },
      )
    }

    const bankAccount = await prisma.bankAccount.create({
      data: {
        bankName,
        accountNumber,
        accountName,
        branch: branch || null,
        accountType: accountType || 'SAVINGS',
      },
    })

    return NextResponse.json(bankAccount, { status: 201 })
  } catch (error) {
    console.error('Bank accounts POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
