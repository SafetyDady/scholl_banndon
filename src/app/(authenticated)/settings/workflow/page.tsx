'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Save, Loader2 } from 'lucide-react'

type ApprovalMode = 'self' | 'approval'
type ApprovalSteps = 'vice_principal' | 'principal' | 'both' | ''

export default function WorkflowSettingsPage() {
  const [approvalMode, setApprovalMode] = useState<ApprovalMode>('self')
  const [approvalSteps, setApprovalSteps] = useState<ApprovalSteps>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings/workflow')
      .then((res) => res.json())
      .then((data) => {
        if (data.approval_mode) setApprovalMode(data.approval_mode)
        if (data.approval_steps) setApprovalSteps(data.approval_steps)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/settings/workflow', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approval_mode: approvalMode,
          approval_steps: approvalMode === 'approval' ? approvalSteps : '',
        }),
      })
      if (!res.ok) throw new Error('บันทึกไม่สำเร็จ')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      alert('เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="ตั้งค่า Workflow" subtitle="กำหนดขั้นตอนการอนุมัติเบิกจ่าย" />
        <div className="p-8 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="ตั้งค่า Workflow"
        subtitle="กำหนดขั้นตอนการอนุมัติเบิกจ่าย"
      />

      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
        {/* Approval Mode */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">
            โหมดการอนุมัติ
          </h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="radio"
                name="approval_mode"
                value="self"
                checked={approvalMode === 'self'}
                onChange={() => {
                  setApprovalMode('self')
                  setApprovalSteps('')
                }}
                className="mt-1 h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
              />
              <div>
                <span className="text-sm font-medium text-gray-900 group-hover:text-[#1e3a5f]">
                  ครูการเงินดำเนินการเอง (ไม่ต้องอนุมัติ)
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  ครูการเงินสามารถดำเนินการเบิกจ่ายได้โดยไม่ต้องรอการอนุมัติ
                </p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="radio"
                name="approval_mode"
                value="approval"
                checked={approvalMode === 'approval'}
                onChange={() => setApprovalMode('approval')}
                className="mt-1 h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
              />
              <div>
                <span className="text-sm font-medium text-gray-900 group-hover:text-[#1e3a5f]">
                  ต้องผ่านการอนุมัติจากผู้บริหาร
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  ต้องได้รับการอนุมัติจากผู้บริหารก่อนดำเนินการเบิกจ่าย
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Approval Steps - shown only when approval mode is selected */}
        {approvalMode === 'approval' && (
          <div className="mb-6 ml-7 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              ขั้นตอนการอนุมัติ
            </h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="approval_steps"
                  value="vice_principal"
                  checked={approvalSteps === 'vice_principal'}
                  onChange={() => setApprovalSteps('vice_principal')}
                  className="h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#1e3a5f]">
                  รอง ผอ. เห็นชอบ
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="approval_steps"
                  value="principal"
                  checked={approvalSteps === 'principal'}
                  onChange={() => setApprovalSteps('principal')}
                  className="h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#1e3a5f]">
                  ผอ. อนุมัติ
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="approval_steps"
                  value="both"
                  checked={approvalSteps === 'both'}
                  onChange={() => setApprovalSteps('both')}
                  className="h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#1e3a5f]">
                  ทั้ง รอง ผอ. + ผอ. (2 ขั้น)
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
          </Button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              บันทึกสำเร็จ
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
