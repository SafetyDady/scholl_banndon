import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const contractors = await prisma.contractor.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(contractors)
  } catch (error) {
    console.error('Contractors GET error:', error)
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
    const { name, taxId, address, phone } = body

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อผู้รับจ้าง' },
        { status: 400 },
      )
    }

    const contractor = await prisma.contractor.create({
      data: {
        name: name.trim(),
        taxId: taxId || null,
        address: address || null,
        phone: phone || null,
      },
    })

    return NextResponse.json(contractor, { status: 201 })
  } catch (error) {
    console.error('Contractors POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
