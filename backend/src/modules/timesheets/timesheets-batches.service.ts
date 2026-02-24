import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimesheetBatchesService {
  constructor(private prisma: PrismaService) {}

  async getBatches() {
    return this.prisma.timesheetBatch.findMany({
      include: {
        timesheets: {
          include: {
            employee: {
              include: {
                department: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createBatch(dto: { year: number; month: number; name: string }) {
    // Generate code
    const numbering = await this.prisma.documentNumbering.findFirst({
      where: {
        prefix: 'CC',
        year: dto.year,
        documentType: 'TIMESHEET',
      },
    });

    let sequence = 1;
    if (numbering) {
      sequence = numbering.sequence + 1;
      await this.prisma.documentNumbering.update({
        where: { id: numbering.id },
        data: { 
          sequence, 
          lastNumber: `CC${String(sequence).padStart(3, '0')}/${dto.year}` 
        },
      });
    } else {
      await this.prisma.documentNumbering.create({
        data: {
          prefix: 'CC',
          year: dto.year,
          sequence,
          lastNumber: `CC${String(sequence).padStart(3, '0')}/${dto.year}`,
          documentType: 'TIMESHEET',
        },
      });
    }

    const code = `CC${String(sequence).padStart(3, '0')}/${dto.year}`;

    return this.prisma.timesheetBatch.create({
      data: {
        code,
        name: dto.name,
        year: dto.year,
        month: dto.month,
        status: 'DRAFT',
      },
    });
  }

  async addTimesheet(
    batchId: string,
    dto: {
      employeeId: string;
      workDays: number;
      leaveDays: number;
      unpaidLeaveDays: number;
    },
  ) {
    const batch = await this.prisma.timesheetBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy bảng chấm công');
    }

    if (batch.status !== 'DRAFT') {
      throw new Error('Chỉ có thể thêm chấm công vào bảng ở trạng thái Nháp');
    }

    // Check if timesheet already exists
    const existing = await this.prisma.timesheet.findUnique({
      where: {
        employeeId_year_month: {
          employeeId: dto.employeeId,
          year: batch.year,
          month: batch.month,
        },
      },
    });

    if (existing) {
      // Update existing
      return this.prisma.timesheet.update({
        where: { id: existing.id },
        data: {
          batchId,
          workDays: dto.workDays,
          leaveDays: dto.leaveDays,
          unpaidLeaveDays: dto.unpaidLeaveDays,
        },
        include: {
          employee: {
            include: {
              department: true,
            },
          },
        },
      });
    }

    // Create new
    return this.prisma.timesheet.create({
      data: {
        batchId,
        employeeId: dto.employeeId,
        year: batch.year,
        month: batch.month,
        workDays: dto.workDays,
        leaveDays: dto.leaveDays,
        unpaidLeaveDays: dto.unpaidLeaveDays,
      },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });
  }

  async bulkAddTimesheets(
    batchId: string,
    timesheets: Array<{
      employeeId: string;
      workDays: number;
      leaveDays: number;
      unpaidLeaveDays: number;
    }>,
  ) {
    const batch = await this.prisma.timesheetBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy bảng chấm công');
    }

    if (batch.status !== 'DRAFT') {
      throw new Error('Chỉ có thể thêm chấm công vào bảng ở trạng thái Nháp');
    }

    const results = [];
    const errors = [];
    
    for (let i = 0; i < timesheets.length; i++) {
      try {
        const result = await this.addTimesheet(batchId, timesheets[i]);
        results.push(result);
      } catch (error) {
        errors.push({
          line: i + 2, // +2 because line 1 is header, array is 0-indexed
          employeeId: timesheets[i].employeeId,
          error: error.message,
        });
      }
    }

    if (errors.length > 0) {
      throw new Error(
        `Import thất bại cho ${errors.length} dòng:\n` +
        errors.map(e => `- Dòng ${e.line} (${e.employeeId}): ${e.error}`).join('\n')
      );
    }

    return results;
  }

  async submitBatch(batchId: string) {
    const batch = await this.prisma.timesheetBatch.findUnique({
      where: { id: batchId },
      include: { timesheets: true },
    });

    if (!batch) {
      throw new Error('Không tìm thấy bảng chấm công');
    }

    if (batch.status !== 'DRAFT') {
      throw new Error('Chỉ có thể nộp duyệt bảng ở trạng thái Nháp');
    }

    if (!batch.timesheets || batch.timesheets.length === 0) {
      throw new Error('Bảng phải có ít nhất 1 bản ghi chấm công');
    }

    return this.prisma.timesheetBatch.update({
      where: { id: batchId },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });
  }

  async approveBatch(batchId: string) {
    const batch = await this.prisma.timesheetBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy bảng chấm công');
    }

    if (batch.status !== 'SUBMITTED') {
      throw new Error('Chỉ có thể phê duyệt bảng đã được nộp');
    }

    return this.prisma.timesheetBatch.update({
      where: { id: batchId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });
  }
}
