import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TimesheetsService } from './timesheets.service';
import { TimesheetBatchesService } from './timesheets-batches.service';

@ApiTags('timesheets')
@Controller('timesheets')
export class TimesheetsController {
  constructor(
    private readonly timesheetsService: TimesheetsService,
    private readonly batchesService: TimesheetBatchesService,
  ) {}

  // Batch endpoints
  @Get('batches')
  @ApiOperation({ summary: 'Get all timesheet batches' })
  async getBatches() {
    return this.batchesService.getBatches();
  }

  @Post('batches')
  @ApiOperation({ summary: 'Create timesheet batch' })
  async createBatch(
    @Body() dto: { year: number; month: number; name: string },
  ) {
    return this.batchesService.createBatch(dto);
  }

  @Post('batches/:id/timesheets')
  @ApiOperation({ summary: 'Add timesheet to batch' })
  async addTimesheet(
    @Param('id') batchId: string,
    @Body()
    dto: {
      employeeId: string;
      workDays: number;
      leaveDays: number;
      unpaidLeaveDays: number;
    },
  ) {
    return this.batchesService.addTimesheet(batchId, dto);
  }

  @Post('batches/:id/timesheets/bulk')
  @ApiOperation({ summary: 'Bulk add timesheets to batch' })
  async bulkAddTimesheets(
    @Param('id') batchId: string,
    @Body()
    dto: {
      timesheets: Array<{
        employeeId: string;
        workDays: number;
        leaveDays: number;
        unpaidLeaveDays: number;
      }>;
    },
  ) {
    return this.batchesService.bulkAddTimesheets(batchId, dto.timesheets);
  }

  @Post('batches/:id/submit')
  @ApiOperation({ summary: 'Submit timesheet batch for approval' })
  async submitBatch(@Param('id') batchId: string) {
    return this.batchesService.submitBatch(batchId);
  }

  @Post('batches/:id/approve')
  @ApiOperation({ summary: 'Approve timesheet batch' })
  async approveBatch(@Param('id') batchId: string) {
    return this.batchesService.approveBatch(batchId);
  }

  // Legacy endpoints (keep for backward compatibility)
  @Get()
  @ApiOperation({ summary: 'Get timesheets by year and month' })
  @ApiQuery({ name: 'year', required: true, type: Number })
  @ApiQuery({ name: 'month', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Return timesheets for the period' })
  async getTimesheets(
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.timesheetsService.getTimesheets(Number(year), Number(month));
  }

  @Post()
  @ApiOperation({ summary: 'Create or update timesheet' })
  async createTimesheet(
    @Body()
    dto: {
      employeeId: string;
      year: number;
      month: number;
      workDays: number;
      leaveDays: number;
      unpaidLeaveDays: number;
    },
  ) {
    return this.timesheetsService.createOrUpdateTimesheet(dto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Bulk create/update timesheets' })
  async bulkCreateTimesheets(
    @Body()
    dto: {
      year: number;
      month: number;
      timesheets: Array<{
        employeeId: string;
        workDays: number;
        leaveDays: number;
        unpaidLeaveDays: number;
      }>;
    },
  ) {
    return this.timesheetsService.bulkCreateTimesheets(dto);
  }
}
