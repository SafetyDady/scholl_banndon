import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(request: Request) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (!['FINANCE_OFFICER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { items } = body

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'กรุณาส่งข้อมูลรายการที่ต้องการจัดเรียง' },
        { status: 400 },
      )
    }

    // Update sortOrder for each item
    await prisma.$transaction(
      items.map((item: { id: number; sortOrder: number }) =>
        prisma.balanceReportTemplate.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Balance template reorder error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
