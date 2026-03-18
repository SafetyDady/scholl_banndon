'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatCurrency, formatShortDate, getCurrentFiscalYear } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'

interface BudgetType {
  id: number
  name: string
  code: string
}

interface DisbursementItem {
  id: number
  sequenceNumber: number | null
  requestDate: string
  memoNumber: string | null
  description: string
  netAmount: number
  status: string
  budgetType: { id: number; name: string; code: string }
}

interface ApiResponse {
  data: DisbursementItem[]
  total: number
  page: number
  totalPages: number
}

function StatusBadge({ status }: { status: string }) {
  const info = STATUS_LABELS[status]
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${info?.color ?? 'bg-gray-100 text-gray-800'}`}
    >
      {info?.label ?? status}
    </span>
  )
}

export default function DisbursementsPage() {
  const router = useRouter()
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([])

  const [budgetTypeId, setBudgetTypeId] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fiscalYear = getCurrentFiscalYear()

  useEffect(() => {
    fetch('/api/budget-types')
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) setBudgetTypes(json)
      })
      .catch(console.error)
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      fiscalYear: String(fiscalYear),
      page: String(page),
      limit: '20',
    })
    if (budgetTypeId) params.set('budgetTypeId', budgetTypeId)
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
  }, [fiscalYear, page, budgetTypeId, status, search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const statusOptions = Object.entries(STATUS_LABELS).map(([key, val]) => ({
    value: key,
    label: val.label,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">รายการเบิกจ่าย</h1>
          <p className="text-sm text-gray-500 mt-1">
            ปีงบประมาณ {fiscalYear}
          </p>
        </div>
        <Link
          href="/disbursements/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          สร้างรายการใหม่
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ประเภทเงิน
            </label>
            <select
              value={budgetTypeId}
              onChange={(e) => {
                setBudgetTypeId(e.target.value)
                setPage(1)
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">ทั้งหมด</option>
              {budgetTypes.map((bt) => (
                <option key={bt.id} value={bt.id}>
                  {bt.name}
                </option>
              ))}
            </select>
          </div>
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="ค้นหารายการ, บันทึกฉบับที่, ผู้รับจ้าง..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">ลำดับ</th>
                  <th className="px-4 py-3 font-medium">วันที่</th>
                  <th className="px-4 py-3 font-medium">บันทึกฉบับที่</th>
                  <th className="px-4 py-3 font-medium">ประเภทเงิน</th>
                  <th className="px-4 py-3 font-medium">รายการ</th>
                  <th className="px-4 py-3 font-medium text-right">จำนวนเงิน</th>
                  <th className="px-4 py-3 font-medium text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.data.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => router.push(`/disbursements/${item.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
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
                      {item.budgetType.name}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-900 font-medium">
                      {formatCurrency(item.netAmount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            ไม่พบรายการเบิกจ่าย
          </div>
        )}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              แสดง {(page - 1) * 20 + 1}-{Math.min(page * 20, data.total)} จาก{' '}
              {data.total} รายการ
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ก่อนหน้า
              </button>
              <span className="text-sm text-gray-600">
                หน้า {page} / {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
