import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DepartmentSummary, PeriodComparison, TaxDetail, InsuranceDetail } from './dto/report.dto';

@Injectable()
export class PayrollReportService {
  constructor(private prisma: PrismaService) {}

  /**
   * Báo cáo tổng hợp theo phòng ban
   */
  async getDepartmentSummary(periodId: string): Promise<DepartmentSummary[]> {
    const details = await this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });

    // Group by department
    const departmentMap = new Map<string, DepartmentSummary>();

    for (const detail of details) {
      const dept = detail.employee.department;
      if (!dept) continue;

      if (!departmentMap.has(dept.id)) {
        departmentMap.set(dept.id, {
          departmentId: dept.id,
          departmentCode: dept.code,
          departmentName: dept.name,
          employeeCount: 0,
          totalGrossSalary: 0,
          totalNetSalary: 0,
          totalInsurance: 0,
          totalTax: 0,
        });
      }

      const summary = departmentMap.get(dept.id)!;
      summary.employeeCount += 1;
      summary.totalGrossSalary += Number(detail.grossSalary);
      summary.totalNetSalary += Number(detail.netSalary);
      summary.totalInsurance += Number(detail.socialInsurance) + Number(detail.healthInsurance) + 
                                 Number(detail.unemploymentIns) + Number(detail.unionFee);
      summary.totalTax += Number(detail.personalIncomeTax);
    }

    return Array.from(departmentMap.values());
  }

  /**
   * Báo cáo so sánh giữa các kỳ
   */
  async getPeriodComparison(fromYear: number, fromMonth: number, toYear: number, toMonth: number): Promise<PeriodComparison[]> {
    const periods = await this.prisma.payrollPeriod.findMany({
      where: {
        OR: [
          { year: { gt: fromYear } },
          { year: fromYear, month: { gte: fromMonth } },
        ],
        AND: [
          {
            OR: [
              { year: { lt: toYear } },
              { year: toYear, month: { lte: toMonth } },
            ],
          },
        ],
      },
      orderBy: [{ year: 'asc' }, { month: 'asc' }],
    });

    const comparisons: PeriodComparison[] = [];

    for (const period of periods) {
      const details = await this.prisma.payrollDetail.findMany({
        where: { periodId: period.id },
      });

      const comparison: PeriodComparison = {
        period: `${period.month}/${period.year}`,
        year: period.year,
        month: period.month,
        employeeCount: details.length,
        totalGrossSalary: details.reduce((sum, d) => sum + Number(d.grossSalary), 0),
        totalNetSalary: details.reduce((sum, d) => sum + Number(d.netSalary), 0),
        totalInsurance: details.reduce((sum, d) => 
          sum + Number(d.socialInsurance) + Number(d.healthInsurance) + 
          Number(d.unemploymentIns) + Number(d.unionFee), 0
        ),
        totalTax: details.reduce((sum, d) => sum + Number(d.personalIncomeTax), 0),
      };

      comparisons.push(comparison);
    }

    return comparisons;
  }

  /**
   * Báo cáo chi tiết thuế TNCN
   */
  async getTaxReport(periodId: string): Promise<TaxDetail[]> {
    const details = await this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
      orderBy: {
        personalIncomeTax: 'desc',
      },
    });

    return details.map(detail => {
      const grossIncome = Number(detail.grossSalary);
      const taxableIncome = Number(detail.taxableIncome);
      const tax = Number(detail.personalIncomeTax);
      const effectiveTaxRate = grossIncome > 0 ? (tax / grossIncome) * 100 : 0;

      return {
        employeeId: detail.employeeId,
        employeeCode: detail.employee.code,
        employeeName: detail.employee.fullName,
        departmentName: detail.employee.department?.name || '',
        grossIncome,
        taxableIncome,
        taxDeductions: Number(detail.taxDeductions),
        personalIncomeTax: tax,
        effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
      };
    });
  }

  /**
   * Báo cáo bảo hiểm
   */
  async getInsuranceReport(periodId: string): Promise<InsuranceDetail[]> {
    const details = await this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });

    // Get insurance rates
    const insuranceRates = await this.prisma.insuranceRate.findMany({
      where: { isActive: true },
    });

    const socialRate = insuranceRates.find(r => r.type === 'SOCIAL');
    const healthRate = insuranceRates.find(r => r.type === 'HEALTH');
    const unemploymentRate = insuranceRates.find(r => r.type === 'UNEMPLOYMENT');

    return details.map(detail => {
      const insuranceBase = Number(detail.actualSalary);
      const socialIns = Number(detail.socialInsurance);
      const healthIns = Number(detail.healthInsurance);
      const unemploymentIns = Number(detail.unemploymentIns);
      const unionFee = Number(detail.unionFee);

      // Calculate employer contributions
      const employerSocialIns = insuranceBase * (Number(socialRate?.employerRate || 0) / 100);
      const employerHealthIns = insuranceBase * (Number(healthRate?.employerRate || 0) / 100);
      const employerUnemploymentIns = insuranceBase * (Number(unemploymentRate?.employerRate || 0) / 100);

      return {
        employeeId: detail.employeeId,
        employeeCode: detail.employee.code,
        employeeName: detail.employee.fullName,
        departmentName: detail.employee.department?.name || '',
        insuranceBase,
        socialInsurance: socialIns,
        healthInsurance: healthIns,
        unemploymentIns,
        unionFee,
        totalInsurance: socialIns + healthIns + unemploymentIns + unionFee,
        employerSocialIns: Math.round(employerSocialIns),
        employerHealthIns: Math.round(employerHealthIns),
        employerUnemploymentIns: Math.round(employerUnemploymentIns),
        totalEmployerIns: Math.round(employerSocialIns + employerHealthIns + employerUnemploymentIns),
      };
    });
  }
}
