'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatThaiDate } from '@/lib/utils'
import { STATUS_LABELS, WORKFLOW_STEPS } from '@/lib/constants'
import type { DisbursementWithRelations, WorkflowActionInfo } from '@/types'

function StatusBadge({ status }: { status: string }) {
  const info = STATUS_LABELS[status]
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${info?.color ?? 'bg-gray-100 text-gray-800'}`}
    >
      {info?.label ?? status}
    </span>
  )
}

function WorkflowTracker({ currentStep, status }: { currentStep: number; status: string }) {
  const isRejected = status === 'REJECTED'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        ขั้นตอนการดำเนินงาน
      </h2>
      <div className="flex items-center justify-between overflow-x-auto pb-2">
        {WORKFLOW_STEPS.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isCurrent = step.number === currentStep
          const isFuture = step.number > currentStep

          let circleClass = 'bg-gray-200 text-gray-400'
          if (isCompleted) circleClass = 'bg-green-500 text-white'
          else if (isCurrent && !isRejected) circleClass = 'bg-blue-500 text-white'
          else if (isCurrent && isRejected) circleClass = 'bg-red-500 text-white'

          let lineClass = 'bg-gray-200'
          if (isCompleted) lineClass = 'bg-green-500'

          return (
            <div key={step.number} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${circleClass}`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : isRejected && isCurrent ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`mt-2 text-xs text-center whitespace-nowrap ${
                    isCompleted
                      ? 'text-green-700 font-medium'
                      : isCurrent
                        ? isRejected
                          ? 'text-red-700 font-medium'
                          : 'text-blue-700 font-medium'
                        : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {/* Connecting line */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mt-[-1.25rem] ${isFuture ? 'bg-gray-200' : lineClass}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WorkflowHistory({ actions }: { actions: WorkflowActionInfo[] }) {
  const actionLabels: Record<string, string> = {
    CREATE: 'สร้างรายการ',
    SUBMIT: 'ส่งขออนุมัติ',
    APPROVE: 'อนุมัติ',
    REJECT: 'ไม่อนุมัติ',
    COMPLETE: 'ดำเนินการเสร็จ',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        ประวัติการดำเนินงาน
      </h2>
      {actions.length === 0 ? (
        <p className="text-gray-400 text-sm">ยังไม่มีประวัติ</p>
      ) : (
        <div className="space-y-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-900">
                    {actionLabels[action.action] ?? action.action}
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

export default function DisbursementDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [data, setData] = useState<DisbursementWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/disbursements/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((json) => setData(json))
      .catch(() => setError('ไม่พบรายการ'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleWorkflowAction(action: string) {
    if (actionLoading) return

    const comment = action === 'REJECT'
      ? prompt('กรุณาระบุเหตุผลที่ไม่อนุมัติ:')
      : undefined

    if (action === 'REJECT' && !comment) return

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
        <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">{error || 'ไม่พบรายการ'}</p>
        <Link
          href="/disbursements"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          กลับไปยังรายการเบิกจ่าย
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/disbursements')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              รายการเบิกจ่าย #{data.sequenceNumber ?? data.id}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <StatusBadge status={data.status} />
              <span className="text-sm text-gray-500">
                สร้างโดย {data.createdBy.fullName}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            window.open(`/print/approval/${data.id}`, '_blank')
          }
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          พิมพ์บันทึกขออนุมัติ
        </button>
      </div>

      {/* Workflow Tracker */}
      <WorkflowTracker currentStep={data.currentStep} status={data.status} />

      {/* Action Buttons */}
      {data.status !== 'REJECTED' && data.status !== 'COMPLETED' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-gray-600">
              ขั้นตอนปัจจุบัน: <span className="font-medium text-gray-900">{WORKFLOW_STEPS[data.currentStep - 1]?.name}</span>
            </p>
            <div className="flex items-center gap-2">
              {/* Step 1 DRAFT: Submit for approval */}
              {data.currentStep === 1 && (
                <button
                  onClick={() => handleWorkflowAction('SUBMIT')}
                  disabled={actionLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'กำลังดำเนินการ...' : 'ส่งขออนุมัติ'}
                </button>
              )}

              {/* Step 2 PENDING_APPROVAL: Show message for finance officer, buttons for approvers */}
              {data.currentStep === 2 && (
                <>
                  <button
                    onClick={() => handleWorkflowAction('APPROVE')}
                    disabled={actionLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? 'กำลังดำเนินการ...' : 'อนุมัติ'}
                  </button>
                  <button
                    onClick={() => handleWorkflowAction('REJECT')}
                    disabled={actionLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    ไม่อนุมัติ
                  </button>
                </>
              )}

              {/* Steps 3-7: Complete current step */}
              {data.currentStep >= 3 && data.currentStep <= 7 && (
                <button
                  onClick={() => handleWorkflowAction('COMPLETE')}
                  disabled={actionLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'กำลังดำเนินการ...' : 'ดำเนินการขั้นตอนถัดไป'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Detail Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          รายละเอียด
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <dt className="text-sm text-gray-500">วันที่</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {formatThaiDate(data.requestDate)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">บันทึกฉบับที่</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {data.memoNumber || '-'}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">ประเภทเงิน</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {data.budgetType.name}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">ลำดับที่</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {data.sequenceNumber ?? '-'}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-gray-500">รายการ</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5 whitespace-pre-wrap">
              {data.description}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">จำนวนเงิน</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {formatCurrency(data.amount)} บาท
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">หักภาษี ณ ที่จ่าย</dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {formatCurrency(data.taxWithheld)} บาท
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">ยอดจ่ายจริง</dt>
            <dd className="text-lg font-bold text-blue-700 mt-0.5">
              {formatCurrency(data.netAmount)} บาท
            </dd>
          </div>
          {data.payeeName && (
            <div>
              <dt className="text-sm text-gray-500">ชื่อผู้รับจ้าง</dt>
              <dd className="text-sm font-medium text-gray-900 mt-0.5">
                {data.payeeName}
              </dd>
            </div>
          )}
          {data.note && (
            <div className="sm:col-span-2">
              <dt className="text-sm text-gray-500">หมายเหตุ</dt>
              <dd className="text-sm font-medium text-gray-900 mt-0.5 whitespace-pre-wrap">
                {data.note}
              </dd>
            </div>
          )}
        </div>
      </div>

      {/* Workflow History */}
      <WorkflowHistory actions={data.workflowActions} />

      {/* Back button */}
      <div className="flex justify-start">
        <Link
          href="/disbursements"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับไปยังรายการเบิกจ่าย
        </Link>
      </div>
    </div>
  )
}
