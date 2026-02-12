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
}
