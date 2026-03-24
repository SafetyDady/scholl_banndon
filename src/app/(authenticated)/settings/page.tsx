'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import {
  Landmark,
  Tags,
  GitBranch,
  Users,
  Shield,
  ChevronRight,
  FileSpreadsheet,
} from 'lucide-react'

interface UserInfo {
  role: string
}

interface SettingsCard {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  adminOnly?: boolean
}

export default function SettingsPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data: UserInfo) => setUserRole(data.role))
      .catch(() => setUserRole(null))
  }, [])

  const cards: SettingsCard[] = [
    {
      title: 'บัญชีธนาคาร',
      description: 'จัดการบัญชีธนาคารของโรงเรียน',
      href: '/settings/bank-accounts',
      icon: <Landmark size={24} />,
    },
    {
      title: 'ประเภทเงิน',
      description: 'จัดการประเภทเงินงบประมาณและนอกงบประมาณ',
      href: '/settings/budget-types',
      icon: <Tags size={24} />,
    },
    {
      title: 'รายการรายงานเงินคงเหลือ',
      description: 'ตั้งค่ารายการที่แสดงในรายงานเงินคงเหลือ',
      href: '/settings/balance-template',
      icon: <FileSpreadsheet size={24} />,
    },
    {
      title: 'ตั้งค่า Workflow',
      description: 'กำหนดขั้นตอนการอนุมัติเบิกจ่าย',
      href: '/settings/workflow',
      icon: <GitBranch size={24} />,
    },
    {
      title: 'ผู้ใช้งาน',
      description: 'จัดการบัญชีผู้ใช้งานระบบ',
      href: '/settings/users',
      icon: <Users size={24} />,
      adminOnly: true,
    },
    {
      title: 'สิทธิ์การใช้งาน',
      description: 'กำหนดสิทธิ์การเข้าถึงของแต่ละบทบาท',
      href: '/settings/permissions',
      icon: <Shield size={24} />,
      adminOnly: true,
    },
  ]

  const visibleCards = cards.filter(
    (card) => !card.adminOnly || userRole === 'ADMIN',
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="ตั้งค่าระบบ"
        subtitle="จัดการการตั้งค่าต่าง ๆ ของระบบ"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCards.map((card) => (
          <button
            key={card.href}
            onClick={() => router.push(card.href)}
            className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {card.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-primary">
                {card.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{card.description}</p>
            </div>
            <ChevronRight
              size={18}
              className="text-gray-400 group-hover:text-primary transition-colors flex-shrink-0"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
