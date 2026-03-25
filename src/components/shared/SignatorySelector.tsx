'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, UserCheck, Loader2 } from 'lucide-react'

export interface SignatoryData {
  finance: { name: string; position: string }
  viceP: { name: string; position: string }
  principal: { name: string; position: string }
  committee?: { name: string; position: string }[]
}

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: (data: SignatoryData) => void
  type: 'approval' | 'balance' // approval = 3 คน, balance = 6-7 คน
  loading?: boolean
}

export default function SignatorySelector({ open, onClose, onConfirm, type, loading }: Props) {
  const [signatories, setSignatories] = useState<SignatoryData>({
    finance: { name: '', position: '' },
    viceP: { name: '', position: '' },
    principal: { name: '', position: '' },
    committee: [
      { name: '', position: 'กรรมการ' },
      { name: '', position: 'กรรมการ' },
      { name: '', position: 'กรรมการ' },
    ],
  })
  const [loadingDefaults, setLoadingDefaults] = useState(false)

  // Load defaults from SchoolInfo when modal opens
  useEffect(() => {
    if (!open) return
    let cancelled = false
    const load = async () => {
      setLoadingDefaults(true)
      try {
        const res = await fetch('/api/settings/school-info')
        const data: Record<string, string> = await res.json()
        if (cancelled) return
        setSignatories({
          finance: {
            name: data['finance_officer_name'] || '',
            position: data['finance_officer_position'] || 'เจ้าหน้าที่การเงิน',
          },
          viceP: {
            name: data['vice_principal_1_name'] || '',
            position: data['vice_principal_1_position'] || 'รองผู้อำนวยการโรงเรียน',
          },
          principal: {
            name: data['principal_name'] || '',
            position: data['principal_position'] || 'ผู้อำนวยการโรงเรียน',
          },
          committee: [
            { name: data['committee_1_name'] || '', position: data['committee_1_position'] || 'กรรมการ' },
            { name: data['committee_2_name'] || '', position: data['committee_2_position'] || 'กรรมการ' },
            { name: data['committee_3_name'] || '', position: data['committee_3_position'] || 'กรรมการ' },
          ],
        })
      } catch (err) {
        console.error(err)
      } finally {
        if (!cancelled) setLoadingDefaults(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [open])

  if (!open) return null

  const handleChange = (
    field: 'finance' | 'viceP' | 'principal',
    key: 'name' | 'position',
    value: string
  ) => {
    setSignatories((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: value },
    }))
  }

  const handleCommitteeChange = (index: number, key: 'name' | 'position', value: string) => {
    setSignatories((prev) => {
      const committee = [...(prev.committee || [])]
      committee[index] = { ...committee[index], [key]: value }
      return { ...prev, committee }
    })
  }

  const renderField = (
    label: string,
    nameValue: string,
    posValue: string,
    onNameChange: (v: string) => void,
    onPosChange: (v: string) => void
  ) => (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{label} — ชื่อ</label>
        <input
          type="text"
          value={nameValue}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{label} — ตำแหน่ง</label>
        <input
          type="text"
          value={posValue}
          onChange={(e) => onPosChange(e.target.value)}
          className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <UserCheck size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-primary">เลือกผู้ลงนาม</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {loadingDefaults ? (
          <div className="p-8 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              ข้อมูลดึงจากตั้งค่าข้อมูลโรงเรียน สามารถแก้ไขได้ก่อนออกเอกสาร
            </p>

            {/* เจ้าหน้าที่การเงิน */}
            {renderField(
              'เจ้าหน้าที่การเงิน',
              signatories.finance.name,
              signatories.finance.position,
              (v) => handleChange('finance', 'name', v),
              (v) => handleChange('finance', 'position', v)
            )}

            {/* รอง ผอ. */}
            {renderField(
              'ผู้เห็นชอบ (รอง ผอ.)',
              signatories.viceP.name,
              signatories.viceP.position,
              (v) => handleChange('viceP', 'name', v),
              (v) => handleChange('viceP', 'position', v)
            )}

            {/* ผอ. */}
            {renderField(
              'ผู้อนุมัติ (ผอ.)',
              signatories.principal.name,
              signatories.principal.position,
              (v) => handleChange('principal', 'name', v),
              (v) => handleChange('principal', 'position', v)
            )}

            {/* กรรมการ — เฉพาะ balance report */}
            {type === 'balance' && signatories.committee && (
              <>
                <hr className="border-border" />
                <h4 className="text-sm font-semibold text-primary">กรรมการเก็บรักษาเงิน</h4>
                {signatories.committee.map((c, i) => (
                  <div key={i}>
                    {renderField(
                      `กรรมการคนที่ ${i + 1}`,
                      c.name,
                      c.position,
                      (v) => handleCommitteeChange(i, 'name', v),
                      (v) => handleCommitteeChange(i, 'position', v)
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 p-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button
            onClick={() => onConfirm(signatories)}
            disabled={loading || loadingDefaults}
            className="gap-1"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <UserCheck size={16} />}
            {loading ? 'กำลังสร้างเอกสาร...' : 'ดาวน์โหลดเอกสาร'}
          </Button>
        </div>
      </div>
    </div>
  )
}
