import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from './audit-log.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
  ) {}

  // Tạo đợt thanh toán từ kỳ lương
  async createPaymentBatch(dto: {
    periodId: string;
    name: string;
    paymentMethod: PaymentMethod;
    bankCode?: string;
    bankName?: string;
    note?: string;
  }) {
    // Kiểm tra kỳ lương đã được duyệt chưa
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: dto.periodId },
    });

    if (!period) {
      throw new Error('Không tìm thấy kỳ lương');
    }

    if (period.status !== 'APPROVED' && period.status !== 'CLOSED') {
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
      throw new Error('Không có dữ liệu lương để thanh toán');
    }

    // Tạo mã đợt thanh toán
    const year = period.year;
    const numbering = await this.prisma.documentNumbering.findFirst({
      where: {
        prefix: 'TL',
        year,
        documentType: 'PAYMENT',
      },
    });

    let sequence = 1;
    if (numbering) {
      sequence = numbering.sequence + 1;
      await this.prisma.documentNumbering.update({
        where: { id: numbering.id },
        data: { sequence, lastNumber: `TL${String(sequence).padStart(3, '0')}/${year}` },
      });
    } else {
      await this.prisma.documentNumbering.create({
        data: {
          prefix: 'TL',
          year,
          sequence,
          lastNumber: `TL${String(sequence).padStart(3, '0')}/${year}`,
          documentType: 'PAYMENT',
        },
      });
    }

    const code = `TL${String(sequence).padStart(3, '0')}/${year}`;

    // Tính tổng tiền
    const totalAmount = payrollDetails.reduce((sum, d) => sum + Number(d.netSalary), 0);

    // Tạo batch
    const batch = await this.prisma.paymentBatch.create({
      data: {
        code,
        periodId: dto.periodId,
        name: dto.name,
        paymentMethod: dto.paymentMethod,
        bankCode: dto.bankCode,
        bankName: dto.bankName,
        totalAmount,
        totalEmployees: payrollDetails.length,
        note: dto.note,
        status: 'DRAFT',
      },
    });

    // Tạo chi tiết thanh toán
    const payments = payrollDetails.map((detail) => ({
      batchId: batch.id,
      employeeId: detail.employeeId,
      payrollDetailId: detail.id,
      employeeCode: detail.employee.code,
      employeeName: detail.employee.fullName,
      departmentName: detail.employee.department?.name,
      amount: Number(detail.netSalary),
      status: 'DRAFT' as PaymentStatus,
    }));

    await this.prisma.payment.createMany({
      data: payments,
    });

    await this.auditLog.log({
      entityType: 'PaymentBatch',
      entityId: batch.id,
      action: 'CREATE',
      userName: 'System',
      metadata: { periodId: dto.periodId, totalAmount, totalEmployees: payrollDetails.length },
    });

    return batch;
  }

  // Lấy danh sách đợt thanh toán
  async findAllBatches(periodId?: string) {
    return this.prisma.paymentBatch.findMany({
      where: periodId ? { periodId } : undefined,
      include: {
        period: true,
        _count: {
          select: { payments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Lấy chi tiết đợt thanh toán
  async getBatchDetails(batchId: string) {
    const batch = await this.prisma.paymentBatch.findUnique({
      where: { id: batchId },
      include: {
        period: true,
        payments: {
          orderBy: { employeeCode: 'asc' },
        },
      },
    });

    if (!batch) {
      throw new Error('Không tìm thấy đợt thanh toán');
    }

    return batch;
  }

  // Nộp duyệt đợt thanh toán
  async submitBatch(batchId: string) {
    const batch = await this.prisma.paymentBatch.update({
      where: { id: batchId },
      data: {
        status: 'PENDING',
        submittedAt: new Date(),
      },
    });

    await this.auditLog.log({
      entityType: 'PaymentBatch',
      entityId: batchId,
      action: 'SUBMIT',
      userName: 'System',
    });

    return batch;
  }

  // Phê duyệt đợt thanh toán
  async approveBatch(batchId: string) {
    const batch = await this.prisma.paymentBatch.update({
      where: { id: batchId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });

    await this.auditLog.log({
      entityType: 'PaymentBatch',
      entityId: batchId,
      action: 'APPROVE',
      userName: 'System',
    });

    return batch;
  }

  // Xác nhận đã chi
  async confirmPaid(batchId: string) {
    const batch = await this.prisma.paymentBatch.findUnique({
      where: { id: batchId },
      include: { period: true },
    });

    if (!batch) {
      throw new Error('Không tìm thấy đợt thanh toán');
    }

    if (batch.status !== 'APPROVED') {
      throw new Error('Đợt thanh toán chưa được phê duyệt');
    }

    // Cập nhật batch
    await this.prisma.paymentBatch.update({
      where: { id: batchId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    // Cập nhật tất cả payments
    await this.prisma.payment.updateMany({
      where: { batchId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    // Cập nhật trạng thái kỳ lương
    await this.prisma.payrollPeriod.update({
      where: { id: batch.periodId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    await this.auditLog.log({
      entityType: 'PaymentBatch',
      entityId: batchId,
      action: 'CONFIRM_PAID',
      userName: 'System',
    });

    return batch;
  }

  // Hủy đợt thanh toán
  async cancelBatch(batchId: string) {
    const batch = await this.prisma.paymentBatch.update({
      where: { id: batchId },
      data: {
        status: 'CANCELLED',
      },
    });

    await this.prisma.payment.updateMany({
      where: { batchId },
      data: {
        status: 'CANCELLED',
      },
    });

    await this.auditLog.log({
      entityType: 'PaymentBatch',
      entityId: batchId,
      action: 'CANCEL',
      userName: 'System',
    });

    return batch;
  }

  // Export danh sách chi trả
  async exportPaymentList(batchId: string) {
    const batch = await this.getBatchDetails(batchId);
    
    return {
      batch: {
        code: batch.code,
        name: batch.name,
        paymentMethod: batch.paymentMethod,
        totalAmount: Number(batch.totalAmount),
        totalEmployees: batch.totalEmployees,
      },
      payments: batch.payments.map((p) => ({
        employeeCode: p.employeeCode,
        employeeName: p.employeeName,
        departmentName: p.departmentName,
        amount: Number(p.amount),
        bankAccount: p.bankAccount,
        bankName: p.bankName,
        status: p.status,
      })),
    };
  }
}
