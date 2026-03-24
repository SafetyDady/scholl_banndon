/*
 * StatusBadge — Inline status chip with semantic colors
 * Uses CSS variables from globals.css — no hardcoded colors
 */
import { cn } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'

const COLOR_MAP: Record<string, string> = {
  muted: 'bg-muted text-muted-foreground',
  warning: 'bg-warning/15 text-warning',
  info: 'bg-info/15 text-info',
  success: 'bg-success/15 text-success',
  destructive: 'bg-destructive/15 text-destructive',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_LABELS[status] || { label: status, color: 'muted' }
  const colorClass = COLOR_MAP[config.color] || COLOR_MAP.muted

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass,
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          config.color === 'muted' && 'bg-muted-foreground/50',
          config.color === 'warning' && 'bg-warning',
          config.color === 'info' && 'bg-info',
          config.color === 'success' && 'bg-success',
          config.color === 'destructive' && 'bg-destructive',
        )}
      />
      {config.label}
    </span>
  )
}
