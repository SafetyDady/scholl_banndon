import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const records = await prisma.schoolInfo.findMany()
    const data: Record<string, string> = {}
    for (const r of records) {
      data[r.key] = r.value
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('SchoolInfo GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!['ADMIN', 'FINANCE_OFFICER'].includes(session.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json() as Record<string, string>

    for (const [key, value] of Object.entries(body)) {
      await prisma.schoolInfo.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    const records = await prisma.schoolInfo.findMany()
    const data: Record<string, string> = {}
    for (const r of records) {
      data[r.key] = r.value
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('SchoolInfo PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
