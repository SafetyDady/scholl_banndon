'use client'

import { useEffect, useState, useCallback } from 'react'
import { formatCurrency, formatShortDate, getCurrentFiscalYear } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Inbox,
} from 'lucide-react'

// ===== Types =====

interface BankAccountInfo {
  id: number
  bankName: string
  accountNumber: string
  accountName: string
}

interface Movement {
  id: number
  bankAccount: BankAccountInfo
  withdrawal: number
  deposit: number
  description: string | null
}

interface DateEntry {
  date: string
  movements: Movement[]
  isIssued: boolean
  issuedAt: string | null
}

interface ChangesResponse {
  dates: DateEntry[]
  fiscalYear: number
}

// ===== Component =====

export default function BalanceChangesPage() {
  const [data, setData] = useState<ChangesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [issuingDate, setIssuingDate] = useState<string | null>(null)
  const fiscalYear = getCurrentFiscalYear()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/balance/changes?fiscalYear=${fiscalYear}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [fiscalYear])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleIssue = async (date: string) => {
    if (!confirm(`ต้องการออกรายงานเงินคงเหลือวันที่ ${formatShortDate(date)} หรือไม่?`)) return

    setIssuingDate(date)
    try {
      const res = await fetch(`/api/balance/issue/${date}`, {
        method: 'POST',
      })

      if (res.ok) {
        // Refresh data to reflect the new status
        await fetchData()
      } else {
        const err = await res.json()
        alert(err.error || 'เกิดข้อผิดพลาด')
      }
    } catch (err) {
      console.error(err)
      alert('เกิดข้อผิดพลาดในการออกรายงาน')
    } finally {
      setIssuingDate(null)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="รายงานเงินคงเหลือ"
        subtitle={`ปีงบประมาณ ${fiscalYear} - รายการเปลี่ยนแปลง`}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-[#1e3a5f]" />
            <span className="ml-2 text-sm text-gray-500">กำลังโหลด...</span>
          </div>
        ) : !data?.dates?.length ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Inbox size={48} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-400">
              ไม่พบรายการเคลื่อนไหว
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1e3a5f] text-white">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider font-medium w-[120px]">
                    วันที่
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider font-medium">
                    รายการเปลี่ยนแปลง
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider font-medium w-[140px]">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider font-medium w-[150px]">
                    รายงาน
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.dates.map((entry) => (
                  <tr
                    key={entry.date}
                    className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors align-top"
                  >
                    {/* Date */}
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-[#1e3a5f]">
                      {formatShortDate(entry.date)}
                    </td>

                    {/* Movements */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        {entry.movements.map((m) => {
                          if (m.withdrawal > 0) {
                            return (
                              <div key={m.id} className="flex items-baseline gap-2">
                                <span className="text-red-600 font-mono text-sm font-medium">
                                  -{formatCurrency(m.withdrawal)}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {m.description || m.bankAccount.accountName}
                                </span>
                              </div>
                            )
                          }
                          if (m.deposit > 0) {
                            return (
                              <div key={m.id} className="flex items-baseline gap-2">
                                <span className="text-[#16a34a] font-mono text-sm font-medium">
                                  +{formatCurrency(m.deposit)}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {m.description || m.bankAccount.accountName}
                                </span>
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      {entry.isIssued ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          ออกแล้ว
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          ยังไม่ออก
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3 text-center">
                      {entry.isIssued ? (
                        <a
                          href={`/api/balance/issue/${entry.date}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1e3a5f] hover:text-[#162d4a] hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" />
                          ดาวน์โหลด
                        </a>
                      ) : (
                        <Button
                          onClick={() => handleIssue(entry.date)}
                          disabled={issuingDate === entry.date}
                          className="bg-[#1e3a5f] text-white hover:bg-[#162d4a] text-xs"
                          size="sm"
                        >
                          {issuingDate === entry.date ? (
                            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <FileText className="mr-1 h-3.5 w-3.5" />
                          )}
                          ออกรายงาน
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
