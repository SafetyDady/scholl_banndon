import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const settings = await prisma.workflowSetting.findMany()

    const result: Record<string, string> = {}
    for (const s of settings) {
      result[s.key] = s.value
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Workflow settings GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

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
    const { approval_mode, approval_steps } = body

    if (!approval_mode) {
      return NextResponse.json(
        { error: 'กรุณาเลือกโหมดการอนุมัติ' },
        { status: 400 },
      )
    }

    await prisma.workflowSetting.upsert({
      where: { key: 'approval_mode' },
      update: { value: approval_mode },
      create: {
        key: 'approval_mode',
        value: approval_mode,
        description: 'โหมดการอนุมัติ',
      },
    })

    await prisma.workflowSetting.upsert({
      where: { key: 'approval_steps' },
      update: { value: approval_steps || '' },
      create: {
        key: 'approval_steps',
        value: approval_steps || '',
        description: 'ขั้นตอนการอนุมัติ',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Workflow settings PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
