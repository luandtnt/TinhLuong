import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { PayrollDetail } from '../../types/payroll';

interface AdjustPayrollModalProps {
  detail: PayrollDetail;
  onClose: () => void;
  onSave: (adjustments: PayrollAdjustment) => void;
}

export interface PayrollAdjustment {
  detailId: string;
  bonuses: Record<string, number>;
  deductions: Record<string, number>;
  note: string;
}

export function AdjustPayrollModal({ detail, onClose, onSave }: AdjustPayrollModalProps) {
  const [bonuses, setBonuses] = useState<Array<{ name: string; amount: number }>>([]);
  const [deductions, setDeductions] = useState<Array<{ name: string; amount: number }>>([]);
  const [note, setNote] = useState(detail.note || '');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount));
  };

  const addBonus = () => {
    setBonuses([...bonuses, { name: '', amount: 0 }]);
  };

  const removeBonus = (index: number) => {
    setBonuses(bonuses.filter((_, i) => i !== index));
  };

  const updateBonus = (index: number, field: 'name' | 'amount', value: string | number) => {
    const updated = [...bonuses];
    updated[index] = { ...updated[index], [field]: value };
    setBonuses(updated);
  };

  const addDeduction = () => {
    setDeductions([...deductions, { name: '', amount: 0 }]);
  };

  const removeDeduction = (index: number) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const updateDeduction = (index: number, field: 'name' | 'amount', value: string | number) => {
    const updated = [...deductions];
    updated[index] = { ...updated[index], [field]: value };
    setDeductions(updated);
  };

  const handleSave = () => {
    const bonusesObj: Record<string, number> = {};
    bonuses.forEach(b => {
      if (b.name && b.amount > 0) {
        bonusesObj[b.name] = b.amount;
      }
    });

    const deductionsObj: Record<string, number> = {};
    deductions.forEach(d => {
      if (d.name && d.amount > 0) {
        deductionsObj[d.name] = d.amount;
      }
    });

    onSave({
      detailId: detail.id,
      bonuses: bonusesObj,
      deductions: deductionsObj,
      note,
    });
  };

  const totalBonuses = bonuses.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const currentNetSalary = detail.netSalary;
  const adjustedNetSalary = currentNetSalary + totalBonuses - totalDeductions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Điều chỉnh lương - {detail.employee?.code}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {detail.employee?.fullName}
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Current Salary Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Lương hiện tại</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Tổng thu nhập:</p>
                <p className="font-semibold text-lg">{formatCurrency(detail.grossSalary)}</p>
              </div>
              <div>
                <p className="text-gray-600">Tổng khấu trừ:</p>
                <p className="font-semibold text-lg text-red-600">
                  -{formatCurrency(detail.grossSalary - detail.netSalary)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Thực lĩnh:</p>
                <p className="font-semibold text-lg text-green-600">{formatCurrency(detail.netSalary)}</p>
              </div>
            </div>
          </div>

          {/* Bonuses Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Thưởng bổ sung</h3>
              <button
                onClick={addBonus}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Plus size={16} />
                Thêm thưởng
              </button>
            </div>
            <div className="space-y-3">
              {bonuses.map((bonus, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Tên khoản thưởng"
                    value={bonus.name}
                    onChange={(e) => updateBonus(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Số tiền"
                    value={bonus.amount || ''}
                    onChange={(e) => updateBonus(index, 'amount', Number(e.target.value))}
                    className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => removeBonus(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {bonuses.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Chưa có khoản thưởng bổ sung</p>
              )}
              {bonuses.length > 0 && (
                <div className="flex justify-end pt-2 border-t border-gray-200">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tổng thưởng:</p>
                    <p className="font-semibold text-green-600">{formatCurrency(totalBonuses)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deductions Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Khấu trừ bổ sung</h3>
              <button
                onClick={addDeduction}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Plus size={16} />
                Thêm khấu trừ
              </button>
            </div>
            <div className="space-y-3">
              {deductions.map((deduction, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Tên khoản khấu trừ"
                    value={deduction.name}
                    onChange={(e) => updateDeduction(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Số tiền"
                    value={deduction.amount || ''}
                    onChange={(e) => updateDeduction(index, 'amount', Number(e.target.value))}
                    className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => removeDeduction(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {deductions.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Chưa có khoản khấu trừ bổ sung</p>
              )}
              {deductions.length > 0 && (
                <div className="flex justify-end pt-2 border-t border-gray-200">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tổng khấu trừ:</p>
                    <p className="font-semibold text-red-600">{formatCurrency(totalDeductions)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Note Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Ghi chú</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú về điều chỉnh lương..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Adjusted Salary Preview */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white">
            <h3 className="font-semibold mb-3">Lương sau điều chỉnh</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="opacity-90">Lương hiện tại:</p>
                <p className="font-semibold text-lg">{formatCurrency(currentNetSalary)}</p>
              </div>
              <div>
                <p className="opacity-90">Điều chỉnh:</p>
                <p className={`font-semibold text-lg ${totalBonuses - totalDeductions >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {totalBonuses - totalDeductions >= 0 ? '+' : ''}{formatCurrency(totalBonuses - totalDeductions)}
                </p>
              </div>
              <div>
                <p className="opacity-90">Lương mới:</p>
                <p className="font-bold text-xl">{formatCurrency(adjustedNetSalary)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lưu điều chỉnh
          </button>
        </div>
      </div>
    </div>
  );
}
