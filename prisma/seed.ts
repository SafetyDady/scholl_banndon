import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // ===== 1. USERS =====
  const users = [
    {
      username: 'teacher1',
      passwordHash: hashSync('1234', 10),
      fullName: 'นายสมชาย ใจดี',
      position: 'ครู',
      role: 'TEACHER',
    },
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
      username: 'wipapan',
      passwordHash: hashSync('1234', 10),
      fullName: 'นางสาววิภาพรรณ อุบล',
      position: 'ผู้อำนวยการโรงเรียน',
      role: 'PRINCIPAL',
    },
    {
      username: 'admin',
      passwordHash: hashSync('1234', 10),
      fullName: 'ผู้ดูแลระบบ',
      position: 'ผู้ดูแลระบบ',
      role: 'ADMIN',
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    })
  }

  // ===== 2. BUDGET TYPES =====
  const budgetTypes = [
    { code: 'GENERAL_SUBSIDY', name: 'เงินอุดหนุนทั่วไป', category: 'NON_BUDGET', sortOrder: 1 },
    { code: 'LUNCH_PROGRAM', name: 'เงินอุดหนุนโครงการอาหารกลางวัน', category: 'NON_BUDGET', sortOrder: 2 },
    { code: 'MUNICIPALITY', name: 'เงินอุดหนุนเทศบาล', category: 'NON_BUDGET', sortOrder: 3 },
    { code: 'FREE_EDUCATION', name: 'เงินเรียนฟรี 15 ปี', category: 'NON_BUDGET', sortOrder: 4 },
    { code: 'EEF', name: 'เงิน กสศ. (ทุนเสมอภาค)', category: 'NON_BUDGET', sortOrder: 9 },
    { code: 'SCHOOL_REVENUE', name: 'เงินรายได้สถานศึกษา', category: 'NON_BUDGET', sortOrder: 10 },
    { code: 'CONTRACT_GUARANTEE', name: 'เงินประกันสัญญา', category: 'NON_BUDGET', sortOrder: 11 },
    { code: 'WITHHOLDING_TAX', name: 'เงินหักภาษี ณ ที่จ่าย', category: 'NON_BUDGET', sortOrder: 12 },
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
      { code: 'FREE_EDU_EQUIPMENT', name: 'เงินเรียนฟรี 15 ปี (ค่าอุปกรณ์การเรียน)', category: 'NON_BUDGET', sortOrder: 5, parentId: freeEdu.id },
      { code: 'FREE_EDU_UNIFORM', name: 'เงินเรียนฟรี 15 ปี (ค่าเครื่องแบบนักเรียน)', category: 'NON_BUDGET', sortOrder: 6, parentId: freeEdu.id },
      { code: 'FREE_EDU_ACTIVITY', name: 'เงินเรียนฟรี 15 ปี (ค่ากิจกรรมพัฒนาคุณภาพ)', category: 'NON_BUDGET', sortOrder: 7, parentId: freeEdu.id },
      { code: 'FREE_EDU_TEXTBOOK', name: 'เงินเรียนฟรี 15 ปี (ค่าหนังสือเรียน)', category: 'NON_BUDGET', sortOrder: 8, parentId: freeEdu.id },
    ]

    for (const st of subTypes) {
      await prisma.budgetType.upsert({
        where: { code: st.code },
        update: {},
        create: st,
      })
    }
  }

  // ===== 3. PERMISSIONS =====
  const permissions = [
    { group: 'disbursement', action: 'view', description: 'ดูรายการเบิกจ่าย' },
    { group: 'disbursement', action: 'create', description: 'สร้างรายการเบิกจ่าย' },
    { group: 'disbursement', action: 'edit', description: 'แก้ไขรายการเบิกจ่าย' },
    { group: 'disbursement', action: 'delete', description: 'ลบรายการเบิกจ่าย' },
    { group: 'disbursement', action: 'workflow', description: 'ส่งรายการเข้ากระบวนการอนุมัติ' },
    { group: 'approval', action: 'view', description: 'ดูรายการรออนุมัติ' },
    { group: 'approval', action: 'approve', description: 'อนุมัติรายการเบิกจ่าย' },
    { group: 'balance', action: 'view', description: 'ดูรายงานยอมคงเหลือ' },
    { group: 'balance', action: 'manage', description: 'จัดการยอดคงเหลือ' },
    { group: 'tax', action: 'view', description: 'ดูข้อมูลภาษี' },
    { group: 'tax', action: 'manage', description: 'จัดการข้อมูลภาษี' },
    { group: 'report', action: 'view', description: 'ดูรายงาน' },
    { group: 'print', action: 'print', description: 'พิมพ์เอกสาร' },
    { group: 'admin', action: 'users', description: 'จัดการผู้ใช้งาน' },
    { group: 'admin', action: 'roles', description: 'จัดการบทบาท' },
    { group: 'admin', action: 'settings', description: 'จัดการการตั้งค่าระบบ' },
    // New permissions
    { group: 'bank_account', action: 'manage', description: 'จัดการบัญชีธนาคาร' },
    { group: 'budget_type', action: 'manage', description: 'จัดการประเภทเงิน' },
    { group: 'transaction', action: 'view', description: 'ดูรายการเงินเคลื่อนไหว' },
    { group: 'transaction', action: 'create', description: 'บันทึกเงินเข้า' },
    { group: 'reconciliation', action: 'manage', description: 'กระทบยอด' },
    { group: 'reconciliation', action: 'view', description: 'ดูผลกระทบยอด' },
  ]

  const createdPermissions: Record<string, number> = {}

  for (const perm of permissions) {
    const result = await prisma.permission.upsert({
      where: { group_action: { group: perm.group, action: perm.action } },
      update: { description: perm.description },
      create: perm,
    })
    createdPermissions[`${perm.group}.${perm.action}`] = result.id
  }

  // ===== 4. ROLE-PERMISSION GRANTS =====
  const roleGrants: Record<string, string[]> = {
    TEACHER: [
      'disbursement.view',
      'report.view',
    ],
    FINANCE_OFFICER: [
      'disbursement.view',
      'disbursement.create',
      'disbursement.edit',
      'disbursement.delete',
      'disbursement.workflow',
      'balance.view',
      'balance.manage',
      'tax.view',
      'tax.manage',
      'report.view',
      'print.print',
      'bank_account.manage',
      'budget_type.manage',
      'transaction.view',
      'transaction.create',
      'reconciliation.manage',
      'reconciliation.view',
    ],
    VICE_PRINCIPAL: [
      'disbursement.view',
      'approval.view',
      'approval.approve',
      'balance.view',
      'tax.view',
      'report.view',
      'print.print',
      'reconciliation.view',
    ],
    PRINCIPAL: [
      'disbursement.view',
      'approval.view',
      'approval.approve',
      'balance.view',
      'tax.view',
      'report.view',
      'print.print',
      'reconciliation.view',
    ],
    ADMIN: Object.keys(createdPermissions), // All permissions
  }

  for (const [role, permKeys] of Object.entries(roleGrants)) {
    for (const key of permKeys) {
      const permissionId = createdPermissions[key]
      if (permissionId) {
        await prisma.rolePermission.upsert({
          where: { role_permissionId: { role, permissionId } },
          update: { granted: true },
          create: { role, permissionId, granted: true },
        })
      }
    }
  }

  // ===== 5. WORKFLOW SETTINGS =====
  const workflowSettings = [
    {
      key: 'approval_mode',
      value: 'self',
      description: 'โหมดการอนุมัติ: self = ครูการเงินทำเอง, approval = ต้องผ่านอนุมัติ',
    },
    {
      key: 'approval_steps',
      value: 'principal',
      description: 'ขั้นตอนอนุมัติ: vice_principal, principal, both',
    },
  ]

  for (const ws of workflowSettings) {
    await prisma.workflowSetting.upsert({
      where: { key: ws.key },
      update: {},
      create: ws,
    })
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
