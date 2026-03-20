'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, formatShortDate, getCurrentFiscalYear } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { FileText, Inbox } from 'lucide-react'

interface TaxItem {
  itemId: number
  requestDate: string
  memoNumber: string | null
  description: string
  payeeName: string | null
  netAmount: number
  taxWithheld: number
}

interface ApprovalRequestRaw {
  id: number
  requestDate: string
  memoNumber: string | null
  sequenceNumber: number | null
  disbursementGroups: {
    items: {
      id: number
      description: string
      payeeName: string | null
      netAmount: number
      taxWithheld: number
    }[]
  }[]
}

export default function TaxPage() {
  const [items, setItems] = useState<TaxItem[]>([])
  const [loading, setLoading] = useState(true)
  const fiscalYear = getCurrentFiscalYear()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        let allRequests: ApprovalRequestRaw[] = []
        let page = 1
        let totalPages = 1

        while (page <= totalPages) {
          const res = await fetch(
            `/api/disbursements?fiscalYear=${fiscalYear}&page=${page}&limit=100&hasTax=true`
          )
          const json = await res.json()
          allRequests = [...allRequests, ...json.data]
          totalPages = json.totalPages
          page++
        }

        const taxItems: TaxItem[] = []
        for (const req of allRequests) {
          for (const group of req.disbursementGroups) {
            if (!group.items) continue
            for (const item of group.items) {
              if (item.taxWithheld > 0) {
                taxItems.push({
                  itemId: item.id,
                  requestDate: req.requestDate,
                  memoNumber: req.memoNumber,
                  description: item.description,
                  payeeName: item.payeeName,
                  netAmount: item.netAmount,
                  taxWithheld: item.taxWithheld,
                })
              }
            }
          }
        }

        taxItems.sort(
          (a, b) =>
            new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
        )

        setItems(taxItems)
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
      <PageHeader
        title="หักภาษี ณ ที่จ่าย"
        subtitle={`ปีงบประมาณ ${fiscalYear}`}
        actions={
          <Link href="/tax/summary">
            <Button className="bg-[#1e3a5f] hover:bg-[#163050] text-white gap-2">
              <FileText size={16} />
              สรุปภาษีรายเดือน
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse bg-gray-200 rounded" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    วันที่
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    บันทึกฉบับที่
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    รายการ
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ผู้รับจ้าง
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ยอดจ่าย
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ภาษีที่หัก
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.itemId}
                    className="hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {formatShortDate(item.requestDate)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.memoNumber ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.payeeName ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">
                      {formatCurrency(item.netAmount)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-red-600 font-medium">
                      {formatCurrency(item.taxWithheld)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td colSpan={5} className="px-4 py-3 font-bold text-gray-900">
                    รวมภาษีที่หักทั้งสิ้น
                  </td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-red-600">
                    {formatCurrency(totalTax)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Inbox size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">ไม่พบรายการหักภาษี</p>
          </div>
        )}
      </div>
    </div>
  )
}
