import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface TimesheetImportRow {
  employeeCode: string;
  workDays: number;
  leaveDays: number;
  unpaidLeaveDays: number;
}

interface OtImportRow {
  employeeCode: string;
  date: string;
  otType: string;
  hours: number;
  note?: string;
}

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  /**
   * Import chấm công từ CSV/Excel
   */
  async importTimesheets(year: number, month: number, data: TimesheetImportRow[]) {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const row of data) {
      try {
        // Tìm nhân viên
        const employee = await this.prisma.employee.findUnique({
          where: { code: row.employeeCode },
        });

        if (!employee) {
          results.failed++;
          results.errors.push(`Không tìm thấy nhân viên: ${row.employeeCode}`);
          continue;
        }

        // Upsert timesheet
        await this.prisma.timesheet.upsert({
          where: {
            employeeId_year_month: {
              employeeId: employee.id,
              year,
              month,
            },
          },
          update: {
            workDays: row.workDays,
            leaveDays: row.leaveDays,
            unpaidLeaveDays: row.unpaidLeaveDays,
          },
          create: {
            employeeId: employee.id,
            year,
            month,
            workDays: row.workDays,
            leaveDays: row.leaveDays,
            unpaidLeaveDays: row.unpaidLeaveDays,
          },
        });

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Lỗi nhân viên ${row.employeeCode}: ${error.message}`);
      }
    }

    return results;
  }

  /**
   * Import OT từ CSV/Excel
   */
  async importOtRecords(batchId: string, data: OtImportRow[]) {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Verify batch exists
    const batch = await this.prisma.otBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new Error('Không tìm thấy batch OT');
    }

    // Get OT rules
    const otRules = await this.prisma.otRule.findMany({
      where: { isActive: true },
    });

    for (const row of data) {
      try {
        // Tìm nhân viên
        const employee = await this.prisma.employee.findUnique({
          where: { code: row.employeeCode },
        });

        if (!employee) {
          results.failed++;
          results.errors.push(`Không tìm thấy nhân viên: ${row.employeeCode}`);
          continue;
        }

        // Tìm OT rule
        const rule = otRules.find(r => r.otType === row.otType);
        if (!rule) {
          results.failed++;
          results.errors.push(`Không tìm thấy quy tắc OT: ${row.otType}`);
          continue;
        }

        // Tính lương OT
        const hourlyRate = Number(employee.baseSalary) / 22 / 8; // Giả định 22 ngày, 8 giờ/ngày
        const amount = hourlyRate * row.hours * Number(rule.multiplier);

        // Tạo OT record
        await this.prisma.otRecord.create({
          data: {
            batchId,
            employeeId: employee.id,
            date: new Date(row.date),
            otType: row.otType as any,
            hours: row.hours,
            hourlyRate,
            multiplier: Number(rule.multiplier),
            amount,
            note: row.note,
          },
        });

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Lỗi nhân viên ${row.employeeCode}: ${error.message}`);
      }
    }

    // Update batch total
    const records = await this.prisma.otRecord.findMany({
      where: { batchId },
    });
    const totalAmount = records.reduce((sum, r) => sum + Number(r.amount), 0);

    await this.prisma.otBatch.update({
      where: { id: batchId },
      data: { totalAmount },
    });

    return results;
  }
}
