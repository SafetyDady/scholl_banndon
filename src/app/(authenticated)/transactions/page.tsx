'use client'

import { useEffect, useState } from 'react'
import { formatCurrency, formatShortDate } from '@/lib/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import {
  Inbox,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingDown,
  TrendingUp,
  Activity,
} from 'lucide-react'

interface StatementItem {
  id: number
  transactionDate: string
  withdrawal: number
  deposit: number
  balance: number
  description: string | null
  matchStatus: string
  bankAccount: {
    bankName: string
    accountNumber: string
    accountName: string
  }
}

export default function TransactionsPage() {
  const [statements, setStatements] = useState<StatementItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'withdrawal' | 'deposit'>('all')

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch('/api/bank-statements?limit=200')
        if (res.ok) {
          const json = await res.json()
          setStatements(json.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const filtered = statements.filter((s) => {
    if (filter === 'withdrawal') return s.withdrawal > 0
    if (filter === 'deposit') return s.deposit > 0
    return true
  })

  const totalWithdrawal = statements.reduce((sum, s) => sum + s.withdrawal, 0)
  const totalDeposit = statements.reduce((sum, s) => sum + s.deposit, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="เงินเคลื่อนไหว"
        subtitle="ภาพรวมรายการเงินเข้า-ออกจากทุกบัญชี (ข้อมูลจากสมุดบัญชี)"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Activity size={20} className="text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">รายการทั้งหมด</p>
              <p className="text-xl font-bold">{statements.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ยอดถอนรวม</p>
              <p className="text-xl font-bold font-financial text-destructive">
                {formatCurrency(totalWithdrawal)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ยอดฝากรวม</p>
              <p className="text-xl font-bold font-financial text-success">
                {formatCurrency(totalDeposit)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            ทั้งหมด ({statements.length})
          </button>
          <button
            onClick={() => setFilter('withdrawal')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              filter === 'withdrawal'
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <ArrowUpCircle size={14} />
            ถอน ({statements.filter((s) => s.withdrawal > 0).length})
          </button>
          <button
            onClick={() => setFilter('deposit')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              filter === 'deposit'
                ? 'bg-success text-success-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <ArrowDownCircle size={14} />
            ฝาก ({statements.filter((s) => s.deposit > 0).length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="animate-pulse p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-muted rounded" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Inbox size={48} className="mx-auto mb-4 opacity-30" />
            <p>ไม่มีรายการเงินเคลื่อนไหว</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-primary">วันที่</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">ประเภท</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">บัญชี</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">รายละเอียด</th>
                <th className="px-4 py-3 text-right font-semibold text-primary">จำนวนเงิน</th>
                <th className="px-4 py-3 text-right font-semibold text-primary">คงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatShortDate(s.transactionDate)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.withdrawal > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                        <ArrowUpCircle size={12} />
                        ถอน
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                        <ArrowDownCircle size={12} />
                        ฝาก
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-muted-foreground">{s.bankAccount.bankName}</div>
                    <div className="font-medium">{s.bankAccount.accountName}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {s.description || '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-financial font-semibold">
                    {s.withdrawal > 0 ? (
                      <span className="text-destructive">-{formatCurrency(s.withdrawal)}</span>
                    ) : (
                      <span className="text-success">+{formatCurrency(s.deposit)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-financial">
                    {formatCurrency(s.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
