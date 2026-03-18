import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getCurrentFiscalYear } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const fiscalYear = Number(searchParams.get('fiscalYear')) || getCurrentFiscalYear()

    // Aggregate disbursements by budgetType for the fiscal year
    const [byBudgetType, allBudgetTypes] = await Promise.all([
      prisma.disbursement.groupBy({
        by: ['budgetTypeId'],
        where: { fiscalYear },
        _sum: { netAmount: true },
      }),
      prisma.budgetType.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        select: { id: true, name: true, code: true },
      }),
    ])

    // Build a map of disbursed amounts by budgetTypeId
    const disbursedMap = new Map(
      byBudgetType.map((b) => [b.budgetTypeId, b._sum.netAmount ?? 0])
    )

    // Combine budget types with their disbursed totals
    const budgetTypes = allBudgetTypes.map((bt) => ({
      name: bt.name,
      code: bt.code,
      totalDisbursed: disbursedMap.get(bt.id) ?? 0,
      balance: 0, // placeholder for now
    }))

    return NextResponse.json({ budgetTypes })
  } catch (error) {
    console.error('Balance API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
