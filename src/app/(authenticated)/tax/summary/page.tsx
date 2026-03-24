'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, getCurrentFiscalYear, formatShortDate } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, Clock, AlertTriangle, Send, X } from 'lucide-react'

const THAI_MONTHS = [
  '', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
  'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
  'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

interface MonthSummary {
  month: number
  year: number
  count: number
  totalAmount: number
  totalTax: number
  status: string
  submittedDate: string | null
  receiptNo: string | null
  submissionId: number | null
}

function getDeadline(month: number, year: number): { date: string; isPast: boolean } {
  const deadlineMonth = month === 12 ? 1 : month + 1
  const deadlineYear = month === 12 ? year + 1 : year
  const deadline = new Date(deadlineYear, deadlineMonth - 1, 7)
  const thaiYear = deadlineYear + 543
  return {
    date: `7 ${THAI_MONTHS[deadlineMonth]} ${thaiYear}`,
    isPast: new Date() > deadline,
  }
}

export default function TaxSummaryPage() {
  const [summary, setSummary] = useState<MonthSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [submitModal, setSubmitModal] = useState<MonthSummary | null>(null)
  const [submitForm, setSubmitForm] = useState({ submittedDate: '', receiptNo: '' })
  const [submitting, setSubmitting] = useState(false)
  const fiscalYear = getCurrentFiscalYear()

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/tax/summary?fiscalYear=${fiscalYear}`)
      const json = await res.json()
      setSummary(json.summary || [])
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchData() }, [fiscalYear])

  const handleSubmit = async () => {
    if (!submitModal) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/tax/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: submitModal.month,
          year: submitModal.year,
          totalAmount: submitModal.totalAmount,
          totalTax: submitModal.totalTax,
          submittedDate: submitForm.submittedDate || undefined,
          receiptNo: submitForm.receiptNo || undefined,
        }),
      })
      if (res.ok) {
        setSubmitModal(null)
        setSubmitForm({ submittedDate: '', receiptNo: '' })
        fetchData()
      } else {
        const err = await res.json()
        alert(err.error || 'เกิดข้อผิดพลาด')
      }
    } catch {
      alert('เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setSubmitting(false)
    }
  }

  const totalCount = summary.reduce((sum, m) => sum + m.count, 0)
  const totalTax = summary.reduce((sum, m) => sum + m.totalTax, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="สรุปภาษีรายเดือน"
        subtitle={`ปีงบประมาณ ${fiscalYear}`}
        actions={
          <Link href="/tax">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              กลับ
            </Button>
          </Link>
        }
      />

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="animate-pulse p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted rounded" />
            ))}
          </div>
        ) : summary.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Clock size={48} className="mx-auto mb-4 opacity-30" />
            <p>ยังไม่มีรายการภาษีในปีงบประมาณนี้</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-primary">เดือน</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">จำนวนราย</th>
                <th className="px-4 py-3 text-right font-semibold text-primary">ยอดจ่ายรวม</th>
                <th className="px-4 py-3 text-right font-semibold text-primary">ภาษีรวม</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">กำหนดส่ง</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">สถานะ</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((m) => {
                const deadline = getDeadline(m.month, m.year)
                const thaiYear = m.year + 543

                return (
                  <tr key={`${m.year}-${m.month}`} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">
                      {THAI_MONTHS[m.month]} {thaiYear}
                    </td>
                    <td className="px-4 py-3 text-center">{m.count}</td>
                    <td className="px-4 py-3 text-right font-financial">
                      {formatCurrency(m.totalAmount)}
                    </td>
                    <td className="px-4 py-3 text-right font-financial font-semibold text-destructive">
                      {formatCurrency(m.totalTax)}
                    </td>
                    <td className="px-4 py-3 text-center text-xs">
                      {deadline.date}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {m.status === 'SUBMITTED' ? (
                        <div>
                          <span className="inline-flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                            <CheckCircle size={12} />
                            ส่งแล้ว
                          </span>
                          {m.submittedDate && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatShortDate(m.submittedDate)}
                            </div>
                          )}
                          {m.receiptNo && (
                            <div className="text-xs text-muted-foreground">
                              เลขที่: {m.receiptNo}
                            </div>
                          )}
                        </div>
                      ) : deadline.isPast ? (
                        <span className="inline-flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                          <AlertTriangle size={12} />
                          เลยกำหนด
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded-full">
                          <Clock size={12} />
                          ยังไม่ส่ง
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {m.status !== 'SUBMITTED' && (
                        <Button
                          size="sm"
                          className="gap-1 text-xs"
                          onClick={() => {
                            setSubmitModal(m)
                            setSubmitForm({ submittedDate: '', receiptNo: '' })
                          }}
                        >
                          <Send size={12} />
                          บันทึกนำส่ง
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="bg-muted/50 border-t-2 border-border">
                <td className="px-4 py-3 font-bold">
                  รวม {summary.length} เดือน
                </td>
                <td className="px-4 py-3 text-center font-bold">{totalCount}</td>
                <td className="px-4 py-3" />
                <td className="px-4 py-3 text-right font-financial font-bold text-destructive">
                  {formatCurrency(totalTax)}
                </td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Modal บันทึกนำส่ง */}
      {submitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-primary">
                บันทึกนำส่งภาษี
              </h3>
              <button onClick={() => setSubmitModal(null)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">เดือน</p>
                <p className="font-semibold">{THAI_MONTHS[submitModal.month]} {submitModal.year + 543}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">จำนวนราย</p>
                  <p className="font-semibold">{submitModal.count}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">ยอดภาษีรวม</p>
                  <p className="font-semibold font-financial text-destructive">{formatCurrency(submitModal.totalTax)}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">วันที่นำส่ง</label>
                <input
                  type="date"
                  value={submitForm.submittedDate}
                  onChange={(e) => setSubmitForm({ ...submitForm, submittedDate: e.target.value })}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">เลขที่ใบเสร็จ</label>
                <input
                  type="text"
                  value={submitForm.receiptNo}
                  onChange={(e) => setSubmitForm({ ...submitForm, receiptNo: e.target.value })}
                  placeholder="เลขที่ใบเสร็จจากสรรพากร"
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-border">
              <Button variant="outline" onClick={() => setSubmitModal(null)}>ยกเลิก</Button>
              <Button onClick={handleSubmit} disabled={submitting} className="gap-1">
                <CheckCircle size={16} />
                {submitting ? 'กำลังบันทึก...' : 'ยืนยันนำส่ง'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
