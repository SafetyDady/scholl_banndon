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
    const fiscalYear =
      Number(searchParams.get("fiscalYear")) || getCurrentFiscalYear();

    const [
      totalDisbursedResult,
      totalTransactions,
      pendingCount,
      totalTaxWithheldResult,
      byBudgetTypeRaw,
      byMonth,
      recentItems,
    ] = await Promise.all([
      // Total disbursed: sum totalAmount from ApprovalRequest
      prisma.approvalRequest.aggregate({
        where: { fiscalYear },
        _sum: { totalAmount: true },
      }),

      // Total transactions: count of ApprovalRequest
      prisma.approvalRequest.count({
        where: { fiscalYear },
      }),

      // Pending count: status NOT IN ('COMPLETED', 'REJECTED')
      prisma.approvalRequest.count({
        where: {
          fiscalYear,
          status: { notIn: ["COMPLETED", "REJECTED"] },
        },
      }),

      // Total tax withheld: sum taxWithheld from DisbursementItem (via group -> item)
      prisma.disbursementItem.aggregate({
        where: {
          disbursementGroup: {
            approvalRequest: { fiscalYear },
          },
        },
        _sum: { taxWithheld: true },
      }),

      // By budget type: from DisbursementGroup with budgetType name
      prisma.disbursementGroup.groupBy({
        by: ["budgetTypeId"],
        where: {
          approvalRequest: { fiscalYear },
        },
        _sum: { subtotal: true },
      }),

      // By month: group ApprovalRequest by month
      prisma.$queryRaw<
        { month: number; total: number }[]
      >`
        SELECT
          EXTRACT(MONTH FROM "requestDate")::int AS month,
          SUM("totalAmount") AS total
        FROM "ApprovalRequest"
        WHERE "fiscalYear" = ${fiscalYear}
        GROUP BY month
        ORDER BY month
      `,

      // Recent 5 ApprovalRequests with groups
      prisma.approvalRequest.findMany({
        where: { fiscalYear },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          disbursementGroups: {
            include: {
              budgetType: { select: { name: true } },
            },
            take: 1,
            orderBy: { sortOrder: "asc" },
          },
        },
      }),
    ]);

    // Resolve budget type names for grouped data
    const budgetTypeIds = byBudgetTypeRaw.map((b) => b.budgetTypeId);
    const budgetTypes = await prisma.budgetType.findMany({
      where: { id: { in: budgetTypeIds } },
      select: { id: true, name: true },
    });
    const budgetTypeMap = new Map(budgetTypes.map((bt) => [bt.id, bt.name]));

    const byBudgetTypeNamed = byBudgetTypeRaw.map((b) => ({
      name: budgetTypeMap.get(b.budgetTypeId) ?? "ไม่ระบุ",
      netAmount: b._sum.subtotal ?? 0,
    }));

    // Format monthly data (fill all 12 months)
    const monthlyMap = new Map(
      byMonth.map((m) => [m.month, Number(m.total)]),
    );
    const byMonthFull = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      netAmount: monthlyMap.get(i + 1) ?? 0,
    }));

    return NextResponse.json({
      totalDisbursed: totalDisbursedResult._sum.totalAmount ?? 0,
      totalTransactions,
      pendingCount,
      totalTaxWithheld: totalTaxWithheldResult._sum.taxWithheld ?? 0,
      byBudgetType: byBudgetTypeNamed,
      byMonth: byMonthFull,
      recentItems: recentItems.map((item) => ({
        id: item.id,
        description: item.note ?? `รายการเบิกจ่าย #${item.sequenceNumber ?? item.id}`,
        totalAmount: item.totalAmount,
        status: item.status,
        requestDate: item.requestDate,
        budgetTypeName:
          item.disbursementGroups[0]?.budgetType.name ?? "ไม่ระบุ",
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
