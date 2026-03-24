'use client'

import { useEffect, useState } from 'react'
import { Banknote, FileText, Clock, Receipt } from 'lucide-react'
import { formatCurrency, getCurrentFiscalYear, formatShortDate } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

interface DashboardData {
  totalDisbursed: number
  totalTransactions: number
  pendingCount: number
  totalTaxWithheld: number
  byBudgetType: { name: string; netAmount: number }[]
  byMonth: { month: number; netAmount: number }[]
  recentItems: {
    id: number
    description: string
    totalAmount: number
    status: string
    requestDate: string
    budgetTypeName: string
  }[]
}

const PIE_COLORS = [
  '#1e3a5f', '#16a34a', '#3b82f6', '#8b5cf6',
  '#f59e0b', '#06b6d4', '#ec4899', '#f97316',
]

const MONTH_NAMES = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
]

interface StatCardData {
  title: string
  value: string
  icon: React.ReactNode
  bgColor: string
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 animate-pulse bg-gray-200 rounded w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl p-5 animate-pulse bg-gray-200 h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-40 mb-4" />
            <div className="h-72 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const fiscalYear = getCurrentFiscalYear()

  useEffect(() => {
    fetch(`/api/dashboard?fiscalYear=${fiscalYear}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fiscalYear])

  if (loading) {
    return <DashboardSkeleton />
  }

  const statCards: StatCardData[] = [
    {
      title: 'ยอดเบิกจ่ายทั้งหมด',
      value: `${formatCurrency(data?.totalDisbursed ?? 0)} บาท`,
      icon: <Banknote size={24} className="text-white" />,
      bgColor: 'bg-primary',
    },
    {
      title: 'จำนวนรายการ',
      value: (data?.totalTransactions ?? 0).toLocaleString(),
      icon: <FileText size={24} className="text-white" />,
      bgColor: 'bg-info',
    },
    {
      title: 'รอดำเนินการ',
      value: (data?.pendingCount ?? 0).toLocaleString(),
      icon: <Clock size={24} className="text-white" />,
      bgColor: 'bg-warning',
    },
    {
      title: 'ภาษีหัก ณ ที่จ่าย',
      value: `${formatCurrency(data?.totalTaxWithheld ?? 0)} บาท`,
      icon: <Receipt size={24} className="text-white" />,
      bgColor: 'bg-success',
    },
  ]

  const monthlyData = (data?.byMonth ?? []).map((m) => ({
    name: MONTH_NAMES[m.month - 1],
    amount: m.netAmount,
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="ภาพรวม"
        subtitle={`ปีงบประมาณ ${fiscalYear}`}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`${card.bgColor} rounded-xl p-5 shadow-sm transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-white/80">{card.title}</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                {card.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-base font-semibold text-primary mb-4">
            สัดส่วนตามประเภทเงิน
          </h2>
          {data?.byBudgetType && data.byBudgetType.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.byBudgetType}
                  dataKey="netAmount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={((props: { name?: string; percent?: number }) =>
                    `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`
                  ) as unknown as boolean}
                >
                  {data.byBudgetType.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${formatCurrency(Number(value))} บาท`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-400">
              ไม่มีข้อมูล
            </div>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-base font-semibold text-primary mb-4">
            ยอดเบิกจ่ายรายเดือน
          </h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis
                  fontSize={12}
                  tickFormatter={(v: number) =>
                    v >= 1_000_000
                      ? `${(v / 1_000_000).toFixed(1)}M`
                      : v >= 1_000
                        ? `${(v / 1_000).toFixed(0)}K`
                        : v.toString()
                  }
                />
                <Tooltip
                  formatter={(value) => [
                    `${formatCurrency(Number(value))} บาท`,
                    'ยอดเบิกจ่าย',
                  ]}
                />
                <Bar dataKey="amount" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-400">
              ไม่มีข้อมูล
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-base font-semibold text-primary mb-4">
          รายการล่าสุด
        </h2>
        {data?.recentItems && data.recentItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-3 font-medium">วันที่</th>
                  <th className="pb-3 font-medium">รายการ</th>
                  <th className="pb-3 font-medium">ประเภทเงิน</th>
                  <th className="pb-3 font-medium text-right">จำนวนเงิน</th>
                  <th className="pb-3 font-medium text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.recentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 text-gray-600">
                      {formatShortDate(item.requestDate)}
                    </td>
                    <td className="py-3 text-gray-900 font-medium max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="py-3 text-gray-600">
                      {item.budgetTypeName}
                    </td>
                    <td className="py-3 text-right font-mono text-gray-900 font-financial">
                      {formatCurrency(item.totalAmount)}
                    </td>
                    <td className="py-3 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">ไม่มีรายการ</p>
        )}
      </div>
    </div>
  )
}
