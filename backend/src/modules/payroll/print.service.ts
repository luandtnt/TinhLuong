import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TemplateService } from './template.service';

@Injectable()
export class PrintService {
  constructor(
    private prisma: PrismaService,
    private templateService: TemplateService,
  ) {}

  // Print payroll summary (Bảng thanh toán lương)
  async printPayrollSummary(periodId: string, userId: string) {
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: periodId },
    });

    if (!period) {
      throw new Error('Period not found');
    }

    const details = await this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
      orderBy: [
        { employee: { department: { name: 'asc' } } },
        { employee: { code: 'asc' } },
      ],
    });

    // Calculate totals
    const totals = details.reduce(
      (acc, detail) => ({
        actualSalary: acc.actualSalary + Number(detail.actualSalary),
        allowances: acc.allowances + this.sumJsonValues(detail.allowances),
        bonuses: acc.bonuses + this.sumJsonValues(detail.bonuses) + Number(detail.kpiBonus),
        otAmount: acc.otAmount + Number(detail.otAmount),
        socialInsurance: acc.socialInsurance + Number(detail.socialInsurance),
        healthInsurance: acc.healthInsurance + Number(detail.healthInsurance),
        unemploymentIns: acc.unemploymentIns + Number(detail.unemploymentIns),
        personalIncomeTax: acc.personalIncomeTax + Number(detail.personalIncomeTax),
        netSalary: acc.netSalary + Number(detail.netSalary),
      }),
      {
        actualSalary: 0,
        allowances: 0,
        bonuses: 0,
        otAmount: 0,
        socialInsurance: 0,
        healthInsurance: 0,
        unemploymentIns: 0,
        personalIncomeTax: 0,
        netSalary: 0,
      },
    );

    // Generate document number
    const documentNumber = await this.templateService.generateDocumentNumber(
      'PAYROLL',
      'BL',
    );

    // Prepare data for template
    const templateData = {
      companyName: 'ĐẢNG ỦY TRUNG ƯƠNG',
      taxCode: '0123456789',
      address: 'Hà Nội, Việt Nam',
      period,
      documentNumber,
      documentDate: new Date(),
      details: details.map((d) => ({
        ...d,
        allowanceTotal: this.sumJsonValues(d.allowances),
        bonusTotal: this.sumJsonValues(d.bonuses) + Number(d.kpiBonus),
      })),
      totals,
      preparedBy: 'Nguyễn Văn A',
      chiefAccountant: 'Trần Thị B',
      director: 'Lê Văn C',
    };

    // Get template
    const template = await this.prisma.printTemplate.findFirst({
      where: { code: 'C01-TS', isActive: true },
    });

    if (!template) {
      throw new Error('Template C01-TS not found');
    }

    // Generate PDF
    const pdfBuffer = await this.templateService.generatePDF(
      template.id,
      templateData,
    );

    // Log print
    await this.templateService.logPrint({
      templateId: template.id,
      periodId,
      documentNumber,
      documentDate: new Date(),
      printedBy: userId,
      metadata: { totalEmployees: details.length, totalAmount: totals.netSalary },
    });

    return {
      pdf: pdfBuffer,
      documentNumber,
      filename: `Bang_luong_${period.month}_${period.year}.pdf`,
    };
  }

  // Print OT summary (Bảng thanh toán OT)
  async printOtSummary(batchId: string, userId: string) {
    const batch = await this.prisma.otBatch.findUnique({
      where: { id: batchId },
      include: {
        period: true,
        otRecords: {
          include: {
            employee: {
              include: {
                department: true,
              },
            },
          },
          orderBy: [
            { employee: { department: { name: 'asc' } } },
            { employee: { code: 'asc' } },
            { date: 'asc' },
          ],
        },
      },
    });

    if (!batch) {
      throw new Error('OT Batch not found');
    }

    const totalHours = batch.otRecords.reduce(
      (sum, r) => sum + Number(r.hours),
      0,
    );
    const totalAmount = batch.otRecords.reduce(
      (sum, r) => sum + Number(r.amount),
      0,
    );

    const documentNumber = await this.templateService.generateDocumentNumber(
      'OT',
      'OT',
    );

    const templateData = {
      companyName: 'ĐẢNG ỦY TRUNG ƯƠNG',
      taxCode: '0123456789',
      period: batch.period,
      documentNumber,
      documentDate: new Date(),
      records: batch.otRecords,
      totalHours,
      totalAmount,
      preparedBy: 'Nguyễn Văn A',
      chiefAccountant: 'Trần Thị B',
      director: 'Lê Văn C',
    };

    const template = await this.prisma.printTemplate.findFirst({
      where: { code: 'C02-TS', isActive: true },
    });

    if (!template) {
      throw new Error('Template C02-TS not found');
    }

    const pdfBuffer = await this.templateService.generatePDF(
      template.id,
      templateData,
    );

    await this.templateService.logPrint({
      templateId: template.id,
      periodId: batch.periodId,
      documentNumber,
      documentDate: new Date(),
      printedBy: userId,
      metadata: { batchId, totalRecords: batch.otRecords.length, totalAmount },
    });

    return {
      pdf: pdfBuffer,
      documentNumber,
      filename: `Bang_OT_${batch.code}.pdf`,
    };
  }

  // Print insurance summary (Bảng kê BHXH)
  async printInsuranceSummary(periodId: string, userId: string) {
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: periodId },
    });

    if (!period) {
      throw new Error('Period not found');
    }

    const details = await this.prisma.payrollDetail.findMany({
      where: { periodId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
      orderBy: [
        { employee: { department: { name: 'asc' } } },
        { employee: { code: 'asc' } },
      ],
    });

    // Get insurance rates - use first SOCIAL rate
    const rates = await this.prisma.insuranceRate.findFirst({
      where: { type: 'SOCIAL', isActive: true },
      orderBy: { effectiveDate: 'desc' },
    });

    const insuranceDetails = details.map((d) => {
      const insuranceBase = Number(d.baseSalary) * Number(d.salaryCoefficient);
      const socialIns = Number(d.socialInsurance);
      const healthIns = Number(d.healthInsurance);
      const unemploymentIns = Number(d.unemploymentIns);
      const unionFee = Number(d.unionFee);

      // Calculate employer contributions (hardcoded rates for now)
      const employerSocial = insuranceBase * 0.175; // 17.5%
      const employerHealth = insuranceBase * 0.03; // 3%
      const employerUnemployment = insuranceBase * 0.01; // 1%
      const employerUnion = insuranceBase * 0.02; // 2%

      return {
        employee: d.employee,
        insuranceBase,
        socialInsurance: socialIns,
        healthInsurance: healthIns,
        unemploymentIns: unemploymentIns,
        unionFee: unionFee,
        employerSocial,
        employerHealth,
        employerUnemployment,
        employerUnion,
        totalInsurance:
          socialIns +
          healthIns +
          unemploymentIns +
          unionFee +
          employerSocial +
          employerHealth +
          employerUnemployment +
          employerUnion,
      };
    });

    const totals = insuranceDetails.reduce(
      (acc, d) => ({
        insuranceBase: acc.insuranceBase + d.insuranceBase,
        socialInsurance: acc.socialInsurance + d.socialInsurance,
        healthInsurance: acc.healthInsurance + d.healthInsurance,
        unemploymentIns: acc.unemploymentIns + d.unemploymentIns,
        unionFee: acc.unionFee + d.unionFee,
        employerSocial: acc.employerSocial + d.employerSocial,
        employerHealth: acc.employerHealth + d.employerHealth,
        employerUnemployment: acc.employerUnemployment + d.employerUnemployment,
        employerUnion: acc.employerUnion + d.employerUnion,
        total: acc.total + d.totalInsurance,
      }),
      {
        insuranceBase: 0,
        socialInsurance: 0,
        healthInsurance: 0,
        unemploymentIns: 0,
        unionFee: 0,
        employerSocial: 0,
        employerHealth: 0,
        employerUnemployment: 0,
        employerUnion: 0,
        total: 0,
      },
    );

    const documentNumber = await this.templateService.generateDocumentNumber(
      'INSURANCE',
      'BH',
    );

    const templateData = {
      companyName: 'ĐẢNG ỦY TRUNG ƯƠNG',
      taxCode: '0123456789',
      period,
      documentNumber,
      documentDate: new Date(),
      details: insuranceDetails,
      totals,
      preparedBy: 'Nguyễn Văn A',
      chiefAccountant: 'Trần Thị B',
      director: 'Lê Văn C',
    };

    const template = await this.prisma.printTemplate.findFirst({
      where: { code: 'D02-TS', isActive: true },
    });

    if (!template) {
      throw new Error('Template D02-TS not found');
    }

    const pdfBuffer = await this.templateService.generatePDF(
      template.id,
      templateData,
    );

    await this.templateService.logPrint({
      templateId: template.id,
      periodId,
      documentNumber,
      documentDate: new Date(),
      printedBy: userId,
      metadata: { totalEmployees: details.length, totalAmount: totals.total },
    });

    return {
      pdf: pdfBuffer,
      documentNumber,
      filename: `Bang_BH_${period.month}_${period.year}.pdf`,
    };
  }

  // Helper: Sum values in JSON object
  private sumJsonValues(json: any): number {
    if (!json || typeof json !== 'object') return 0;
    return Object.values(json).reduce<number>(
      (sum, val) => sum + (Number(val) || 0),
      0,
    );
  }
}
