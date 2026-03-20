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
    fullName: user.fullName,
    role: user.role,
  }

  return <AuthenticatedShell user={userInfo}>{children}</AuthenticatedShell>
}
