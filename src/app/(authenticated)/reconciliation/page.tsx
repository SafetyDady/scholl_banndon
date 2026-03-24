'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn, formatCurrency, formatShortDate, formatThaiDate } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Save,
  Inbox,
  History,
} from 'lucide-react'

interface BankAccountSummary {
  bankAccountId: number
  bankName: string
  accountNumber: string
  accountName: string
  systemBalance: number
}

interface ReconciliationRow {
  bankAccountId: number
  bankName: string
  accountNumber: string
  accountName: string
  systemBalance: number
  actualBalance: string
  difference: number
  isMatched: boolean
  remark: string
}

interface ReconciliationHistory {
  id: number
  reconcileDate: string
  systemBalance: number
  actualBalance: number
  difference: number
  isMatched: boolean
  remark: string | null
  bankAccount: {
    id: number
    bankName: string
    accountNumber: string
    accountName: string
  }
  createdBy: { id: number; fullName: string }
}

export default function ReconciliationPage() {
  const [selectedDate, setSelectedDate] = useState('')
  const [rows, setRows] = useState<ReconciliationRow[]>([])
  const [loadingRows, setLoadingRows] = useState(false)
  const [saving, setSaving] = useState(false)

  const [history, setHistory] = useState<ReconciliationHistory[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  // Fetch history on mount
  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true)
    try {
      const res = await fetch('/api/reconciliation')
      const json = await res.json()
      setHistory(json.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingHistory(false)
    }
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  // When date is selected, fetch transactions for that date to find accounts with movements
  const handleDateSelect = async (date: string) => {
    setSelectedDate(date)
    if (!date) {
      setRows([])
      return
    }

    setLoadingRows(true)
    try {
      // Fetch transactions for the selected date
      const res = await fetch(
        `/api/transactions?dateFrom=${date}&dateTo=${date}&limit=500`
      )
      const json = await res.json()
      const transactions = json.data || []

      // Group by bankAccountId and compute system balance (sum IN - sum OUT)
      const accountMap = new Map<number, BankAccountSummary>()

      for (const tx of transactions) {
        const existing = accountMap.get(tx.bankAccountId)
        const amount = tx.type === 'IN' ? tx.amount : -tx.amount

        if (existing) {
          existing.systemBalance += amount
        } else {
          accountMap.set(tx.bankAccountId, {
            bankAccountId: tx.bankAccount.id,
            bankName: tx.bankAccount.bankName,
            accountNumber: tx.bankAccount.accountNumber,
            accountName: tx.bankAccount.accountName,
            systemBalance: amount,
          })
        }
      }

      // Convert to rows
      const newRows: ReconciliationRow[] = Array.from(accountMap.values()).map(
        (acc) => ({
          bankAccountId: acc.bankAccountId,
          bankName: acc.bankName,
          accountNumber: acc.accountNumber,
          accountName: acc.accountName,
          systemBalance: acc.systemBalance,
          actualBalance: '',
          difference: 0,
          isMatched: false,
          remark: '',
        })
      )

      setRows(newRows)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingRows(false)
    }
  }

  const handleActualBalanceChange = (index: number, value: string) => {
    setRows((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], actualBalance: value }

      if (value && !isNaN(Number(value))) {
        const actual = Number(value)
        const diff = actual - updated[index].systemBalance
        updated[index].difference = diff
        updated[index].isMatched = Math.abs(diff) < 0.01
      } else {
        updated[index].difference = 0
        updated[index].isMatched = false
      }

      return updated
    })
  }

  const handleRemarkChange = (index: number, value: string) => {
    setRows((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], remark: value }
      return updated
    })
  }

  const handleSave = async () => {
    if (!selectedDate) return

    // Validate all rows have actual balance filled
    const incomplete = rows.filter((r) => !r.actualBalance || isNaN(Number(r.actualBalance)))
    if (incomplete.length > 0) {
      alert('กรุณากรอกยอดจากธนาคารให้ครบทุกบัญชี')
      return
    }

    setSaving(true)
    try {
      for (const row of rows) {
        const res = await fetch('/api/reconciliation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reconcileDate: selectedDate,
            bankAccountId: row.bankAccountId,
            systemBalance: row.systemBalance,
            actualBalance: Number(row.actualBalance),
            remark: row.remark || null,
          }),
        })

        if (!res.ok) {
          const err = await res.json()
          alert(err.error || 'เกิดข้อผิดพลาดในการบันทึก')
          return
        }
      }

      alert('บันทึกกระทบยอดสำเร็จ')
      fetchHistory()
    } catch (err) {
      console.error(err)
      alert('เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="กระทบยอด" />

      {/* Date Picker */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            เลือกวันที่กระทบยอด
          </label>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateSelect(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Reconciliation Table */}
      {selectedDate && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h3 className="text-sm font-semibold text-primary">
              บัญชีที่มีเงินเคลื่อนไหว วันที่ {formatThaiDate(selectedDate)}
            </h3>
          </div>

          {loadingRows ? (
            <div className="p-8 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 animate-pulse bg-gray-200 rounded"
                />
              ))}
            </div>
          ) : rows.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                        บัญชีธนาคาร
                      </th>
                      <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                        ยอดในระบบ
                      </th>
                      <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                        ยอดจากธนาคาร
                      </th>
                      <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                        ผลต่าง
                      </th>
                      <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                        สถานะ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.bankAccountId} className="border-b">
                        <td className="px-4 py-3">
                          <div className="text-gray-900 font-medium">
                            {row.bankName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {row.accountNumber} ({row.accountName})
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-gray-900 font-financial">
                          {formatCurrency(row.systemBalance)}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            step="0.01"
                            value={row.actualBalance}
                            onChange={(e) =>
                              handleActualBalanceChange(index, e.target.value)
                            }
                            placeholder="0.00"
                            className="w-full text-right border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </td>
                        <td
                          className={cn(
                            'px-4 py-3 text-right font-mono font-medium font-financial',
                            row.actualBalance
                              ? row.isMatched
                                ? 'text-green-700'
                                : 'text-red-700'
                              : 'text-gray-400'
                          )}
                        >
                          {row.actualBalance
                            ? formatCurrency(row.difference)
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.actualBalance ? (
                            row.isMatched ? (
                              <CheckCircle2
                                size={20}
                                className="inline text-green-600"
                              />
                            ) : (
                              <XCircle
                                size={20}
                                className="inline text-red-600"
                              />
                            )
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Remark fields for mismatched rows */}
              {rows.some(
                (r) => r.actualBalance && !r.isMatched
              ) && (
                <div className="px-4 py-4 border-t space-y-3">
                  <p className="text-sm font-medium text-red-700">
                    บัญชีที่ยอดไม่ตรง - กรุณาระบุหมายเหตุ
                  </p>
                  {rows.map(
                    (row, index) =>
                      row.actualBalance &&
                      !row.isMatched && (
                        <div key={row.bankAccountId}>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            {row.bankName} - {row.accountNumber}
                          </label>
                          <textarea
                            value={row.remark}
                            onChange={(e) =>
                              handleRemarkChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="ระบุเหตุผลที่ยอดไม่ตรงกัน"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                          />
                        </div>
                      )
                  )}
                </div>
              )}

              {/* Save button */}
              <div className="px-4 py-3 border-t bg-gray-50 flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-primary hover:bg-primary/80 text-white"
                >
                  <Save size={16} />
                  {saving ? 'กำลังบันทึก...' : 'บันทึกกระทบยอด'}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Inbox size={40} className="text-gray-300" />
              <p className="mt-3 text-sm text-gray-400">
                ไม่พบบัญชีที่มีเงินเคลื่อนไหวในวันที่เลือก
              </p>
            </div>
          )}
        </div>
      )}

      {/* History Section */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-2">
          <History size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-primary">
            ประวัติการกระทบยอด
          </h3>
        </div>

        {loadingHistory ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse bg-gray-200 rounded"
              />
            ))}
          </div>
        ) : history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    วันที่
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    บัญชี
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ยอดในระบบ
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ยอดจากธนาคาร
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ผลต่าง
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ผู้บันทึก
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {formatShortDate(item.reconcileDate)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.bankAccount.bankName} - {item.bankAccount.accountNumber}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900 font-financial">
                      {formatCurrency(item.systemBalance)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900 font-financial">
                      {formatCurrency(item.actualBalance)}
                    </td>
                    <td
                      className={cn(
                        'px-4 py-3 text-right font-mono font-medium font-financial',
                        item.isMatched ? 'text-green-700' : 'text-red-700'
                      )}
                    >
                      {formatCurrency(item.difference)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.isMatched ? (
                        <CheckCircle2
                          size={18}
                          className="inline text-green-600"
                        />
                      ) : (
                        <XCircle size={18} className="inline text-red-600" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.createdBy.fullName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Inbox size={40} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">
              ยังไม่มีประวัติการกระทบยอด
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
