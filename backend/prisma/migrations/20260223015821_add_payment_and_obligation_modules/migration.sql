-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BANK_TRANSFER', 'ATM_CARD', 'TREASURY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ObligationType" AS ENUM ('SOCIAL_INSURANCE', 'HEALTH_INSURANCE', 'UNEMPLOYMENT_INS', 'UNION_FEE', 'PERSONAL_INCOME_TAX');

-- CreateEnum
CREATE TYPE "ObligationStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "payment_batches" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'DRAFT',
    "bankCode" TEXT,
    "bankName" TEXT,
    "totalAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "totalEmployees" INTEGER NOT NULL DEFAULT 0,
    "preparedBy" TEXT,
    "reviewedBy" TEXT,
    "approvedBy" TEXT,
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "payrollDetailId" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "departmentName" TEXT,
    "amount" DECIMAL(15,2) NOT NULL,
    "bankAccount" TEXT,
    "bankName" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'DRAFT',
    "paidAt" TIMESTAMP(3),
    "voucherNumber" TEXT,
    "voucherDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obligation_batches" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "obligationType" "ObligationType" NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ObligationStatus" NOT NULL DEFAULT 'DRAFT',
    "totalAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "employeeAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "employerAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "paymentMethod" TEXT,
    "bankAccount" TEXT,
    "bankName" TEXT,
    "voucherNumber" TEXT,
    "voucherDate" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "obligation_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obligations" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "payrollDetailId" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "departmentName" TEXT,
    "employeeAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "employerAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "insuranceBase" DECIMAL(15,2),
    "taxableIncome" DECIMAL(15,2),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "obligations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_batches_code_key" ON "payment_batches"("code");

-- CreateIndex
CREATE INDEX "payments_batchId_idx" ON "payments"("batchId");

-- CreateIndex
CREATE INDEX "payments_employeeId_idx" ON "payments"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "obligation_batches_code_key" ON "obligation_batches"("code");

-- CreateIndex
CREATE INDEX "obligations_batchId_idx" ON "obligations"("batchId");

-- CreateIndex
CREATE INDEX "obligations_employeeId_idx" ON "obligations"("employeeId");

-- AddForeignKey
ALTER TABLE "payment_batches" ADD CONSTRAINT "payment_batches_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "payroll_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "payment_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obligations" ADD CONSTRAINT "obligations_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "obligation_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
