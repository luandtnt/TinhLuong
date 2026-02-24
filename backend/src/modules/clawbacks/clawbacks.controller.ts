import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClawbacksService } from './clawbacks.service';

@ApiTags('clawbacks')
@Controller('clawbacks')
export class ClawbacksController {
  constructor(private readonly clawbacksService: ClawbacksService) {}

  @Get('batches')
  @ApiOperation({ summary: 'Get all clawback batches' })
  @ApiResponse({ status: 200, description: 'Return all clawback batches' })
  async getClawbackBatches() {
    return this.clawbacksService.getClawbackBatches();
  }

  @Post('batches')
  @ApiOperation({ summary: 'Create clawback batch' })
  async createClawbackBatch(@Body() dto: { deductPeriodId: string; name: string }) {
    return this.clawbacksService.createClawbackBatch(dto);
  }

  @Post('batches/:id/records')
  @ApiOperation({ summary: 'Add clawback record to batch' })
  async addClawbackRecord(
    @Param('id') batchId: string,
    @Body()
    dto: {
      employeeId: string;
      clawbackType: string;
      originalYear: number;
      originalMonth: number;
      amount: number;
      reason: string;
    },
  ) {
    return this.clawbacksService.addClawbackRecord(batchId, dto);
  }

  @Post('batches/:id/submit')
  @ApiOperation({ summary: 'Submit clawback batch for approval' })
  async submitBatch(@Param('id') batchId: string) {
    return this.clawbacksService.submitBatch(batchId);
  }

  @Post('batches/:id/approve')
  @ApiOperation({ summary: 'Approve clawback batch' })
  async approveBatch(@Param('id') batchId: string) {
    return this.clawbacksService.approveBatch(batchId);
  }
}
