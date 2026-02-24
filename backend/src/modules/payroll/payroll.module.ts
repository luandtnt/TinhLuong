import { Module } from '@nestjs/common';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';
import { PayrollCalculatorService } from './payroll-calculator.service';
import { PayrollReportService } from './payroll-report.service';
import { AuditLogService } from './audit-log.service';
import { TemplateService } from './template.service';
import { PrintService } from './print.service';
import { PaymentService } from './payment.service';
import { ObligationService } from './obligation.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollController],
  providers: [
    PayrollService,
    PayrollCalculatorService,
    PayrollReportService,
    AuditLogService,
    TemplateService,
    PrintService,
    PaymentService,
    ObligationService,
  ],
  exports: [
    PayrollService,
    PayrollCalculatorService,
    PayrollReportService,
    AuditLogService,
    TemplateService,
    PrintService,
    PaymentService,
    ObligationService,
  ],
})
export class PayrollModule {}

