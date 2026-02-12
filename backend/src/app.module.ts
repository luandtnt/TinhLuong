import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { TimesheetsModule } from './modules/timesheets/timesheets.module';
import { OtModule } from './modules/ot/ot.module';
import { ClawbacksModule } from './modules/clawbacks/clawbacks.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { ConfigsModule } from './modules/configs/configs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    DepartmentsModule,
    EmployeesModule,
    TimesheetsModule,
    OtModule,
    ClawbacksModule,
    PayrollModule,
    ConfigsModule,
  ],
})
export class AppModule {}
