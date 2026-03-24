'use client'

import { useRouter } from 'next/navigation'
import { Menu, LogOut, GraduationCap } from 'lucide-react'
import { ROLES } from '@/lib/constants'

interface HeaderProps {
  user: { fullName: string; role: string }
  onMenuToggle: () => void
}

export default function Header({ user, onMenuToggle }: HeaderProps) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const roleLabel = ROLES[user.role as keyof typeof ROLES] || user.role

  const initials = user.fullName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center border-b border-gray-200 bg-white">
      {/* Mobile: hamburger */}
      <button
        onClick={onMenuToggle}
        className="flex h-14 w-14 items-center justify-center text-gray-600 hover:bg-gray-100 lg:hidden"
        aria-label="เปิดเมนู"
      >
        <Menu size={22} />
      </button>

      {/* School name */}
      <div className="hidden shrink-0 items-center gap-2.5 px-5 lg:flex">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-sm font-semibold text-primary">
            ร.ร.วัดบ้านดอน
          </span>
          <span className="ml-2 text-xs text-gray-400">ระบบบริหารการเงิน</span>
        </div>
      </div>

      {/* Mobile: center title */}
      <div className="flex flex-1 items-center justify-center lg:hidden">
        <span className="text-sm font-medium text-primary">
          ร.ร.วัดบ้านดอน
        </span>
      </div>

      {/* Spacer */}
      <div className="hidden flex-1 lg:block" />

      {/* Right: avatar + user info + logout */}
      <div className="flex items-center gap-3 pr-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
          {initials}
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-xs font-medium text-gray-800">{user.fullName}</p>
          <p className="text-[10px] text-gray-500">{roleLabel}</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="ออกจากระบบ"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}
