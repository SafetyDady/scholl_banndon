'use client'

import { Fragment, useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { cn, formatCurrency, formatThaiDate } from '@/lib/utils'
import { WORKFLOW_STEPS } from '@/lib/constants'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { WorkflowTracker } from '@/components/shared/WorkflowTracker'
import { Printer, ArrowLeft, Clock, Inbox, Pencil, Trash2, CreditCard, Search, Plus, ChevronDown, UserCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ApprovalRequestDetail, WorkflowActionInfo } from '@/types'

interface Contractor {
  id: number
  name: string
  taxId: string | null
  address: string | null
  phone: string | null
}

interface PaymentPayee {
  paymentDate: string
  payeeName: string
  contractorId: number | null
  amount: number
  taxPercent: number
  taxWithheld: number
  netAmount: number
}

interface PaymentEntry {
  itemId: number
  description: string
  totalAmount: number
  payees: PaymentPayee[]
}


const ACTION_LABELS: Record<string, string> = {
  CREATE: 'สร้างรายการ',
  SUBMIT: 'ส่งขออนุมัติ',
  APPROVE: 'อนุมัติ',
  REJECT: 'ไม่อนุมัติ',
  COMPLETE: 'ดำเนินการเสร็จ',
  REVERSE: 'ย้อนกลับ',
}

function WorkflowHistory({ actions }: { actions: WorkflowActionInfo[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">
        ประวัติการดำเนินงาน
      </h2>
      {actions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Inbox size={48} className="text-gray-300" />
          <p className="mt-3 text-sm text-gray-400">ยังไม่มีประวัติ</p>
        </div>
      ) : (
        <div className="space-y-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-900">
                    {ACTION_LABELS[action.action] ?? action.action}
                  </span>
                  <span className="text-xs text-gray-400">
                    - ขั้นตอนที่ {action.stepNumber}: {action.stepName}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  โดย {action.performedBy.fullName} เมื่อ{' '}
                  {formatThaiDate(action.performedAt)}
                </p>
                {action.comment && (
                  <p className="text-sm text-gray-600 mt-1">{action.comment}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ContractorSearchInput({
  value,
  contractors,
  onSelect,
  onQuickAdd,
}: {
  value: string
  contractors: Contractor[]
  onSelect: (name: string, contractor?: Contractor) => void
  onQuickAdd: (name: string) => void
}) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = contractors.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  const exactMatch = contractors.some(
    (c) => c.name.toLowerCase() === query.trim().toLowerCase()
  )

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onSelect(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="ค้นหาผู้รับจ้าง"
          className="w-full rounded border border-gray-300 pl-7 pr-7 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
        />
        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-[#1e3a5f]/5 transition-colors flex items-center justify-between"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setQuery(c.name)
                  onSelect(c.name, c)
                  setOpen(false)
                }}
              >
                <span className="font-medium text-gray-900">{c.name}</span>
                {c.taxId && (
                  <span className="text-xs text-gray-400 ml-2">{c.taxId}</span>
                )}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">
              ไม่พบผู้รับจ้างที่ตรงกัน
            </div>
          )}
          {query.trim() && !exactMatch && (
            <button
              type="button"
              className="w-full text-left px-3 py-2 text-sm hover:bg-[#16a34a]/5 transition-colors border-t flex items-center gap-1.5 text-[#16a34a] font-medium"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onQuickAdd(query.trim())
                setOpen(false)
              }}
            >
              <Plus size={14} />
              เพิ่ม &apos;{query.trim()}&apos; เป็นผู้รับจ้างใหม่
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function DisbursementDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [data, setData] = useState<ApprovalRequestDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentEntries, setPaymentEntries] = useState<PaymentEntry[]>([])
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [showAdminStatus, setShowAdminStatus] = useState(false)
  const [adminStatus, setAdminStatus] = useState('')
  const [adminStep, setAdminStep] = useState(1)
  const [adminComment, setAdminComment] = useState('')
  const [userRole, setUserRole] = useState('')


  useEffect(() => {
    fetch(`/api/disbursements/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((json) => setData(json))
      .catch(() => setError('ไม่พบรายการ'))
      .finally(() => setLoading(false))

    fetch('/api/auth/me')
      .then(res => res.json())
      .then(json => setUserRole(json.user?.role || json.role || ''))
      .catch(() => {})
  }, [id])

  async function fetchContractors() {
    try {
      const res = await fetch('/api/contractors')
      if (res.ok) {
        const data = await res.json()
        setContractors(data)
        return data as Contractor[]
      }
    } catch {
      // silently fail, user can still type manually
    }
    return contractors
  }

  function initPaymentForm() {
    if (!data) return
    const entries: PaymentEntry[] = []
    for (const group of data.disbursementGroups) {
      for (const item of group.items) {
        const today = new Date().toISOString().split('T')[0]
        entries.push({
          itemId: item.id,
          description: item.description,
          totalAmount: item.amount,
          payees: [{
            paymentDate: today,
            payeeName: item.payeeName || '',
            contractorId: null,
            amount: item.amount,
            taxPercent: 0,
            taxWithheld: 0,
            netAmount: item.amount,
          }],
        })
      }
    }
    setPaymentEntries(entries)
    setShowPaymentForm(true)
    fetchContractors()
  }

  async function handleQuickAddContractor(name: string, entryIndex: number, payeeIndex: number) {
    try {
      const res = await fetch('/api/contractors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        const newContractor: Contractor = await res.json()
        setContractors((prev) => [...prev, newContractor].sort((a, b) => a.name.localeCompare(b.name)))
        updatePayee(entryIndex, payeeIndex, 'payeeName', newContractor.name)
      } else {
        const errData = await res.json()
        alert(errData.error || 'ไม่สามารถเพิ่มผู้รับจ้างได้')
      }
    } catch {
      alert('เกิดข้อผิดพลาดในการเพิ่มผู้รับจ้าง')
    }
  }

  function updatePayee(entryIndex: number, payeeIndex: number, field: keyof PaymentPayee, value: string | number) {
    setPaymentEntries(prev => {
      const updated = [...prev]
      const entry = { ...updated[entryIndex] }
      const payees = [...entry.payees]
      const payee = { ...payees[payeeIndex] }

      if (field === 'amount') {
        payee.amount = Number(value) || 0
        payee.taxWithheld = Math.round(payee.amount * payee.taxPercent) / 100
        payee.netAmount = payee.amount - payee.taxWithheld
      } else if (field === 'taxPercent') {
        payee.taxPercent = Number(value) || 0
        payee.taxWithheld = Math.round(payee.amount * payee.taxPercent) / 100
        payee.netAmount = payee.amount - payee.taxWithheld
      } else {
        (payee as Record<string, unknown>)[field] = value
      }

      payees[payeeIndex] = payee
      entry.payees = payees
      updated[entryIndex] = entry
      return updated
    })
  }

  function addPayee(entryIndex: number) {
    setPaymentEntries(prev => {
      const updated = [...prev]
      const entry = { ...updated[entryIndex] }
      const payees = [...entry.payees]
      const usedAmount = payees.reduce((s, p) => s + p.amount, 0)
      const remaining = entry.totalAmount - usedAmount

      const today = new Date().toISOString().split('T')[0]
      payees.push({
        paymentDate: today,
        payeeName: '',
        contractorId: null,
        amount: remaining > 0 ? remaining : 0,
        taxPercent: 0,
        taxWithheld: 0,
        netAmount: remaining > 0 ? remaining : 0,
      })

      entry.payees = payees
      updated[entryIndex] = entry
      return updated
    })
  }

  function removePayee(entryIndex: number, payeeIndex: number) {
    setPaymentEntries(prev => {
      const updated = [...prev]
      const entry = { ...updated[entryIndex] }
      const payees = [...entry.payees]
      if (payees.length <= 1) return prev // ต้องมีอย่างน้อย 1 คน
      payees.splice(payeeIndex, 1)
      entry.payees = payees
      updated[entryIndex] = entry
      return updated
    })
  }

  function getPayeeTotalAmount(entry: PaymentEntry) {
    return entry.payees.reduce((s, p) => s + p.amount, 0)
  }

  function getPayeeDifference(entry: PaymentEntry) {
    return entry.totalAmount - getPayeeTotalAmount(entry)
  }

  async function handlePaymentSubmit() {
    // Validate: ทุกรายการต้องมีชื่อผู้รับจ้าง
    for (const entry of paymentEntries) {
      const emptyPayee = entry.payees.find(p => !p.payeeName.trim())
      if (emptyPayee) {
        alert('กรุณากรอกชื่อผู้รับจ้างให้ครบทุกรายการ')
        return
      }
      const diff = Math.abs(getPayeeDifference(entry))
      if (diff > 0.01) {
        alert(`รายการ "${entry.description}" ยอดจ่ายรวมไม่ตรงกับยอดเบิก (ต่าง ${formatCurrency(diff)} บาท)`)
        return
      }
    }

    setActionLoading(true)
    try {
      const res = await fetch(`/api/disbursements/${id}/workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'COMPLETE',
          paymentData: paymentEntries.flatMap(e =>
            e.payees.map(p => ({
              itemId: e.itemId,
              paymentDate: p.paymentDate,
              payeeName: p.payeeName,
              contractorId: p.contractorId,
              amount: p.amount,
              taxPercent: p.taxPercent,
              taxWithheld: p.taxWithheld,
              netAmount: p.netAmount,
            }))
          ),
        }),
      })

      if (!res.ok) {
        const errData = await res.json()
        alert(errData.error || 'เกิดข้อผิดพลาด')
        return
      }

      const updated = await res.json()
      setData(updated)
      setShowPaymentForm(false)
    } catch {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleWorkflowAction(action: string, comment?: string) {
    if (actionLoading) return

    setActionLoading(true)
    try {
      const res = await fetch(`/api/disbursements/${id}/workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, comment }),
      })

      if (!res.ok) {
        const errData = await res.json()
        alert(errData.error || 'เกิดข้อผิดพลาด')
        return
      }

      const updated = await res.json()
      setData(updated)
    } catch {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setActionLoading(false)
    }
  }

  function handleReject() {
    const comment = prompt('กรุณาระบุเหตุผลที่ไม่อนุมัติ:')
    if (!comment) return
    handleWorkflowAction('REJECT', comment)
  }

  async function handleDelete() {
    if (!confirm('ต้องการลบบันทึกขออนุมัตินี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้')) return
    try {
      const res = await fetch(`/api/disbursements/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const errData = await res.json()
        alert(errData.error || 'ไม่สามารถลบได้')
        return
      }
      router.push('/disbursements')
    } catch {
      alert('เกิดข้อผิดพลาด')
    }
  }

  // Check if any items have tax (for notification after step 4)
  const hasTaxItems = data?.disbursementGroups?.some(g =>
    g.items?.some(item => item.taxWithheld > 0)
  ) ?? false
  void hasTaxItems // used for future tax notification

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 animate-pulse bg-gray-200 rounded w-64" />
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
        <div className="h-32 animate-pulse bg-gray-200 rounded-xl" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Inbox size={48} className="text-gray-300" />
        <p className="mt-3 text-gray-500 text-lg">{error || 'ไม่พบรายการ'}</p>
        <Link
          href="/disbursements"
          className="mt-4 inline-flex items-center gap-2 text-[#1e3a5f] hover:underline text-sm"
        >
          <ArrowLeft size={16} />
          กลับไปยังรายการเบิกจ่าย
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <PageHeader
        title={`บันทึกขออนุมัติ ${data.memoNumber ? data.memoNumber : `#${data.sequenceNumber ?? data.id}`}`}
        subtitle={`สร้างโดย ${data.createdBy.fullName}`}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={data.status} />
            {data.status === 'DRAFT' && (
              <>
                <Link
                  href={`/disbursements/${data.id}/edit`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f]/5 rounded-lg transition-colors"
                >
                  <Pencil size={16} />
                  แก้ไข
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  ลบ
                </button>
              </>
            )}
            <a
              href={`/api/print/approval/${data.id}`}
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Printer size={16} />
              ดาวน์โหลด Word
            </a>
          </div>
        }
      />

      {/* Summary Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <dt className="text-sm text-gray-500">บันทึกฉบับที่</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {data.memoNumber || '-'}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">วันที่</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {formatThaiDate(data.requestDate)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">สถานะ</dt>
            <dd className="mt-0.5">
              <StatusBadge status={data.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">ยอดรวม</dt>
            <dd className="text-lg font-bold font-mono text-[#1e3a5f] mt-0.5">
              {formatCurrency(data.totalAmount)} บาท
            </dd>
          </div>
        </div>
        {data.note && (
          <div className="mt-4 pt-4 border-t">
            <dt className="text-sm text-gray-500">หมายเหตุ</dt>
            <dd className="text-sm text-gray-900 mt-0.5">{data.note}</dd>
          </div>
        )}
      </div>

      {/* Workflow Tracker */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">ขั้นตอนการดำเนินงาน</h2>
        <WorkflowTracker
          currentStep={data.currentStep}
          status={data.status}
          workflowActions={data.workflowActions}
        />
      </div>

      {/* Action Buttons */}
      {data.status !== 'REJECTED' && data.status !== 'COMPLETED' && (
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-gray-600">
              ขั้นตอนปัจจุบัน:{' '}
              <span className="font-medium text-gray-900">
                {WORKFLOW_STEPS[data.currentStep - 1]?.name}
              </span>
            </p>
            <div className="flex items-center gap-2">
              {/* Step 1: SUBMIT */}
              {data.currentStep === 1 && (
                <button
                  onClick={() => handleWorkflowAction('SUBMIT')}
                  disabled={actionLoading}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    'bg-[#1e3a5f] hover:bg-[#163050] text-white',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {actionLoading ? 'กำลังดำเนินการ...' : 'ส่งเรื่อง'}
                </button>
              )}

              {/* Step 2: APPROVE / REJECT (shown for approvers) */}
              {data.currentStep === 2 && (
                <>
                  <button
                    onClick={() => handleWorkflowAction('APPROVE')}
                    disabled={actionLoading}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      'bg-[#16a34a] hover:bg-[#15803d] text-white',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    {actionLoading ? 'กำลังดำเนินการ...' : 'อนุมัติ'}
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={actionLoading}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      'bg-red-500 hover:bg-red-600 text-white',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    ไม่อนุมัติ
                  </button>
                </>
              )}

              {/* Step 3: COMPLETE (เบิกเงินแล้ว) */}
              {data.currentStep === 3 && (
                <button
                  onClick={() => handleWorkflowAction('COMPLETE')}
                  disabled={actionLoading}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    'bg-[#1e3a5f] hover:bg-[#163050] text-white',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {actionLoading ? 'กำลังดำเนินการ...' : 'เบิกเงินแล้ว'}
                </button>
              )}

              {/* Step 4: PAYMENT FORM */}
              {data.currentStep === 4 && !showPaymentForm && (
                <button
                  onClick={initPaymentForm}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    'bg-[#16a34a] hover:bg-[#15803d] text-white'
                  )}
                >
                  <CreditCard size={16} />
                  บันทึกการจ่ายเงิน
                </button>
              )}

              {/* REVERSE BUTTON — Step 2-4 */}
              {data.currentStep >= 2 && (
                <button
                  onClick={() => {
                    if (data.currentStep === 4) {
                      const reason = prompt('กรุณาระบุเหตุผลในการย้อนกลับ:')
                      if (reason) handleWorkflowAction('REVERSE', reason)
                    } else {
                      if (confirm('ต้องการย้อนกลับขั้นตอนก่อนหน้าหรือไม่?')) {
                        handleWorkflowAction('REVERSE')
                      }
                    }
                  }}
                  disabled={actionLoading}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    'border border-amber-400 text-amber-700 hover:bg-amber-50',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  ↩ ย้อนกลับ
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin: แก้ไข Status — แสดงเสมอไม่ว่า status จะเป็นอะไร */}
      {userRole === 'ADMIN' && (
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-red-600 font-medium">🔧 เครื่องมือ Admin</p>
            <button
              onClick={() => {
                setAdminStatus(data.status)
                setAdminStep(data.currentStep)
                setAdminComment('')
                setShowAdminStatus(true)
              }}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                'border border-red-300 text-red-700 hover:bg-red-50',
              )}
            >
              ⚙ แก้ไข Status
            </button>
          </div>
        </div>
      )}

      {/* Admin Status Modal */}
      {showAdminStatus && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-red-700 mb-4">⚙ Admin แก้ไข Status</h3>
            <p className="text-xs text-gray-500 mb-4">
              สถานะปัจจุบัน: <span className="font-semibold">{data?.status}</span> (Step {data?.currentStep})
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Step</label>
                <select
                  value={adminStep}
                  onChange={(e) => setAdminStep(Number(e.target.value))}
                  className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                >
                  <option value={1}>1 - ยื่นเรื่องของบ</option>
                  <option value={2}>2 - ขออนุมัติ</option>
                  <option value={3}>3 - เบิกเงินที่ธนาคาร</option>
                  <option value={4}>4 - นำจ่ายผู้รับจ้าง</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={adminStatus}
                  onChange={(e) => setAdminStatus(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                >
                  <option value="DRAFT">DRAFT - ร่าง</option>
                  <option value="PENDING_APPROVAL">PENDING_APPROVAL - รออนุมัติ</option>
                  <option value="APPROVED">APPROVED - อนุมัติแล้ว</option>
                  <option value="WITHDRAWN">WITHDRAWN - เบิกเงินแล้ว</option>
                  <option value="COMPLETED">COMPLETED - เสร็จสิ้น</option>
                  <option value="REJECTED">REJECTED - ไม่อนุมัติ</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">เหตุผล *</label>
                <textarea
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  placeholder="ระบุเหตุผลในการเปลี่ยนแปลง..."
                  rows={3}
                  className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAdminStatus(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={async () => {
                  if (!adminComment.trim()) {
                    alert('กรุณากรอกเหตุผล')
                    return
                  }
                  setActionLoading(true)
                  try {
                    const res = await fetch(`/api/disbursements/${id}/status`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        status: adminStatus,
                        currentStep: adminStep,
                        comment: adminComment,
                      }),
                    })
                    if (res.ok) {
                      setShowAdminStatus(false)
                      window.location.reload()
                    } else {
                      const err = await res.json()
                      alert(err.error || 'เกิดข้อผิดพลาด')
                    }
                  } catch {
                    alert('เกิดข้อผิดพลาด')
                  } finally {
                    setActionLoading(false)
                  }
                }}
                disabled={actionLoading}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  'bg-red-600 hover:bg-red-700 text-white',
                  'disabled:opacity-50'
                )}
              >
                {actionLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Form (Step 4) */}
      {showPaymentForm && data.currentStep === 4 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 bg-[#16a34a]/5 border-b">
            <h2 className="text-lg font-semibold text-[#16a34a] flex items-center gap-2">
              <CreditCard size={20} />
              บันทึกการจ่ายเงินผู้รับจ้าง
            </h2>
            <p className="text-sm text-gray-500 mt-1">กรอกชื่อผู้รับจ้างและระบุการหักภาษี ณ ที่จ่าย (ถ้ามี)</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-2.5 text-left text-xs text-gray-500 font-medium w-10">#</th>
                  <th className="px-4 py-2.5 text-left text-xs text-gray-500 font-medium">รายการ</th>
                  <th className="px-4 py-2.5 text-right text-xs text-gray-500 font-medium w-32">จำนวนเงิน</th>
                  <th className="px-4 py-2.5 text-right text-xs text-gray-500 font-medium w-32">หักภาษี</th>
                  <th className="px-4 py-2.5 text-right text-xs text-gray-500 font-medium w-32">ยอดจ่ายจริง</th>
                </tr>
              </thead>
              <tbody>
                {paymentEntries.map((entry, idx) => {
                  const diff = getPayeeDifference(entry)
                  const isBalanced = Math.abs(diff) < 0.01
                  return (
                    <tr key={entry.itemId} className="border-b">
                      <td className="px-4 pt-3 pb-3 text-gray-500 align-top">{idx + 1}</td>
                      <td className="px-4 pt-3 pb-3 align-top" colSpan={4}>
                        {/* Item description + total */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-900 font-medium">{entry.description}</span>
                          <span className="text-sm text-gray-500">ยอดเบิก: <span className="font-mono font-semibold text-gray-900">{formatCurrency(entry.totalAmount)}</span> บาท</span>
                        </div>

                        {/* Payees */}
                        <div className="space-y-2 ml-4">
                          {entry.payees.map((payee, pIdx) => (
                            <div key={pIdx} className="bg-gray-50 rounded-lg p-3 space-y-2">
                              {/* Row 1: วันที่ + ผู้รับจ้าง */}
                              <div className="flex items-center gap-2">
                                <div className="w-36 shrink-0">
                                  <label className="text-xs text-gray-500">วันที่จ่าย</label>
                                  <input
                                    type="date"
                                    value={payee.paymentDate}
                                    onChange={(e) => updatePayee(idx, pIdx, 'paymentDate', e.target.value)}
                                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <label className="text-xs text-gray-500">ผู้รับจ้าง</label>
                                  <ContractorSearchInput
                                    value={payee.payeeName}
                                    contractors={contractors}
                                    onSelect={(name, contractor) => {
                                      updatePayee(idx, pIdx, 'payeeName', name)
                                      if (contractor?.id) updatePayee(idx, pIdx, 'contractorId', contractor.id)
                                    }}
                                    onQuickAdd={(name) => handleQuickAddContractor(name, idx, pIdx)}
                                  />
                                </div>
                                {entry.payees.length > 1 && (
                                  <button
                                    onClick={() => removePayee(idx, pIdx)}
                                    className="text-red-400 hover:text-red-600 p-1 mt-4"
                                    title="ลบผู้รับจ้าง"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                              {/* Row 2: จำนวนเงิน + %หัก + ยอดหัก + จ่ายจริง */}
                              <div className="flex items-center gap-2">
                                <div className="w-32">
                                  <label className="text-xs text-gray-500">จำนวนเงิน</label>
                                  <input
                                    type="number"
                                    value={payee.amount || ''}
                                    onChange={(e) => updatePayee(idx, pIdx, 'amount', e.target.value)}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-right font-mono focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                                  />
                                </div>
                                <div className="w-20">
                                  <label className="text-xs text-gray-500">% หัก</label>
                                  <input
                                    type="number"
                                    value={payee.taxPercent || ''}
                                    onChange={(e) => updatePayee(idx, pIdx, 'taxPercent', e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    step="0.5"
                                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-right font-mono focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                                  />
                                </div>
                                <div className="w-28 text-right">
                                  <label className="text-xs text-gray-500">ยอดหัก</label>
                                  <div className="font-mono text-sm text-red-600 py-1.5">
                                    {payee.taxWithheld > 0 ? formatCurrency(payee.taxWithheld) : '-'}
                                  </div>
                                </div>
                                <div className="w-32 text-right">
                                  <label className="text-xs text-gray-500">ยอดจ่ายจริง</label>
                                  <div className="font-mono text-sm font-semibold text-[#1e3a5f] py-1.5">
                                    {formatCurrency(payee.netAmount)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add payee + summary */}
                        <div className="flex items-center justify-between mt-2 ml-4">
                          <button
                            onClick={() => addPayee(idx)}
                            className="inline-flex items-center gap-1 text-xs text-[#16a34a] hover:text-[#15803d] font-medium"
                          >
                            <Plus size={12} />
                            เพิ่มผู้รับจ้าง
                          </button>
                          <div className="text-xs">
                            <span className="text-gray-500">รวมจ่าย: </span>
                            <span className="font-mono font-semibold">{formatCurrency(getPayeeTotalAmount(entry))}</span>
                            {!isBalanced && (
                              <span className="ml-2 text-red-600 font-semibold">
                                (ต่าง {formatCurrency(Math.abs(diff))} บาท)
                              </span>
                            )}
                            {isBalanced && entry.payees.length > 1 && (
                              <span className="ml-2 text-green-600">✅ ตรง</span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={2} className="px-4 py-2.5 text-right text-sm font-medium text-gray-600">รวมทั้งหมด</td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold">
                    {formatCurrency(paymentEntries.reduce((s, e) => s + e.totalAmount, 0))}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold text-red-600">
                    {formatCurrency(paymentEntries.reduce((s, e) => s + e.payees.reduce((ps, p) => ps + p.taxWithheld, 0), 0))}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-[#1e3a5f]">
                    {formatCurrency(paymentEntries.reduce((s, e) => s + e.payees.reduce((ps, p) => ps + p.netAmount, 0), 0))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-4 border-t bg-gray-50 flex items-center justify-end gap-3">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handlePaymentSubmit}
              disabled={actionLoading}
              className={cn(
                'px-6 py-2 text-sm font-medium rounded-lg transition-colors',
                'bg-[#16a34a] hover:bg-[#15803d] text-white',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {actionLoading ? 'กำลังบันทึก...' : 'ยืนยันการจ่ายเงิน'}
            </button>
          </div>
        </div>
      )}

      {/* Disbursement Groups Detail */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 pb-0">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">
            รายละเอียดรายการ
          </h2>
        </div>

        {data.disbursementGroups.map((group) => (
          <div key={group.id} className="border-t">
            {/* Group Header */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#1e3a5f]/5">
              <div>
                <span className="text-sm font-semibold text-[#1e3a5f]">
                  {group.budgetType.name}
                </span>
                {group.budgetType.bankAccount && (
                  <span className="ml-3 text-xs text-gray-500">
                    {group.budgetType.bankAccount.bankName} - {group.budgetType.bankAccount.accountNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-2 text-center text-xs text-gray-500 font-medium w-12">ลำดับ</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-500 font-medium">รายการ</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-500 font-medium w-36">เป็นเงิน (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item, idx) => (
                    <Fragment key={item.id}>
                      <tr className="border-b">
                        <td className="px-4 py-2.5 text-gray-500 text-center">{idx + 1}</td>
                        <td className="px-4 py-2.5 text-gray-900">{item.description}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-gray-900">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                      {item.paymentRecords && item.paymentRecords.length > 0 ? (
                        item.paymentRecords.map((pr: { id: number; payeeName: string; amount: number; taxPercent: number; taxWithheld: number; netAmount: number; paymentDate: string }) => (
                          <tr key={`pr-${pr.id}`} className="border-b bg-gray-50/50">
                            <td></td>
                            <td className="px-4 py-1.5" colSpan={2}>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">
                                  <UserCheck size={12} className="inline mr-1" />
                                  {pr.payeeName}
                                  <span className="ml-2 text-gray-400">({formatCurrency(pr.amount)} บาท)</span>
                                </span>
                                {pr.taxWithheld > 0 && (
                                  <span className="text-orange-600">
                                    หัก {pr.taxPercent}% = {formatCurrency(pr.taxWithheld)} → จ่ายจริง {formatCurrency(pr.netAmount)}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : item.payeeName ? (
                        <tr className="border-b bg-gray-50/50">
                          <td></td>
                          <td className="px-4 py-1.5" colSpan={2}>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">
                                <UserCheck size={12} className="inline mr-1" />
                                {item.payeeName}
                              </span>
                              {item.taxWithheld > 0 && (
                                <span className="text-orange-600">
                                  หักภาษี {formatCurrency(item.taxWithheld)} → จ่ายจริง {formatCurrency(item.netAmount)}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan={2} className="px-4 py-2.5 text-right text-sm font-medium text-gray-600">
                      รวมเงิน
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-semibold text-[#1e3a5f]">
                      {formatCurrency(group.subtotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}

        {/* Grand Total */}
        <div className="px-6 py-4 bg-[#1e3a5f]/5 border-t">
          <div className="flex items-center justify-end gap-4">
            <span className="text-base font-medium text-gray-700">ยอดรวมทั้งสิ้น</span>
            <span className="text-xl font-bold font-mono text-[#1e3a5f]">
              {formatCurrency(data.totalAmount)} บาท
            </span>
          </div>
        </div>
      </div>

      {/* Workflow History */}
      <WorkflowHistory actions={data.workflowActions} />

      {/* Back button */}
      <div className="flex justify-start">
        <Link
          href="/disbursements"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          กลับไปยังรายการเบิกจ่าย
        </Link>
      </div>
    </div>
  )
}
