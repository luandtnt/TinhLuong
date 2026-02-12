import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

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

@Injectable()
export class PayrollCalculatorService {
  constructor(private prisma: PrismaService) {}

  /**
   * Tính lương cho một kỳ
   */
  async calculatePayroll(periodId: string): Promise<CalculationResult[]> {
    // Lấy thông tin kỳ lương
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: periodId },
    });

    if (!period) {
      throw new Error('Không tìm thấy kỳ lương');
    }

    // Lấy danh sách nhân viên active
    const employees = await this.prisma.employee.findMany({
      where: { status: 'ACTIVE' },
      include: {
        department: true,
      },
    });

    // Lấy configs
    const [salaryComponents, insuranceRates, taxBrackets] = await Promise.all([
      this.prisma.salaryComponent.findMany({
        where: { isActive: true },
      }),
      this.prisma.insuranceRate.findMany({
        where: { isActive: true },
      }),
      this.prisma.taxBracket.findMany({
        where: { isActive: true },
        orderBy: { fromAmount: 'asc' },
      }),
    ]);

    const results: CalculationResult[] = [];

    for (const employee of employees) {
      const result = await this.calculateEmployeePayroll(
        employee,
        period.year,
        period.month,
        salaryComponents,
        insuranceRates,
        taxBrackets,
      );
      results.push(result);
    }

    return results;
  }

  /**
   * Tính lương cho một nhân viên
   */
  private async calculateEmployeePayroll(
    employee: any,
    year: number,
    month: number,
    salaryComponents: any[],
    insuranceRates: any[],
    taxBrackets: any[],
  ): Promise<CalculationResult> {
    // 1. Lấy thông tin chấm công
    const timesheet = await this.prisma.timesheet.findUnique({
      where: {
        employeeId_year_month: {
          employeeId: employee.id,
          year,
          month,
        },
      },
    });

    const standardWorkDays = 22; // Ngày công chuẩn
    const actualWorkDays = timesheet ? Number(timesheet.workDays) : 0;
    const paidLeaveDays = timesheet ? Number(timesheet.leaveDays) : 0;
    const unpaidLeaveDays = timesheet ? Number(timesheet.unpaidLeaveDays) : 0;

    // 2. Tính lương cơ bản theo ngày công
    const baseSalary = Number(employee.baseSalary);
    const salaryCoefficient = Number(employee.salaryCoefficient || 1.0);
    const workDaysRatio = (actualWorkDays + paidLeaveDays) / standardWorkDays;
    const actualSalary = baseSalary * salaryCoefficient * workDaysRatio;

    // 3. Tính phụ cấp
    const allowances: Record<string, number> = {};
    let totalAllowances = 0;

    for (const component of salaryComponents.filter(c => c.type === 'ALLOWANCE')) {
      const amount = Number(component.defaultAmount);
      if (component.isFixedAmount) {
        // Phụ cấp cố định
        allowances[component.code] = amount;
        totalAllowances += amount;
      } else {
        // Phụ cấp theo ngày công
        const allowanceAmount = amount * workDaysRatio;
        allowances[component.code] = allowanceAmount;
        totalAllowances += allowanceAmount;
      }
    }

    // 4. Thưởng KPI
    const kpiBonus = Number(employee.kpiBonus || 0);

    // 5. Tính OT
    const otRecords = await this.prisma.otRecord.findMany({
      where: {
        employeeId: employee.id,
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
        batch: {
          status: 'APPROVED',
        },
      },
    });

    const otAmount = otRecords.reduce((sum, record) => sum + Number(record.amount), 0);

    // 6. Tính khấu trừ
    const deductions: Record<string, number> = {};
    let totalDeductions = 0;

    for (const component of salaryComponents.filter(c => c.type === 'DEDUCTION')) {
      const amount = Number(component.defaultAmount);
      deductions[component.code] = amount;
      totalDeductions += amount;
    }

    // 7. Truy thu
    const clawbacks = await this.prisma.clawback.findMany({
      where: {
        employeeId: employee.id,
        batch: {
          deductPeriod: {
            year,
            month,
          },
          status: 'APPROVED',
        },
      },
    });

    const clawbackAmount = clawbacks.reduce((sum, cb) => sum + Number(cb.amount), 0);

    // 8. Tính tổng thu nhập trước BH và thuế
    const grossIncome = actualSalary + totalAllowances + kpiBonus + otAmount;

    // 9. Tính bảo hiểm
    const insuranceBase = actualSalary; // Lương đóng BH = lương cơ bản thực tế

    const socialInsRate = insuranceRates.find(r => r.type === 'SOCIAL');
    const healthInsRate = insuranceRates.find(r => r.type === 'HEALTH');
    const unemploymentInsRate = insuranceRates.find(r => r.type === 'UNEMPLOYMENT');
    const unionFeeRate = insuranceRates.find(r => r.type === 'UNION');

    const socialInsurance = insuranceBase * (Number(socialInsRate?.employeeRate || 0) / 100);
    const healthInsurance = insuranceBase * (Number(healthInsRate?.employeeRate || 0) / 100);
    const unemploymentIns = insuranceBase * (Number(unemploymentInsRate?.employeeRate || 0) / 100);
    const unionFee = insuranceBase * (Number(unionFeeRate?.employeeRate || 0) / 100);

    const totalInsurance = socialInsurance + healthInsurance + unemploymentIns + unionFee;

    // 10. Tính thu nhập chịu thuế
    const taxableIncome = grossIncome - totalInsurance;

    // 11. Giảm trừ gia cảnh (11 triệu bản thân + 4.4 triệu/người phụ thuộc)
    const taxDeductions = 11000000; // Mặc định chỉ bản thân

    // 12. Tính thuế TNCN (lũy tiến từng phần)
    const taxableAmount = Math.max(0, taxableIncome - taxDeductions);
    const personalIncomeTax = this.calculateProgressiveTax(taxableAmount, taxBrackets);

    // 13. Tính tổng lương
    const grossSalary = grossIncome;
    const netSalary = grossSalary - totalDeductions - clawbackAmount - totalInsurance - personalIncomeTax;

    return {
      employeeId: employee.id,
      employeeCode: employee.code,
      employeeName: employee.fullName,
      baseSalary,
      salaryCoefficient,
      standardWorkDays,
      actualWorkDays,
      paidLeaveDays,
      unpaidLeaveDays,
      actualSalary: Math.round(actualSalary),
      allowances,
      kpiBonus,
      otAmount: Math.round(otAmount),
      deductions,
      clawbackAmount: Math.round(clawbackAmount),
      socialInsurance: Math.round(socialInsurance),
      healthInsurance: Math.round(healthInsurance),
      unemploymentIns: Math.round(unemploymentIns),
      unionFee: Math.round(unionFee),
      taxableIncome: Math.round(taxableIncome),
      taxDeductions,
      personalIncomeTax: Math.round(personalIncomeTax),
      grossSalary: Math.round(grossSalary),
      netSalary: Math.round(netSalary),
    };
  }

  /**
   * Tính thuế TNCN theo biểu thuế lũy tiến từng phần
   */
  private calculateProgressiveTax(taxableAmount: number, taxBrackets: any[]): number {
    let tax = 0;
    let remainingAmount = taxableAmount;

    for (const bracket of taxBrackets) {
      const fromAmount = Number(bracket.fromAmount);
      const toAmount = bracket.toAmount ? Number(bracket.toAmount) : Infinity;
      const rate = Number(bracket.rate) / 100;

      if (remainingAmount <= 0) break;

      const bracketAmount = Math.min(remainingAmount, toAmount - fromAmount);
      tax += bracketAmount * rate;
      remainingAmount -= bracketAmount;
    }

    return tax;
  }

  /**
   * Lưu kết quả tính lương vào database
   */
  async savePayrollResults(periodId: string, results: CalculationResult[]): Promise<void> {
    for (const result of results) {
      await this.prisma.payrollDetail.upsert({
        where: {
          periodId_employeeId: {
            periodId,
            employeeId: result.employeeId,
          },
        },
        update: {
          baseSalary: result.baseSalary,
          salaryCoefficient: result.salaryCoefficient,
          standardWorkDays: result.standardWorkDays,
          actualWorkDays: result.actualWorkDays,
          paidLeaveDays: result.paidLeaveDays,
          unpaidLeaveDays: result.unpaidLeaveDays,
          actualSalary: result.actualSalary,
          allowances: result.allowances,
          bonuses: {},
          kpiBonus: result.kpiBonus,
          otAmount: result.otAmount,
          deductions: result.deductions,
          clawbackAmount: result.clawbackAmount,
          socialInsurance: result.socialInsurance,
          healthInsurance: result.healthInsurance,
          unemploymentIns: result.unemploymentIns,
          unionFee: result.unionFee,
          taxableIncome: result.taxableIncome,
          taxDeductions: result.taxDeductions,
          personalIncomeTax: result.personalIncomeTax,
          grossSalary: result.grossSalary,
          netSalary: result.netSalary,
        },
        create: {
          periodId,
          employeeId: result.employeeId,
          baseSalary: result.baseSalary,
          salaryCoefficient: result.salaryCoefficient,
          standardWorkDays: result.standardWorkDays,
          actualWorkDays: result.actualWorkDays,
          paidLeaveDays: result.paidLeaveDays,
          unpaidLeaveDays: result.unpaidLeaveDays,
          actualSalary: result.actualSalary,
          allowances: result.allowances,
          bonuses: {},
          kpiBonus: result.kpiBonus,
          otAmount: result.otAmount,
          deductions: result.deductions,
          clawbackAmount: result.clawbackAmount,
          socialInsurance: result.socialInsurance,
          healthInsurance: result.healthInsurance,
          unemploymentIns: result.unemploymentIns,
          unionFee: result.unionFee,
          taxableIncome: result.taxableIncome,
          taxDeductions: result.taxDeductions,
          personalIncomeTax: result.personalIncomeTax,
          grossSalary: result.grossSalary,
          netSalary: result.netSalary,
        },
      });
    }
  }
}
