import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigsService } from './configs.service';

@ApiTags('configs')
@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Get('salary-components')
  @ApiOperation({ summary: 'Get all salary components' })
  @ApiResponse({ status: 200, description: 'Return all salary components' })
  async getSalaryComponents() {
    return this.configsService.getSalaryComponents();
  }

  @Get('insurance-rates')
  @ApiOperation({ summary: 'Get all insurance rates' })
  @ApiResponse({ status: 200, description: 'Return all insurance rates' })
  async getInsuranceRates() {
    return this.configsService.getInsuranceRates();
  }

  @Get('ot-rules')
  @ApiOperation({ summary: 'Get all OT rules' })
  @ApiResponse({ status: 200, description: 'Return all OT rules' })
  async getOtRules() {
    return this.configsService.getOtRules();
  }

  @Get('tax-brackets')
  @ApiOperation({ summary: 'Get all tax brackets' })
  @ApiResponse({ status: 200, description: 'Return all tax brackets' })
  async getTaxBrackets() {
    return this.configsService.getTaxBrackets();
  }
}
