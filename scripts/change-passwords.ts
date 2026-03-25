import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'

const prisma = new PrismaClient()

const PASSWORDS: Record<string, string> = {
  montira: process.env.MONTIRA_PASSWORD || 'Jeab271223',
  admin: process.env.ADMIN_PASSWORD || 'Saiyot5651',
}

async function main() {
  for (const [username, password] of Object.entries(PASSWORDS)) {
    const hash = hashSync(password, 10)
    const user = await prisma.user.update({
      where: { username },
      data: { passwordHash: hash },
    })
    console.log(`✅ Updated password for ${username} (${user.fullName})`)
  }
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
