'use client'

import { useEffect, useState, useCallback } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { UserPlus, UserCheck, Pencil, Trash2 } from 'lucide-react'

interface Contractor {
  id: number
  name: string
  taxId: string | null
  address: string | null
  phone: string | null
  isActive: boolean
}

interface FormData {
  name: string
  taxId: string
  address: string
  phone: string
}

const emptyForm: FormData = {
  name: '',
  taxId: '',
  address: '',
  phone: '',
}

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchContractors = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/contractors')
      if (!res.ok) throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      const data = await res.json()
      setContractors(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContractors()
  }, [fetchContractors])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (contractor: Contractor) => {
    setEditingId(contractor.id)
    setForm({
      name: contractor.name,
      taxId: contractor.taxId || '',
      address: contractor.address || '',
      phone: contractor.phone || '',
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('ต้องการลบผู้รับจ้างรายนี้หรือไม่?')) return
    try {
      const res = await fetch(`/api/contractors/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('ลบไม่สำเร็จ')
      fetchContractors()
    } catch {
      alert('เกิดข้อผิดพลาดในการลบ')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editingId
        ? `/api/contractors/${editingId}`
        : '/api/contractors'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'บันทึกไม่สำเร็จ')
      }
      setShowModal(false)
      fetchContractors()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="ผู้รับจ้าง/ผู้รับเหมา"
        subtitle="จัดการข้อมูลผู้รับจ้างและผู้รับเหมา"
        actions={
          <Button onClick={openAdd}>
            <UserPlus size={16} />
            เพิ่มผู้รับจ้าง
          </Button>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse bg-gray-200 rounded" />
            ))}
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500">{error}</div>
        ) : contractors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <UserCheck size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">
              ยังไม่มีผู้รับจ้าง กดปุ่ม &quot;เพิ่มผู้รับจ้าง&quot; เพื่อเริ่มต้น
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ชื่อ
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    เลขผู้เสียภาษี
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ที่อยู่
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    เบอร์โทร
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {contractors.map((contractor) => (
                  <tr
                    key={contractor.id}
                    className="hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {contractor.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono">
                      {contractor.taxId || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                      {contractor.address || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {contractor.phone || '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(contractor)}
                        >
                          <Pencil size={14} className="text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(contractor.id)}
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
            <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">
              {editingId ? 'แก้ไขผู้รับจ้าง' : 'เพิ่มผู้รับจ้าง'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อผู้รับจ้าง <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                  required
                  placeholder="ระบุชื่อผู้รับจ้าง"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เลขประจำตัวผู้เสียภาษี
                </label>
                <input
                  type="text"
                  value={form.taxId}
                  onChange={(e) => setForm({ ...form, taxId: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                  placeholder="เลขประจำตัวผู้เสียภาษี 13 หลัก"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ที่อยู่
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                  rows={2}
                  placeholder="ที่อยู่ผู้รับจ้าง"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เบอร์โทร
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                  placeholder="เบอร์โทรศัพท์"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  ยกเลิก
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'กำลังบันทึก...' : 'บันทึก'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
