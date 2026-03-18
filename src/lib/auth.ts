import { cookies } from 'next/headers'
import { prisma } from './db'

export async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session_id')?.value
  if (!sessionId) return null

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: sessionId } })
    }
    return null
  }

  return session.user
}

export async function requireAuth() {
  const user = await getSession()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireRole(roles: string[]) {
  const user = await requireAuth()
  if (!roles.includes(user.role)) {
    throw new Error('Forbidden')
  }
  return user
}

export async function createSession(userId: number) {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

  const session = await prisma.session.create({
    data: { userId, expiresAt },
  })

  const cookieStore = await cookies()
  cookieStore.set('session_id', session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })

  return session
}

export async function destroySession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session_id')?.value
  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {})
    cookieStore.delete('session_id')
  }
}
