'use client'

import { useEffect, useState, useCallback } from 'react'
import { formatCurrency, formatShortDate } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Inbox,
  ChevronLeft,
  ChevronRight,
  ArrowDownCircle,
  ArrowUpCircle,
  Loader2,
} from 'lucide-react'

interface StatementItem {
  id: number
  transactionDate: string
  withdrawal: number
  deposit: number
  balance: number
  description: string | null
  matchStatus: string
  bankAccount: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  approvalRequest: {
    memoNumber: string | null
    totalAmount: number
  } | null
}

interface ApiResponse {
  data: StatementItem[]
  total: number
  page: number
  totalPages: number
}

export default function TransactionsPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filterType, setFilterType] = useState<'all' | 'withdrawal' | 'deposit'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch from bank-statements API (all accounts)
      const params = new URLSearchParams({
        page: String(page),
        limit: '30',
      })
      if (dateFrom) params.set('dateFrom', dateFrom)
      if (dateTo) params.set('dateTo', dateTo)

      const res = await fetch(`/api/bank-statements?${params}`)
      const json = await res.json()

      // Client-side filter by type
      if (filterType !== 'all' && json.data) {
        json.data = json.data.filter((s: StatementItem) =>
          filterType === 'withdrawal' ? s.withdrawal > 0 : s.deposit > 0,
        )
      }

      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, filterType, dateFrom, dateTo])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="space-y-6">
      <PageHeader
        title="เงินเคลื่อนไหว"
        subtitle="ภาพรวมรายการเงินเข้า-ออกจากทุกบัญชี"
      />

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-[#e2e8f0] bg-white p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">ประเภท</label>
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value as 'all' | 'withdrawal' | 'deposit'); setPage(1) }}
            className="rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">ทั้งหมด</option>
            <option value="withdrawal">เงินออก (ถอน)</option>
            <option value="deposit">เงินเข้า (ฝาก)</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">ตั้งแต่วันที่</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setPage(1) }}
            className="rounded-md border border-[#e2e8f0] px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">ถึงวันที่</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setPage(1) }}
            className="rounded-md border border-[#e2e8f0] px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        {(dateFrom || dateTo || filterType !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setFilterType('all'); setDateFrom(''); setDateTo(''); setPage(1) }}
            className="text-gray-500"
          >
            ล้างตัวกรอง
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#e2e8f0] bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-gray-500">กำลังโหลด...</span>
          </div>
        ) : !data?.data?.length ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Inbox className="mb-2 h-10 w-10" />
            <p className="text-sm">ไม่มีรายการเงินเคลื่อนไหว</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                    <th className="px-4 py-3 text-left font-medium text-primary">วันที่</th>
                    <th className="px-4 py-3 text-center font-medium text-primary">ประเภท</th>
                    <th className="px-4 py-3 text-left font-medium text-primary">บัญชี</th>
                    <th className="px-4 py-3 text-left font-medium text-primary">หมายเหตุ</th>
                    <th className="px-4 py-3 text-left font-medium text-primary">ผูกกับ</th>
                    <th className="px-4 py-3 text-right font-medium text-primary">จำนวนเงิน</th>
                    <th className="px-4 py-3 text-right font-medium text-primary">คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((s) => {
                    const isWithdrawal = s.withdrawal > 0
                    const amount = isWithdrawal ? s.withdrawal : s.deposit
                    return (
                      <tr
                        key={s.id}
                        className="border-b border-[#e2e8f0] transition-colors hover:bg-[#f8fafc]"
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          {formatShortDate(s.transactionDate)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isWithdrawal ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-medium text-destructive">
                              <ArrowUpCircle className="h-3.5 w-3.5" />
                              ถอน
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
                              <ArrowDownCircle className="h-3.5 w-3.5" />
                              ฝาก
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium">{s.bankAccount.bankName}</div>
                          <div className="text-xs text-gray-500">{s.bankAccount.accountNumber}</div>
                        </td>
                        <td className="max-w-[200px] truncate px-4 py-3 text-gray-600">
                          {s.description || '-'}
                        </td>
                        <td className="px-4 py-3">
                          {s.approvalRequest ? (
                            <span className="text-xs text-primary font-medium">
                              {s.approvalRequest.memoNumber || `#${s.id}`}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-medium font-financial">
                          {isWithdrawal ? (
                            <span className="text-red-600">-{formatCurrency(amount)}</span>
                          ) : (
                            <span className="text-green-600">+{formatCurrency(amount)}</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-gray-700 font-financial">
                          {formatCurrency(s.balance)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-[#e2e8f0] px-4 py-3">
                <span className="text-xs text-gray-500">
                  หน้า {data.page} / {data.totalPages} ({data.total} รายการ)
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= data.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
