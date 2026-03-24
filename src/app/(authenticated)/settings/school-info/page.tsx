'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Save, School, Users, Loader2, CheckCircle } from 'lucide-react'

const SCHOOL_FIELDS = [
  { key: 'school_name', label: 'ชื่อโรงเรียน', placeholder: 'เช่น โรงเรียนวัดบ้านดอน' },
  { key: 'school_department', label: 'สังกัด', placeholder: 'เช่น สำนักงานเขตพื้นที่การศึกษาประถมศึกษาระยอง เขต 1' },
  { key: 'school_address', label: 'ที่อยู่โรงเรียน', placeholder: 'ที่อยู่เต็ม', multiline: true },
  { key: 'school_tax_id', label: 'เลขประจำตัวผู้เสียภาษีอากร (13 หลัก)', placeholder: 'X XXXX XXXXX XX X' },
  { key: 'school_phone', label: 'โทรศัพท์', placeholder: 'เช่น 038-123456' },
]

const EXECUTIVE_FIELDS = [
  { key: 'principal_name', label: 'ผู้อำนวยการ — ชื่อ', placeholder: 'เช่น นางสาววิภาพรรณ อุบล' },
  { key: 'principal_position', label: 'ผู้อำนวยการ — ตำแหน่ง', placeholder: 'เช่น ผู้อำนวยการโรงเรียนวัดบ้านดอน' },
  { key: 'vice_principal_1_name', label: 'รองผู้อำนวยการ คนที่ 1 — ชื่อ', placeholder: 'เช่น นางภควรรณ มีเจริญ' },
  { key: 'vice_principal_1_position', label: 'รองผู้อำนวยการ คนที่ 1 — ตำแหน่ง', placeholder: 'เช่น รองผู้อำนวยการโรงเรียนวัดบ้านดอน' },
  { key: 'vice_principal_2_name', label: 'รองผู้อำนวยการ คนที่ 2 — ชื่อ (ถ้ามี)', placeholder: '' },
  { key: 'vice_principal_2_position', label: 'รองผู้อำนวยการ คนที่ 2 — ตำแหน่ง', placeholder: '' },
  { key: 'finance_officer_name', label: 'เจ้าหน้าที่การเงิน — ชื่อ', placeholder: 'เช่น นางมณฑิรา สายยศ' },
  { key: 'finance_officer_position', label: 'เจ้าหน้าที่การเงิน — ตำแหน่ง', placeholder: 'เช่น ครูชำนาญการพิเศษ' },
]

export default function SchoolInfoPage() {
  const [data, setData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings/school-info')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings/school-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึก')
      }
    } catch {
      alert('เกิดข้อผิดพลาด')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="ข้อมูลโรงเรียน" subtitle="ตั้งค่าข้อมูลโรงเรียนและผู้บริหาร" />
        <div className="p-8 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="ข้อมูลโรงเรียน"
        subtitle="ตั้งค่าข้อมูลโรงเรียนและผู้บริหาร สำหรับใช้ในเอกสารราชการ"
        actions={
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-success hover:bg-success/80 text-white gap-2"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <CheckCircle size={16} />
            ) : (
              <Save size={16} />
            )}
            {saving ? 'กำลังบันทึก...' : saved ? 'บันทึกแล้ว' : 'บันทึก'}
          </Button>
        }
      />

      {/* ข้อมูลโรงเรียน */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-6">
          <School size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-primary">ข้อมูลโรงเรียน</h2>
        </div>

        <div className="space-y-4">
          {SCHOOL_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  value={data[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              ) : (
                <input
                  type="text"
                  value={data[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ผู้บริหาร */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-primary">ผู้บริหารและเจ้าหน้าที่</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXECUTIVE_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                value={data[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ปุ่มบันทึกล่าง */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-success hover:bg-success/80 text-white gap-2"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : saved ? (
            <CheckCircle size={16} />
          ) : (
            <Save size={16} />
          )}
          {saving ? 'กำลังบันทึก...' : saved ? 'บันทึกแล้ว' : 'บันทึก'}
        </Button>
      </div>
    </div>
  )
}
