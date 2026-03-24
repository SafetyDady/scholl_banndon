'use client'

import { useEffect, useState, useCallback } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Pencil,
  Trash2,
  Inbox,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react'

// ===== Types =====

interface BankAccount {
  id: number
  bankName: string
  accountNumber: string
  accountName: string
}

interface BudgetType {
  id: number
  name: string
  code: string
  category: string
}

interface BalanceTemplate {
  id: number
  name: string
  section: string
  parentId: number | null
  column: string
  sourceType: string
  sourceBankAccountId: number | null
  sourceBudgetTypeId: number | null
  openingBalance: number
  sortOrder: number
  isActive: boolean
  parent: BalanceTemplate | null
  children: BalanceTemplate[]
  sourceBankAccount: BankAccount | null
  sourceBudgetType: BudgetType | null
}

interface FormData {
  name: string
  section: string
  parentId: number | null
  column: string
  sourceType: string
  sourceBankAccountId: number | null
  sourceBudgetTypeId: number | null
  openingBalance: number
}

// ===== Constants =====

const SECTIONS = [
  { value: 'BUDGET_REVENUE', label: 'เงินงบประมาณ / เงินรายได้แผ่นดิน' },
  { value: 'NON_BUDGET', label: 'เงินนอกงบประมาณ' },
]

const COLUMNS = [
  { value: 'CASH', label: 'เงินสด' },
  { value: 'BANK', label: 'ฝากธนาคาร' },
  { value: 'DEPT', label: 'ส่วนราชการผู้เบิก' },
]

const SOURCE_TYPES = [
  { value: 'BANK_ACCOUNT', label: 'จากบัญชีธนาคาร' },
  { value: 'BUDGET_TYPE', label: 'จากประเภทเงิน' },
  { value: 'MANUAL', label: 'กรอกเอง' },
]

const emptyForm: FormData = {
  name: '',
  section: 'BUDGET_REVENUE',
  parentId: null,
  column: 'BANK',
  sourceType: 'BUDGET_TYPE',
  sourceBankAccountId: null,
  sourceBudgetTypeId: null,
  openingBalance: 0,
}

// ===== Helpers =====

const getSectionLabel = (value: string) =>
  SECTIONS.find((s) => s.value === value)?.label || value

const getColumnLabel = (value: string) =>
  COLUMNS.find((c) => c.value === value)?.label || value

const getSourceLabel = (item: BalanceTemplate) => {
  if (item.sourceType === 'BANK_ACCOUNT' && item.sourceBankAccount) {
    return `${item.sourceBankAccount.bankName} (${item.sourceBankAccount.accountNumber})`
  }
  if (item.sourceType === 'BUDGET_TYPE' && item.sourceBudgetType) {
    return item.sourceBudgetType.name
  }
  if (item.sourceType === 'MANUAL') {
    return 'กรอกเอง'
  }
  return '-'
}

// ===== Component =====

export default function BalanceTemplatePage() {
  const [templates, setTemplates] = useState<BalanceTemplate[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  // ===== Data fetching =====

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/settings/balance-template')
      if (!res.ok) throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      const data = await res.json()
      setTemplates(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchDropdownData = useCallback(async () => {
    try {
      const [bankRes, budgetRes] = await Promise.all([
        fetch('/api/bank-accounts'),
        fetch('/api/budget-types'),
      ])
      if (bankRes.ok) {
        const data = await bankRes.json()
        setBankAccounts(data)
      }
      if (budgetRes.ok) {
        const data = await budgetRes.json()
        setBudgetTypes(data)
      }
    } catch {
      // Silently handle - dropdowns will just be empty
    }
  }, [])

  useEffect(() => {
    fetchTemplates()
    fetchDropdownData()
  }, [fetchTemplates, fetchDropdownData])

  // ===== Build tree structure =====

  const parentItems = templates.filter((t) => !t.parentId)
  const budgetRevenueItems = parentItems.filter(
    (t) => t.section === 'BUDGET_REVENUE',
  )
  const nonBudgetItems = parentItems.filter((t) => t.section === 'NON_BUDGET')

  // Get all items in a flat list for a section (parents + children)
  const getFlatItems = (sectionItems: BalanceTemplate[]) => {
    const flat: { item: BalanceTemplate; isChild: boolean }[] = []
    for (const parent of sectionItems) {
      flat.push({ item: parent, isChild: false })
      const children = templates
        .filter((t) => t.parentId === parent.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
      for (const child of children) {
        flat.push({ item: child, isChild: true })
      }
    }
    return flat
  }

  // ===== Possible parents (items without parent) for dropdown =====

  const possibleParents = templates.filter((t) => !t.parentId)

  // ===== Reorder =====

  const handleMoveUp = async (item: BalanceTemplate) => {
    const sectionItems = templates
      .filter(
        (t) =>
          t.section === item.section &&
          t.parentId === item.parentId,
      )
      .sort((a, b) => a.sortOrder - b.sortOrder)

    const index = sectionItems.findIndex((t) => t.id === item.id)
    if (index <= 0) return

    const prev = sectionItems[index - 1]
    const reorderItems = [
      { id: item.id, sortOrder: prev.sortOrder },
      { id: prev.id, sortOrder: item.sortOrder },
    ]

    try {
      await fetch('/api/settings/balance-template/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: reorderItems }),
      })
      fetchTemplates()
    } catch {
      alert('เกิดข้อผิดพลาดในการจัดเรียง')
    }
  }

  const handleMoveDown = async (item: BalanceTemplate) => {
    const sectionItems = templates
      .filter(
        (t) =>
          t.section === item.section &&
          t.parentId === item.parentId,
      )
      .sort((a, b) => a.sortOrder - b.sortOrder)

    const index = sectionItems.findIndex((t) => t.id === item.id)
    if (index >= sectionItems.length - 1) return

    const next = sectionItems[index + 1]
    const reorderItems = [
      { id: item.id, sortOrder: next.sortOrder },
      { id: next.id, sortOrder: item.sortOrder },
    ]

    try {
      await fetch('/api/settings/balance-template/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: reorderItems }),
      })
      fetchTemplates()
    } catch {
      alert('เกิดข้อผิดพลาดในการจัดเรียง')
    }
  }

  // ===== CRUD =====

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (item: BalanceTemplate) => {
    setEditingId(item.id)
    setForm({
      name: item.name,
      section: item.section,
      parentId: item.parentId,
      column: item.column,
      sourceType: item.sourceType,
      sourceBankAccountId: item.sourceBankAccountId,
      sourceBudgetTypeId: item.sourceBudgetTypeId,
      openingBalance: item.openingBalance,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('ต้องการลบรายการนี้หรือไม่?')) return
    try {
      const res = await fetch(`/api/settings/balance-template/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('ลบไม่สำเร็จ')
      fetchTemplates()
    } catch {
      alert('เกิดข้อผิดพลาดในการลบ')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editingId
        ? `/api/settings/balance-template/${editingId}`
        : '/api/settings/balance-template'
      const method = editingId ? 'PUT' : 'POST'

      const payload = {
        ...form,
        sourceBankAccountId:
          form.sourceType === 'BANK_ACCOUNT'
            ? form.sourceBankAccountId
            : null,
        sourceBudgetTypeId:
          form.sourceType === 'BUDGET_TYPE'
            ? form.sourceBudgetTypeId
            : null,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'บันทึกไม่สำเร็จ')
      }
      setShowModal(false)
      fetchTemplates()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setSaving(false)
    }
  }

  // ===== Render helpers =====

  const renderSectionTable = (
    sectionLabel: string,
    sectionItems: BalanceTemplate[],
  ) => {
    const flatItems = getFlatItems(sectionItems)

    return (
      <div key={sectionLabel} className="mb-6">
        <h3 className="text-sm font-semibold text-primary bg-primary/5 px-4 py-2.5 rounded-t-lg border border-b-0 border-gray-200">
          {sectionLabel}
        </h3>
        {flatItems.length === 0 ? (
          <div className="border border-gray-200 rounded-b-lg p-6 text-center text-sm text-gray-400">
            ยังไม่มีรายการ
          </div>
        ) : (
          <div className="border border-gray-200 rounded-b-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-2.5 text-left text-xs text-gray-500 uppercase tracking-wider font-medium w-16">
                    ลำดับ
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ชื่อรายการ
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-gray-500 uppercase tracking-wider font-medium w-36">
                    คอลัมน์
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-gray-500 uppercase tracking-wider font-medium w-48">
                    ที่มายอด
                  </th>
                  <th className="px-4 py-2.5 text-center text-xs text-gray-500 uppercase tracking-wider font-medium w-32">
                    จัดเรียง
                  </th>
                  <th className="px-4 py-2.5 text-center text-xs text-gray-500 uppercase tracking-wider font-medium w-24">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {flatItems.map(({ item, isChild }, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                  >
                    <td className="px-4 py-2.5 text-gray-500 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2.5 text-gray-900">
                      {isChild ? (
                        <span className="text-gray-400 mr-2">└</span>
                      ) : null}
                      <span className={isChild ? 'text-gray-700' : 'font-medium'}>
                        {item.name}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                        {getColumnLabel(item.column)}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 text-xs">
                      {getSourceLabel(item)}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleMoveUp(item)}
                          title="เลื่อนขึ้น"
                        >
                          <ChevronUp size={14} className="text-gray-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleMoveDown(item)}
                          title="เลื่อนลง"
                        >
                          <ChevronDown size={14} className="text-gray-400" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={14} className="text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(item.id)}
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
    )
  }

  // ===== Main render =====

  return (
    <div className="space-y-6">
      <PageHeader
        title="รายการรายงานเงินคงเหลือ"
        subtitle="ตั้งค่ารายการที่แสดงในรายงานเงินคงเหลือประจำวัน"
        actions={
          <Button onClick={openAdd}>
            <Plus size={16} />
            เพิ่มรายการ
          </Button>
        }
      />

      <div>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-10 animate-pulse bg-gray-200 rounded-t-lg" />
                <div className="h-32 animate-pulse bg-gray-100 rounded-b-lg" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-red-500">
            {error}
          </div>
        ) : parentItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="flex flex-col items-center justify-center py-16">
              <Inbox size={48} className="text-gray-300" />
              <p className="mt-3 text-sm text-gray-400">
                ยังไม่มีรายการ กดปุ่ม &quot;+ เพิ่มรายการ&quot; เพื่อเริ่มต้น
              </p>
            </div>
          </div>
        ) : (
          <>
            {budgetRevenueItems.length > 0 &&
              renderSectionTable(
                getSectionLabel('BUDGET_REVENUE'),
                budgetRevenueItems,
              )}
            {nonBudgetItems.length > 0 &&
              renderSectionTable(
                getSectionLabel('NON_BUDGET'),
                nonBudgetItems,
              )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary">
                {editingId ? 'แก้ไขรายการ' : 'เพิ่มรายการ'}
              </h2>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowModal(false)}
              >
                <X size={18} className="text-gray-400" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ชื่อรายการ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อรายการ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="เช่น เงินงบประมาณ, เงินอุดหนุน"
                  required
                />
              </div>

              {/* หมวด */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  หมวด <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.section}
                  onChange={(e) =>
                    setForm({ ...form, section: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  required
                >
                  {SECTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* กลุ่มแม่ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  กลุ่มแม่{' '}
                  <span className="text-xs text-gray-400">(ถ้ามี)</span>
                </label>
                <select
                  value={form.parentId ?? ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      parentId: e.target.value
                        ? parseInt(e.target.value, 10)
                        : null,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="">-- ไม่มี (เป็นรายการหลัก) --</option>
                  {possibleParents
                    .filter((p) => p.id !== editingId)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* คอลัมน์ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  คอลัมน์
                </label>
                <select
                  value={form.column}
                  onChange={(e) =>
                    setForm({ ...form, column: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  {COLUMNS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* ที่มาของยอด */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ที่มาของยอด
                </label>
                <div className="space-y-2">
                  {SOURCE_TYPES.map((st) => (
                    <label
                      key={st.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sourceType"
                        value={st.value}
                        checked={form.sourceType === st.value}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            sourceType: e.target.value,
                            sourceBankAccountId: null,
                            sourceBudgetTypeId: null,
                          })
                        }
                        className="accent-[#1e3a5f]"
                      />
                      <span className="text-sm text-gray-700">{st.label}</span>
                    </label>
                  ))}
                </div>

                {/* Conditional dropdown for BANK_ACCOUNT */}
                {form.sourceType === 'BANK_ACCOUNT' && (
                  <div className="mt-3 ml-6">
                    <select
                      value={form.sourceBankAccountId ?? ''}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sourceBankAccountId: e.target.value
                            ? parseInt(e.target.value, 10)
                            : null,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                      <option value="">-- เลือกบัญชีธนาคาร --</option>
                      {bankAccounts.map((ba) => (
                        <option key={ba.id} value={ba.id}>
                          {ba.bankName} ({ba.accountNumber}) - {ba.accountName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Conditional dropdown for BUDGET_TYPE */}
                {form.sourceType === 'BUDGET_TYPE' && (
                  <div className="mt-3 ml-6">
                    <select
                      value={form.sourceBudgetTypeId ?? ''}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sourceBudgetTypeId: e.target.value
                            ? parseInt(e.target.value, 10)
                            : null,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                      <option value="">-- เลือกประเภทเงิน --</option>
                      {budgetTypes.map((bt) => (
                        <option key={bt.id} value={bt.id}>
                          {bt.name} ({bt.code})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* ยอดตั้งต้นปีงบ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ยอดตั้งต้นปีงบ
                </label>
                <input
                  type="number"
                  value={form.openingBalance}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      openingBalance: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Buttons */}
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
