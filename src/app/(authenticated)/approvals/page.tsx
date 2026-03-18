'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { formatCurrency, formatShortDate } from '@/lib/utils'

interface DisbursementItem {
  id: number
  requestDate: string
  memoNumber: string | null
  description: string
  netAmount: number
  status: string
  budgetType: { id: number; name: string; code: string }
  createdBy: { id: number; fullName: string }
}

interface ApiResponse {
  data: DisbursementItem[]
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">รายการรออนุมัติ</h1>
        <p className="text-sm text-gray-500 mt-1">
          รายการเบิกจ่ายที่รอการอนุมัติจากท่าน
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
        ) : data?.data && data.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">วันที่</th>
                  <th className="px-4 py-3 font-medium">บันทึกฉบับที่</th>
                  <th className="px-4 py-3 font-medium">ประเภทเงิน</th>
                  <th className="px-4 py-3 font-medium">รายการ</th>
                  <th className="px-4 py-3 font-medium text-right">จำนวนเงิน</th>
                  <th className="px-4 py-3 font-medium">ผู้ขอเบิก</th>
                  <th className="px-4 py-3 font-medium text-center">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                    <td className="px-4 py-3 text-gray-600">
                      {item.createdBy.fullName}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/disbursements/${item.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          ดูรายละเอียด
                        </Link>
                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoading === item.id}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {actionLoading === item.id ? 'กำลังดำเนินการ...' : 'อนุมัติ'}
                        </button>
                        <button
                          onClick={() => {
                            setRejectModal({ id: item.id })
                            setRejectComment('')
                          }}
                          disabled={actionLoading === item.id}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          ไม่อนุมัติ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            ไม่มีรายการรออนุมัติ
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
          <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-full max-w-md mx-4">
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              autoFocus
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setRejectModal(null)
                  setRejectComment('')
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading !== null}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
