'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Header from './Header'
import Sidebar, { MobileSidebar } from './Sidebar'
import BottomNav from './BottomNav'

const COLLAPSED_KEY = 'sidebar-collapsed'

interface AuthenticatedShellProps {
  user: { fullName: string; role: string }
  children: React.ReactNode
}

export default function AuthenticatedShell({
  user,
  children,
}: AuthenticatedShellProps) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(COLLAPSED_KEY)
      return saved === 'true'
    }
    return false
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleToggle = () => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(COLLAPSED_KEY, String(next))
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header
        user={user}
        onMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
      />

      <Sidebar
        user={user}
        collapsed={collapsed}
        onToggle={handleToggle}
      />

      <MobileSidebar
        user={user}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <BottomNav />

      <main
        className={cn(
          'pt-14 pb-14 lg:pb-0 transition-[margin-left] duration-300',
          collapsed ? 'lg:ml-16' : 'lg:ml-60'
        )}
      >
        <div className="min-h-[calc(100vh-56px)] p-6">{children}</div>
      </main>
    </div>
  )
}
