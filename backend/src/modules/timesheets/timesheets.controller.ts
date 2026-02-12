import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TimesheetsService } from './timesheets.service';

@ApiTags('timesheets')
@Controller('timesheets')
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

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
}
