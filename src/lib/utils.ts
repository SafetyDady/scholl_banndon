import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatThaiDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('th-TH', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getCurrentFiscalYear(): number {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear() + 543
  return month >= 10 ? year + 1 : year
}
