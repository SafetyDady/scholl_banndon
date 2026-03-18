'use client'

import { useRouter } from 'next/navigation'

interface TopbarProps {
  user: { role: string; fullName: string }
  onMenuToggle: () => void
}

const roleLabels: Record<string, string> = {
  PRINCIPAL: 'ผู้อำนวยการ',
  VICE_PRINCIPAL: 'รองผู้อำนวยการ',
  FINANCE_OFFICER: 'ครูการเงิน',
}

export default function Topbar({ user, onMenuToggle }: TopbarProps) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:left-64">
      {/* Hamburger button - mobile only */}
      <button
        onClick={onMenuToggle}
        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* User info and logout */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
          <p className="text-xs text-gray-500">
            {roleLabels[user.role] || user.role}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          ออกจากระบบ
        </button>
      </div>
    </header>
  )
}
