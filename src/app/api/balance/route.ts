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

    // Determine fiscal year date range (Thai fiscal year: Oct 1 - Sep 30)
    // fiscalYear in Buddhist Era, e.g. 2568 means Oct 2024 - Sep 2025
    const ceYear = fiscalYear - 543
    const fiscalStart = new Date(`${ceYear - 1}-10-01T00:00:00.000Z`)
    const fiscalEnd = new Date(`${ceYear}-09-30T23:59:59.999Z`)

    // Get all active budget types with their hierarchy
    const allBudgetTypes = await prisma.budgetType.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, name: true, code: true, category: true, parentId: true },
    })

    // Aggregate MoneyTransaction by budgetTypeId and type within fiscal year
    const [incomeSums, expenseSums] = await Promise.all([
      prisma.moneyTransaction.groupBy({
        by: ['budgetTypeId'],
        where: {
          type: 'IN',
          transactionDate: { gte: fiscalStart, lte: fiscalEnd },
        },
        _sum: { amount: true },
      }),
      prisma.moneyTransaction.groupBy({
        by: ['budgetTypeId'],
        where: {
          type: 'OUT',
          transactionDate: { gte: fiscalStart, lte: fiscalEnd },
        },
        _sum: { amount: true },
      }),
    ])

    const incomeMap = new Map(
      incomeSums.map((s) => [s.budgetTypeId, s._sum.amount ?? 0])
    )
    const expenseMap = new Map(
      expenseSums.map((s) => [s.budgetTypeId, s._sum.amount ?? 0])
    )

    // Build budget type data with computed balances
    const budgetTypes = allBudgetTypes.map((bt) => {
      const totalReceived = incomeMap.get(bt.id) ?? 0
      const totalDisbursed = expenseMap.get(bt.id) ?? 0
      const balance = totalReceived - totalDisbursed

      return {
        id: bt.id,
        name: bt.name,
        code: bt.code,
        category: bt.category,
        parentId: bt.parentId,
        totalReceived,
        totalDisbursed,
        balance,
      }
    })

    // Separate into categories
    const budgetCategory = budgetTypes.filter((bt) => bt.category === 'BUDGET')
    const nonBudgetCategory = budgetTypes.filter((bt) => bt.category === 'NON_BUDGET')

    // Compute category subtotals
    const budgetSubtotal = {
      totalReceived: budgetCategory.reduce((s, bt) => s + bt.totalReceived, 0),
      totalDisbursed: budgetCategory.reduce((s, bt) => s + bt.totalDisbursed, 0),
      balance: budgetCategory.reduce((s, bt) => s + bt.balance, 0),
    }

    const nonBudgetSubtotal = {
      totalReceived: nonBudgetCategory.reduce((s, bt) => s + bt.totalReceived, 0),
      totalDisbursed: nonBudgetCategory.reduce((s, bt) => s + bt.totalDisbursed, 0),
      balance: nonBudgetCategory.reduce((s, bt) => s + bt.balance, 0),
    }

    const grandTotal = {
      totalReceived: budgetSubtotal.totalReceived + nonBudgetSubtotal.totalReceived,
      totalDisbursed: budgetSubtotal.totalDisbursed + nonBudgetSubtotal.totalDisbursed,
      balance: budgetSubtotal.balance + nonBudgetSubtotal.balance,
    }

    return NextResponse.json({
      fiscalYear,
      budgetCategory,
      nonBudgetCategory,
      budgetSubtotal,
      nonBudgetSubtotal,
      grandTotal,
    })
  } catch (error) {
    console.error('Balance API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
