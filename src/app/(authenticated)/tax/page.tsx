'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, formatShortDate, getCurrentFiscalYear } from '@/lib/utils'

interface DisbursementItem {
  id: number
  requestDate: string
  description: string
  payeeName: string | null
  netAmount: number
  taxWithheld: number
}

export default function TaxPage() {
  const [items, setItems] = useState<DisbursementItem[]>([])
  const [loading, setLoading] = useState(true)
  const fiscalYear = getCurrentFiscalYear()

  useEffect(() => {
    // Fetch all disbursements and filter client-side for those with tax
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

        // Filter only items with tax withheld > 0
        setItems(allItems.filter((item) => item.taxWithheld > 0))
      } catch (error) {
        console.error('Failed to fetch disbursements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [fiscalYear])

  const totalTax = items.reduce((sum, item) => sum + item.taxWithheld, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">หักภาษี ณ ที่จ่าย</h1>
          <p className="text-sm text-gray-500 mt-1">
            ปีงบประมาณ {fiscalYear}
          </p>
        </div>
        <Link
          href="/tax/summary"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          สรุปภาษีรายเดือน
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
        ) : items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">วันที่</th>
                  <th className="px-4 py-3 font-medium">รายการ</th>
                  <th className="px-4 py-3 font-medium">ผู้รับจ้าง</th>
                  <th className="px-4 py-3 font-medium text-right">ยอดจ่าย</th>
                  <th className="px-4 py-3 font-medium text-right">ภาษีที่หัก</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-600">
                      {formatShortDate(item.requestDate)}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.payeeName ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {formatCurrency(item.netAmount)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600 font-medium">
                      {formatCurrency(item.taxWithheld)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td colSpan={4} className="px-4 py-3 font-bold text-gray-900">
                    รวมภาษีที่หักทั้งสิ้น
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
            ไม่พบรายการหักภาษี
          </div>
        )}
      </div>
    </div>
  )
}
