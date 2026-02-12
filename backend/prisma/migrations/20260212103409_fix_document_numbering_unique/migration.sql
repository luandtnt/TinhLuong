/*
  Warnings:

  - A unique constraint covering the columns `[prefix,year,documentType]` on the table `document_numbering` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "document_numbering_prefix_year_documentType_departmentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "document_numbering_prefix_year_documentType_key" ON "document_numbering"("prefix", "year", "documentType");
