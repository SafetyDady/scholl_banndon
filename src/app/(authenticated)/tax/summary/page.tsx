'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, getCurrentFiscalYear } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Inbox } from 'lucide-react'

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
  'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
  'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

interface MonthSummary {
  month: number
  year: number
  count: number
  totalTax: number
}

interface ApprovalRequestRaw {
  id: number
  requestDate: string
  disbursementGroups: {
    items: {
      id: number
      taxWithheld: number
    }[]
  }[]
}

function getDeadlineStatus(month: number, year: number): { label: string; color: string } {
  // Deadline is 7th of next month
  const deadlineMonth = month === 12 ? 1 : month + 1
  const deadlineYear = month === 12 ? year + 1 : year
  const deadline = new Date(deadlineYear, deadlineMonth - 1, 7)
  const now = new Date()

  if (now > deadline) {
    return { label: 'เลยกำหนด', color: 'text-red-600 bg-red-50' }
  }
  return { label: 'ยังไม่ส่ง', color: 'text-amber-600 bg-amber-50' }
}

function formatDeadline(month: number, year: number): string {
  const deadlineMonth = month === 12 ? 1 : month + 1
  const deadlineYear = month === 12 ? year + 1 : year
  const thaiYear = deadlineYear + 543
  return `7 ${THAI_MONTHS[deadlineMonth - 1]} ${thaiYear}`
}

export default function TaxSummaryPage() {
  const [monthlySummary, setMonthlySummary] = useState<MonthSummary[]>([])
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

        const monthMap = new Map<string, MonthSummary>()

        for (const req of allRequests) {
          for (const group of req.disbursementGroups) {
            if (!group.items) continue
            for (const item of group.items) {
              if (item.taxWithheld > 0) {
                const d = new Date(req.requestDate)
                const month = d.getMonth() + 1
                const year = d.getFullYear()
                const key = `${year}-${month}`
                const existing = monthMap.get(key) ?? {
                  month,
                  year,
                  count: 0,
                  totalTax: 0,
                }
                existing.count += 1
                existing.totalTax += item.taxWithheld
                monthMap.set(key, existing)
              }
            }
          }
        }

        const summary: MonthSummary[] = Array.from(monthMap.values()).sort(
          (a, b) => a.year - b.year || a.month - b.month
        )

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
      <PageHeader
        title="สรุปภาษีรายเดือน"
        subtitle={`ปีงบประมาณ ${fiscalYear}`}
        actions={
          <Link href="/tax">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              กลับ
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
        ) : monthlySummary.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    เดือน
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    จำนวนรายการ
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ยอดภาษีรวม
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    กำหนดส่ง
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlySummary.map((m) => {
                  const status = getDeadlineStatus(m.month, m.year)
                  return (
                    <tr
                      key={`${m.year}-${m.month}`}
                      className="hover:bg-gray-50 border-b transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-900">
                        {THAI_MONTHS[m.month - 1]} {m.year + 543}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-gray-600">
                        {m.count}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-red-600 font-medium">
                        {formatCurrency(m.totalTax)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {formatDeadline(m.month, m.year)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td className="px-4 py-3 font-bold text-gray-900">รวมทั้งสิ้น</td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-gray-900">
                    {totalCount}
                  </td>
                  <td className="px-4 py-3 text-right font-bold font-mono text-red-600">
                    {formatCurrency(totalTax)}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Inbox size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">ไม่พบข้อมูลภาษีรายเดือน</p>
          </div>
        )}
      </div>
    </div>
  )
}
