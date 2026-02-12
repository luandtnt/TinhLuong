import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Tạo bút toán tự động cho kỳ lương
   */
  async generateAccountingEntry(periodId: string) {
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id: periodId },
      include: {
        payrollDetails: {
          include: {
            employee: {
              include: {
                department: true,
              },
            },
          },
        },
      },
    });

    if (!period) {
      throw new Error('Không tìm thấy kỳ lương');
    }

    // Tính tổng các khoản
    const totals = period.payrollDetails.reduce(
      (acc, detail) => {
        acc.totalSalary += Number(detail.grossSalary);
        acc.totalSocialIns += Number(detail.socialInsurance);
        acc.totalHealthIns += Number(detail.healthInsurance);
        acc.totalUnemploymentIns += Number(detail.unemploymentIns);
        acc.totalUnionFee += Number(detail.unionFee);
        acc.totalTax += Number(detail.personalIncomeTax);
        acc.totalNet += Number(detail.netSalary);
        return acc;
      },
      {
        totalSalary: 0,
        totalSocialIns: 0,
        totalHealthIns: 0,
        totalUnemploymentIns: 0,
        totalUnionFee: 0,
        totalTax: 0,
        totalNet: 0,
      },
    );

    // Tính bảo hiểm người sử dụng lao động (giả định tỷ lệ)
    const employerSocialIns = totals.totalSocialIns * (17.5 / 8); // 17.5% NSDLĐ vs 8% NLĐ
    const employerHealthIns = totals.totalHealthIns * (3 / 1.5); // 3% NSDLĐ vs 1.5% NLĐ
    const employerUnemploymentIns = totals.totalUnemploymentIns; // 1% cả 2 bên

    const totalDebit = totals.totalSalary + employerSocialIns + employerHealthIns + employerUnemploymentIns;
    const totalCredit = totalDebit;

    // Tạo bút toán
    const entry = await this.prisma.accountingEntry.create({
      data: {
        periodId,
        entryDate: new Date(),
        description: `Hạch toán lương tháng ${period.month}/${period.year}`,
        totalDebit,
        totalCredit,
        status: 'DRAFT',
        details: {
          create: [
            // Nợ TK 622 - Chi phí nhân công trực tiếp
            {
              accountCode: '622',
              accountName: 'Chi phí nhân công trực tiếp',
              debit: totals.totalSalary,
              credit: 0,
              description: 'Lương nhân viên',
            },
            // Nợ TK 627 - Chi phí BHXH, BHYT, BHTN, KPCĐ (phần NSDLĐ)
            {
              accountCode: '627',
              accountName: 'Chi phí BHXH, BHYT, BHTN, KPCĐ',
              debit: employerSocialIns + employerHealthIns + employerUnemploymentIns,
              credit: 0,
              description: 'Bảo hiểm phần công ty',
            },
            // Có TK 334 - Phải trả người lao động
            {
              accountCode: '334',
              accountName: 'Phải trả người lao động',
              debit: 0,
              credit: totals.totalNet,
              description: 'Lương thực lĩnh',
            },
            // Có TK 338 - Phải trả phải nộp khác - BHXH
            {
              accountCode: '3383',
              accountName: 'Bảo hiểm xã hội',
              debit: 0,
              credit: totals.totalSocialIns + employerSocialIns,
              description: 'BHXH phải nộp',
            },
            // Có TK 338 - Phải trả phải nộp khác - BHYT
            {
              accountCode: '3384',
              accountName: 'Bảo hiểm y tế',
              debit: 0,
              credit: totals.totalHealthIns + employerHealthIns,
              description: 'BHYT phải nộp',
            },
            // Có TK 338 - Phải trả phải nộp khác - BHTN
            {
              accountCode: '3385',
              accountName: 'Bảo hiểm thất nghiệp',
              debit: 0,
              credit: totals.totalUnemploymentIns + employerUnemploymentIns,
              description: 'BHTN phải nộp',
            },
            // Có TK 338 - Phải trả phải nộp khác - Công đoàn
            {
              accountCode: '3386',
              accountName: 'Kinh phí công đoàn',
              debit: 0,
              credit: totals.totalUnionFee,
              description: 'Công đoàn phải nộp',
            },
            // Có TK 333 - Thuế và các khoản phải nộp nhà nước
            {
              accountCode: '3335',
              accountName: 'Thuế thu nhập cá nhân',
              debit: 0,
              credit: totals.totalTax,
              description: 'Thuế TNCN phải nộp',
            },
          ],
        },
      },
      include: {
        details: true,
      },
    });

    return entry;
  }

  /**
   * Lấy bút toán của kỳ lương
   */
  async getAccountingEntry(periodId: string) {
    return this.prisma.accountingEntry.findFirst({
      where: { periodId },
      include: {
        details: {
          orderBy: { accountCode: 'asc' },
        },
      },
    });
  }

  /**
   * Đánh dấu đã hạch toán
   */
  async postAccountingEntry(entryId: string, userId: string) {
    const entry = await this.prisma.accountingEntry.update({
      where: { id: entryId },
      data: {
        status: 'POSTED',
        postedAt: new Date(),
        postedBy: userId,
      },
    });

    // Cập nhật trạng thái kỳ lương
    await this.prisma.payrollPeriod.update({
      where: { id: entry.periodId },
      data: {
        status: 'ACCOUNTED',
        accountedAt: new Date(),
      },
    });

    return entry;
  }

  /**
   * Xuất bút toán sang định dạng CSV
   */
  async exportAccountingEntry(entryId: string) {
    const entry = await this.prisma.accountingEntry.findUnique({
      where: { id: entryId },
      include: {
        details: {
          orderBy: { accountCode: 'asc' },
        },
        period: true,
      },
    });

    if (!entry) {
      throw new Error('Không tìm thấy bút toán');
    }

    return {
      entry,
      csvData: entry.details.map(detail => ({
        accountCode: detail.accountCode,
        accountName: detail.accountName,
        debit: detail.debit,
        credit: detail.credit,
        description: detail.description,
      })),
    };
  }
}
