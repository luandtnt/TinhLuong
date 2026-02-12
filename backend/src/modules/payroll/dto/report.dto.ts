export class PayrollReportQueryDto {
  periodId?: string;
  departmentId?: string;
  fromMonth?: number;
  fromYear?: number;
  toMonth?: number;
  toYear?: number;
}

export interface DepartmentSummary {
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  employeeCount: number;
  totalGrossSalary: number;
  totalNetSalary: number;
  totalInsurance: number;
  totalTax: number;
}

export interface PeriodComparison {
  period: string;
  year: number;
  month: number;
  employeeCount: number;
  totalGrossSalary: number;
  totalNetSalary: number;
  totalInsurance: number;
  totalTax: number;
}

export interface TaxDetail {
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  departmentName: string;
  grossIncome: number;
  taxableIncome: number;
  taxDeductions: number;
  personalIncomeTax: number;
  effectiveTaxRate: number;
}

export interface InsuranceDetail {
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  departmentName: string;
  insuranceBase: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentIns: number;
  unionFee: number;
  totalInsurance: number;
  employerSocialIns: number;
  employerHealthIns: number;
  employerUnemploymentIns: number;
  totalEmployerIns: number;
}
