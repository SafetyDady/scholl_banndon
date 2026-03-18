'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface AuthenticatedShellProps {
  user: { role: string; fullName: string }
  children: React.ReactNode
}

export default function AuthenticatedShell({ user, children }: AuthenticatedShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <Topbar
        user={user}
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
      />
      <main className="ml-0 pt-16 lg:ml-64">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
