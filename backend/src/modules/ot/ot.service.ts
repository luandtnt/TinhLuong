import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OtService {
  constructor(private prisma: PrismaService) {}

  async getOtBatches() {
    return this.prisma.otBatch.findMany({
      include: {
        period: true,
        otRecords: {
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

  async createOtBatch(dto: { periodId: string; name: string }) {
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: dto.periodId },
    });

    if (!period) {
      throw new Error('Không tìm thấy kỳ lương');
    }

    // Generate code
    const year = period.year;
    const numbering = await this.prisma.documentNumbering.findFirst({
      where: {
        prefix: 'OT',
        year,
        documentType: 'OT',
      },
    });

    let sequence = 1;
    if (numbering) {
      sequence = numbering.sequence + 1;
      await this.prisma.documentNumbering.update({
        where: { id: numbering.id },
        data: { sequence, lastNumber: `OT${String(sequence).padStart(3, '0')}/${year}` },
      });
    } else {
      await this.prisma.documentNumbering.create({
        data: {
          prefix: 'OT',
          year,
          sequence,
          lastNumber: `OT${String(sequence).padStart(3, '0')}/${year}`,
          documentType: 'OT',
        },
      });
    }

    const code = `OT${String(sequence).padStart(3, '0')}/${year}`;

    return this.prisma.otBatch.create({
      data: {
        code,
        periodId: dto.periodId,
        name: dto.name,
        status: 'DRAFT',
      },
    });
  }

  async addOtRecord(
    batchId: string,
    dto: {
      employeeId: string;
      date: string;
      otType: string;
      hours: number;
    },
  ) {
    const batch = await this.prisma.otBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy batch OT');
    }

    if (batch.status !== 'DRAFT') {
      throw new Error('Chỉ có thể thêm OT vào batch ở trạng thái Nháp');
    }

    // Get OT rule
    const otRule = await this.prisma.otRule.findFirst({
      where: {
        otType: dto.otType as any,
        isActive: true,
      },
    });

    if (!otRule) {
      throw new Error('Không tìm thấy quy tắc OT');
    }

    // Get employee
    const employee = await this.prisma.employee.findUnique({
      where: { id: dto.employeeId },
    });

    if (!employee) {
      throw new Error('Không tìm thấy nhân viên');
    }

    // Calculate hourly rate (assuming 8 hours/day, 22 days/month)
    const hourlyRate = Number(employee.baseSalary) * Number(employee.salaryCoefficient) / (22 * 8);
    const amount = hourlyRate * dto.hours * Number(otRule.multiplier);

    const record = await this.prisma.otRecord.create({
      data: {
        batchId,
        employeeId: dto.employeeId,
        date: new Date(dto.date),
        otType: dto.otType as any,
        hours: dto.hours,
        hourlyRate,
        multiplier: Number(otRule.multiplier),
        amount,
      },
      include: {
        employee: true,
      },
    });

    // Update batch total
    const totalAmount = await this.prisma.otRecord.aggregate({
      where: { batchId },
      _sum: { amount: true },
    });

    await this.prisma.otBatch.update({
      where: { id: batchId },
      data: { totalAmount: totalAmount._sum.amount || 0 },
    });

    return record;
  }

  async submitBatch(batchId: string) {
    const batch = await this.prisma.otBatch.findUnique({
      where: { id: batchId },
      include: { otRecords: true },
    });

    if (!batch) {
      throw new Error('Không tìm thấy batch OT');
    }

    if (batch.status !== 'DRAFT') {
      throw new Error('Chỉ có thể nộp duyệt batch ở trạng thái Nháp');
    }

    if (!batch.otRecords || batch.otRecords.length === 0) {
      throw new Error('Batch phải có ít nhất 1 bản ghi OT');
    }

    return this.prisma.otBatch.update({
      where: { id: batchId },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });
  }

  async approveBatch(batchId: string) {
    const batch = await this.prisma.otBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy batch OT');
    }

    if (batch.status !== 'SUBMITTED') {
      throw new Error('Chỉ có thể phê duyệt batch đã được nộp');
    }

    return this.prisma.otBatch.update({
      where: { id: batchId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });
  }
}
