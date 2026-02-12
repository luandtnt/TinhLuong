// Payroll Domain Types

export type PayrollStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'CLOSED' | 'ACCOUNTED' | 'PAID';
export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'RESIGNED';
export type OtType = 'WEEKDAY' | 'WEEKEND' | 'HOLIDAY' | 'NIGHT_SHIFT' | 'COMPENSATORY';
export type ClawbackType = 'SALARY_REDUCTION' | 'ALLOWANCE_REDUCTION' | 'OVERPAYMENT' | 'OTHER';
export type ComponentType = 'SALARY' | 'ALLOWANCE' | 'BONUS' | 'DEDUCTION' | 'OT_PAY';
export type InsuranceType = 'SOCIAL' | 'HEALTH' | 'UNEMPLOYMENT' | 'UNION';

// Department
export interface Department {
  id: string;
  code: string;
  name: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Employee
export interface Employee {
  id: string;
  code: string;
  fullName: string;
  email?: string;
  phone?: string;
  departmentId: string;
  department?: Department;
  position?: string;
  joinDate: string;
  status: EmployeeStatus;
  baseSalary: number;
  salaryCoefficient: number;
  kpiBonus: number;
  createdAt: string;
  updatedAt: string;
}

// Salary Component
export interface SalaryComponent {
  id: string;
  code: string;
  name: string;
  type: ComponentType;
  isTaxable: boolean;
  isInsurable: boolean;
  accountingCode?: string;
  category?: string;
  subCategory?: string;
  effectiveDate: string;
  expiryDate?: string;
  isActive: boolean;
}

// Insurance Rate
export interface InsuranceRate {
  id: string;
  name: string;
  employeeRate: number;
  employerRate: number;
  type: InsuranceType;
  effectiveDate: string;
  expiryDate?: string;
  isActive: boolean;
}

// OT Rule
export interface OtRule {
  id: string;
  name: string;
  otType: OtType;
  multiplier: number;
  effectiveDate: string;
  expiryDate?: string;
  isActive: boolean;
}

// Tax Bracket
export interface TaxBracket {
  id: string;
  fromAmount: number;
  toAmount?: number;
  rate: number;
  deduction: number;
  effectiveDate: string;
  expiryDate?: string;
  isActive: boolean;
}

// Payroll Period
export interface PayrollPeriod {
  id: string;
  code: string;
  year: number;
  month: number;
  status: PayrollStatus;
  snapshotConfig?: any;
  submittedAt?: string;
  approvedAt?: string;
  closedAt?: string;
  accountedAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Payroll Detail
export interface PayrollDetail {
  id: string;
  periodId: string;
  period?: PayrollPeriod;
  employeeId: string;
  employee?: Employee;
  baseSalary: number;
  salaryCoefficient: number;
  standardWorkDays: number;
  actualWorkDays: number;
  paidLeaveDays: number;
  unpaidLeaveDays: number;
  actualSalary: number;
  allowances: Record<string, number>;
  bonuses: Record<string, number>;
  kpiBonus: number;
  otAmount: number;
  deductions: Record<string, number>;
  clawbackAmount: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentIns: number;
  unionFee: number;
  taxableIncome: number;
  taxDeductions: number;
  personalIncomeTax: number;
  grossSalary: number;
  netSalary: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Calculation Result (from API)
export interface CalculationResult {
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  baseSalary: number;
  salaryCoefficient: number;
  standardWorkDays: number;
  actualWorkDays: number;
  paidLeaveDays: number;
  unpaidLeaveDays: number;
  actualSalary: number;
  allowances: Record<string, number>;
  kpiBonus: number;
  otAmount: number;
  deductions: Record<string, number>;
  clawbackAmount: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentIns: number;
  unionFee: number;
  taxableIncome: number;
  taxDeductions: number;
  personalIncomeTax: number;
  grossSalary: number;
  netSalary: number;
}

// Timesheet
export interface Timesheet {
  id: string;
  employeeId: string;
  employee?: Employee;
  year: number;
  month: number;
  workDays: number;
  leaveDays: number;
  unpaidLeaveDays: number;
  createdAt: string;
  updatedAt: string;
}

// OT Batch
export interface OtBatch {
  id: string;
  code: string;
  periodId: string;
  period?: PayrollPeriod;
  name: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  totalAmount: number;
  submittedAt?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// OT Record
export interface OtRecord {
  id: string;
  batchId: string;
  batch?: OtBatch;
  employeeId: string;
  employee?: Employee;
  date: string;
  otType: OtType;
  hours: number;
  hourlyRate: number;
  multiplier: number;
  amount: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Clawback Batch
export interface ClawbackBatch {
  id: string;
  code: string;
  name: string;
  deductPeriodId: string;
  deductPeriod?: PayrollPeriod;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  totalAmount: number;
  submittedAt?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Clawback
export interface Clawback {
  id: string;
  batchId: string;
  batch?: ClawbackBatch;
  employeeId: string;
  employee?: Employee;
  clawbackType: ClawbackType;
  originalYear: number;
  originalMonth: number;
  amount: number;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

// DTOs for API
export interface CreateTimesheetDto {
  employeeId: string;
  year: number;
  month: number;
  workDays: number;
  leaveDays: number;
  unpaidLeaveDays: number;
}

export interface CreateOtRecordDto {
  employeeId: string;
  date: string;
  otType: OtType;
  hours: number;
  note?: string;
}

export interface CreateClawbackDto {
  employeeId: string;
  clawbackType: ClawbackType;
  originalYear: number;
  originalMonth: number;
  amount: number;
  reason: string;
}

export interface CalculatePayrollDto {
  periodId: string;
}

// ============================================
// PRINT TEMPLATES
// ============================================

export interface PrintTemplate {
  id: string;
  code: string;
  name: string;
  description?: string;
  templateType: string;
  paperSize: string;
  orientation: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PrintLog {
  id: string;
  templateId: string;
  template: PrintTemplate;
  periodId?: string;
  documentNumber?: string;
  documentDate?: string;
  printedBy: string;
  printedAt: string;
  fileUrl?: string;
  metadata?: any;
}
