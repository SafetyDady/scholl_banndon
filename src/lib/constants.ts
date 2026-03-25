export const ROLES = {
  TEACHER: 'ครู',
  FINANCE_OFFICER: 'ครูการเงิน',
  VICE_PRINCIPAL: 'รองผู้อำนวยการ',
  PRINCIPAL: 'ผู้อำนวยการ',
  ADMIN: 'ผู้ดูแลระบบ',
} as const

export type RoleCode = keyof typeof ROLES

export const WORKFLOW_STEPS = [
  { number: 1, name: 'ยื่นเรื่องของบ', status: 'DRAFT', requiredRole: 'FINANCE_OFFICER' },
  { number: 2, name: 'ขออนุมัติ', status: 'PENDING_APPROVAL', requiredRole: 'FINANCE_OFFICER', approvalRole: ['VICE_PRINCIPAL', 'PRINCIPAL'] },
  { number: 3, name: 'เบิกเงินที่ธนาคาร', status: 'WITHDRAWN', requiredRole: 'FINANCE_OFFICER' },
  { number: 4, name: 'บันทึกการจ่ายเงิน', status: 'COMPLETED', requiredRole: 'FINANCE_OFFICER' },
] as const

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'ร่าง', color: 'muted' },
  PENDING_APPROVAL: { label: 'รออนุมัติ', color: 'warning' },
  APPROVED: { label: 'อนุมัติแล้ว', color: 'info' },
  WITHDRAWN: { label: 'เบิกเงินแล้ว', color: 'info' },
  PAID: { label: 'จ่ายเงินแล้ว', color: 'success' },
  COMPLETED: { label: 'เสร็จสิ้น', color: 'success' },
  REJECTED: { label: 'ไม่อนุมัติ', color: 'destructive' },
}

export const BUDGET_TYPES = [
  { code: 'GENERAL_SUBSIDY', name: 'เงินอุดหนุนทั่วไป', sortOrder: 1 },
  { code: 'LUNCH_PROGRAM', name: 'เงินอุดหนุนโครงการอาหารกลางวัน', sortOrder: 2 },
  { code: 'MUNICIPALITY', name: 'เงินอุดหนุนเทศบาล', sortOrder: 3 },
  { code: 'FREE_EDUCATION', name: 'เงินเรียนฟรี 15 ปี', sortOrder: 4 },
  { code: 'FREE_EDU_EQUIPMENT', name: 'เงินเรียนฟรี 15 ปี (ค่าอุปกรณ์การเรียน)', sortOrder: 5, parentCode: 'FREE_EDUCATION' },
  { code: 'FREE_EDU_UNIFORM', name: 'เงินเรียนฟรี 15 ปี (ค่าเครื่องแบบนักเรียน)', sortOrder: 6, parentCode: 'FREE_EDUCATION' },
  { code: 'FREE_EDU_ACTIVITY', name: 'เงินเรียนฟรี 15 ปี (ค่ากิจกรรมพัฒนาคุณภาพ)', sortOrder: 7, parentCode: 'FREE_EDUCATION' },
  { code: 'FREE_EDU_TEXTBOOK', name: 'เงินเรียนฟรี 15 ปี (ค่าหนังสือเรียน)', sortOrder: 8, parentCode: 'FREE_EDUCATION' },
  { code: 'EEF', name: 'เงิน กสศ. (ทุนเสมอภาค)', sortOrder: 9 },
  { code: 'SCHOOL_REVENUE', name: 'เงินรายได้สถานศึกษา', sortOrder: 10 },
  { code: 'CONTRACT_GUARANTEE', name: 'เงินประกันสัญญา', sortOrder: 11 },
  { code: 'WITHHOLDING_TAX', name: 'เงินหักภาษี ณ ที่จ่าย', sortOrder: 12 },
]

export interface SidebarMenuItem {
  label: string
  icon: string
  path: string
  roles?: RoleCode[]
}

export interface SidebarSection {
  title: string
  items: SidebarMenuItem[]
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'การเงิน',
    items: [
      { label: 'หน้าหลัก', icon: 'LayoutDashboard', path: '/dashboard' },
      { label: 'รายการเบิกจ่าย', icon: 'FileText', path: '/disbursements' },
      { label: 'รายการรออนุมัติ', icon: 'ClipboardCheck', path: '/approvals', roles: ['VICE_PRINCIPAL', 'PRINCIPAL', 'ADMIN'] },
      { label: 'เงินเคลื่อนไหว', icon: 'ArrowLeftRight', path: '/transactions' },
      { label: 'สมุดบัญชี', icon: 'BookOpen', path: '/bank-statements' },
      { label: 'รายงานเงินคงเหลือ', icon: 'Wallet', path: '/balance' },
      { label: 'กระทบยอด', icon: 'Scale', path: '/reconciliation' },
      { label: 'หักภาษี ณ ที่จ่าย', icon: 'Receipt', path: '/tax' },
    ],
  },
  {
    title: 'ตั้งค่า',
    items: [
      { label: 'ข้อมูลโรงเรียน', icon: 'School', path: '/settings/school-info', roles: ['FINANCE_OFFICER', 'ADMIN'] },
      { label: 'บัญชีธนาคาร', icon: 'Landmark', path: '/settings/bank-accounts', roles: ['FINANCE_OFFICER', 'ADMIN'] },
      { label: 'ประเภทเงิน', icon: 'Tags', path: '/settings/budget-types', roles: ['FINANCE_OFFICER', 'ADMIN'] },
      { label: 'ผู้รับเงิน', icon: 'UserCheck', path: '/settings/contractors', roles: ['FINANCE_OFFICER', 'ADMIN'] },
      { label: 'รายการรายงานคงเหลือ', icon: 'FileSpreadsheet', path: '/settings/balance-template', roles: ['FINANCE_OFFICER', 'ADMIN'] },
      { label: 'ตั้งค่า Workflow', icon: 'GitBranch', path: '/settings/workflow', roles: ['FINANCE_OFFICER', 'ADMIN'] },
      { label: 'ผู้ใช้งาน', icon: 'Users', path: '/settings/users', roles: ['ADMIN'] },
      { label: 'สิทธิ์การใช้งาน', icon: 'Shield', path: '/settings/permissions', roles: ['ADMIN'] },
    ],
  },
]
