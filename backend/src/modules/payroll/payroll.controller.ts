import { Controller, Get, Post, Param, Body, Patch, Query, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { PayrollService } from './payroll.service';
import { PayrollReportService } from './payroll-report.service';
import { TemplateService } from './template.service';
import { PrintService } from './print.service';

@ApiTags('payroll')
@Controller('payroll')
export class PayrollController {
  constructor(
    private readonly payrollService: PayrollService,
    private readonly reportService: PayrollReportService,
    private readonly templateService: TemplateService,
    private readonly printService: PrintService,
  ) {}

  @Get('periods')
  @ApiOperation({ summary: 'Lấy danh sách kỳ lương' })
  findAllPeriods() {
    return this.payrollService.findAllPeriods();
  }

  @Get('periods/:id/details')
  @ApiOperation({ summary: 'Lấy chi tiết bảng lương của kỳ' })
  @ApiParam({ name: 'id', description: 'ID kỳ lương' })
  getPayrollDetails(@Param('id') id: string) {
    return this.payrollService.getPayrollDetails(id);
  }

  @Post('periods/:id/calculate')
  @ApiOperation({ summary: 'Tính lương cho kỳ' })
  @ApiParam({ name: 'id', description: 'ID kỳ lương' })
  calculatePayroll(@Param('id') id: string) {
    return this.payrollService.calculatePayroll(id);
  }

  @Post('periods/:id/submit')
  @ApiOperation({ summary: 'Nộp duyệt kỳ lương' })
  @ApiParam({ name: 'id', description: 'ID kỳ lương' })
  submitPayroll(@Param('id') id: string) {
    return this.payrollService.submitPayroll(id);
  }

  @Post('periods/:id/approve')
  @ApiOperation({ summary: 'Phê duyệt kỳ lương' })
  @ApiParam({ name: 'id', description: 'ID kỳ lương' })
  approvePayroll(@Param('id') id: string) {
    return this.payrollService.approvePayroll(id);
  }

  @Post('periods/:id/close')
  @ApiOperation({ summary: 'Chốt kỳ lương (tạo snapshot)' })
  @ApiParam({ name: 'id', description: 'ID kỳ lương' })
  closePayroll(@Param('id') id: string) {
    return this.payrollService.closePayroll(id);
  }

  @Patch('details/:id/adjust')
  @ApiOperation({ summary: 'Điều chỉnh lương thủ công' })
  @ApiParam({ name: 'id', description: 'ID chi tiết lương' })
  adjustPayroll(
    @Param('id') id: string,
    @Body() adjustmentDto: { bonuses: Record<string, number>; deductions: Record<string, number>; note: string },
  ) {
    return this.payrollService.adjustPayroll(id, adjustmentDto);
  }

  @Get('details/:id')
  @ApiOperation({ summary: 'Lấy chi tiết lương của một nhân viên' })
  @ApiParam({ name: 'id', description: 'ID chi tiết lương' })
  getPayrollDetail(@Param('id') id: string) {
    return this.payrollService.getPayrollDetail(id);
  }

  // Reports
  @Get('reports/department-summary/:periodId')
  @ApiOperation({ summary: 'Báo cáo tổng hợp theo phòng ban' })
  @ApiParam({ name: 'periodId', description: 'ID kỳ lương' })
  getDepartmentSummary(@Param('periodId') periodId: string) {
    return this.reportService.getDepartmentSummary(periodId);
  }

  @Get('reports/period-comparison')
  @ApiOperation({ summary: 'Báo cáo so sánh giữa các kỳ' })
  @ApiQuery({ name: 'fromYear', required: true })
  @ApiQuery({ name: 'fromMonth', required: true })
  @ApiQuery({ name: 'toYear', required: true })
  @ApiQuery({ name: 'toMonth', required: true })
  getPeriodComparison(
    @Query('fromYear') fromYear: string,
    @Query('fromMonth') fromMonth: string,
    @Query('toYear') toYear: string,
    @Query('toMonth') toMonth: string,
  ) {
    return this.reportService.getPeriodComparison(
      parseInt(fromYear),
      parseInt(fromMonth),
      parseInt(toYear),
      parseInt(toMonth),
    );
  }

  @Get('reports/tax/:periodId')
  @ApiOperation({ summary: 'Báo cáo chi tiết thuế TNCN' })
  @ApiParam({ name: 'periodId', description: 'ID kỳ lương' })
  getTaxReport(@Param('periodId') periodId: string) {
    return this.reportService.getTaxReport(periodId);
  }

  @Get('reports/insurance/:periodId')
  @ApiOperation({ summary: 'Báo cáo bảo hiểm' })
  @ApiParam({ name: 'periodId', description: 'ID kỳ lương' })
  getInsuranceReport(@Param('periodId') periodId: string) {
    return this.reportService.getInsuranceReport(periodId);
  }

  // ============================================
  // PRINT ENDPOINTS
  // ============================================

  @Get('periods/:id/print/payroll-summary')
  @ApiOperation({ summary: 'In bảng thanh toán lương (C01-TS)' })
  @ApiParam({ name: 'id', description: 'ID kỳ lương' })
  async printPayrollSummary(@Param('id') id: string, @Res() res: Response) {
    const result = await this.printService.printPayrollSummary(id, 'system');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.pdf);
  }

  @Get('ot-batches/:id/print')
  @ApiOperation({ summary: 'In bảng thanh toán OT (C02-TS)' })
  @ApiParam({ name: 'id', description: 'ID batch OT' })
  async printOtSummary(@Param('id') id: string, @Res() res: Response) {
    const result = await this.printService.printOtSummary(id, 'system');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.pdf);
  }

  @Get('periods/:id/print/insurance')
  @ApiOperation({ summary: 'In bảng kê bảo hiểm (D02-TS)' })
  @ApiParam({ name: 'id', description: 'ID kỳ lương' })
  async printInsuranceSummary(@Param('id') id: string, @Res() res: Response) {
    const result = await this.printService.printInsuranceSummary(id, 'system');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.pdf);
  }

  @Get('templates')
  @ApiOperation({ summary: 'Lấy danh sách templates' })
  @ApiQuery({ name: 'type', required: false })
  getTemplates(@Query('type') type?: string) {
    return this.templateService.getTemplates(type);
  }

  @Get('print-logs')
  @ApiOperation({ summary: 'Lấy lịch sử in ấn' })
  @ApiQuery({ name: 'periodId', required: false })
  getPrintHistory(@Query('periodId') periodId?: string) {
    return this.templateService.getPrintHistory(periodId);
  }
}
