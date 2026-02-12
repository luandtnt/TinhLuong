import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Bắt đầu seed data...');

  // 1. Tạo đơn vị
  console.log('📁 Tạo đơn vị...');
  const dept1 = await prisma.department.upsert({
    where: { code: 'DEPT001' },
    update: {},
    create: {
      code: 'DEPT001',
      name: 'Phòng Hành chính',
    },
  });

  const dept2 = await prisma.department.upsert({
    where: { code: 'DEPT002' },
    update: {},
    create: {
      code: 'DEPT002',
      name: 'Phòng Kế toán',
    },
  });

  const dept3 = await prisma.department.upsert({
    where: { code: 'DEPT003' },
    update: {},
    create: {
      code: 'DEPT003',
      name: 'Phòng Kinh doanh',
    },
  });

  // 2. Tạo nhân viên
  console.log('👥 Tạo nhân viên...');
  const employees = [];
  
  for (let i = 1; i <= 10; i++) {
    const emp = await prisma.employee.upsert({
      where: { code: `NV${String(i).padStart(3, '0')}` },
      update: {},
      create: {
        code: `NV${String(i).padStart(3, '0')}`,
        fullName: `Nhân viên ${i}`,
        email: `nv${i}@company.com`,
        phone: `098${String(i).padStart(7, '0')}`,
        departmentId: i <= 3 ? dept1.id : i <= 6 ? dept2.id : dept3.id,
        position: i <= 2 ? 'Trưởng phòng' : 'Nhân viên',
        joinDate: new Date('2023-01-01'),
        baseSalary: i <= 2 ? 15000000 : 10000000,
        salaryCoefficient: i <= 2 ? 1.5 : 1.0, // Trưởng phòng hệ số 1.5
        kpiBonus: i <= 2 ? 2000000 : i <= 5 ? 1000000 : 500000, // Thưởng KPI
        status: 'ACTIVE',
      },
    });
    employees.push(emp);
  }

  // 3. Tạo cấu hình khoản lương
  console.log('💰 Tạo cấu hình khoản lương...');
  
  await prisma.salaryComponent.upsert({
    where: { code: 'LUONG_CB' },
    update: {},
    create: {
      code: 'LUONG_CB',
      name: 'Lương cơ bản',
      type: 'SALARY',
      isTaxable: true,
      isInsurable: true,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.salaryComponent.upsert({
    where: { code: 'PC_XANG_XE' },
    update: {},
    create: {
      code: 'PC_XANG_XE',
      name: 'Phụ cấp xăng xe',
      type: 'ALLOWANCE',
      isTaxable: true,
      isInsurable: false,
      isFixedAmount: true,
      defaultAmount: 1000000,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.salaryComponent.upsert({
    where: { code: 'PC_AN_TRUA' },
    update: {},
    create: {
      code: 'PC_AN_TRUA',
      name: 'Phụ cấp ăn trưa',
      type: 'ALLOWANCE',
      isTaxable: false,
      isInsurable: false,
      isFixedAmount: false, // Tính theo ngày công
      defaultAmount: 730000, // 730k/tháng = ~33k/ngày
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.salaryComponent.upsert({
    where: { code: 'PC_DIEN_THOAI' },
    update: {},
    create: {
      code: 'PC_DIEN_THOAI',
      name: 'Phụ cấp điện thoại',
      type: 'ALLOWANCE',
      isTaxable: true,
      isInsurable: false,
      isFixedAmount: true,
      defaultAmount: 500000,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  // 4. Tạo tỷ lệ BH
  console.log('🏥 Tạo tỷ lệ bảo hiểm...');
  
  await prisma.insuranceRate.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'BHXH',
      type: 'SOCIAL',
      employeeRate: 8.0,
      employerRate: 17.5,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.insuranceRate.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'BHYT',
      type: 'HEALTH',
      employeeRate: 1.5,
      employerRate: 3.0,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.insuranceRate.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      name: 'BHTN',
      type: 'UNEMPLOYMENT',
      employeeRate: 1.0,
      employerRate: 1.0,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.insuranceRate.upsert({
    where: { id: '4' },
    update: {},
    create: {
      id: '4',
      name: 'Công đoàn phí',
      type: 'UNION',
      employeeRate: 1.0,
      employerRate: 2.0,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  // 5. Tạo quy tắc OT
  console.log('⏰ Tạo quy tắc OT...');
  
  await prisma.otRule.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'OT ngày thường',
      otType: 'WEEKDAY',
      multiplier: 1.5,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.otRule.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'OT cuối tuần',
      otType: 'WEEKEND',
      multiplier: 2.0,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.otRule.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      name: 'OT ngày lễ',
      otType: 'HOLIDAY',
      multiplier: 3.0,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.otRule.upsert({
    where: { id: '4' },
    update: {},
    create: {
      id: '4',
      name: 'Làm đêm',
      otType: 'NIGHT_SHIFT',
      multiplier: 1.3,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  // 6. Tạo biểu thuế TNCN
  console.log('📊 Tạo biểu thuế TNCN...');
  
  const taxBrackets = [
    { from: 0, to: 5000000, rate: 5, deduction: 0 },
    { from: 5000000, to: 10000000, rate: 10, deduction: 250000 },
    { from: 10000000, to: 18000000, rate: 15, deduction: 750000 },
    { from: 18000000, to: 32000000, rate: 20, deduction: 1650000 },
    { from: 32000000, to: 52000000, rate: 25, deduction: 3250000 },
    { from: 52000000, to: 80000000, rate: 30, deduction: 5850000 },
    { from: 80000000, to: null, rate: 35, deduction: 9850000 },
  ];

  for (const [index, bracket] of taxBrackets.entries()) {
    await prisma.taxBracket.upsert({
      where: { id: String(index + 1) },
      update: {},
      create: {
        id: String(index + 1),
        fromAmount: bracket.from,
        toAmount: bracket.to,
        rate: bracket.rate,
        deduction: bracket.deduction,
        effectiveDate: new Date('2024-01-01'),
      },
    });
  }

  // 7. Tạo giảm trừ gia cảnh
  console.log('👨‍👩‍👧‍👦 Tạo giảm trừ gia cảnh...');
  
  await prisma.taxDeduction.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Giảm trừ bản thân',
      type: 'SELF',
      amount: 11000000,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  await prisma.taxDeduction.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Giảm trừ người phụ thuộc',
      type: 'DEPENDENT',
      amount: 4400000,
      effectiveDate: new Date('2024-01-01'),
    },
  });

  // 8. Tạo kỳ lương mẫu
  console.log('📅 Tạo kỳ lương mẫu...');
  
  const period = await prisma.payrollPeriod.upsert({
    where: { code: '2025-01' },
    update: {},
    create: {
      code: '2025-01',
      year: 2025,
      month: 1,
      status: 'DRAFT',
    },
  });

  // 9. Tạo chấm công mẫu
  console.log('📝 Tạo chấm công mẫu...');
  
  for (const emp of employees) {
    await prisma.timesheet.upsert({
      where: {
        employeeId_year_month: {
          employeeId: emp.id,
          year: 2025,
          month: 1,
        },
      },
      update: {},
      create: {
        employeeId: emp.id,
        year: 2025,
        month: 1,
        workDays: 22,
        leaveDays: 1,
        unpaidLeaveDays: 0,
      },
    });
  }

  // 10. Tạo OT batches mẫu
  console.log('⏰ Tạo OT batches mẫu...');
  
  const otBatch1 = await prisma.otBatch.upsert({
    where: { code: 'OT-2025-01-001' },
    update: {},
    create: {
      code: 'OT-2025-01-001',
      name: 'OT tháng 1/2025 - Đợt 1',
      periodId: period.id,
      status: 'APPROVED',
      totalAmount: 15000000,
      submittedAt: new Date('2025-01-25'),
      approvedAt: new Date('2025-01-26'),
    },
  });

  const otBatch2 = await prisma.otBatch.upsert({
    where: { code: 'OT-2025-01-002' },
    update: {},
    create: {
      code: 'OT-2025-01-002',
      name: 'OT tháng 1/2025 - Đợt 2',
      periodId: period.id,
      status: 'SUBMITTED',
      totalAmount: 8500000,
      submittedAt: new Date('2025-01-28'),
    },
  });

  const otBatch3 = await prisma.otBatch.upsert({
    where: { code: 'OT-2025-01-003' },
    update: {},
    create: {
      code: 'OT-2025-01-003',
      name: 'OT cuối tuần tháng 1/2025',
      periodId: period.id,
      status: 'DRAFT',
      totalAmount: 12000000,
    },
  });

  // 11. Tạo OT records mẫu
  console.log('📋 Tạo OT records mẫu...');
  
  // OT records cho batch 1
  for (let i = 0; i < 5; i++) {
    await prisma.otRecord.create({
      data: {
        batchId: otBatch1.id,
        employeeId: employees[i].id,
        date: new Date('2025-01-15'),
        otType: 'WEEKDAY',
        hours: 3,
        hourlyRate: 100000,
        multiplier: 1.5,
        amount: 450000,
        note: 'OT làm dự án khẩn',
      },
    });
  }

  // OT records cho batch 2
  for (let i = 5; i < 8; i++) {
    await prisma.otRecord.create({
      data: {
        batchId: otBatch2.id,
        employeeId: employees[i].id,
        date: new Date('2025-01-20'),
        otType: 'NIGHT_SHIFT',
        hours: 4,
        hourlyRate: 90000,
        multiplier: 1.3,
        amount: 468000,
        note: 'Làm ca đêm',
      },
    });
  }

  // OT records cho batch 3
  for (let i = 0; i < 6; i++) {
    await prisma.otRecord.create({
      data: {
        batchId: otBatch3.id,
        employeeId: employees[i].id,
        date: new Date('2025-01-25'),
        otType: 'WEEKEND',
        hours: 8,
        hourlyRate: 100000,
        multiplier: 2.0,
        amount: 1600000,
        note: 'OT cuối tuần',
      },
    });
  }

  // 12. Tạo Clawback batches mẫu
  console.log('💸 Tạo Clawback batches mẫu...');
  
  const clawbackBatch1 = await prisma.clawbackBatch.upsert({
    where: { code: 'CB-2025-01-001' },
    update: {},
    create: {
      code: 'CB-2025-01-001',
      name: 'Truy thu lương tháng 12/2024',
      deductPeriodId: period.id,
      status: 'APPROVED',
      totalAmount: 5000000,
      submittedAt: new Date('2025-01-20'),
      approvedAt: new Date('2025-01-21'),
    },
  });

  const clawbackBatch2 = await prisma.clawbackBatch.upsert({
    where: { code: 'CB-2025-01-002' },
    update: {},
    create: {
      code: 'CB-2025-01-002',
      name: 'Truy thu phụ cấp tháng 11/2024',
      deductPeriodId: period.id,
      status: 'SUBMITTED',
      totalAmount: 3200000,
      submittedAt: new Date('2025-01-22'),
    },
  });

  const clawbackBatch3 = await prisma.clawbackBatch.upsert({
    where: { code: 'CB-2025-01-003' },
    update: {},
    create: {
      code: 'CB-2025-01-003',
      name: 'Truy thu lương tháng 10/2024',
      deductPeriodId: period.id,
      status: 'DRAFT',
      totalAmount: 2500000,
    },
  });

  // 13. Tạo Clawback records mẫu
  console.log('📝 Tạo Clawback records mẫu...');
  
  // Clawback records cho batch 1
  await prisma.clawback.create({
    data: {
      batchId: clawbackBatch1.id,
      employeeId: employees[0].id,
      clawbackType: 'SALARY_REDUCTION',
      originalYear: 2024,
      originalMonth: 12,
      amount: 2000000,
      reason: 'Tính sai lương cơ bản tháng 12/2024',
    },
  });

  await prisma.clawback.create({
    data: {
      batchId: clawbackBatch1.id,
      employeeId: employees[1].id,
      clawbackType: 'OVERPAYMENT',
      originalYear: 2024,
      originalMonth: 12,
      amount: 3000000,
      reason: 'Trả thừa lương tháng 12/2024',
    },
  });

  // Clawback records cho batch 2
  await prisma.clawback.create({
    data: {
      batchId: clawbackBatch2.id,
      employeeId: employees[2].id,
      clawbackType: 'ALLOWANCE_REDUCTION',
      originalYear: 2024,
      originalMonth: 11,
      amount: 1500000,
      reason: 'Tính sai phụ cấp xăng xe',
    },
  });

  await prisma.clawback.create({
    data: {
      batchId: clawbackBatch2.id,
      employeeId: employees[3].id,
      clawbackType: 'ALLOWANCE_REDUCTION',
      originalYear: 2024,
      originalMonth: 11,
      amount: 1700000,
      reason: 'Tính sai phụ cấp điện thoại',
    },
  });

  // Clawback records cho batch 3
  await prisma.clawback.create({
    data: {
      batchId: clawbackBatch3.id,
      employeeId: employees[4].id,
      clawbackType: 'SALARY_REDUCTION',
      originalYear: 2024,
      originalMonth: 10,
      amount: 2500000,
      reason: 'Nghỉ không phép chưa trừ lương',
    },
  });

  console.log('✅ Seed data hoàn thành!');
  console.log(`   - ${employees.length} nhân viên`);
  console.log(`   - 3 đơn vị`);
  console.log(`   - 4 khoản lương/phụ cấp`);
  console.log(`   - 4 loại bảo hiểm`);
  console.log(`   - 4 quy tắc OT`);
  console.log(`   - 7 bậc thuế TNCN`);
  console.log(`   - 1 kỳ lương (2025-01)`);
  console.log(`   - 3 OT batches với ${5 + 3 + 6} records`);
  console.log(`   - 3 Clawback batches với 5 records`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seed data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
