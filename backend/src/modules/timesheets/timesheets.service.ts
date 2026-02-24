import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimesheetsService {
  constructor(private prisma: PrismaService) {}

  async getTimesheets(year: number, month: number) {
    return this.prisma.timesheet.findMany({
      where: {
        year,
        month,
      },
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

  async createOrUpdateTimesheet(dto: {
    employeeId: string;
    year: number;
    month: number;
    workDays: number;
    leaveDays: number;
    unpaidLeaveDays: number;
  }) {
    return this.prisma.timesheet.upsert({
      where: {
        employeeId_year_month: {
          employeeId: dto.employeeId,
          year: dto.year,
          month: dto.month,
        },
      },
      create: dto,
      update: {
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

  async bulkCreateTimesheets(dto: {
    year: number;
    month: number;
    timesheets: Array<{
      employeeId: string;
      workDays: number;
      leaveDays: number;
      unpaidLeaveDays: number;
    }>;
  }) {
    const results = [];
    for (const ts of dto.timesheets) {
      const result = await this.createOrUpdateTimesheet({
        ...ts,
        year: dto.year,
        month: dto.month,
      });
      results.push(result);
    }
    return results;
  }
}
