export interface UserInfo {
  id: number
  username: string
  fullName: string
  position: string
  role: string
  isActive: boolean
}

export interface BankAccountInfo {
  id: number
  bankName: string
  accountNumber: string
  accountName: string
}

export interface BudgetTypeInfo {
  id: number
  name: string
  code: string
  category: string
  bankAccount: BankAccountInfo | null
}

export interface PaymentRecordInfo {
  id: number
  payeeName: string
  amount: number
  taxPercent: number
  taxWithheld: number
  netAmount: number
  paymentDate: string
  taxCertificateNo: string | null
  taxCertificateDate: string | null
  contractor: ContractorInfo | null
}

export interface ContractorInfo {
  id: number
  name: string
  taxId: string | null
  address: string | null
}

export interface DisbursementItemInfo {
  id: number
  description: string
  amount: number
  taxWithheld: number
  netAmount: number
  payeeName: string | null
  payeeTaxId: string | null
  payeeAddress: string | null
  note: string | null
  sortOrder: number
  paymentRecords?: PaymentRecordInfo[]
}

export interface DisbursementGroupInfo {
  id: number
  budgetTypeId: number
  subtotal: number
  sortOrder: number
  budgetType: BudgetTypeInfo
  items: DisbursementItemInfo[]
}

export interface WorkflowActionInfo {
  id: number
  stepNumber: number
  stepName: string
  action: string
  comment: string | null
  performedAt: string
  performedBy: { fullName: string }
}

export interface ApprovalRequestListItem {
  id: number
  sequenceNumber: number | null
  requestDate: string
  memoNumber: string | null
  totalAmount: number
  status: string
  currentStep: number
  createdBy: { id: number; fullName: string }
  disbursementGroups: {
    budgetType: { id: number; name: string; code: string }
  }[]
}

export interface ApprovalRequestDetail {
  id: number
  sequenceNumber: number | null
  fiscalYear: number
  requestDate: string
  memoNumber: string | null
  totalAmount: number
  note: string | null
  currentStep: number
  status: string
  createdById: number
  createdAt: string
  updatedAt: string
  createdBy: { id: number; fullName: string }
  disbursementGroups: DisbursementGroupInfo[]
  workflowActions: WorkflowActionInfo[]
  docSignatories: Record<string, unknown> | null
}

// Keep old type for backward compat if needed
export type DisbursementWithRelations = ApprovalRequestDetail
