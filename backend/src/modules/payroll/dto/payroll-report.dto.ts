export class PayrollReportByDepartmentDto {
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  employeeCount: number;
  totalGrossSalary: number;
  totalNetSalary: number;
  totalInsurance: number;
  totalTax: number;
}

export class PayrollComparisonDto {
  period1: { year: number; month: number };
  period2: { year: number; month: number };
  totalEmployees1: number;
  totalEmployees2: number;
  totalGrossSalary1: number;
  totalGrossSalary2: number;
  totalNetSalary1: number;
  totalNetSalary2: number;
  difference: number;
  percentageChange: number;
}

export class TaxReportDto {
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  grossIncome: number;
  taxableIncome: number;
  taxDeductions: number;
  personalIncomeTax: number;
  effectiveTaxRate: number;
}

export class InsuranceReportDto {
  employeeId: string;
  employeeCode: string;
  employeeName: string;
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
