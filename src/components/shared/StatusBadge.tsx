import { cn } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'

interface StatusBadgeProps {
  status: string
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  DRAFT:            { bg: 'bg-gray-100',    text: 'text-gray-700' },
  PENDING_APPROVAL: { bg: 'bg-amber-50',    text: 'text-amber-700' },
  APPROVED:         { bg: 'bg-blue-50',     text: 'text-blue-700' },
  WITHDRAWN:        { bg: 'bg-indigo-50',   text: 'text-indigo-700' },
  PAID:             { bg: 'bg-purple-50',   text: 'text-purple-700' },
  TAX_ISSUED:       { bg: 'bg-pink-50',     text: 'text-pink-700' },
  BALANCE_REPORTED: { bg: 'bg-teal-50',     text: 'text-teal-700' },
  COMPLETED:        { bg: 'bg-green-50',    text: 'text-green-700' },
  REJECTED:         { bg: 'bg-red-50',      text: 'text-red-700' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = STATUS_LABELS[status]?.label ?? status
  const colors = STATUS_COLORS[status] ?? { bg: 'bg-gray-100', text: 'text-gray-700' }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold',
        colors.bg,
        colors.text
      )}
    >
      {label}
    </span>
  )
}
