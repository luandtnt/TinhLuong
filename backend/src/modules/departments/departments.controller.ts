import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả đơn vị' })
  @ApiResponse({ status: 200, description: 'Danh sách đơn vị' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết đơn vị' })
  @ApiResponse({ status: 200, description: 'Thông tin đơn vị' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn vị' })
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }
}
