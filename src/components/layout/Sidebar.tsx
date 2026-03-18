'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  user: { role: string; fullName: string }
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: 'หน้าหลัก', href: '/dashboard', icon: '🏠', roles: null },
  { label: 'รายการเบิกจ่าย', href: '/disbursements', icon: '📋', roles: null },
  { label: 'รายการรออนุมัติ', href: '/approvals', icon: '✅', roles: ['VICE_PRINCIPAL', 'PRINCIPAL'] },
  { label: 'รายงานเงินคงเหลือ', href: '/balance', icon: '💰', roles: null },
  { label: 'หักภาษี ณ ที่จ่าย', href: '/tax', icon: '🧾', roles: null },
  { label: 'ตั้งค่า', href: '/settings', icon: '⚙️', roles: ['PRINCIPAL'] },
]

export default function Sidebar({ user, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const visibleItems = menuItems.filter(
    (item) => item.roles === null || item.roles.includes(user.role)
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-slate-800 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* School name header */}
        <div className="flex h-16 items-center justify-center border-b border-slate-700 px-4">
          <h1 className="text-lg font-semibold">ร.ร.วัดบ้านดอน</h1>
        </div>

        {/* Menu items */}
        <nav className="mt-4 flex flex-col gap-1 px-3">
          {visibleItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
