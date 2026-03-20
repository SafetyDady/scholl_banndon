'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const BOTTOM_ITEMS = [
  { label: 'หน้าหลัก', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'เบิกจ่าย', icon: FileText, path: '/disbursements' },
  { label: 'สมุดบัญชี', icon: BookOpen, path: '/bank-statements' },
  { label: 'ตั้งค่า', icon: Settings, path: '/settings' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-gray-200 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.05)] lg:hidden">
      {BOTTOM_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.path ||
          (item.path !== '/dashboard' && pathname.startsWith(item.path))
        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 py-1',
              isActive ? 'text-[#1e3a5f]' : 'text-gray-400'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] leading-tight">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
