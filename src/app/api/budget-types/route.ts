import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const budgetTypes = await prisma.budgetType.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        parentId: true,
        sortOrder: true,
      },
    })

    return NextResponse.json(budgetTypes)
  } catch (error) {
    console.error('Budget types API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
