import { Controller, Get } from '@nestjs/common';
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
}
