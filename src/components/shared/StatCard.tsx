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
  primary: { border: 'border-l-primary', iconBg: 'bg-primary/10', iconText: 'text-primary' },
  success: { border: 'border-l-success', iconBg: 'bg-success/10',  iconText: 'text-success' },
  warning: { border: 'border-l-warning', iconBg: 'bg-warning/10',  iconText: 'text-warning' },
  danger:  { border: 'border-l-destructive', iconBg: 'bg-destructive/10',    iconText: 'text-destructive' },
  info:    { border: 'border-l-info', iconBg: 'bg-info/10',   iconText: 'text-info' },
}

export function StatCard({ title, value, suffix, icon, color, trend }: StatCardProps) {
  const colors = COLOR_MAP[color]

  return (
    <div
      className={cn(
        'relative rounded-xl border border-border border-l-[3px] bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        colors.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-2xl font-bold text-foreground font-financial">{value}</span>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend.positive ? 'text-success' : 'text-destructive'
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
