import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OtService } from './ot.service';

@ApiTags('ot')
@Controller('ot')
export class OtController {
  constructor(private readonly otService: OtService) {}

  @Get('batches')
  @ApiOperation({ summary: 'Get all OT batches' })
  @ApiResponse({ status: 200, description: 'Return all OT batches' })
  async getOtBatches() {
    return this.otService.getOtBatches();
  }

  @Post('batches')
  @ApiOperation({ summary: 'Create OT batch' })
  async createOtBatch(@Body() dto: { periodId: string; name: string }) {
    return this.otService.createOtBatch(dto);
  }

  @Post('batches/:id/records')
  @ApiOperation({ summary: 'Add OT record to batch' })
  async addOtRecord(
    @Param('id') batchId: string,
    @Body()
    dto: {
      employeeId: string;
      date: string;
      otType: string;
      hours: number;
    },
  ) {
    return this.otService.addOtRecord(batchId, dto);
  }

  @Post('batches/:id/submit')
  @ApiOperation({ summary: 'Submit OT batch for approval' })
  async submitBatch(@Param('id') batchId: string) {
    return this.otService.submitBatch(batchId);
  }

  @Post('batches/:id/approve')
  @ApiOperation({ summary: 'Approve OT batch' })
  async approveBatch(@Param('id') batchId: string) {
    return this.otService.approveBatch(batchId);
  }
}
