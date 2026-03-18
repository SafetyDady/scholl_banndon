'use client'

import { useEffect, useState } from 'react'
import { formatCurrency, getCurrentFiscalYear } from '@/lib/utils'

interface BudgetTypeBalance {
  name: string
  code: string
  totalDisbursed: number
  balance: number
}

interface BalanceResponse {
  budgetTypes: BudgetTypeBalance[]
}

export default function BalancePage() {
  const [data, setData] = useState<BalanceResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const fiscalYear = getCurrentFiscalYear()

  useEffect(() => {
    fetch(`/api/balance?fiscalYear=${fiscalYear}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fiscalYear])

  const totalDisbursed = data?.budgetTypes.reduce((sum, bt) => sum + bt.totalDisbursed, 0) ?? 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">รายงานเงินคงเหลือ</h1>
        <p className="text-sm text-gray-500 mt-1">
          ปีงบประมาณ {fiscalYear}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : data?.budgetTypes && data.budgetTypes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">ประเภทบัญชีเงิน</th>
                  <th className="px-4 py-3 font-medium text-right">ยอดเบิกจ่ายรวม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.budgetTypes.map((bt) => (
                  <tr key={bt.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900">{bt.name}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-medium">
                      {formatCurrency(bt.totalDisbursed)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td className="px-4 py-3 font-bold text-gray-900">รวมทั้งสิ้น</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {formatCurrency(totalDisbursed)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            ไม่พบข้อมูลเงินคงเหลือ
          </div>
        )}
      </div>
    </div>
  )
}
