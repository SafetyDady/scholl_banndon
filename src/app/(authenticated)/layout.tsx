import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import AuthenticatedShell from '@/components/layout/AuthenticatedShell'

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSession()

  if (!user) {
    redirect('/login')
  }

  const userInfo = {
    role: user.role,
    fullName: user.fullName,
  }

  return <AuthenticatedShell user={userInfo}>{children}</AuthenticatedShell>
}
