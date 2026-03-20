'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string
  suffix?: string
  icon: ReactNode
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  trend?: { value: string; positive: boolean }
}

const COLOR_MAP: Record<StatCardProps['color'], { border: string; iconBg: string; iconText: string }> = {
  primary: { border: 'border-l-[#1e3a5f]', iconBg: 'bg-[#e8eef5]', iconText: 'text-[#1e3a5f]' },
  success: { border: 'border-l-[#16a34a]', iconBg: 'bg-green-50',  iconText: 'text-[#16a34a]' },
  warning: { border: 'border-l-[#f59e0b]', iconBg: 'bg-amber-50',  iconText: 'text-[#f59e0b]' },
  danger:  { border: 'border-l-[#ef4444]', iconBg: 'bg-red-50',    iconText: 'text-[#ef4444]' },
  info:    { border: 'border-l-[#3b82f6]', iconBg: 'bg-blue-50',   iconText: 'text-[#3b82f6]' },
}

export function StatCard({ title, value, suffix, icon, color, trend }: StatCardProps) {
  const colors = COLOR_MAP[color]

  return (
    <div
      className={cn(
        'relative rounded-xl border border-[#e2e8f0] border-l-[3px] bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        colors.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-[#64748b]">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-2xl font-bold text-[#0f172a]">{value}</span>
            {suffix && (
              <span className="text-sm text-[#64748b]">{suffix}</span>
            )}
          </div>
          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend.positive ? 'text-[#16a34a]' : 'text-[#ef4444]'
              )}
            >
              {trend.positive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            colors.iconBg,
            colors.iconText
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
