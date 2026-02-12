import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ConfigsService {
  constructor(private prisma: PrismaService) {}

  async getSalaryComponents() {
    return this.prisma.salaryComponent.findMany({
      orderBy: [
        { isActive: 'desc' },
        { effectiveDate: 'desc' },
      ],
    });
  }

  async getInsuranceRates() {
    return this.prisma.insuranceRate.findMany({
      orderBy: [
        { isActive: 'desc' },
        { effectiveDate: 'desc' },
      ],
    });
  }

  async getOtRules() {
    return this.prisma.otRule.findMany({
      orderBy: [
        { isActive: 'desc' },
        { effectiveDate: 'desc' },
      ],
    });
  }

  async getTaxBrackets() {
    return this.prisma.taxBracket.findMany({
      orderBy: [
        { isActive: 'desc' },
        { fromAmount: 'asc' },
      ],
    });
  }
}
