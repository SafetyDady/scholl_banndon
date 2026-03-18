import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCurrentFiscalYear } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const fiscalYear = Number(searchParams.get("fiscalYear")) || getCurrentFiscalYear();

    const [aggregates, pendingCount, byBudgetType, byMonth, recentItems] =
      await Promise.all([
        // Total disbursed & tax withheld
        prisma.disbursement.aggregate({
          where: { fiscalYear },
          _sum: { netAmount: true, taxWithheld: true },
          _count: true,
        }),

        // Pending count (status != COMPLETED)
        prisma.disbursement.count({
          where: {
            fiscalYear,
            status: { not: "COMPLETED" },
          },
        }),

        // Group by budget type
        prisma.disbursement.groupBy({
          by: ["budgetTypeId"],
          where: { fiscalYear },
          _sum: { netAmount: true },
        }),

        // Group by month using raw query
        prisma.$queryRaw<
          { month: number; total: number }[]
        >`
          SELECT
            EXTRACT(MONTH FROM "requestDate")::int AS month,
            SUM("netAmount") AS total
          FROM "Disbursement"
          WHERE "fiscalYear" = ${fiscalYear}
          GROUP BY month
          ORDER BY month
        `,

        // Recent 5 disbursements
        prisma.disbursement.findMany({
          where: { fiscalYear },
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { budgetType: { select: { name: true } } },
        }),
      ]);

    // Resolve budget type names for grouped data
    const budgetTypeIds = byBudgetType.map((b) => b.budgetTypeId);
    const budgetTypes = await prisma.budgetType.findMany({
      where: { id: { in: budgetTypeIds } },
      select: { id: true, name: true },
    });
    const budgetTypeMap = new Map(budgetTypes.map((bt) => [bt.id, bt.name]));

    const byBudgetTypeNamed = byBudgetType.map((b) => ({
      name: budgetTypeMap.get(b.budgetTypeId) ?? "ไม่ระบุ",
      netAmount: b._sum.netAmount ?? 0,
    }));

    // Format monthly data (fill all 12 months)
    const monthlyMap = new Map(byMonth.map((m) => [m.month, Number(m.total)]));
    const byMonthFull = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      netAmount: monthlyMap.get(i + 1) ?? 0,
    }));

    return NextResponse.json({
      totalDisbursed: aggregates._sum.netAmount ?? 0,
      totalTransactions: aggregates._count,
      pendingCount,
      totalTaxWithheld: aggregates._sum.taxWithheld ?? 0,
      byBudgetType: byBudgetTypeNamed,
      byMonth: byMonthFull,
      recentItems: recentItems.map((item) => ({
        id: item.id,
        description: item.description,
        netAmount: item.netAmount,
        status: item.status,
        requestDate: item.requestDate,
        budgetTypeName: item.budgetType.name,
      })),
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
