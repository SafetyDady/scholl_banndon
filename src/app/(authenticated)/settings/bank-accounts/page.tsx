'use client'

import { useEffect, useState, useCallback } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, Inbox } from 'lucide-react'

interface BankAccount {
  id: number
  bankName: string
  accountNumber: string
  accountName: string
  branch: string | null
  accountType: string
  isActive: boolean
}

interface FormData {
  bankName: string
  accountNumber: string
  accountName: string
  branch: string
  accountType: string
}

const BANK_NAMES = [
  'ธนาคารกรุงไทย',
  'ธนาคารออมสิน',
  'ธนาคารกรุงเทพ',
  'ธนาคารกสิกรไทย',
  'ธนาคารไทยพาณิชย์',
]

const ACCOUNT_TYPES = [
  { value: 'SAVINGS', label: 'ออมทรัพย์' },
  { value: 'CURRENT', label: 'กระแสรายวัน' },
]

const emptyForm: FormData = {
  bankName: BANK_NAMES[0],
  accountNumber: '',
  accountName: '',
  branch: '',
  accountType: 'SAVINGS',
}

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/bank-accounts')
      if (!res.ok) throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      const data = await res.json()
      setAccounts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (account: BankAccount) => {
    setEditingId(account.id)
    setForm({
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      branch: account.branch || '',
      accountType: account.accountType,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('ต้องการลบบัญชีนี้หรือไม่?')) return
    try {
      const res = await fetch(`/api/bank-accounts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('ลบไม่สำเร็จ')
      fetchAccounts()
    } catch {
      alert('เกิดข้อผิดพลาดในการลบ')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editingId
        ? `/api/bank-accounts/${editingId}`
        : '/api/bank-accounts'
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
      fetchAccounts()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setSaving(false)
    }
  }

  const getAccountTypeLabel = (type: string) =>
    ACCOUNT_TYPES.find((t) => t.value === type)?.label || type

  return (
    <div className="space-y-6">
      <PageHeader
        title="บัญชีธนาคาร"
        subtitle="จัดการบัญชีธนาคารของโรงเรียน"
        actions={
          <Button onClick={openAdd}>
            <Plus size={16} />
            เพิ่มบัญชี
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
        ) : accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Inbox size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">
              ยังไม่มีบัญชีธนาคาร กดปุ่ม &quot;เพิ่มบัญชี&quot; เพื่อเริ่มต้น
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ธนาคาร
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    เลขที่บัญชี
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ชื่อบัญชี
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    สาขา
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium">
                    ประเภท
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr
                    key={account.id}
                    className="hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {account.bankName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono">
                      {account.accountNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {account.accountName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {account.branch || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {getAccountTypeLabel(account.accountType)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700">
                        ใช้งาน
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(account)}
                        >
                          <Pencil size={14} className="text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(account.id)}
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
            <h2 className="text-lg font-semibold text-primary mb-4">
              {editingId ? 'แก้ไขบัญชีธนาคาร' : 'เพิ่มบัญชีธนาคาร'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อธนาคาร
                </label>
                <select
                  value={form.bankName}
                  onChange={(e) =>
                    setForm({ ...form, bankName: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  required
                >
                  {BANK_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เลขที่บัญชี
                </label>
                <input
                  type="text"
                  value={form.accountNumber}
                  onChange={(e) =>
                    setForm({ ...form, accountNumber: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อบัญชี
                </label>
                <input
                  type="text"
                  value={form.accountName}
                  onChange={(e) =>
                    setForm({ ...form, accountName: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สาขา
                </label>
                <input
                  type="text"
                  value={form.branch}
                  onChange={(e) =>
                    setForm({ ...form, branch: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ประเภทบัญชี
                </label>
                <select
                  value={form.accountType}
                  onChange={(e) =>
                    setForm({ ...form, accountType: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  {ACCOUNT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
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
