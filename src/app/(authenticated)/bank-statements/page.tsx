'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn, formatCurrency, formatShortDate } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Plus,
  Trash2,
  Link,
  CheckCircle,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Save,
  Info,
} from 'lucide-react'

// ===== Types =====

interface BankAccountOption {
  id: number
  bankName: string
  accountNumber: string
  accountName: string
}

interface ApprovalRequestOption {
  id: number
  memoNumber: string | null
  totalAmount: number
  status: string
  requestDate: string
}

interface StatementItem {
  id: number
  bankAccountId: number
  transactionDate: string
  withdrawal: number
  deposit: number
  balance: number
  description: string | null
  matchStatus: string
  approvalRequest: ApprovalRequestOption | null
  createdBy: { id: number; fullName: string }
}

interface EntryRow {
  key: string
  transactionDate: string
  withdrawal: string
  deposit: string
  balance: string
  description: string
}

interface ApiResponse {
  data: StatementItem[]
  total: number
  page: number
  totalPages: number
}

// ===== Helper =====

function newRow(): EntryRow {
  return {
    key: crypto.randomUUID(),
    transactionDate: new Date().toISOString().slice(0, 10),
    withdrawal: '',
    deposit: '',
    balance: '',
    description: '',
  }
}

// Format number with commas while typing
function formatNumberInput(value: string): string {
  // Remove existing commas
  const clean = value.replace(/,/g, '')
  if (clean === '' || clean === '-') return clean
  const num = parseFloat(clean)
  if (isNaN(num)) return value
  // Split integer and decimal
  const parts = clean.split('.')
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (parts.length > 1) {
    return `${intPart}.${parts[1]}`
  }
  return intPart
}

// Parse formatted number back to raw value
function parseFormattedNumber(value: string): number {
  return parseFloat(value.replace(/,/g, '')) || 0
}

const MATCH_BADGE: Record<string, { label: string; icon: typeof CheckCircle; className: string }> = {
  MATCHED: {
    label: 'ผูกอัตโนมัติ',
    icon: CheckCircle,
    className: 'bg-success/15 text-success',
  },
  MANUAL: {
    label: 'ผูกด้วยตนเอง',
    icon: Link,
    className: 'bg-info/15 text-info',
  },
  UNMATCHED: {
    label: 'ยังไม่ผูก',
    icon: AlertCircle,
    className: 'bg-warning/15 text-warning',
  },
}

// ===== Component =====

export default function BankStatementsPage() {
  // Data
  const [bankAccounts, setBankAccounts] = useState<BankAccountOption[]>([])
  const [selectedAccountId, setSelectedAccountId] = useState<string>('')
  const [statements, setStatements] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  // Entry form
  const [showForm, setShowForm] = useState(false)
  const [rows, setRows] = useState<EntryRow[]>([newRow()])
  const [saving, setSaving] = useState(false)

  // Match modal
  const [matchModal, setMatchModal] = useState<{ statementId: number; type: 'withdrawal' | 'deposit' } | null>(null)
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequestOption[]>([])
  const [loadingAR, setLoadingAR] = useState(false)
  const [matching, setMatching] = useState(false)

  // System balance
  const [systemBalance, setSystemBalance] = useState<number | null>(null)

  // ===== Fetch bank accounts =====
  useEffect(() => {
    fetch('/api/bank-accounts')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBankAccounts(data)
      })
      .catch(console.error)
  }, [])

  // ===== Fetch statements =====
  const fetchStatements = useCallback(async () => {
    if (!selectedAccountId) return
    setLoading(true)
    try {
      const params = new URLSearchParams({
        bankAccountId: selectedAccountId,
        page: String(page),
        limit: '50',
      })
      const res = await fetch(`/api/bank-statements?${params}`)
      const json = await res.json()
      setStatements(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [selectedAccountId, page])

  useEffect(() => {
    if (selectedAccountId) {
      setPage(1)
    }
  }, [selectedAccountId])

  useEffect(() => {
    fetchStatements()
  }, [fetchStatements])

  // ===== Fetch system balance =====
  useEffect(() => {
    if (!selectedAccountId) {
      setSystemBalance(null)
      return
    }
    fetch(`/api/transactions?bankAccountId=${selectedAccountId}&limit=1000`)
      .then((r) => r.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data)) {
          let bal = 0
          for (const tx of json.data) {
            if (tx.type === 'IN') bal += tx.amount
            else if (tx.type === 'OUT') bal -= tx.amount
          }
          setSystemBalance(bal)
        }
      })
      .catch(console.error)
  }, [selectedAccountId, statements])

  // ===== Get previous balance (from last statement or previous row) =====
  const getPreviousBalance = (rowIndex: number): number | null => {
    // Check previous rows first
    for (let i = rowIndex - 1; i >= 0; i--) {
      const bal = parseFormattedNumber(rows[i].balance)
      if (bal > 0) return bal
    }
    // Check existing statements
    if (statements?.data?.length) {
      return statements.data[0].balance
    }
    return null
  }

  // ===== Auto-compute balance when ถอน/ฝาก changes =====
  const autoComputeBalance = (updatedRows: EntryRow[], changedIndex: number): EntryRow[] => {
    const result = [...updatedRows]
    // Recompute from changedIndex onwards
    for (let i = changedIndex; i < result.length; i++) {
      const prevBal = i === 0 ? getPreviousBalance(0) : parseFormattedNumber(result[i - 1].balance)
      if (prevBal !== null && prevBal > 0) {
        const withdraw = parseFormattedNumber(result[i].withdrawal)
        const dep = parseFormattedNumber(result[i].deposit)
        const computed = prevBal - withdraw + dep
        result[i] = { ...result[i], balance: formatNumberInput(computed.toFixed(2)) }
      }
    }
    return result
  }

  // ===== Entry form handlers =====
  const updateRow = (key: string, field: keyof EntryRow, value: string) => {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r.key === key)
      if (idx === -1) return prev

      const updated = prev.map((r) => {
        if (r.key !== key) return r
        // Store raw value while typing (no formatting yet)
        if (field === 'withdrawal' || field === 'deposit' || field === 'balance') {
          // Allow only digits, dot, and comma
          const clean = value.replace(/[^0-9.,]/g, '')
          return { ...r, [field]: clean }
        }
        return { ...r, [field]: value }
      })

      // Auto-compute balance when ถอน or ฝาก changes
      if (field === 'withdrawal' || field === 'deposit') {
        return autoComputeBalance(updated, idx)
      }

      return updated
    })
  }

  // Format number on blur (when user leaves the field)
  const handleBlur = (key: string, field: keyof EntryRow) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.key !== key) return r
        const val = r[field]
        if (field === 'withdrawal' || field === 'deposit' || field === 'balance') {
          const num = parseFormattedNumber(val)
          if (num > 0) {
            return { ...r, [field]: formatNumberInput(num.toFixed(2)) }
          }
          return { ...r, [field]: '' }
        }
        return r
      }),
    )
  }

  const removeRow = (key: string) => {
    setRows((prev) => {
      const next = prev.filter((r) => r.key !== key)
      return next.length === 0 ? [newRow()] : next
    })
  }

  const addRow = () => {
    setRows((prev) => [...prev, newRow()])
  }

  const handleSave = async () => {
    if (!selectedAccountId) return

    const entries = rows
      .filter((r) => r.transactionDate && (parseFormattedNumber(r.withdrawal) > 0 || parseFormattedNumber(r.deposit) > 0))
      .map((r) => ({
        transactionDate: r.transactionDate,
        withdrawal: parseFormattedNumber(r.withdrawal),
        deposit: parseFormattedNumber(r.deposit),
        balance: parseFormattedNumber(r.balance),
        description: r.description,
      }))

    if (entries.length === 0) return

    setSaving(true)
    try {
      const res = await fetch('/api/bank-statements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankAccountId: Number(selectedAccountId),
          entries,
        }),
      })

      if (res.ok) {
        setRows([newRow()])
        setShowForm(false)
        fetchStatements()
      } else {
        const err = await res.json()
        alert(err.error || 'เกิดข้อผิดพลาด')
      }
    } catch (err) {
      console.error(err)
      alert('เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setSaving(false)
    }
  }

  // ===== Delete statement =====
  const handleDelete = async (id: number) => {
    if (!confirm('ต้องการลบรายการนี้หรือไม่?')) return
    try {
      const res = await fetch(`/api/bank-statements/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchStatements()
      } else {
        const err = await res.json()
        alert(err.error || 'เกิดข้อผิดพลาด')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // ===== Match modal =====
  const openMatchModal = async (statementId: number, type: 'withdrawal' | 'deposit') => {
    setMatchModal({ statementId, type })
    setLoadingAR(true)
    try {
      // Fetch unmatched approval requests for linking
      const params = new URLSearchParams({ page: '1', limit: '50' })
      const res = await fetch(`/api/disbursements?${params}`)
      const json = await res.json()
      if (json.data && Array.isArray(json.data)) {
        const filtered = json.data
          .filter((ar: ApprovalRequestOption & { status: string }) =>
            ['WITHDRAWN', 'PAID', 'TAX_ISSUED', 'BALANCE_REPORTED', 'COMPLETED'].includes(ar.status),
          )
          .map((ar: ApprovalRequestOption & { id: number; memoNumber: string | null; totalAmount: number; status: string; requestDate: string }) => ({
            id: ar.id,
            memoNumber: ar.memoNumber,
            totalAmount: ar.totalAmount,
            status: ar.status,
            requestDate: ar.requestDate,
          }))
        setApprovalRequests(filtered)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingAR(false)
    }
  }

  const handleMatch = async (approvalRequestId: number) => {
    if (!matchModal) return
    setMatching(true)
    try {
      const res = await fetch('/api/bank-statements/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statementId: matchModal.statementId,
          approvalRequestId,
        }),
      })

      if (res.ok) {
        setMatchModal(null)
        fetchStatements()
      } else {
        const err = await res.json()
        alert(err.error || 'เกิดข้อผิดพลาด')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setMatching(false)
    }
  }

  // ===== Summary =====
  const latestBalance = statements?.data?.[0]?.balance ?? null

  const difference =
    latestBalance !== null && systemBalance !== null
      ? Math.abs(latestBalance - systemBalance)
      : null

  const isBalanceMatched =
    difference !== null ? difference < 0.02 : false

  // ===== Render =====
  return (
    <div className="space-y-6">
      <PageHeader
        title="อัพเดตสมุดบัญชี"
        subtitle="บันทึกรายการจากสมุดบัญชีธนาคารและผูกกับรายการเบิกจ่าย"
        actions={
          selectedAccountId ? (
            <Button
              onClick={() => {
                setShowForm(!showForm)
                if (!showForm) setRows([newRow()])
              }}
              className="bg-success text-white hover:bg-success/80"
            >
              <Plus className="mr-1 h-4 w-4" />
              เพิ่มรายการ
            </Button>
          ) : undefined
        }
      />

      {/* Bank account selector */}
      <div className="rounded-lg border border-[#e2e8f0] bg-white p-4">
        <label className="mb-2 block text-sm font-medium text-primary">
          <BookOpen className="mr-1.5 inline h-4 w-4" />
          เลือกบัญชีธนาคาร
        </label>
        <select
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="w-full rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-96"
        >
          <option value="">-- เลือกบัญชี --</option>
          {bankAccounts.map((ba) => (
            <option key={ba.id} value={ba.id}>
              {ba.bankName} - {ba.accountNumber} ({ba.accountName})
            </option>
          ))}
        </select>
      </div>

      {/* Entry form */}
      {showForm && selectedAccountId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-primary">
            เพิ่มรายการจากสมุดบัญชี
          </h3>

          {rows.map((row) => (
            <div key={row.key} className="flex items-center gap-3 border-b border-[#e2e8f0] px-2 py-2">
              <div className="w-[140px] shrink-0">
                <label className="mb-1 block text-xs font-medium text-primary">วันที่</label>
                <input
                  type="date"
                  value={row.transactionDate}
                  onChange={(e) => updateRow(row.key, 'transactionDate', e.target.value)}
                  className="w-full rounded border border-[#e2e8f0] px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="w-[130px] shrink-0">
                <label className="mb-1 block text-xs font-medium text-red-600">ถอน</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={row.withdrawal}
                  onChange={(e) => updateRow(row.key, 'withdrawal', e.target.value)}
                  onBlur={() => handleBlur(row.key, 'withdrawal')}
                  className="w-full rounded border border-[#e2e8f0] px-2 py-1.5 text-right text-sm text-red-600 focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="w-[130px] shrink-0">
                <label className="mb-1 block text-xs font-medium text-green-600">ฝาก</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={row.deposit}
                  onChange={(e) => updateRow(row.key, 'deposit', e.target.value)}
                  onBlur={() => handleBlur(row.key, 'deposit')}
                  className="w-full rounded border border-[#e2e8f0] px-2 py-1.5 text-right text-sm text-green-600 focus:border-green-400 focus:outline-none"
                />
              </div>
              <div className="w-[140px] shrink-0">
                <label className="mb-1 block text-xs font-medium text-primary">คงเหลือ</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={row.balance}
                  onChange={(e) => updateRow(row.key, 'balance', e.target.value)}
                  onBlur={() => handleBlur(row.key, 'balance')}
                  className="w-full rounded border border-[#e2e8f0] px-2 py-1.5 text-right text-sm font-medium focus:border-primary focus:outline-none"
                />
              </div>
              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-xs font-medium text-gray-500">หมายเหตุ</label>
                <input
                  type="text"
                  placeholder="หมายเหตุ"
                  value={row.description}
                  onChange={(e) => updateRow(row.key, 'description', e.target.value)}
                  className="w-full rounded border border-[#e2e8f0] px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="shrink-0 pt-5">
                <button
                  onClick={() => removeRow(row.key)}
                  className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  title="ลบแถว"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3 flex items-center gap-3">
            <Button
              variant="outline"
              onClick={addRow}
              className="text-primary"
            >
              <Plus className="mr-1 h-4 w-4" />
              เพิ่มบรรทัด
            </Button>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-white hover:bg-primary/80"
            >
              {saving ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-1 h-4 w-4" />
              )}
              บันทึก
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
            >
              ยกเลิก
            </Button>
          </div>
        </div>
      )}

      {/* Statements table */}
      {selectedAccountId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white">
          <div className="border-b border-[#e2e8f0] px-4 py-3">
            <h3 className="text-sm font-semibold text-primary">
              รายการในสมุดบัญชี
              {statements && (
                <span className="ml-2 font-normal text-gray-500">
                  ({statements.total} รายการ)
                </span>
              )}
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-gray-500">กำลังโหลด...</span>
            </div>
          ) : !statements?.data?.length ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <BookOpen className="mb-2 h-10 w-10" />
              <p className="text-sm">ยังไม่มีรายการ</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                      <th className="px-3 py-2.5 text-left font-medium text-primary">วันที่</th>
                      <th className="px-3 py-2.5 text-right font-medium text-primary">ถอน</th>
                      <th className="px-3 py-2.5 text-right font-medium text-primary">ฝาก</th>
                      <th className="px-3 py-2.5 text-right font-medium text-primary">คงเหลือ</th>
                      <th className="px-3 py-2.5 text-left font-medium text-primary">หมายเหตุ</th>
                      <th className="px-3 py-2.5 text-center font-medium text-primary">สถานะ Match</th>
                      <th className="px-3 py-2.5 text-left font-medium text-primary">รายการที่ผูก</th>
                      <th className="w-10 px-3 py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {statements.data.map((s) => {
                      const badge = MATCH_BADGE[s.matchStatus] || MATCH_BADGE.UNMATCHED
                      const BadgeIcon = badge.icon
                      return (
                        <tr
                          key={s.id}
                          className="border-b border-[#e2e8f0] transition-colors hover:bg-[#f8fafc]"
                        >
                          <td className="whitespace-nowrap px-3 py-2.5">
                            {formatShortDate(s.transactionDate)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2.5 text-right">
                            {s.withdrawal > 0 ? (
                              <span className="text-red-600 font-financial">
                                {formatCurrency(s.withdrawal)}
                              </span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2.5 text-right">
                            {s.deposit > 0 ? (
                              <span className="text-green-600 font-financial">
                                {formatCurrency(s.deposit)}
                              </span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2.5 text-right font-medium font-financial">
                            {formatCurrency(s.balance)}
                          </td>
                          <td className="max-w-[200px] truncate px-3 py-2.5 text-gray-600">
                            {s.description || '-'}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                                badge.className,
                              )}
                            >
                              <BadgeIcon className="h-3 w-3" />
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-3 py-2.5">
                            {s.approvalRequest ? (
                              <span className="text-xs text-primary">
                                {s.approvalRequest.memoNumber || `#${s.approvalRequest.id}`}
                                <br />
                                <span className="text-gray-400 font-financial">
                                  {formatCurrency(s.approvalRequest.totalAmount)} บาท
                                </span>
                              </span>
                            ) : s.matchStatus === 'UNMATCHED' && s.withdrawal > 0 ? (
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => openMatchModal(s.id, 'withdrawal')}
                                className="text-primary"
                              >
                                <Link className="mr-1 h-3 w-3" />
                                ผูกรายการ
                              </Button>
                            ) : s.matchStatus === 'UNMATCHED' && s.deposit > 0 ? (
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => openMatchModal(s.id, 'deposit')}
                                className="text-primary"
                              >
                                <Info className="mr-1 h-3 w-3" />
                                ระบุที่มา
                              </Button>
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                              title="ลบ"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {statements.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#e2e8f0] px-4 py-3">
                  <span className="text-xs text-gray-500">
                    หน้า {statements.page} / {statements.totalPages}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      disabled={page >= statements.totalPages}
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
      )}

      {/* Summary section */}
      {selectedAccountId && statements?.data?.length ? (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-primary">สรุปยอด</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-[#f0f9ff] p-3">
              <p className="text-xs text-gray-500">ยอดคงเหลือล่าสุดตามสมุดบัญชี</p>
              <p className="mt-1 text-lg font-semibold text-primary font-financial">
                {latestBalance !== null ? formatCurrency(latestBalance) : '-'} บาท
              </p>
            </div>
            <div className="rounded-md bg-[#f0fdf4] p-3">
              <p className="text-xs text-gray-500">ยอดคงเหลือในระบบ</p>
              <p className="mt-1 text-lg font-semibold text-success font-financial">
                {systemBalance !== null ? formatCurrency(systemBalance) : '-'} บาท
              </p>
            </div>
            <div
              className={cn(
                'rounded-md p-3',
                isBalanceMatched ? 'bg-green-50' : 'bg-red-50',
              )}
            >
              <p className="text-xs text-gray-500">ผลต่าง</p>
              <p
                className={cn(
                  'mt-1 flex items-center gap-1 text-lg font-semibold font-financial',
                  isBalanceMatched ? 'text-green-600' : 'text-red-600',
                )}
              >
                {difference !== null ? formatCurrency(difference) : '-'} บาท
                {difference !== null && (
                  isBalanceMatched ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Match modal */}
      {matchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-4 py-3">
              <h3 className="text-sm font-semibold text-primary">
                {matchModal.type === 'withdrawal'
                  ? 'ผูกรายการเบิกจ่าย'
                  : 'ระบุที่มาเงินฝาก'}
              </h3>
              <button
                onClick={() => setMatchModal(null)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-4">
              {loadingAR ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-gray-500">กำลังโหลด...</span>
                </div>
              ) : approvalRequests.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-400">
                  <Search className="mx-auto mb-2 h-8 w-8" />
                  ไม่พบรายการที่สามารถผูกได้
                </div>
              ) : (
                <div className="space-y-2">
                  {approvalRequests.map((ar) => (
                    <button
                      key={ar.id}
                      onClick={() => handleMatch(ar.id)}
                      disabled={matching}
                      className="flex w-full items-center justify-between rounded-md border border-[#e2e8f0] px-3 py-2.5 text-left transition-colors hover:border-primary hover:bg-[#f0f9ff]"
                    >
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {ar.memoNumber || `รายการ #${ar.id}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          วันที่: {formatShortDate(ar.requestDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary font-financial">
                          {formatCurrency(ar.totalAmount)} บาท
                        </p>
                        <p className="text-xs text-gray-400">{ar.status}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#e2e8f0] px-4 py-3">
              <Button
                variant="outline"
                onClick={() => setMatchModal(null)}
                className="w-full"
              >
                ปิด
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
