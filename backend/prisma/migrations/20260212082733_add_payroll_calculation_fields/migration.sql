-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "kpiBonus" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "salaryCoefficient" DECIMAL(5,2) NOT NULL DEFAULT 1.0;

-- AlterTable
ALTER TABLE "payroll_details" ADD COLUMN     "actualSalary" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "actualWorkDays" DECIMAL(5,2) NOT NULL DEFAULT 0,
ADD COLUMN     "kpiBonus" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "paidLeaveDays" DECIMAL(5,2) NOT NULL DEFAULT 0,
ADD COLUMN     "salaryCoefficient" DECIMAL(5,2) NOT NULL DEFAULT 1.0,
ADD COLUMN     "standardWorkDays" DECIMAL(5,2) NOT NULL DEFAULT 22,
ADD COLUMN     "unpaidLeaveDays" DECIMAL(5,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "salary_components" ADD COLUMN     "defaultAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "isFixedAmount" BOOLEAN NOT NULL DEFAULT true;
