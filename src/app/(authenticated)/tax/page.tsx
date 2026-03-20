'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, formatShortDate, getCurrentFiscalYear } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { FileText, Inbox, CheckCircle, Clock } from 'lucide-react'

interface TaxRecord {
  id: number
  paymentDate: string
  payeeName: string
  amount: number
  taxPercent: number
  taxWithheld: number
  netAmount: number
  taxCertificateNo: string | null
  taxCertificateDate: string | null
  description: string
  approvalRequestId: number
  memoNumber: string | null
}

export default function TaxPage() {
  const [records, setRecords] = useState<TaxRecord[]>([])
  const [loading, setLoading] = useState(true)
  const fiscalYear = getCurrentFiscalYear()

  useEffect(() => {
    fetch('/api/tax')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRecords(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0)
  const totalTax = records.reduce((sum, r) => sum + r.taxWithheld, 0)
  const totalNet = records.reduce((sum, r) => sum + r.netAmount, 0)

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
        ) : records.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    วันที่จ่าย
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ผู้รับจ้าง
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ยอดสั่งซื้อ
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    %หัก
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ภาษีหัก
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    จ่ายจริง
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    สถานะ 50ทวิ
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {formatShortDate(r.paymentDate)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900 font-medium">{r.payeeName}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{r.description}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">
                      {formatCurrency(r.amount)}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {r.taxPercent}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-red-600 font-medium">
                      {formatCurrency(r.taxWithheld)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">
                      {formatCurrency(r.netAmount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {r.taxCertificateNo ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle size={12} />
                          ออกแล้ว
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                          <Clock size={12} />
                          ยังไม่ออก
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td className="px-4 py-3 font-bold text-gray-900">
                    รวม {records.length} ราย
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-gray-900">
                    {formatCurrency(totalAmount)}
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-red-600">
                    {formatCurrency(totalTax)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-gray-900">
                    {formatCurrency(totalNet)}
                  </td>
                  <td className="px-4 py-3"></td>
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
