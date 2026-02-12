-- CreateTable
CREATE TABLE "print_templates" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "templateType" TEXT NOT NULL,
    "htmlTemplate" TEXT NOT NULL,
    "headerTemplate" TEXT,
    "footerTemplate" TEXT,
    "paperSize" TEXT NOT NULL DEFAULT 'A4',
    "orientation" TEXT NOT NULL DEFAULT 'portrait',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "print_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "print_logs" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "periodId" TEXT,
    "documentNumber" TEXT,
    "documentDate" TIMESTAMP(3),
    "printedBy" TEXT NOT NULL,
    "printedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileUrl" TEXT,
    "metadata" JSONB,

    CONSTRAINT "print_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_numbering" (
    "id" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "lastNumber" TEXT,
    "documentType" TEXT NOT NULL,
    "departmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_numbering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "print_templates_code_key" ON "print_templates"("code");

-- CreateIndex
CREATE INDEX "print_logs_periodId_idx" ON "print_logs"("periodId");

-- CreateIndex
CREATE INDEX "print_logs_printedAt_idx" ON "print_logs"("printedAt");

-- CreateIndex
CREATE UNIQUE INDEX "document_numbering_prefix_year_documentType_departmentId_key" ON "document_numbering"("prefix", "year", "documentType", "departmentId");

-- AddForeignKey
ALTER TABLE "print_logs" ADD CONSTRAINT "print_logs_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "print_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "print_logs" ADD CONSTRAINT "print_logs_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "payroll_periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_numbering" ADD CONSTRAINT "document_numbering_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
