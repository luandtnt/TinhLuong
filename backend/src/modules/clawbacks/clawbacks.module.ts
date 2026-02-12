import { Module } from '@nestjs/common';
import { ClawbacksController } from './clawbacks.controller';
import { ClawbacksService } from './clawbacks.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClawbacksController],
  providers: [ClawbacksService],
  exports: [ClawbacksService],
})
export class ClawbacksModule {}
