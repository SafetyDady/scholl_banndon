import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const users = [
    {
      username: 'montira',
      passwordHash: hashSync('1234', 10),
      fullName: 'นางมณฑิรา สายยศ',
      position: 'ครูชำนาญการพิเศษ',
      role: 'FINANCE_OFFICER',
    },
    {
      username: 'suttida',
      passwordHash: hashSync('1234', 10),
      fullName: 'นางสาวสุทธิดา สุทธิ',
      position: 'รองผู้อำนวยการโรงเรียน',
      role: 'VICE_PRINCIPAL',
    },
    {
      username: 'pakawan',
      passwordHash: hashSync('1234', 10),
      fullName: 'นางภควรรณ มีเจริญ',
      position: 'รองผู้อำนวยการโรงเรียน',
      role: 'VICE_PRINCIPAL',
    },
    {
      username: 'wipapan',
      passwordHash: hashSync('1234', 10),
      fullName: 'นางสาววิภาพรรณ อุบล',
      position: 'ผู้อำนวยการโรงเรียน',
      role: 'PRINCIPAL',
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    })
  }

  // Create budget types
  const budgetTypes = [
    { code: 'GENERAL_SUBSIDY', name: 'เงินอุดหนุนทั่วไป', sortOrder: 1 },
    { code: 'LUNCH_PROGRAM', name: 'เงินอุดหนุนโครงการอาหารกลางวัน', sortOrder: 2 },
    { code: 'MUNICIPALITY', name: 'เงินอุดหนุนเทศบาล', sortOrder: 3 },
    { code: 'FREE_EDUCATION', name: 'เงินเรียนฟรี 15 ปี', sortOrder: 4 },
    { code: 'EEF', name: 'เงิน กสศ. (ทุนเสมอภาค)', sortOrder: 9 },
    { code: 'SCHOOL_REVENUE', name: 'เงินรายได้สถานศึกษา', sortOrder: 10 },
    { code: 'CONTRACT_GUARANTEE', name: 'เงินประกันสัญญา', sortOrder: 11 },
    { code: 'WITHHOLDING_TAX', name: 'เงินหักภาษี ณ ที่จ่าย', sortOrder: 12 },
  ]

  for (const bt of budgetTypes) {
    await prisma.budgetType.upsert({
      where: { code: bt.code },
      update: {},
      create: bt,
    })
  }

  // Create sub-types under FREE_EDUCATION
  const freeEdu = await prisma.budgetType.findUnique({ where: { code: 'FREE_EDUCATION' } })
  if (freeEdu) {
    const subTypes = [
      { code: 'FREE_EDU_EQUIPMENT', name: 'เงินเรียนฟรี 15 ปี (ค่าอุปกรณ์การเรียน)', sortOrder: 5, parentId: freeEdu.id },
      { code: 'FREE_EDU_UNIFORM', name: 'เงินเรียนฟรี 15 ปี (ค่าเครื่องแบบนักเรียน)', sortOrder: 6, parentId: freeEdu.id },
      { code: 'FREE_EDU_ACTIVITY', name: 'เงินเรียนฟรี 15 ปี (ค่ากิจกรรมพัฒนาคุณภาพ)', sortOrder: 7, parentId: freeEdu.id },
      { code: 'FREE_EDU_TEXTBOOK', name: 'เงินเรียนฟรี 15 ปี (ค่าหนังสือเรียน)', sortOrder: 8, parentId: freeEdu.id },
    ]

    for (const st of subTypes) {
      await prisma.budgetType.upsert({
        where: { code: st.code },
        update: {},
        create: st,
      })
    }
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
