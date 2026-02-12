import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả nhân viên' })
  @ApiResponse({ status: 200, description: 'Danh sách nhân viên' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết nhân viên' })
  @ApiResponse({ status: 200, description: 'Thông tin nhân viên' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }
}
