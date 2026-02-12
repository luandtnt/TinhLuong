import { PayrollDetail } from '../../types/payroll';

interface PayslipPrintProps {
  detail: PayrollDetail;
  period: { month: number; year: number };
}

export function PayslipPrint({ detail, period }: PayslipPrintProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount));
  };

  const totalAllowances = Object.values(detail.allowances).reduce((sum, val) => sum + val, 0);
  const totalBonuses = Object.values(detail.bonuses).reduce((sum, val) => sum + val, 0);
  const totalDeductions = Object.values(detail.deductions).reduce((sum, val) => sum + val, 0);
  const totalInsurance = detail.socialInsurance + detail.healthInsurance + detail.unemploymentIns + detail.unionFee;

  const printPayslip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Print Button - Hidden when printing */}
      <div className="no-print fixed top-4 right-4 flex gap-2">
        <button
          onClick={() => window.close()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Đóng
        </button>
        <button
          onClick={printPayslip}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          In phiếu lương
        </button>
      </div>

      {/* Payslip Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">PHIẾU LƯƠNG</h1>
          <p className="text-lg text-gray-700">Tháng {period.month}/{period.year}</p>
        </div>

        {/* Employee Info */}
        <div className="mb-6 pb-4 border-b-2 border-gray-300">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Mã nhân viên:</p>
              <p className="font-semibold text-lg">{detail.employee?.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Họ và tên:</p>
              <p className="font-semibold text-lg">{detail.employee?.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phòng ban:</p>
              <p className="font-semibold">{detail.employee?.department?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chức vụ:</p>
              <p className="font-semibold">{detail.employee?.position || '-'}</p>
            </div>
          </div>
        </div>

        {/* Salary Details */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
            CHI TIẾT LƯƠNG
          </h2>

          {/* Income Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">I. THU NHẬP</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">1. Lương cơ bản</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(detail.baseSalary)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700 pl-4">- Hệ số lương: {detail.salaryCoefficient}</td>
                  <td className="py-2 text-right"></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700 pl-4">
                    - Ngày công: {detail.actualWorkDays + detail.paidLeaveDays}/{detail.standardWorkDays}
                  </td>
                  <td className="py-2 text-right"></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700 font-medium">Lương thực tế</td>
                  <td className="py-2 text-right font-semibold">{formatCurrency(detail.actualSalary)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">2. Phụ cấp</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(totalAllowances)}</td>
                </tr>
                {Object.entries(detail.allowances).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="py-2 text-gray-600 pl-4">- {key}</td>
                    <td className="py-2 text-right">{formatCurrency(value)}</td>
                  </tr>
                ))}
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">3. Thưởng</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(detail.kpiBonus + totalBonuses)}</td>
                </tr>
                {detail.kpiBonus > 0 && (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600 pl-4">- Thưởng KPI</td>
                    <td className="py-2 text-right">{formatCurrency(detail.kpiBonus)}</td>
                  </tr>
                )}
                {Object.entries(detail.bonuses).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="py-2 text-gray-600 pl-4">- {key}</td>
                    <td className="py-2 text-right">{formatCurrency(value)}</td>
                  </tr>
                ))}
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">4. Làm thêm giờ</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(detail.otAmount)}</td>
                </tr>
                <tr className="border-b-2 border-gray-400 bg-gray-50">
                  <td className="py-3 text-gray-900 font-bold">TỔNG THU NHẬP</td>
                  <td className="py-3 text-right font-bold text-lg">{formatCurrency(detail.grossSalary)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deductions Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">II. KHẤU TRỪ</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">1. Bảo hiểm</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(totalInsurance)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600 pl-4">- BHXH (8%)</td>
                  <td className="py-2 text-right">{formatCurrency(detail.socialInsurance)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600 pl-4">- BHYT (1.5%)</td>
                  <td className="py-2 text-right">{formatCurrency(detail.healthInsurance)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600 pl-4">- BHTN (1%)</td>
                  <td className="py-2 text-right">{formatCurrency(detail.unemploymentIns)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600 pl-4">- Công đoàn (1%)</td>
                  <td className="py-2 text-right">{formatCurrency(detail.unionFee)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">2. Thuế TNCN</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(detail.personalIncomeTax)}</td>
                </tr>
                {totalDeductions > 0 && (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-700">3. Khấu trừ khác</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(totalDeductions)}</td>
                  </tr>
                )}
                {Object.entries(detail.deductions).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="py-2 text-gray-600 pl-4">- {key}</td>
                    <td className="py-2 text-right">{formatCurrency(value)}</td>
                  </tr>
                ))}
                {detail.clawbackAmount > 0 && (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-700">4. Truy thu</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(detail.clawbackAmount)}</td>
                  </tr>
                )}
                <tr className="border-b-2 border-gray-400 bg-gray-50">
                  <td className="py-3 text-gray-900 font-bold">TỔNG KHẤU TRỪ</td>
                  <td className="py-3 text-right font-bold text-lg">
                    {formatCurrency(totalInsurance + detail.personalIncomeTax + totalDeductions + detail.clawbackAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Net Salary */}
          <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">THỰC LĨNH:</span>
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(detail.netSalary)} VNĐ</span>
            </div>
          </div>
        </div>

        {/* Note */}
        {detail.note && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-1">Ghi chú:</p>
            <p className="text-sm text-gray-600">{detail.note}</p>
          </div>
        )}

        {/* Signatures */}
        <div className="mt-12 grid grid-cols-2 gap-8">
          <div className="text-center">
            <p className="font-semibold mb-16">Người lập phiếu</p>
            <p className="text-sm text-gray-600">(Ký, họ tên)</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mb-16">Người nhận</p>
            <p className="text-sm text-gray-600">(Ký, họ tên)</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          <p>Phiếu lương này được tạo tự động từ hệ thống quản lý lương</p>
          <p>Ngày in: {new Date().toLocaleDateString('vi-VN')}</p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
}
