'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { cn, formatCurrency, formatShortDate } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { CheckCircle, XCircle, Inbox } from 'lucide-react'
import type { ApprovalRequestListItem } from '@/types'

interface ApiResponse {
  data: ApprovalRequestListItem[]
  total: number
  page: number
  totalPages: number
}

export default function ApprovalsPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [rejectModal, setRejectModal] = useState<{ id: number } | null>(null)
  const [rejectComment, setRejectComment] = useState('')

  const fetchData = useCallback(() => {
    setLoading(true)
    fetch('/api/disbursements?status=PENDING_APPROVAL')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleApprove = async (id: number) => {
    if (actionLoading) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/disbursements/${id}/workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'APPROVE' }),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'เกิดข้อผิดพลาดในการอนุมัติ')
        return
      }
      fetchData()
    } catch {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async () => {
    if (!rejectModal || actionLoading) return
    if (!rejectComment.trim()) {
      alert('กรุณาระบุเหตุผลที่ไม่อนุมัติ')
      return
    }
    setActionLoading(rejectModal.id)
    try {
      const res = await fetch(`/api/disbursements/${rejectModal.id}/workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REJECT', comment: rejectComment.trim() }),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'เกิดข้อผิดพลาด')
        return
      }
      setRejectModal(null)
      setRejectComment('')
      fetchData()
    } catch {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="รายการรออนุมัติ"
        subtitle="รายการเบิกจ่ายที่รอการอนุมัติจากท่าน"
      />

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
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">วันที่</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">บันทึกฉบับที่</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">ประเภทเงิน</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">จำนวนเงิน</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">ผู้ขอเบิก</th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item) => {
                  const firstGroupType = item.disbursementGroups?.[0]?.budgetType?.name ?? '-'
                  const groupCount = item.disbursementGroups?.length ?? 0

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 border-b transition-colors">
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
                      <td className="px-4 py-3 text-right font-mono text-gray-900 font-financial">
                        {formatCurrency(item.totalAmount)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.createdBy.fullName}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/disbursements/${item.id}`}
                            className="px-3 py-1.5 text-xs font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            ดูรายละเอียด
                          </Link>
                          <button
                            onClick={() => handleApprove(item.id)}
                            disabled={actionLoading === item.id}
                            className={cn(
                              'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                              'bg-success hover:bg-success/80 text-white',
                              'disabled:opacity-50 disabled:cursor-not-allowed'
                            )}
                          >
                            <CheckCircle size={14} />
                            {actionLoading === item.id ? 'กำลังดำเนินการ...' : 'อนุมัติ'}
                          </button>
                          <button
                            onClick={() => {
                              setRejectModal({ id: item.id })
                              setRejectComment('')
                            }}
                            disabled={actionLoading === item.id}
                            className={cn(
                              'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                              'bg-red-500 hover:bg-red-600 text-white',
                              'disabled:opacity-50 disabled:cursor-not-allowed'
                            )}
                          >
                            <XCircle size={14} />
                            ไม่อนุมัติ
                          </button>
                        </div>
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
            <p className="mt-3 text-sm text-gray-400">ไม่มีรายการรออนุมัติ</p>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setRejectModal(null)
              setRejectComment('')
            }}
          />
          <div className="relative bg-white rounded-xl shadow-xl border p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ไม่อนุมัติรายการ
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              กรุณาระบุเหตุผลที่ไม่อนุมัติ
            </p>
            <textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              rows={3}
              placeholder="ระบุเหตุผล..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              autoFocus
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setRejectModal(null)
                  setRejectComment('')
                }}
                className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading !== null}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  'bg-red-500 hover:bg-red-600 text-white',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {actionLoading !== null ? 'กำลังดำเนินการ...' : 'ยืนยันไม่อนุมัติ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
