import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PayrollCalculatorService } from './payroll-calculator.service';
import { AuditLogService } from './audit-log.service';

@Injectable()
export class PayrollService {
  constructor(
    private prisma: PrismaService,
    private calculator: PayrollCalculatorService,
    private auditLog: AuditLogService,
  ) {}

  async findAllPeriods() {
    return this.prisma.payrollPeriod.findMany({
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }

  async createPeriod(dto: { code: string; year: number; month: number }) {
    // Check if period already exists
    const existing = await this.prisma.payrollPeriod.findUnique({
      where: { year_month: { year: dto.year, month: dto.month } },
    });

    if (existing) {
      throw new Error('Kỳ lương này đã tồn tại');
    }

    const period = await this.prisma.payrollPeriod.create({
      data: {
        code: dto.code,
        year: dto.year,
        month: dto.month,
        status: 'DRAFT',
      },
    });

    await this.auditLog.log({
      entityType: 'PayrollPeriod',
      entityId: period.id,
      action: 'CREATE',
      userName: 'System',
      metadata: { year: dto.year, month: dto.month },
    });

    return period;
  }

  async getPayrollDetails(periodId: string) {
    return this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
      orderBy: {
        employee: {
          code: 'asc',
        },
      },
    });
  }

  async calculatePayroll(periodId: string) {
    // Tính lương
    const results = await this.calculator.calculatePayroll(periodId);
    
    // Lưu kết quả
    await this.calculator.savePayrollResults(periodId, results);
    
    // Log audit
    await this.auditLog.log({
      entityType: 'PayrollPeriod',
      entityId: periodId,
      action: 'CALCULATE',
      userName: 'System',
      metadata: { employeeCount: results.length },
    });
    
    return results;
  }

  async submitPayroll(periodId: string) {
    const result = await this.prisma.payrollPeriod.update({
      where: { id: periodId },
      data: {
        status: 'PENDING',
        submittedAt: new Date(),
      },
    });

    await this.auditLog.log({
      entityType: 'PayrollPeriod',
      entityId: periodId,
      action: 'SUBMIT',
      userName: 'System',
    });

    return result;
  }

  async approvePayroll(periodId: string) {
    const result = await this.prisma.payrollPeriod.update({
      where: { id: periodId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });

    await this.auditLog.log({
      entityType: 'PayrollPeriod',
      entityId: periodId,
      action: 'APPROVE',
      userName: 'System',
    });

    return result;
  }

  async closePayroll(periodId: string) {
    // Lấy snapshot config
    const [salaryComponents, insuranceRates, otRules, taxBrackets] = await Promise.all([
      this.prisma.salaryComponent.findMany({ where: { isActive: true } }),
      this.prisma.insuranceRate.findMany({ where: { isActive: true } }),
      this.prisma.otRule.findMany({ where: { isActive: true } }),
      this.prisma.taxBracket.findMany({ where: { isActive: true } }),
    ]);

    const snapshot = {
      salaryComponents,
      insuranceRates,
      otRules,
      taxBrackets,
      closedAt: new Date(),
    };

    const result = await this.prisma.payrollPeriod.update({
      where: { id: periodId },
      data: {
        status: 'CLOSED',
        closedAt: new Date(),
        snapshotConfig: snapshot,
      },
    });

    await this.auditLog.log({
      entityType: 'PayrollPeriod',
      entityId: periodId,
      action: 'CLOSE',
      userName: 'System',
      metadata: { snapshot },
    });

    return result;
  }

  async adjustPayroll(
    detailId: string,
    adjustmentDto: { bonuses: Record<string, number>; deductions: Record<string, number>; note: string },
  ) {
    const detail = await this.prisma.payrollDetail.findUnique({
      where: { id: detailId },
    });

    if (!detail) {
      throw new Error('Không tìm thấy chi tiết lương');
    }

    // Merge bonuses and deductions
    const currentBonuses = (detail.bonuses as Record<string, number>) || {};
    const currentDeductions = (detail.deductions as Record<string, number>) || {};
    const updatedBonuses = { ...currentBonuses, ...adjustmentDto.bonuses };
    const updatedDeductions = { ...currentDeductions, ...adjustmentDto.deductions };

    // Recalculate totals
    const totalBonuses = Object.values(updatedBonuses).reduce((sum, val) => sum + Number(val), 0);
    const totalDeductions = Object.values(updatedDeductions).reduce((sum, val) => sum + Number(val), 0);

    const newGrossSalary = Number(detail.grossSalary) + totalBonuses;
    const newNetSalary = newGrossSalary - Number(detail.socialInsurance) - Number(detail.healthInsurance) - 
                         Number(detail.unemploymentIns) - Number(detail.unionFee) - 
                         Number(detail.personalIncomeTax) - totalDeductions - Number(detail.clawbackAmount);

    return this.prisma.payrollDetail.update({
      where: { id: detailId },
      data: {
        bonuses: updatedBonuses,
        deductions: updatedDeductions,
        grossSalary: newGrossSalary,
        netSalary: newNetSalary,
        note: adjustmentDto.note,
      },
    });
  }

  async getPayrollDetail(detailId: string) {
    return this.prisma.payrollDetail.findUnique({
      where: { id: detailId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
        period: true,
      },
    });
  }

  async getReportByDepartment(periodId: string) {
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

    const departmentMap = new Map();

    details.forEach((detail) => {
      const dept = detail.employee.department;
      if (!dept) return;

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

      const deptData = departmentMap.get(dept.id);
      deptData.employeeCount += 1;
      deptData.totalGrossSalary += Number(detail.grossSalary);
      deptData.totalNetSalary += Number(detail.netSalary);
      deptData.totalInsurance +=
        Number(detail.socialInsurance) +
        Number(detail.healthInsurance) +
        Number(detail.unemploymentIns) +
        Number(detail.unionFee);
      deptData.totalTax += Number(detail.personalIncomeTax);
    });

    return Array.from(departmentMap.values());
  }

  async getComparisonReport(period1Id: string, period2Id: string) {
    const [period1, period2, details1, details2] = await Promise.all([
      this.prisma.payrollPeriod.findUnique({ where: { id: period1Id } }),
      this.prisma.payrollPeriod.findUnique({ where: { id: period2Id } }),
      this.prisma.payrollDetail.findMany({ where: { periodId: period1Id } }),
      this.prisma.payrollDetail.findMany({ where: { periodId: period2Id } }),
    ]);

    const totalGross1 = details1.reduce((sum, d) => sum + Number(d.grossSalary), 0);
    const totalNet1 = details1.reduce((sum, d) => sum + Number(d.netSalary), 0);
    const totalGross2 = details2.reduce((sum, d) => sum + Number(d.grossSalary), 0);
    const totalNet2 = details2.reduce((sum, d) => sum + Number(d.netSalary), 0);

    return {
      period1: { year: period1.year, month: period1.month },
      period2: { year: period2.year, month: period2.month },
      totalEmployees1: details1.length,
      totalEmployees2: details2.length,
      totalGrossSalary1: totalGross1,
      totalGrossSalary2: totalGross2,
      totalNetSalary1: totalNet1,
      totalNetSalary2: totalNet2,
      difference: totalNet2 - totalNet1,
      percentageChange: totalNet1 > 0 ? ((totalNet2 - totalNet1) / totalNet1) * 100 : 0,
    };
  }

  async getTaxReport(periodId: string) {
    const details = await this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: true,
      },
      orderBy: {
        personalIncomeTax: 'desc',
      },
    });

    return details.map((detail) => ({
      employeeId: detail.employeeId,
      employeeCode: detail.employee.code,
      employeeName: detail.employee.fullName,
      grossIncome: Number(detail.grossSalary),
      taxableIncome: Number(detail.taxableIncome),
      taxDeductions: Number(detail.taxDeductions),
      personalIncomeTax: Number(detail.personalIncomeTax),
      effectiveTaxRate:
        Number(detail.grossSalary) > 0
          ? (Number(detail.personalIncomeTax) / Number(detail.grossSalary)) * 100
          : 0,
    }));
  }

  async getInsuranceReport(periodId: string) {
    const details = await this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: true,
      },
    });

    const insuranceRates = await this.prisma.insuranceRate.findMany({
      where: { isActive: true },
    });

    const socialRate = insuranceRates.find((r) => r.type === 'SOCIAL');
    const healthRate = insuranceRates.find((r) => r.type === 'HEALTH');
    const unemploymentRate = insuranceRates.find((r) => r.type === 'UNEMPLOYMENT');

    return details.map((detail) => {
      const insuranceBase = Number(detail.actualSalary);
      const socialIns = Number(detail.socialInsurance);
      const healthIns = Number(detail.healthInsurance);
      const unemploymentIns = Number(detail.unemploymentIns);
      const unionFee = Number(detail.unionFee);

      return {
        employeeId: detail.employeeId,
        employeeCode: detail.employee.code,
        employeeName: detail.employee.fullName,
        insuranceBase,
        socialInsurance: socialIns,
        healthInsurance: healthIns,
        unemploymentIns,
        unionFee,
        totalInsurance: socialIns + healthIns + unemploymentIns + unionFee,
        employerSocialIns: insuranceBase * (Number(socialRate?.employerRate || 0) / 100),
        employerHealthIns: insuranceBase * (Number(healthRate?.employerRate || 0) / 100),
        employerUnemploymentIns: insuranceBase * (Number(unemploymentRate?.employerRate || 0) / 100),
        totalEmployerIns:
          insuranceBase * (Number(socialRate?.employerRate || 0) / 100) +
          insuranceBase * (Number(healthRate?.employerRate || 0) / 100) +
          insuranceBase * (Number(unemploymentRate?.employerRate || 0) / 100),
      };
    });
  }
}

