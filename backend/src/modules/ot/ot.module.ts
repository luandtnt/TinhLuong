import { Module } from '@nestjs/common';
import { OtController } from './ot.controller';
import { OtService } from './ot.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OtController],
  providers: [OtService],
  exports: [OtService],
})
export class OtModule {}
