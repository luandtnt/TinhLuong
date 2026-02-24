import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClawbacksService {
  constructor(private prisma: PrismaService) {}

  async getClawbackBatches() {
    return this.prisma.clawbackBatch.findMany({
      include: {
        deductPeriod: true,
        clawbacks: {
          include: {
            employee: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createClawbackBatch(dto: { deductPeriodId: string; name: string }) {
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: dto.deductPeriodId },
    });

    if (!period) {
      throw new Error('Không tìm thấy kỳ lương');
    }

    // Generate code
    const year = period.year;
    const numbering = await this.prisma.documentNumbering.findFirst({
      where: {
        prefix: 'TT',
        year,
        documentType: 'CLAWBACK',
      },
    });

    let sequence = 1;
    if (numbering) {
      sequence = numbering.sequence + 1;
      await this.prisma.documentNumbering.update({
        where: { id: numbering.id },
        data: { sequence, lastNumber: `TT${String(sequence).padStart(3, '0')}/${year}` },
      });
    } else {
      await this.prisma.documentNumbering.create({
        data: {
          prefix: 'TT',
          year,
          sequence,
          lastNumber: `TT${String(sequence).padStart(3, '0')}/${year}`,
          documentType: 'CLAWBACK',
        },
      });
    }

    const code = `TT${String(sequence).padStart(3, '0')}/${year}`;

    return this.prisma.clawbackBatch.create({
      data: {
        code,
        name: dto.name,
        deductPeriodId: dto.deductPeriodId,
        status: 'DRAFT',
      },
    });
  }

  async addClawbackRecord(
    batchId: string,
    dto: {
      employeeId: string;
      clawbackType: string;
      originalYear: number;
      originalMonth: number;
      amount: number;
      reason: string;
    },
  ) {
    const batch = await this.prisma.clawbackBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy batch truy thu');
    }

    if (batch.status !== 'DRAFT') {
      throw new Error('Chỉ có thể thêm truy thu vào batch ở trạng thái Nháp');
    }

    const record = await this.prisma.clawback.create({
      data: {
        batchId,
        employeeId: dto.employeeId,
        clawbackType: dto.clawbackType as any,
        originalYear: dto.originalYear,
        originalMonth: dto.originalMonth,
        amount: dto.amount,
        reason: dto.reason,
      },
      include: {
        employee: true,
      },
    });

    // Update batch total
    const totalAmount = await this.prisma.clawback.aggregate({
      where: { batchId },
      _sum: { amount: true },
    });

    await this.prisma.clawbackBatch.update({
      where: { id: batchId },
      data: { totalAmount: totalAmount._sum.amount || 0 },
    });

    return record;
  }

  async submitBatch(batchId: string) {
    const batch = await this.prisma.clawbackBatch.findUnique({
      where: { id: batchId },
      include: { clawbacks: true },
    });

    if (!batch) {
      throw new Error('Không tìm thấy batch truy thu');
    }

    if (batch.status !== 'DRAFT') {
      throw new Error('Chỉ có thể nộp duyệt batch ở trạng thái Nháp');
    }

    if (!batch.clawbacks || batch.clawbacks.length === 0) {
      throw new Error('Batch phải có ít nhất 1 bản ghi truy thu');
    }

    return this.prisma.clawbackBatch.update({
      where: { id: batchId },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });
  }

  async approveBatch(batchId: string) {
    const batch = await this.prisma.clawbackBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy batch truy thu');
    }

    if (batch.status !== 'SUBMITTED') {
      throw new Error('Chỉ có thể phê duyệt batch đã được nộp');
    }

    return this.prisma.clawbackBatch.update({
      where: { id: batchId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });
  }
}
