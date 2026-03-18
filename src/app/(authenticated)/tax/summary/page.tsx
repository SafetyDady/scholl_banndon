'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, getCurrentFiscalYear } from '@/lib/utils'

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
  'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
  'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

interface MonthSummary {
  month: number
  count: number
  totalTax: number
}

interface DisbursementItem {
  id: number
  requestDate: string
  taxWithheld: number
}

export default function TaxSummaryPage() {
  const [monthlySummary, setMonthlySummary] = useState<MonthSummary[]>([])
  const [loading, setLoading] = useState(true)
  const fiscalYear = getCurrentFiscalYear()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        let allItems: DisbursementItem[] = []
        let page = 1
        let totalPages = 1

        while (page <= totalPages) {
          const res = await fetch(
            `/api/disbursements?fiscalYear=${fiscalYear}&page=${page}&limit=100`
          )
          const json = await res.json()
          allItems = [...allItems, ...json.data]
          totalPages = json.totalPages
          page++
        }

        // Filter items with tax and group by month
        const taxItems = allItems.filter((item) => item.taxWithheld > 0)
        const monthMap = new Map<number, { count: number; totalTax: number }>()

        taxItems.forEach((item) => {
          const month = new Date(item.requestDate).getMonth() + 1
          const existing = monthMap.get(month) ?? { count: 0, totalTax: 0 }
          existing.count += 1
          existing.totalTax += item.taxWithheld
          monthMap.set(month, existing)
        })

        const summary: MonthSummary[] = Array.from(monthMap.entries())
          .map(([month, data]) => ({ month, ...data }))
          .sort((a, b) => a.month - b.month)

        setMonthlySummary(summary)
      } catch (error) {
        console.error('Failed to fetch disbursements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [fiscalYear])

  const totalCount = monthlySummary.reduce((sum, m) => sum + m.count, 0)
  const totalTax = monthlySummary.reduce((sum, m) => sum + m.totalTax, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">สรุปภาษีรายเดือน</h1>
          <p className="text-sm text-gray-500 mt-1">
            ปีงบประมาณ {fiscalYear}
          </p>
        </div>
        <Link
          href="/tax"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับ
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : monthlySummary.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">เดือน</th>
                  <th className="px-4 py-3 font-medium text-right">จำนวนรายการ</th>
                  <th className="px-4 py-3 font-medium text-right">ยอดภาษีรวม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthlySummary.map((m) => (
                  <tr key={m.month} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900">
                      {THAI_MONTHS[m.month - 1]}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {m.count}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600 font-medium">
                      {formatCurrency(m.totalTax)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td className="px-4 py-3 font-bold text-gray-900">รวมทั้งสิ้น</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {totalCount}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-red-600">
                    {formatCurrency(totalTax)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            ไม่พบข้อมูลภาษีรายเดือน
          </div>
        )}
      </div>
    </div>
  )
}
