-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "lineUserId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "group" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "granted" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "branch" TEXT,
    "accountType" TEXT NOT NULL DEFAULT 'SAVINGS',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'NON_BUDGET',
    "parentId" INTEGER,
    "bankAccountId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BudgetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovalRequest" (
    "id" SERIAL NOT NULL,
    "sequenceNumber" INTEGER,
    "fiscalYear" INTEGER NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "memoNumber" TEXT,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "note" TEXT,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApprovalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisbursementGroup" (
    "id" SERIAL NOT NULL,
    "approvalRequestId" INTEGER NOT NULL,
    "budgetTypeId" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DisbursementGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisbursementItem" (
    "id" SERIAL NOT NULL,
    "disbursementGroupId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "taxWithheld" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "payeeName" TEXT,
    "payeeTaxId" TEXT,
    "payeeAddress" TEXT,
    "note" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DisbursementItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowAction" (
    "id" SERIAL NOT NULL,
    "approvalRequestId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "stepName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "comment" TEXT,
    "performedById" INTEGER NOT NULL,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowSetting" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoneyTransaction" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "budgetTypeId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "approvalRequestId" INTEGER,
    "note" TEXT,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoneyTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxCertificate" (
    "id" SERIAL NOT NULL,
    "disbursementItemId" INTEGER NOT NULL,
    "certificateNo" TEXT,
    "payeeName" TEXT NOT NULL,
    "payeeTaxId" TEXT,
    "payeeAddress" TEXT,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentType" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "taxWithheld" DOUBLE PRECISION NOT NULL,
    "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "fiscalYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxPaymentSummary" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "payeeName" TEXT NOT NULL,
    "totalPaid" DOUBLE PRECISION NOT NULL,
    "totalTax" DOUBLE PRECISION NOT NULL,
    "paidDate" TIMESTAMP(3),
    "receiptNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxPaymentSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceReport" (
    "id" SERIAL NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "memoNumber" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceEntry" (
    "id" SERIAL NOT NULL,
    "balanceReportId" INTEGER NOT NULL,
    "budgetTypeId" INTEGER NOT NULL,
    "cash" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bankDeposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "accumulated" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "remark" TEXT,

    CONSTRAINT "BalanceEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "taxId" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankStatement" (
    "id" SERIAL NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "withdrawal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balance" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "approvalRequestId" INTEGER,
    "moneyTransactionId" INTEGER,
    "matchStatus" TEXT NOT NULL DEFAULT 'UNMATCHED',
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reconciliation" (
    "id" SERIAL NOT NULL,
    "reconcileDate" TIMESTAMP(3) NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "systemBalance" DOUBLE PRECISION NOT NULL,
    "actualBalance" DOUBLE PRECISION NOT NULL,
    "difference" DOUBLE PRECISION NOT NULL,
    "isMatched" BOOLEAN NOT NULL,
    "remark" TEXT,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_lineUserId_key" ON "User"("lineUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_group_action_key" ON "Permission"("group", "action");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_role_permissionId_key" ON "RolePermission"("role", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountNumber_key" ON "BankAccount"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetType_name_key" ON "BudgetType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetType_code_key" ON "BudgetType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "DisbursementGroup_approvalRequestId_budgetTypeId_key" ON "DisbursementGroup"("approvalRequestId", "budgetTypeId");

-- CreateIndex
CREATE INDEX "WorkflowAction_approvalRequestId_stepNumber_idx" ON "WorkflowAction"("approvalRequestId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowSetting_key_key" ON "WorkflowSetting"("key");

-- CreateIndex
CREATE INDEX "MoneyTransaction_bankAccountId_transactionDate_idx" ON "MoneyTransaction"("bankAccountId", "transactionDate");

-- CreateIndex
CREATE INDEX "MoneyTransaction_transactionDate_idx" ON "MoneyTransaction"("transactionDate");

-- CreateIndex
CREATE UNIQUE INDEX "TaxCertificate_disbursementItemId_key" ON "TaxCertificate"("disbursementItemId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxPaymentSummary_month_year_payeeName_key" ON "TaxPaymentSummary"("month", "year", "payeeName");

-- CreateIndex
CREATE UNIQUE INDEX "BalanceReport_reportDate_fiscalYear_key" ON "BalanceReport"("reportDate", "fiscalYear");

-- CreateIndex
CREATE UNIQUE INDEX "BalanceEntry_balanceReportId_budgetTypeId_key" ON "BalanceEntry"("balanceReportId", "budgetTypeId");

-- CreateIndex
CREATE INDEX "BankStatement_bankAccountId_transactionDate_idx" ON "BankStatement"("bankAccountId", "transactionDate");

-- CreateIndex
CREATE UNIQUE INDEX "Reconciliation_reconcileDate_bankAccountId_key" ON "Reconciliation"("reconcileDate", "bankAccountId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetType" ADD CONSTRAINT "BudgetType_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BudgetType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetType" ADD CONSTRAINT "BudgetType_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisbursementGroup" ADD CONSTRAINT "DisbursementGroup_approvalRequestId_fkey" FOREIGN KEY ("approvalRequestId") REFERENCES "ApprovalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisbursementGroup" ADD CONSTRAINT "DisbursementGroup_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "BudgetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisbursementItem" ADD CONSTRAINT "DisbursementItem_disbursementGroupId_fkey" FOREIGN KEY ("disbursementGroupId") REFERENCES "DisbursementGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowAction" ADD CONSTRAINT "WorkflowAction_approvalRequestId_fkey" FOREIGN KEY ("approvalRequestId") REFERENCES "ApprovalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowAction" ADD CONSTRAINT "WorkflowAction_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransaction" ADD CONSTRAINT "MoneyTransaction_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransaction" ADD CONSTRAINT "MoneyTransaction_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "BudgetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransaction" ADD CONSTRAINT "MoneyTransaction_approvalRequestId_fkey" FOREIGN KEY ("approvalRequestId") REFERENCES "ApprovalRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransaction" ADD CONSTRAINT "MoneyTransaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxCertificate" ADD CONSTRAINT "TaxCertificate_disbursementItemId_fkey" FOREIGN KEY ("disbursementItemId") REFERENCES "DisbursementItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceEntry" ADD CONSTRAINT "BalanceEntry_balanceReportId_fkey" FOREIGN KEY ("balanceReportId") REFERENCES "BalanceReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceEntry" ADD CONSTRAINT "BalanceEntry_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "BudgetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankStatement" ADD CONSTRAINT "BankStatement_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankStatement" ADD CONSTRAINT "BankStatement_approvalRequestId_fkey" FOREIGN KEY ("approvalRequestId") REFERENCES "ApprovalRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankStatement" ADD CONSTRAINT "BankStatement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reconciliation" ADD CONSTRAINT "Reconciliation_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reconciliation" ADD CONSTRAINT "Reconciliation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
