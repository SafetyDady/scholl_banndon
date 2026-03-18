export interface UserInfo {
  id: number
  username: string
  fullName: string
  position: string
  role: string
  isActive: boolean
}

export interface DisbursementWithRelations {
  id: number
  sequenceNumber: number | null
  fiscalYear: number
  requestDate: string
  memoNumber: string | null
  budgetTypeId: number
  description: string
  amount: number
  taxWithheld: number
  netAmount: number
  note: string | null
  currentStep: number
  status: string
  payeeName: string | null
  payeeTaxId: string | null
  payeeAddress: string | null
  createdById: number
  createdAt: string
  updatedAt: string
  budgetType: { id: number; name: string; code: string }
  createdBy: { id: number; fullName: string }
  workflowActions: WorkflowActionInfo[]
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
