'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface BudgetType {
  id: number
  name: string
  code: string
}

export default function NewDisbursementPage() {
  const router = useRouter()
  const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [requestDate, setRequestDate] = useState(
    new Date().toISOString().split('T')[0],
  )
  const [memoNumber, setMemoNumber] = useState('')
  const [budgetTypeId, setBudgetTypeId] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState<number | ''>('')
  const [taxWithheld, setTaxWithheld] = useState<number | ''>(0)
  const [payeeName, setPayeeName] = useState('')
  const [note, setNote] = useState('')

  const numAmount = typeof amount === 'number' ? amount : 0
  const numTax = typeof taxWithheld === 'number' ? taxWithheld : 0
  const netAmount = numAmount - numTax

  useEffect(() => {
    fetch('/api/budget-types')
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) setBudgetTypes(json)
      })
      .catch(console.error)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!budgetTypeId || !description || !amount) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/disbursements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestDate,
          memoNumber: memoNumber || undefined,
          budgetTypeId: Number(budgetTypeId),
          description,
          amount: numAmount,
          taxWithheld: numTax,
          payeeName: payeeName || undefined,
          note: note || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'เกิดข้อผิดพลาด')
        return
      }

      const created = await res.json()
      router.push(`/disbursements/${created.id}`)
    } catch {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/disbursements"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          สร้างรายการเบิกจ่ายใหม่
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* วันที่ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่ <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={requestDate}
              onChange={(e) => setRequestDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* บันทึกฉบับที่ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              บันทึกฉบับที่
            </label>
            <input
              type="text"
              value={memoNumber}
              onChange={(e) => setMemoNumber(e.target.value)}
              placeholder="เช่น บร.001/2569"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* ประเภทเงิน */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ประเภทเงิน <span className="text-red-500">*</span>
          </label>
          <select
            value={budgetTypeId}
            onChange={(e) => setBudgetTypeId(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- เลือกประเภทเงิน --</option>
            {budgetTypes.map((bt) => (
              <option key={bt.id} value={bt.id}>
                {bt.name}
              </option>
            ))}
          </select>
        </div>

        {/* รายการ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            รายการ <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            placeholder="รายละเอียดการเบิกจ่าย"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* จำนวนเงิน */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนเงิน (บาท) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : '')
              }
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* หักภาษี ณ ที่จ่าย */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หักภาษี ณ ที่จ่าย (บาท)
            </label>
            <input
              type="number"
              value={taxWithheld}
              onChange={(e) =>
                setTaxWithheld(e.target.value ? Number(e.target.value) : '')
              }
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* ยอดจ่ายจริง */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ยอดจ่ายจริง (บาท)
            </label>
            <input
              type="text"
              value={netAmount.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
            />
          </div>
        </div>

        {/* ชื่อผู้รับจ้าง */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ชื่อผู้รับจ้าง
          </label>
          <input
            type="text"
            value={payeeName}
            onChange={(e) => setPayeeName(e.target.value)}
            placeholder="ชื่อบริษัท หรือ ชื่อ-นามสกุล (ถ้ามี)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* หมายเหตุ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            หมายเหตุ
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/disbursements"
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
        </div>
      </form>
    </div>
  )
}
