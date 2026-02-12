import { X } from 'lucide-react';
import { PayrollDetail } from '../../types/payroll';

interface PayrollDetailModalProps {
  detail: PayrollDetail;
  onClose: () => void;
}

export function PayrollDetailModal({ detail, onClose }: PayrollDetailModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount));
  };

  const totalAllowances = Object.values(detail.allowances).reduce((sum, val) => sum + Number(val), 0);
  const totalBonuses = Object.values(detail.bonuses).reduce((sum, val) => sum + Number(val), 0);
  const totalDeductions = Object.values(detail.deductions).reduce((sum, val) => sum + Number(val), 0);
  const totalInsurance = Number(detail.socialInsurance) + Number(detail.healthInsurance) + Number(detail.unemploymentIns) + Number(detail.unionFee);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Chi tiết lương - {detail.employee?.code}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {detail.employee?.fullName} - {detail.employee?.department?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Thông tin cơ bản */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Thông tin cơ bản</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lương cơ bản:</span>
                    <span className="font-medium">{formatCurrency(Number(detail.baseSalary))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hệ số lương:</span>
                    <span className="font-medium">{Number(detail.salaryCoefficient)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày công chuẩn:</span>
                    <span className="font-medium">{Number(detail.standardWorkDays)} ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày công thực tế:</span>
                    <span className="font-medium">{Number(detail.actualWorkDays)} ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày nghỉ có lương:</span>
                    <span className="font-medium">{Number(detail.paidLeaveDays)} ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày nghỉ không lương:</span>
                    <span className="font-medium">{Number(detail.unpaidLeaveDays)} ngày</span>
                  </div>
                </div>
              </div>

              {/* Công thức tính lương */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Công thức tính</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-700">
                    <p className="font-medium mb-1">Lương thực tế:</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      = Lương cơ bản × Hệ số × (Ngày công thực tế + Nghỉ có lương) / Ngày công chuẩn
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      = {formatCurrency(Number(detail.baseSalary))} × {Number(detail.salaryCoefficient)} × ({Number(detail.actualWorkDays)} + {Number(detail.paidLeaveDays)}) / {Number(detail.standardWorkDays)}
                    </p>
                    <p className="font-medium text-blue-700 mt-1">
                      = {formatCurrency(Number(detail.actualSalary))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phụ cấp */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Phụ cấp</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(detail.allowances).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{formatCurrency(value)}</span>
                    </div>
                  ))}
                  {Object.keys(detail.allowances).length === 0 && (
                    <p className="text-gray-500 text-center py-2">Không có phụ cấp</p>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">Tổng phụ cấp:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(totalAllowances)}</span>
                  </div>
                </div>
              </div>

              {/* Thưởng */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Thưởng</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thưởng KPI:</span>
                    <span className="font-medium">{formatCurrency(Number(detail.kpiBonus))}</span>
                  </div>
                  {Object.entries(detail.bonuses).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{formatCurrency(Number(value))}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">Tổng thưởng:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(Number(detail.kpiBonus) + totalBonuses)}</span>
                  </div>
                </div>
              </div>

              {/* OT */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Làm thêm giờ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền OT:</span>
                    <span className="font-medium">{formatCurrency(Number(detail.otAmount))}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Bảo hiểm */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Bảo hiểm (Người lao động)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">BHXH (8%):</span>
                    <span className="font-medium">{formatCurrency(Number(detail.socialInsurance))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BHYT (1.5%):</span>
                    <span className="font-medium">{formatCurrency(Number(detail.healthInsurance))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BHTN (1%):</span>
                    <span className="font-medium">{formatCurrency(Number(detail.unemploymentIns))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Công đoàn (1%):</span>
                    <span className="font-medium">{formatCurrency(Number(detail.unionFee))}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">Tổng BH:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(totalInsurance)}</span>
                  </div>
                </div>
              </div>

              {/* Thuế TNCN */}
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Thuế TNCN</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thu nhập chịu thuế:</span>
                    <span className="font-medium">{formatCurrency(Number(detail.taxableIncome))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm trừ gia cảnh:</span>
                    <span className="font-medium">{formatCurrency(Number(detail.taxDeductions))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thu nhập tính thuế:</span>
                    <span className="font-medium">{formatCurrency(Math.max(0, Number(detail.taxableIncome) - Number(detail.taxDeductions)))}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">Thuế phải nộp:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(Number(detail.personalIncomeTax))}</span>
                  </div>
                </div>
              </div>

              {/* Khấu trừ */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Khấu trừ khác</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(detail.deductions).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{formatCurrency(Number(value))}</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Truy thu:</span>
                    <span className="font-medium">{formatCurrency(Number(detail.clawbackAmount))}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">Tổng khấu trừ:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(totalDeductions + Number(detail.clawbackAmount))}</span>
                  </div>
                </div>
              </div>

              {/* Tổng kết */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white">
                <h3 className="font-semibold mb-3">Tổng kết</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tổng thu nhập:</span>
                    <span className="font-medium">{formatCurrency(Number(detail.grossSalary))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng khấu trừ:</span>
                    <span className="font-medium">
                      -{formatCurrency(totalInsurance + Number(detail.personalIncomeTax) + totalDeductions + Number(detail.clawbackAmount))}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-500 text-lg">
                    <span className="font-bold">Thực lĩnh:</span>
                    <span className="font-bold">{formatCurrency(Number(detail.netSalary))}</span>
                  </div>
                </div>
              </div>

              {/* Ghi chú */}
              {detail.note && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Ghi chú</h3>
                  <p className="text-sm text-gray-700">{detail.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
