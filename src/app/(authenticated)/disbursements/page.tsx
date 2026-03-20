'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn, formatCurrency, formatShortDate, getCurrentFiscalYear } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Plus, Search, Inbox, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ApprovalRequestListItem } from '@/types'

interface ApiResponse {
  data: ApprovalRequestListItem[]
  total: number
  page: number
  totalPages: number
}

export default function DisbursementsPage() {
  const router = useRouter()
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fiscalYear = getCurrentFiscalYear()

  const fetchData = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      fiscalYear: String(fiscalYear),
      page: String(page),
      limit: '20',
    })
    if (status) params.set('status', status)
    if (search) params.set('search', search)

    try {
      const res = await fetch(`/api/disbursements?${params}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [fiscalYear, page, status, search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const statusOptions = Object.entries(STATUS_LABELS).map(([key, val]) => ({
    value: key,
    label: val.label,
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="รายการเบิกจ่าย"
        subtitle={`ปีงบประมาณ ${fiscalYear}`}
        actions={
          <Link
            href="/disbursements/new"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
              'bg-[#1e3a5f] hover:bg-[#163050] text-white'
            )}
          >
            <Plus size={16} />
            สร้างรายการใหม่
          </Link>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สถานะ
            </label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              <option value="">ทั้งหมด</option>
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ค้นหา
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder="ค้นหารายการ, บันทึกฉบับที่, ผู้รับจ้าง..."
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse bg-gray-200 rounded" />
            ))}
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">ลำดับ</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">วันที่</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">บันทึกฉบับที่</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">ประเภทเงิน</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">จำนวนเงิน</th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => {
                  const firstGroupType = item.disbursementGroups?.[0]?.budgetType?.name ?? '-'
                  const groupCount = item.disbursementGroups?.length ?? 0

                  return (
                    <tr
                      key={item.id}
                      onClick={() => router.push(`/disbursements/${item.id}`)}
                      className="hover:bg-gray-50 cursor-pointer border-b transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-600">
                        {(page - 1) * 20 + index + 1}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {formatShortDate(item.requestDate)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.memoNumber ?? '-'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {firstGroupType}
                        {groupCount > 1 && (
                          <span className="ml-1 text-xs text-gray-400">
                            (+{groupCount - 1})
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-gray-900">
                        {formatCurrency(item.totalAmount)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Inbox size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">ไม่พบรายการเบิกจ่าย</p>
          </div>
        )}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              แสดง {(page - 1) * 20 + 1}-{Math.min(page * 20, data.total)} จาก{' '}
              {data.total} รายการ
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <ChevronLeft size={14} />
                ก่อนหน้า
              </button>
              <span className="text-sm text-gray-600">
                หน้า {page} / {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                ถัดไป
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
