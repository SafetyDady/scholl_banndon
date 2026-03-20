'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, getCurrentFiscalYear } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Printer, Inbox } from 'lucide-react'

interface BudgetTypeBalance {
  id: number
  name: string
  code: string
  category: string
  parentId: number | null
  totalReceived: number
  totalDisbursed: number
  balance: number
}

interface Subtotal {
  totalReceived: number
  totalDisbursed: number
  balance: number
}

interface BalanceResponse {
  fiscalYear: number
  budgetCategory: BudgetTypeBalance[]
  nonBudgetCategory: BudgetTypeBalance[]
  budgetSubtotal: Subtotal
  nonBudgetSubtotal: Subtotal
  grandTotal: Subtotal
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

  const renderRows = (items: BudgetTypeBalance[]) =>
    items.map((bt) => (
      <tr key={bt.id} className="hover:bg-gray-50 border-b transition-colors">
        <td className="px-4 py-3 text-gray-900">{bt.name}</td>
        <td className="px-4 py-3 text-right font-mono text-gray-900">
          {formatCurrency(bt.totalReceived)}
        </td>
        <td className="px-4 py-3 text-right font-mono text-gray-900">
          {formatCurrency(bt.totalDisbursed)}
        </td>
        <td className="px-4 py-3 text-right font-mono font-medium text-[#1e3a5f]">
          {formatCurrency(bt.balance)}
        </td>
      </tr>
    ))

  const renderSubtotalRow = (label: string, subtotal: Subtotal) => (
    <tr className="bg-blue-50/50 border-b border-blue-200">
      <td className="px-4 py-3 font-semibold text-[#1e3a5f]">{label}</td>
      <td className="px-4 py-3 text-right font-mono font-semibold text-[#1e3a5f]">
        {formatCurrency(subtotal.totalReceived)}
      </td>
      <td className="px-4 py-3 text-right font-mono font-semibold text-[#1e3a5f]">
        {formatCurrency(subtotal.totalDisbursed)}
      </td>
      <td className="px-4 py-3 text-right font-mono font-bold text-[#1e3a5f]">
        {formatCurrency(subtotal.balance)}
      </td>
    </tr>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="รายงานเงินคงเหลือ"
        subtitle={`ปีงบประมาณ ${fiscalYear}`}
        actions={
          <Link
            href="/print/balance"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Printer size={16} />
            พิมพ์รายงาน
          </Link>
        }
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse bg-gray-200 rounded" />
            ))}
          </div>
        ) : data &&
          (data.budgetCategory.length > 0 || data.nonBudgetCategory.length > 0) ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1e3a5f] text-white">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider font-medium">
                    ประเภทเงิน
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wider font-medium">
                    ยอดรับเข้า
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wider font-medium">
                    ยอดเบิกจ่าย
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wider font-medium">
                    คงเหลือ
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* งบประมาณ */}
                {data.budgetCategory.length > 0 && (
                  <>
                    <tr className="bg-gray-100 border-b">
                      <td
                        colSpan={4}
                        className="px-4 py-2 font-semibold text-sm text-[#1e3a5f]"
                      >
                        งบประมาณ
                      </td>
                    </tr>
                    {renderRows(data.budgetCategory)}
                    {renderSubtotalRow('รวมงบประมาณ', data.budgetSubtotal)}
                  </>
                )}

                {/* นอกงบประมาณ */}
                {data.nonBudgetCategory.length > 0 && (
                  <>
                    <tr className="bg-gray-100 border-b">
                      <td
                        colSpan={4}
                        className="px-4 py-2 font-semibold text-sm text-[#1e3a5f]"
                      >
                        นอกงบประมาณ
                      </td>
                    </tr>
                    {renderRows(data.nonBudgetCategory)}
                    {renderSubtotalRow(
                      'รวมนอกงบประมาณ',
                      data.nonBudgetSubtotal
                    )}
                  </>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-[#1e3a5f]/10 border-t-2 border-[#1e3a5f]">
                  <td className="px-4 py-3 font-bold text-[#1e3a5f]">
                    รวมทั้งสิ้น
                  </td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-[#1e3a5f]">
                    {formatCurrency(data.grandTotal.totalReceived)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-[#1e3a5f]">
                    {formatCurrency(data.grandTotal.totalDisbursed)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-[#1e3a5f]">
                    {formatCurrency(data.grandTotal.balance)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Inbox size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">ไม่พบข้อมูลเงินคงเหลือ</p>
          </div>
        )}
      </div>
    </div>
  )
}
