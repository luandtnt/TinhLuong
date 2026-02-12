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
}
