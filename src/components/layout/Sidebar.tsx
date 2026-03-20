'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronLeft,
  ChevronRight,
  X,
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Wallet,
  Receipt,
  Users,
  Shield,
  Settings,
  Banknote,
  ArrowLeftRight,
  Scale,
  BookOpen,
  Landmark,
  Tags,
  UserCheck,
  GitBranch,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SIDEBAR_SECTIONS, type RoleCode } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Wallet,
  Receipt,
  Users,
  Shield,
  Settings,
  Banknote,
  ArrowLeftRight,
  Scale,
  BookOpen,
  Landmark,
  Tags,
  UserCheck,
  GitBranch,
}

interface SidebarProps {
  user: { fullName: string; role: string }
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ user, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-14 z-30 hidden h-[calc(100vh-56px)] flex-col bg-[#1e3a5f] transition-all duration-300 lg:flex',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        {SIDEBAR_SECTIONS.map((section) => {
          const visibleItems = section.items.filter(
            (item) => !item.roles || item.roles.includes(user.role as RoleCode)
          )
          if (visibleItems.length === 0) return null

          return (
            <div key={section.title} className="mb-2">
              {/* Section title */}
              {!collapsed && (
                <div className="px-5 pb-1 pt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    {section.title}
                  </span>
                </div>
              )}
              {collapsed && (
                <div className="mx-3 my-2 border-t border-white/10" />
              )}

              {/* Menu items */}
              <nav className="flex flex-col gap-0.5 px-2">
                {visibleItems.map((item) => {
                  const Icon = iconMap[item.icon]
                  const isActive =
                    pathname === item.path ||
                    (item.path !== '/dashboard' && pathname.startsWith(item.path))

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                        collapsed ? 'justify-center' : '',
                        isActive
                          ? 'border-l-[3px] border-white bg-white/15 text-white'
                          : 'border-l-[3px] border-transparent text-white/70 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" />}
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          )
        })}
      </div>

      {/* Toggle button */}
      <div className="flex justify-center border-t border-white/10 py-3">
        <button
          onClick={onToggle}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          aria-label={collapsed ? 'ขยายเมนู' : 'ย่อเมนู'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}

// Mobile sidebar drawer
export function MobileSidebar({
  user,
  open,
  onClose,
}: {
  user: { fullName: string; role: string }
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-[#1e3a5f] transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between px-4">
          <span className="text-sm font-semibold text-white">
            ร.ร.วัดบ้านดอน
          </span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto py-2">
          {SIDEBAR_SECTIONS.map((section) => {
            const visibleItems = section.items.filter(
              (item) => !item.roles || item.roles.includes(user.role as RoleCode)
            )
            if (visibleItems.length === 0) return null

            return (
              <div key={section.title} className="mb-2">
                <div className="px-5 pb-1 pt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    {section.title}
                  </span>
                </div>

                <nav className="flex flex-col gap-0.5 px-2">
                  {visibleItems.map((item) => {
                    const Icon = iconMap[item.icon]
                    const isActive =
                      pathname === item.path ||
                      (item.path !== '/dashboard' && pathname.startsWith(item.path))

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={onClose}
                        className={cn(
                          'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'border-l-[3px] border-white bg-white/15 text-white'
                            : 'border-l-[3px] border-transparent text-white/70 hover:bg-white/10 hover:text-white'
                        )}
                      >
                        {Icon && <Icon className="h-[18px] w-[18px] shrink-0" />}
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}
