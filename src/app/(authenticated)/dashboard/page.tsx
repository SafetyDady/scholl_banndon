'use client'

import { useEffect, useState } from 'react'
import { formatCurrency, getCurrentFiscalYear, formatShortDate } from '@/lib/utils'
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
    netAmount: number
    status: string
    requestDate: string
    budgetTypeName: string
  }[]
}

const PIE_COLORS = [
  '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
  '#f59e0b', '#10b981', '#06b6d4', '#f97316',
]

const MONTH_NAMES = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
]

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'ร่าง',
  PENDING_APPROVAL: 'รออนุมัติ',
  APPROVED: 'อนุมัติแล้ว',
  WITHDRAWN: 'เบิกเงินแล้ว',
  PAID: 'จ่ายเงินแล้ว',
  TAX_ISSUED: 'ออกใบ 50 ทวิแล้ว',
  BALANCE_REPORTED: 'รายงานยอดแล้ว',
  COMPLETED: 'เสร็จสิ้น',
  REJECTED: 'ไม่อนุมัติ',
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-700',
    PENDING_APPROVAL: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-blue-100 text-blue-700',
    WITHDRAWN: 'bg-indigo-100 text-indigo-700',
    PAID: 'bg-purple-100 text-purple-700',
    TAX_ISSUED: 'bg-pink-100 text-pink-700',
    BALANCE_REPORTED: 'bg-teal-100 text-teal-700',
    COMPLETED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
      <div className="h-8 bg-gray-200 rounded w-32" />
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

  const summaryCards = [
    {
      title: 'ยอดเบิกจ่ายทั้งหมด',
      value: data?.totalDisbursed ?? 0,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'จำนวนรายการ',
      value: data?.totalTransactions ?? 0,
      color: 'bg-indigo-50 border-indigo-200',
      textColor: 'text-indigo-700',
      iconBg: 'bg-indigo-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      isCurrency: false,
    },
    {
      title: 'รอดำเนินการ',
      value: data?.pendingCount ?? 0,
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-700',
      iconBg: 'bg-yellow-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      isCurrency: false,
    },
    {
      title: 'ภาษีหัก ณ ที่จ่าย',
      value: data?.totalTaxWithheld ?? 0,
      color: 'bg-pink-50 border-pink-200',
      textColor: 'text-pink-700',
      iconBg: 'bg-pink-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      ),
    },
  ]

  const monthlyData = (data?.byMonth ?? []).map((m) => ({
    name: MONTH_NAMES[m.month - 1],
    amount: m.netAmount,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ด</h1>
        <p className="text-sm text-gray-500 mt-1">
          ภาพรวมการเบิกจ่าย ปีงบประมาณ {fiscalYear}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : summaryCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-xl shadow-sm border p-6 ${card.color}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${card.iconBg} rounded-lg p-2`}>
                    {card.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {card.title}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${card.textColor}`}>
                  {card.isCurrency === false
                    ? card.value.toLocaleString()
                    : formatCurrency(card.value)}
                  {card.isCurrency !== false && (
                    <span className="text-sm font-normal ml-1">บาท</span>
                  )}
                </p>
              </div>
            ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - By Budget Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            สัดส่วนการเบิกจ่ายตามประเภทงบ
          </h2>
          {loading ? (
            <div className="h-72 bg-gray-100 rounded animate-pulse" />
          ) : data?.byBudgetType && data.byBudgetType.length > 0 ? (
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

        {/* Bar Chart - Monthly */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ยอดเบิกจ่ายรายเดือน
          </h2>
          {loading ? (
            <div className="h-72 bg-gray-100 rounded animate-pulse" />
          ) : (
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
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          รายการล่าสุด
        </h2>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : data?.recentItems && data.recentItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-3 font-medium">วันที่</th>
                  <th className="pb-3 font-medium">รายการ</th>
                  <th className="pb-3 font-medium">ประเภทงบ</th>
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
                    <td className="py-3 text-gray-600">{item.budgetTypeName}</td>
                    <td className="py-3 text-right text-gray-900 font-medium">
                      {formatCurrency(item.netAmount)}
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
