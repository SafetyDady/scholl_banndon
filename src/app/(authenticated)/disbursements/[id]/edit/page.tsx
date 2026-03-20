'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn, formatCurrency } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Save, Plus, Trash2, X, ArrowLeft } from 'lucide-react'

interface BankAccountInfo {
  id: number
  bankName: string
  accountNumber: string
  accountName: string
}

interface BudgetTypeOption {
  id: number
  name: string
  code: string
  category: string
  bankAccount: BankAccountInfo | null
}

interface ItemForm {
  key: string
  id?: number
  description: string
  amount: number | ''
}

interface GroupForm {
  key: string
  id?: number
  budgetTypeId: string
  items: ItemForm[]
}

function createItem(): ItemForm {
  return {
    key: crypto.randomUUID(),
    description: '',
    amount: '',
  }
}

function createGroup(): GroupForm {
  return {
    key: crypto.randomUUID(),
    budgetTypeId: '',
    items: [createItem()],
  }
}

export default function EditDisbursementPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [budgetTypes, setBudgetTypes] = useState<BudgetTypeOption[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [requestDate, setRequestDate] = useState('')
  const [memoNumber, setMemoNumber] = useState('')
  const [note, setNote] = useState('')
  const [groups, setGroups] = useState<GroupForm[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/budget-types').then((r) => r.json()),
      fetch(`/api/disbursements/${id}`).then((r) => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      }),
    ])
      .then(([btData, disbData]) => {
        if (Array.isArray(btData)) setBudgetTypes(btData)

        if (disbData.status !== 'DRAFT') {
          router.push(`/disbursements/${id}`)
          return
        }

        setRequestDate(disbData.requestDate?.split('T')[0] || '')
        setMemoNumber(disbData.memoNumber || '')
        setNote(disbData.note || '')

        const loadedGroups: GroupForm[] = (disbData.disbursementGroups || []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (g: any) => ({
            key: crypto.randomUUID(),
            id: g.id,
            budgetTypeId: String(g.budgetTypeId),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            items: (g.items || []).map((item: any) => ({
              key: crypto.randomUUID(),
              id: item.id,
              description: item.description || '',
              amount: item.amount || 0,
            })),
          })
        )

        setGroups(loadedGroups.length > 0 ? loadedGroups : [createGroup()])
      })
      .catch(() => setError('ไม่พบรายการ หรือไม่สามารถแก้ไขได้'))
      .finally(() => setLoading(false))
  }, [id, router])

  function getGroupSubtotal(group: GroupForm): number {
    return group.items.reduce((sum, item) => {
      const amt = typeof item.amount === 'number' ? item.amount : 0
      return sum + amt
    }, 0)
  }

  const grandTotal = groups.reduce((sum, g) => sum + getGroupSubtotal(g), 0)

  function getBankAccount(budgetTypeId: string): BankAccountInfo | null {
    const bt = budgetTypes.find((b) => b.id === Number(budgetTypeId))
    return bt?.bankAccount ?? null
  }

  function addGroup() {
    setGroups((prev) => [...prev, createGroup()])
  }

  function removeGroup(groupKey: string) {
    setGroups((prev) => prev.filter((g) => g.key !== groupKey))
  }

  function updateGroup(groupKey: string, field: string, value: string) {
    setGroups((prev) =>
      prev.map((g) => (g.key === groupKey ? { ...g, [field]: value } : g))
    )
  }

  function addItem(groupKey: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.key === groupKey ? { ...g, items: [...g.items, createItem()] } : g
      )
    )
  }

  function removeItem(groupKey: string, itemKey: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.key === groupKey
          ? { ...g, items: g.items.filter((i) => i.key !== itemKey) }
          : g
      )
    )
  }

  function updateItem(
    groupKey: string,
    itemKey: string,
    field: keyof ItemForm,
    value: string | number,
  ) {
    setGroups((prev) =>
      prev.map((g) =>
        g.key === groupKey
          ? {
              ...g,
              items: g.items.map((i) =>
                i.key === itemKey ? { ...i, [field]: value } : i
              ),
            }
          : g
      )
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!requestDate) {
      setError('กรุณาระบุวันที่')
      return
    }

    for (const group of groups) {
      if (!group.budgetTypeId) {
        setError('กรุณาเลือกประเภทเงินให้ครบทุกกลุ่ม')
        return
      }
      for (const item of group.items) {
        if (!item.description || !item.amount) {
          setError('กรุณากรอกรายการและจำนวนเงินให้ครบ')
          return
        }
      }
    }

    setSubmitting(true)

    try {
      const payload = {
        requestDate,
        memoNumber: memoNumber || undefined,
        note: note || undefined,
        groups: groups.map((g) => ({
          budgetTypeId: Number(g.budgetTypeId),
          items: g.items.map((item) => ({
            description: item.description,
            amount: typeof item.amount === 'number' ? item.amount : 0,
            taxWithheld: 0,
          })),
        })),
      }

      const res = await fetch(`/api/disbursements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'เกิดข้อผิดพลาด')
        return
      }

      router.push(`/disbursements/${id}`)
    } catch {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]'

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-8 animate-pulse bg-gray-200 rounded w-64" />
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="แก้ไขบันทึกขออนุมัติ"
        actions={
          <Link
            href={`/disbursements/${id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={16} />
            กลับ
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Top-level fields */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันที่ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                บันทึกฉบับที่
              </label>
              <input
                type="text"
                value={memoNumber}
                onChange={(e) => setMemoNumber(e.target.value)}
                placeholder="เช่น พิเศษ/2569"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หมายเหตุ
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Groups */}
        {groups.map((group, gIndex) => {
          const bankAccount = getBankAccount(group.budgetTypeId)
          const subtotal = getGroupSubtotal(group)

          return (
            <div
              key={group.key}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-[#1e3a5f]/5 border-b">
                <h3 className="text-sm font-semibold text-[#1e3a5f]">
                  กลุ่มที่ {gIndex + 1}
                </h3>
                {groups.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGroup(group.key)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={14} />
                    ลบประเภทเงิน
                  </button>
                )}
              </div>

              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เลือกประเภทเงิน <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={group.budgetTypeId}
                      onChange={(e) =>
                        updateGroup(group.key, 'budgetTypeId', e.target.value)
                      }
                      required
                      className={inputClass}
                    >
                      <option value="">-- เลือกประเภทเงิน --</option>
                      {budgetTypes.map((bt) => (
                        <option key={bt.id} value={bt.id}>
                          {bt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {bankAccount && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        บัญชีธนาคาร
                      </label>
                      <div className="border border-gray-200 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                        {bankAccount.bankName} - {bankAccount.accountNumber}
                        <br />
                        <span className="text-xs text-gray-400">
                          {bankAccount.accountName}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-center text-xs text-gray-500 font-medium w-10">
                          #
                        </th>
                        <th className="px-3 py-2 text-left text-xs text-gray-500 font-medium">
                          รายการ <span className="text-red-500">*</span>
                        </th>
                        <th className="px-3 py-2 text-right text-xs text-gray-500 font-medium w-40">
                          เป็นเงิน (บาท) <span className="text-red-500">*</span>
                        </th>
                        <th className="px-3 py-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item, iIndex) => (
                        <tr key={item.key} className="border-t">
                          <td className="px-3 py-2 text-gray-500 text-center">
                            {iIndex + 1}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                updateItem(
                                  group.key,
                                  item.key,
                                  'description',
                                  e.target.value,
                                )
                              }
                              placeholder="รายละเอียดรายการ"
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              value={item.amount}
                              onChange={(e) =>
                                updateItem(
                                  group.key,
                                  item.key,
                                  'amount',
                                  e.target.value ? Number(e.target.value) : '',
                                )
                              }
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-right font-mono focus:ring-1 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            {group.items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItem(group.key, item.key)}
                                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="ลบรายการ"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => addItem(group.key)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1e3a5f] hover:bg-[#1e3a5f]/5 border border-[#1e3a5f]/20 rounded-lg transition-colors"
                  >
                    <Plus size={14} />
                    เพิ่มรายการ
                  </button>
                  <div className="text-sm">
                    <span className="text-gray-500">รวมเงิน: </span>
                    <span className="font-semibold font-mono text-[#1e3a5f]">
                      {formatCurrency(subtotal)} บาท
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Add Group */}
        <button
          type="button"
          onClick={addGroup}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#1e3a5f] hover:bg-[#1e3a5f]/5 border-2 border-dashed border-[#1e3a5f]/20 rounded-xl transition-colors"
        >
          <Plus size={16} />
          เพิ่มประเภทเงิน
        </button>

        {/* Grand Total + Buttons */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div className="text-base">
              <span className="text-gray-600 font-medium">รวมจำนวนเงินที่ขอเบิกทั้งสิ้น: </span>
              <span className="text-xl font-bold font-mono text-[#1e3a5f]">
                {formatCurrency(grandTotal)} บาท
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/disbursements/${id}`}
                className="px-4 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                ยกเลิก
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  'bg-[#1e3a5f] hover:bg-[#163050] text-white',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <Save size={16} />
                {submitting ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
