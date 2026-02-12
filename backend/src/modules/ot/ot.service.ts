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
}
