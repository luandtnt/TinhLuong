-- AlterTable
ALTER TABLE "timesheets" ADD COLUMN     "batchId" TEXT;

-- CreateTable
CREATE TABLE "timesheet_batches" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "status" "OtBatchStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_batches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_batches_code_key" ON "timesheet_batches"("code");

-- CreateIndex
CREATE INDEX "timesheet_batches_year_month_idx" ON "timesheet_batches"("year", "month");

-- CreateIndex
CREATE INDEX "timesheets_batchId_idx" ON "timesheets"("batchId");

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "timesheet_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
