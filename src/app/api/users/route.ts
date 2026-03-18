import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    if (session.role !== 'PRINCIPAL') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        username: true,
        fullName: true,
        position: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Users API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
