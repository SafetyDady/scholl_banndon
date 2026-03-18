export const ROLES = {
  FINANCE_OFFICER: 'ครูการเงิน',
  VICE_PRINCIPAL: 'รองผู้อำนวยการ',
  PRINCIPAL: 'ผู้อำนวยการ',
} as const

export type RoleCode = keyof typeof ROLES

export const WORKFLOW_STEPS = [
  { number: 1, name: 'ยื่นเรื่องของบ', status: 'DRAFT', requiredRole: 'FINANCE_OFFICER' },
  { number: 2, name: 'ทำหนังสือขออนุมัติ', status: 'PENDING_APPROVAL', requiredRole: 'FINANCE_OFFICER', approvalRole: ['VICE_PRINCIPAL', 'PRINCIPAL'] },
  { number: 3, name: 'เบิกเงินที่ธนาคาร', status: 'WITHDRAWN', requiredRole: 'FINANCE_OFFICER' },
  { number: 4, name: 'นำจ่ายผู้รับจ้าง', status: 'PAID', requiredRole: 'FINANCE_OFFICER' },
  { number: 5, name: 'ออกใบ 50 ทวิ', status: 'TAX_ISSUED', requiredRole: 'FINANCE_OFFICER' },
  { number: 6, name: 'แจ้งยอดเงินคงเหลือ', status: 'BALANCE_REPORTED', requiredRole: 'FINANCE_OFFICER' },
  { number: 7, name: 'บันทึกสรุปภาษี', status: 'COMPLETED', requiredRole: 'FINANCE_OFFICER' },
] as const

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'ร่าง', color: 'bg-gray-100 text-gray-800' },
  PENDING_APPROVAL: { label: 'รออนุมัติ', color: 'bg-yellow-100 text-yellow-800' },
  APPROVED: { label: 'อนุมัติแล้ว', color: 'bg-blue-100 text-blue-800' },
  WITHDRAWN: { label: 'เบิกเงินแล้ว', color: 'bg-indigo-100 text-indigo-800' },
  PAID: { label: 'จ่ายเงินแล้ว', color: 'bg-purple-100 text-purple-800' },
  TAX_ISSUED: { label: 'ออกใบ 50 ทวิแล้ว', color: 'bg-pink-100 text-pink-800' },
  BALANCE_REPORTED: { label: 'รายงานยอดแล้ว', color: 'bg-teal-100 text-teal-800' },
  COMPLETED: { label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800' },
  REJECTED: { label: 'ไม่อนุมัติ', color: 'bg-red-100 text-red-800' },
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
