import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTemplates() {
  console.log('🌱 Seeding print templates...');

  // 1. Bảng thanh toán lương (C01-TS)
  await prisma.printTemplate.upsert({
    where: { code: 'C01-TS' },
    update: {},
    create: {
      code: 'C01-TS',
      name: 'Bảng thanh toán lương',
      description: 'Bảng tổng hợp thanh toán lương theo mẫu chuẩn C01-TS',
      templateType: 'PAYROLL_SUMMARY',
      paperSize: 'A4',
      orientation: 'landscape',
      isActive: true,
      isDefault: true,
      headerTemplate: `
        <div class="text-center">
          <div class="text-bold" style="font-size: 14px;">{{companyName}}</div>
          <div>Mã số thuế: {{taxCode}}</div>
          <div>Địa chỉ: {{address}}</div>
        </div>
      `,
      htmlTemplate: `
        <h2 class="text-center text-bold">BẢNG THANH TOÁN LƯƠNG</h2>
        <div class="text-center" style="margin-bottom: 20px;">
          Tháng {{period.month}}/{{period.year}}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Số chứng từ:</strong> {{documentNumber}} &nbsp;&nbsp;
          <strong>Ngày:</strong> {{formatDate documentDate}}
        </div>
        
        <table>
          <thead>
            <tr>
              <th class="text-center" rowspan="2">STT</th>
              <th class="text-center" rowspan="2">Mã NV</th>
              <th class="text-center" rowspan="2">Họ và tên</th>
              <th class="text-center" rowspan="2">Phòng ban</th>
              <th class="text-center" rowspan="2">Lương cơ bản</th>
              <th class="text-center" rowspan="2">Phụ cấp</th>
              <th class="text-center" rowspan="2">Thưởng</th>
              <th class="text-center" rowspan="2">OT</th>
              <th class="text-center" colspan="4">Khấu trừ</th>
              <th class="text-center" rowspan="2">Thực lĩnh</th>
              <th class="text-center" rowspan="2">Ký nhận</th>
            </tr>
            <tr>
              <th class="text-center">BHXH</th>
              <th class="text-center">BHYT</th>
              <th class="text-center">BHTN</th>
              <th class="text-center">Thuế TNCN</th>
            </tr>
          </thead>
          <tbody>
            {{#each details}}
            <tr>
              <td class="text-center">{{@index}}</td>
              <td>{{employee.code}}</td>
              <td>{{employee.fullName}}</td>
              <td>{{employee.department.name}}</td>
              <td class="text-right">{{formatCurrency actualSalary}}</td>
              <td class="text-right">{{formatCurrency allowanceTotal}}</td>
              <td class="text-right">{{formatCurrency bonusTotal}}</td>
              <td class="text-right">{{formatCurrency otAmount}}</td>
              <td class="text-right">{{formatCurrency socialInsurance}}</td>
              <td class="text-right">{{formatCurrency healthInsurance}}</td>
              <td class="text-right">{{formatCurrency unemploymentIns}}</td>
              <td class="text-right">{{formatCurrency personalIncomeTax}}</td>
              <td class="text-right text-bold">{{formatCurrency netSalary}}</td>
              <td></td>
            </tr>
            {{/each}}
          </tbody>
          <tfoot>
            <tr class="text-bold">
              <td colspan="4" class="text-center">TỔNG CỘNG</td>
              <td class="text-right">{{formatCurrency totals.actualSalary}}</td>
              <td class="text-right">{{formatCurrency totals.allowances}}</td>
              <td class="text-right">{{formatCurrency totals.bonuses}}</td>
              <td class="text-right">{{formatCurrency totals.otAmount}}</td>
              <td class="text-right">{{formatCurrency totals.socialInsurance}}</td>
              <td class="text-right">{{formatCurrency totals.healthInsurance}}</td>
              <td class="text-right">{{formatCurrency totals.unemploymentIns}}</td>
              <td class="text-right">{{formatCurrency totals.personalIncomeTax}}</td>
              <td class="text-right">{{formatCurrency totals.netSalary}}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      `,
      footerTemplate: `
        <div class="signature-section">
          <div class="signature-box">
            <div class="text-bold">NGƯỜI LẬP BIỂU</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, họ tên)</div>
            <div style="margin-top: 60px;">{{preparedBy}}</div>
          </div>
          <div class="signature-box">
            <div class="text-bold">KẾ TOÁN TRƯỞNG</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, họ tên)</div>
            <div style="margin-top: 60px;">{{chiefAccountant}}</div>
          </div>
          <div class="signature-box">
            <div class="text-bold">GIÁM ĐỐC</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, đóng dấu)</div>
            <div style="margin-top: 60px;">{{director}}</div>
          </div>
        </div>
      `,
      metadata: {
        signatures: ['preparedBy', 'chiefAccountant', 'director'],
        companyFields: ['companyName', 'taxCode', 'address'],
      },
    },
  });

  console.log('✅ Created: Bảng thanh toán lương (C01-TS)');

  // 2. Bảng thanh toán làm thêm giờ (C02-TS)
  await prisma.printTemplate.upsert({
    where: { code: 'C02-TS' },
    update: {},
    create: {
      code: 'C02-TS',
      name: 'Bảng thanh toán làm thêm giờ',
      description: 'Bảng kê chi tiết làm thêm giờ theo mẫu C02-TS',
      templateType: 'OT_SUMMARY',
      paperSize: 'A4',
      orientation: 'landscape',
      isActive: true,
      isDefault: true,
      headerTemplate: `
        <div class="text-center">
          <div class="text-bold" style="font-size: 14px;">{{companyName}}</div>
          <div>Mã số thuế: {{taxCode}}</div>
        </div>
      `,
      htmlTemplate: `
        <h2 class="text-center text-bold">BẢNG THANH TOÁN LÀM THÊM GIỜ</h2>
        <div class="text-center" style="margin-bottom: 20px;">
          Tháng {{period.month}}/{{period.year}}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Số chứng từ:</strong> {{documentNumber}} &nbsp;&nbsp;
          <strong>Ngày:</strong> {{formatDate documentDate}}
        </div>
        
        <table>
          <thead>
            <tr>
              <th class="text-center">STT</th>
              <th class="text-center">Mã NV</th>
              <th class="text-center">Họ và tên</th>
              <th class="text-center">Phòng ban</th>
              <th class="text-center">Ngày</th>
              <th class="text-center">Loại OT</th>
              <th class="text-center">Số giờ</th>
              <th class="text-center">Đơn giá</th>
              <th class="text-center">Hệ số</th>
              <th class="text-center">Thành tiền</th>
              <th class="text-center">Ký nhận</th>
            </tr>
          </thead>
          <tbody>
            {{#each records}}
            <tr>
              <td class="text-center">{{add @index 1}}</td>
              <td>{{employee.code}}</td>
              <td>{{employee.fullName}}</td>
              <td>{{employee.department.name}}</td>
              <td class="text-center">{{formatDate date}}</td>
              <td class="text-center">{{otType}}</td>
              <td class="text-right">{{hours}}</td>
              <td class="text-right">{{formatCurrency hourlyRate}}</td>
              <td class="text-center">{{multiplier}}</td>
              <td class="text-right text-bold">{{formatCurrency amount}}</td>
              <td></td>
            </tr>
            {{/each}}
          </tbody>
          <tfoot>
            <tr class="text-bold">
              <td colspan="6" class="text-center">TỔNG CỘNG</td>
              <td class="text-right">{{totalHours}}</td>
              <td colspan="2"></td>
              <td class="text-right">{{formatCurrency totalAmount}}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      `,
      footerTemplate: `
        <div class="signature-section">
          <div class="signature-box">
            <div class="text-bold">NGƯỜI LẬP BIỂU</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, họ tên)</div>
            <div style="margin-top: 60px;">{{preparedBy}}</div>
          </div>
          <div class="signature-box">
            <div class="text-bold">KẾ TOÁN TRƯỞNG</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, họ tên)</div>
            <div style="margin-top: 60px;">{{chiefAccountant}}</div>
          </div>
          <div class="signature-box">
            <div class="text-bold">GIÁM ĐỐC</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, đóng dấu)</div>
            <div style="margin-top: 60px;">{{director}}</div>
          </div>
        </div>
      `,
    },
  });

  console.log('✅ Created: Bảng thanh toán OT (C02-TS)');

  // 3. Bảng kê BHXH (D02-TS)
  await prisma.printTemplate.upsert({
    where: { code: 'D02-TS' },
    update: {},
    create: {
      code: 'D02-TS',
      name: 'Bảng kê trích nộp bảo hiểm',
      description: 'Bảng kê BHXH, BHYT, BHTN, KPCĐ theo mẫu D02-TS',
      templateType: 'INSURANCE',
      paperSize: 'A4',
      orientation: 'landscape',
      isActive: true,
      isDefault: true,
      headerTemplate: `
        <div class="text-center">
          <div class="text-bold" style="font-size: 14px;">{{companyName}}</div>
          <div>Mã số thuế: {{taxCode}}</div>
        </div>
      `,
      htmlTemplate: `
        <h2 class="text-center text-bold">BẢNG KÊ TRÍCH NỘP BẢO HIỂM</h2>
        <div class="text-center" style="margin-bottom: 20px;">
          Tháng {{period.month}}/{{period.year}}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Số chứng từ:</strong> {{documentNumber}} &nbsp;&nbsp;
          <strong>Ngày:</strong> {{formatDate documentDate}}
        </div>
        
        <table>
          <thead>
            <tr>
              <th class="text-center" rowspan="2">STT</th>
              <th class="text-center" rowspan="2">Mã NV</th>
              <th class="text-center" rowspan="2">Họ và tên</th>
              <th class="text-center" rowspan="2">Lương đóng BH</th>
              <th class="text-center" colspan="4">Người lao động đóng</th>
              <th class="text-center" colspan="4">Người sử dụng lao động đóng</th>
              <th class="text-center" rowspan="2">Tổng cộng</th>
            </tr>
            <tr>
              <th class="text-center">BHXH (8%)</th>
              <th class="text-center">BHYT (1.5%)</th>
              <th class="text-center">BHTN (1%)</th>
              <th class="text-center">KPCĐ (1%)</th>
              <th class="text-center">BHXH (17.5%)</th>
              <th class="text-center">BHYT (3%)</th>
              <th class="text-center">BHTN (1%)</th>
              <th class="text-center">KPCĐ (2%)</th>
            </tr>
          </thead>
          <tbody>
            {{#each details}}
            <tr>
              <td class="text-center">{{add @index 1}}</td>
              <td>{{employee.code}}</td>
              <td>{{employee.fullName}}</td>
              <td class="text-right">{{formatCurrency insuranceBase}}</td>
              <td class="text-right">{{formatCurrency socialInsurance}}</td>
              <td class="text-right">{{formatCurrency healthInsurance}}</td>
              <td class="text-right">{{formatCurrency unemploymentIns}}</td>
              <td class="text-right">{{formatCurrency unionFee}}</td>
              <td class="text-right">{{formatCurrency employerSocial}}</td>
              <td class="text-right">{{formatCurrency employerHealth}}</td>
              <td class="text-right">{{formatCurrency employerUnemployment}}</td>
              <td class="text-right">{{formatCurrency employerUnion}}</td>
              <td class="text-right text-bold">{{formatCurrency totalInsurance}}</td>
            </tr>
            {{/each}}
          </tbody>
          <tfoot>
            <tr class="text-bold">
              <td colspan="3" class="text-center">TỔNG CỘNG</td>
              <td class="text-right">{{formatCurrency totals.insuranceBase}}</td>
              <td class="text-right">{{formatCurrency totals.socialInsurance}}</td>
              <td class="text-right">{{formatCurrency totals.healthInsurance}}</td>
              <td class="text-right">{{formatCurrency totals.unemploymentIns}}</td>
              <td class="text-right">{{formatCurrency totals.unionFee}}</td>
              <td class="text-right">{{formatCurrency totals.employerSocial}}</td>
              <td class="text-right">{{formatCurrency totals.employerHealth}}</td>
              <td class="text-right">{{formatCurrency totals.employerUnemployment}}</td>
              <td class="text-right">{{formatCurrency totals.employerUnion}}</td>
              <td class="text-right">{{formatCurrency totals.total}}</td>
            </tr>
          </tfoot>
        </table>
      `,
      footerTemplate: `
        <div class="signature-section">
          <div class="signature-box">
            <div class="text-bold">NGƯỜI LẬP BIỂU</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, họ tên)</div>
            <div style="margin-top: 60px;">{{preparedBy}}</div>
          </div>
          <div class="signature-box">
            <div class="text-bold">KẾ TOÁN TRƯỞNG</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, họ tên)</div>
            <div style="margin-top: 60px;">{{chiefAccountant}}</div>
          </div>
          <div class="signature-box">
            <div class="text-bold">GIÁM ĐỐC</div>
            <div style="margin-top: 10px; font-style: italic;">(Ký, đóng dấu)</div>
            <div style="margin-top: 60px;">{{director}}</div>
          </div>
        </div>
      `,
    },
  });

  console.log('✅ Created: Bảng kê BHXH (D02-TS)');

  console.log('✅ Template seeding completed!');
}

seedTemplates()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
