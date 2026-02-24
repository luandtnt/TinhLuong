import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from './audit-log.service';
import { ObligationType, ObligationStatus } from '@prisma/client';

@Injectable()
export class ObligationService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
  ) {}

  // Tạo đợt nộp nghĩa vụ từ kỳ lương
  async createObligationBatch(dto: {
    periodId: string;
    obligationType: ObligationType;
    name: string;
    paymentMethod?: string;
    bankAccount?: string;
    bankName?: string;
    note?: string;
  }) {
    // Kiểm tra kỳ lương
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: dto.periodId },
    });

    if (!period) {
      throw new Error('Không tìm thấy kỳ lương');
    }

    if (period.status !== 'APPROVED' && period.status !== 'CLOSED' && period.status !== 'PAID') {
      throw new Error('Kỳ lương chưa được phê duyệt');
    }

    // Lấy chi tiết lương
    const payrollDetails = await this.prisma.payrollDetail.findMany({
      where: { periodId: dto.periodId },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });

    if (payrollDetails.length === 0) {
      throw new Error('Không có dữ liệu lương');
    }

    // Tạo mã đợt nộp
    const year = period.year;
    const prefixMap = {
      SOCIAL_INSURANCE: 'BHXH',
      HEALTH_INSURANCE: 'BHYT',
      UNEMPLOYMENT_INS: 'BHTN',
      UNION_FEE: 'KPCD',
      PERSONAL_INCOME_TAX: 'THUE',
    };
    const prefix = prefixMap[dto.obligationType];

    const numbering = await this.prisma.documentNumbering.findFirst({
      where: {
        prefix,
        year,
        documentType: 'OBLIGATION',
      },
    });

    let sequence = 1;
    if (numbering) {
      sequence = numbering.sequence + 1;
      await this.prisma.documentNumbering.update({
        where: { id: numbering.id },
        data: { sequence, lastNumber: `${prefix}${String(sequence).padStart(3, '0')}/${year}` },
      });
    } else {
      await this.prisma.documentNumbering.create({
        data: {
          prefix,
          year,
          sequence,
          lastNumber: `${prefix}${String(sequence).padStart(3, '0')}/${year}`,
          documentType: 'OBLIGATION',
        },
      });
    }

    const code = `${prefix}${String(sequence).padStart(3, '0')}/${year}`;

    // Lấy tỷ lệ bảo hiểm
    const insuranceRates = await this.prisma.insuranceRate.findMany({
      where: { isActive: true },
    });

    // Tính tổng tiền theo loại nghĩa vụ
    let totalEmployeeAmount = 0;
    let totalEmployerAmount = 0;
    const obligations = [];

    for (const detail of payrollDetails) {
      let employeeAmount = 0;
      let employerAmount = 0;
      let insuranceBase = Number(detail.actualSalary);
      let taxableIncome = null;

      switch (dto.obligationType) {
        case 'SOCIAL_INSURANCE':
          employeeAmount = Number(detail.socialInsurance);
          const socialRate = insuranceRates.find((r) => r.type === 'SOCIAL');
          employerAmount = insuranceBase * (Number(socialRate?.employerRate || 0) / 100);
          break;

        case 'HEALTH_INSURANCE':
          employeeAmount = Number(detail.healthInsurance);
          const healthRate = insuranceRates.find((r) => r.type === 'HEALTH');
          employerAmount = insuranceBase * (Number(healthRate?.employerRate || 0) / 100);
          break;

        case 'UNEMPLOYMENT_INS':
          employeeAmount = Number(detail.unemploymentIns);
          const unemploymentRate = insuranceRates.find((r) => r.type === 'UNEMPLOYMENT');
          employerAmount = insuranceBase * (Number(unemploymentRate?.employerRate || 0) / 100);
          break;

        case 'UNION_FEE':
          employeeAmount = Number(detail.unionFee);
          const unionRate = insuranceRates.find((r) => r.type === 'UNION');
          employerAmount = insuranceBase * (Number(unionRate?.employerRate || 0) / 100);
          break;

        case 'PERSONAL_INCOME_TAX':
          employeeAmount = Number(detail.personalIncomeTax);
          employerAmount = 0;
          taxableIncome = Number(detail.taxableIncome);
          insuranceBase = null;
          break;
      }

      totalEmployeeAmount += employeeAmount;
      totalEmployerAmount += employerAmount;

      obligations.push({
        employeeId: detail.employeeId,
        payrollDetailId: detail.id,
        employeeCode: detail.employee.code,
        employeeName: detail.employee.fullName,
        departmentName: detail.employee.department?.name,
        employeeAmount,
        employerAmount,
        totalAmount: employeeAmount + employerAmount,
        insuranceBase,
        taxableIncome,
      });
    }

    // Tạo batch
    const batch = await this.prisma.obligationBatch.create({
      data: {
        code,
        periodId: dto.periodId,
        obligationType: dto.obligationType,
        name: dto.name,
        totalAmount: totalEmployeeAmount + totalEmployerAmount,
        employeeAmount: totalEmployeeAmount,
        employerAmount: totalEmployerAmount,
        paymentMethod: dto.paymentMethod,
        bankAccount: dto.bankAccount,
        bankName: dto.bankName,
        note: dto.note,
        status: 'DRAFT',
      },
    });

    // Tạo chi tiết
    await this.prisma.obligation.createMany({
      data: obligations.map((o) => ({
        ...o,
        batchId: batch.id,
      })),
    });

    await this.auditLog.log({
      entityType: 'ObligationBatch',
      entityId: batch.id,
      action: 'CREATE',
      userName: 'System',
      metadata: {
        periodId: dto.periodId,
        obligationType: dto.obligationType,
        totalAmount: totalEmployeeAmount + totalEmployerAmount,
      },
    });

    return batch;
  }

  // Lấy danh sách đợt nộp
  async findAllBatches(periodId?: string, obligationType?: ObligationType) {
    return this.prisma.obligationBatch.findMany({
      where: {
        periodId,
        obligationType,
      },
      include: {
        _count: {
          select: { obligations: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Lấy chi tiết đợt nộp
  async getBatchDetails(batchId: string) {
    const batch = await this.prisma.obligationBatch.findUnique({
      where: { id: batchId },
      include: {
        obligations: {
          orderBy: { employeeCode: 'asc' },
        },
      },
    });

    if (!batch) {
      throw new Error('Không tìm thấy đợt nộp nghĩa vụ');
    }

    return batch;
  }

  // Nộp duyệt
  async submitBatch(batchId: string) {
    const batch = await this.prisma.obligationBatch.update({
      where: { id: batchId },
      data: {
        status: 'PENDING',
        submittedAt: new Date(),
      },
    });

    await this.auditLog.log({
      entityType: 'ObligationBatch',
      entityId: batchId,
      action: 'SUBMIT',
      userName: 'System',
    });

    return batch;
  }

  // Phê duyệt
  async approveBatch(batchId: string) {
    const batch = await this.prisma.obligationBatch.update({
      where: { id: batchId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });

    await this.auditLog.log({
      entityType: 'ObligationBatch',
      entityId: batchId,
      action: 'APPROVE',
      userName: 'System',
    });

    return batch;
  }

  // Xác nhận đã nộp
  async confirmPaid(batchId: string, voucherNumber?: string, voucherDate?: Date) {
    const batch = await this.prisma.obligationBatch.update({
      where: { id: batchId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        voucherNumber,
        voucherDate,
      },
    });

    await this.auditLog.log({
      entityType: 'ObligationBatch',
      entityId: batchId,
      action: 'CONFIRM_PAID',
      userName: 'System',
      metadata: { voucherNumber, voucherDate },
    });

    return batch;
  }

  // Hủy
  async cancelBatch(batchId: string) {
    const batch = await this.prisma.obligationBatch.update({
      where: { id: batchId },
      data: {
        status: 'CANCELLED',
      },
    });

    await this.auditLog.log({
      entityType: 'ObligationBatch',
      entityId: batchId,
      action: 'CANCEL',
      userName: 'System',
    });

    return batch;
  }

  // Export danh sách nộp
  async exportObligationList(batchId: string) {
    const batch = await this.getBatchDetails(batchId);

    return {
      batch: {
        code: batch.code,
        name: batch.name,
        obligationType: batch.obligationType,
        totalAmount: Number(batch.totalAmount),
        employeeAmount: Number(batch.employeeAmount),
        employerAmount: Number(batch.employerAmount),
      },
      obligations: batch.obligations.map((o) => ({
        employeeCode: o.employeeCode,
        employeeName: o.employeeName,
        departmentName: o.departmentName,
        employeeAmount: Number(o.employeeAmount),
        employerAmount: Number(o.employerAmount),
        totalAmount: Number(o.totalAmount),
        insuranceBase: o.insuranceBase ? Number(o.insuranceBase) : null,
        taxableIncome: o.taxableIncome ? Number(o.taxableIncome) : null,
      })),
    };
  }
}
