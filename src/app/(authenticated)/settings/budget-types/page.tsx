'use client'

import { Fragment, useEffect, useState, useCallback } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, Inbox } from 'lucide-react'

interface BankAccountRef {
  id: number
  bankName: string
  accountNumber: string
  accountName: string
}

interface BudgetTypeChild {
  id: number
  name: string
  code: string
  category: string
  sortOrder: number
  bankAccountId: number | null
  parentId: number | null
  bankAccount: BankAccountRef | null
}

interface BudgetType {
  id: number
  name: string
  code: string
  category: string
  parentId: number | null
  bankAccountId: number | null
  sortOrder: number
  bankAccount: BankAccountRef | null
  parent: { id: number; name: string } | null
  children: BudgetTypeChild[]
}

interface FormData {
  name: string
  code: string
  category: string
  parentId: string
  bankAccountId: string
  sortOrder: number
}

const emptyForm: FormData = {
  name: '',
  code: '',
  category: 'NON_BUDGET',
  parentId: '',
  bankAccountId: '',
  sortOrder: 0,
}

const CATEGORIES = [
  { value: 'BUDGET', label: 'งบประมาณ' },
  { value: 'NON_BUDGET', label: 'นอกงบประมาณ' },
]

export default function BudgetTypesPage() {
  const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccountRef[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [btRes, baRes] = await Promise.all([
        fetch('/api/budget-types'),
        fetch('/api/bank-accounts'),
      ])
      if (!btRes.ok || !baRes.ok) throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      const [btData, baData] = await Promise.all([btRes.json(), baRes.json()])
      setBudgetTypes(btData)
      setBankAccounts(baData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Build flat rows: parents first, then children indented
  const parentTypes = budgetTypes.filter((bt) => !bt.parentId)

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (bt: BudgetType | BudgetTypeChild) => {
    setEditingId(bt.id)
    setForm({
      name: bt.name,
      code: bt.code,
      category: bt.category,
      parentId: bt.parentId ? String(bt.parentId) : '',
      bankAccountId: bt.bankAccountId ? String(bt.bankAccountId) : '',
      sortOrder: bt.sortOrder,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('ต้องการลบประเภทเงินนี้หรือไม่?')) return
    try {
      const res = await fetch(`/api/budget-types/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('ลบไม่สำเร็จ')
      fetchData()
    } catch {
      alert('เกิดข้อผิดพลาดในการลบ')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editingId
        ? `/api/budget-types/${editingId}`
        : '/api/budget-types'
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
      fetchData()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setSaving(false)
    }
  }

  const getCategoryLabel = (cat: string) =>
    CATEGORIES.find((c) => c.value === cat)?.label || cat

  return (
    <div className="space-y-6">
      <PageHeader
        title="ประเภทเงิน"
        subtitle="จัดการประเภทเงินงบประมาณและนอกงบประมาณ"
        actions={
          <Button onClick={openAdd}>
            <Plus size={16} />
            เพิ่มประเภทเงิน
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
        ) : parentTypes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Inbox size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">
              ยังไม่มีประเภทเงิน กดปุ่ม &quot;เพิ่มประเภทเงิน&quot; เพื่อเริ่มต้น
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ประเภทเงิน
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    หมวด
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    บัญชีธนาคาร
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {parentTypes.map((bt) => (
                  <Fragment key={bt.id}>
                    <tr
                      className="hover:bg-gray-50 border-b transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {bt.name}
                        <span className="ml-2 text-xs text-gray-400">
                          ({bt.code})
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {getCategoryLabel(bt.category)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                        {bt.bankAccount
                          ? bt.bankAccount.accountNumber
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEdit(bt)}
                          >
                            <Pencil size={14} className="text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(bt.id)}
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {bt.children.map((child) => (
                      <tr
                        key={child.id}
                        className="hover:bg-gray-50 border-b transition-colors bg-gray-50/50"
                      >
                        <td className="px-4 py-3 text-gray-700 pl-8">
                          <span className="text-gray-400 mr-1">└</span>
                          {child.name}
                          <span className="ml-2 text-xs text-gray-400">
                            ({child.code})
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {getCategoryLabel(child.category)}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                          {child.bankAccount
                            ? child.bankAccount.accountNumber
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => openEdit(child)}
                            >
                              <Pencil size={14} className="text-gray-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleDelete(child.id)}
                            >
                              <Trash2 size={14} className="text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
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
              {editingId ? 'แก้ไขประเภทเงิน' : 'เพิ่มประเภทเงิน'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อ
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รหัส
                </label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  หมวด
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  กลุ่มแม่
                </label>
                <select
                  value={form.parentId}
                  onChange={(e) =>
                    setForm({ ...form, parentId: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                >
                  <option value="">-- ไม่มี (เป็นกลุ่มหลัก) --</option>
                  {parentTypes
                    .filter((bt) => bt.id !== editingId)
                    .map((bt) => (
                      <option key={bt.id} value={bt.id}>
                        {bt.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  บัญชีธนาคาร
                </label>
                <select
                  value={form.bankAccountId}
                  onChange={(e) =>
                    setForm({ ...form, bankAccountId: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                >
                  <option value="">-- ไม่ระบุ --</option>
                  {bankAccounts.map((ba) => (
                    <option key={ba.id} value={ba.id}>
                      {ba.bankName} - {ba.accountNumber} ({ba.accountName})
                    </option>
                  ))}
                </select>
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
