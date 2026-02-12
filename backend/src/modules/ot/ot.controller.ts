import { Controller, Get } from '@nestjs/common';
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
}
