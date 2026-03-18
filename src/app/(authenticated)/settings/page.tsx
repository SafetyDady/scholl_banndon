'use client'

import { useEffect, useState } from 'react'
import { ROLES } from '@/lib/constants'

interface UserItem {
  id: number
  username: string
  fullName: string
  position: string
  role: string
  isActive: boolean
  createdAt: string
}

export default function SettingsPage() {
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) throw new Error('ไม่มีสิทธิ์เข้าถึง')
          throw new Error('เกิดข้อผิดพลาด')
        }
        return res.json()
      })
      .then((json) => {
        if (Array.isArray(json)) setUsers(json)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const getRoleName = (role: string): string => {
    return ROLES[role as keyof typeof ROLES] ?? role
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ตั้งค่าระบบ</h1>
        <p className="text-sm text-gray-500 mt-1">จัดการผู้ใช้งานและการตั้งค่า</p>
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">ผู้ใช้งาน</h2>
        </div>

        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500">
            {error}
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">ชื่อ-สกุล</th>
                  <th className="px-4 py-3 font-medium">ตำแหน่ง</th>
                  <th className="px-4 py-3 font-medium">บทบาท</th>
                  <th className="px-4 py-3 font-medium text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.position}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {getRoleName(user.role)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? 'ใช้งาน' : 'ปิดการใช้งาน'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            ไม่พบข้อมูลผู้ใช้งาน
          </div>
        )}
      </div>
    </div>
  )
}
