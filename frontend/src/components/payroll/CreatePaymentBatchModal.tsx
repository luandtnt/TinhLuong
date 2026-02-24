import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import api from '../../lib/api';

interface CreatePaymentBatchModalProps {
  onClose: () => void;
}

interface PayrollPeriod {
  id: string;
  code: string;
  year: number;
  month: number;
  status: string;
}

export function CreatePaymentBatchModal({ onClose }: CreatePaymentBatchModalProps) {
  const [formData, setFormData] = useState({
    periodId: '',
    name: '',
    paymentMethod: 'BANK_TRANSFER',
    bankCode: '',
    bankName: '',
    note: '',
  });

  const queryClient = useQueryClient();

  const { data: periods = [] } = useQuery({
    queryKey: ['payroll-periods-for-payment'],
    queryFn: async () => {
      const response = await api.get('/payroll/periods');
      return response.data as PayrollPeriod[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await api.post('/payroll/payments/batches', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-batches'] });
      alert('Tạo đợt thanh toán thành công!');
      onClose();
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể tạo đợt thanh toán'}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.periodId || !formData.name) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    createMutation.mutate(formData);
  };

  const approvedPeriods = periods.filter(p => p.status === 'APPROVED' || p.status === 'CLOSED');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[600px] max-h-[90vh] overflow-auto">
        <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Tạo đợt thanh toán lương
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-[24px]">
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Kỳ lương <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.periodId}
                onChange={(e) => setFormData({ ...formData, periodId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                required
              >
                <option value="">-- Chọn kỳ lương --</option>
                {approvedPeriods.length === 0 && (
                  <option value="" disabled>Chưa có kỳ lương đã phê duyệt</option>
                )}
                {approvedPeriods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.code} - Tháng {period.month}/{period.year} ({period.status})
                  </option>
                ))}
              </select>
              {approvedPeriods.length === 0 && (
                <p className="text-sm text-red-600 mt-1">
                  Chưa có kỳ lương nào được phê duyệt. Vui lòng tính lương và phê duyệt kỳ lương trước.
                </p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Tên đợt thanh toán <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                placeholder="VD: Thanh toán lương tháng 1/2025"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Hình thức thanh toán <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                required
              >
                <option value="BANK_TRANSFER">Chuyển khoản</option>
                <option value="CASH">Tiền mặt</option>
                <option value="ATM_CARD">Qua thẻ ATM</option>
                <option value="TREASURY">Rút dự toán Kho bạc</option>
              </select>
            </div>

            {formData.paymentMethod === 'BANK_TRANSFER' && (
              <>
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2">
                    Mã ngân hàng
                  </label>
                  <input
                    type="text"
                    value={formData.bankCode}
                    onChange={(e) => setFormData({ ...formData, bankCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                    placeholder="VD: VCB, TCB, ACB..."
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2">
                    Tên ngân hàng
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                    placeholder="VD: Vietcombank, Techcombank..."
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Ghi chú
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                rows={3}
                placeholder="Ghi chú thêm..."
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              label="Hủy"
              variant="outline"
              size="md"
            />
            <Button
              type="submit"
              label="Tạo đợt thanh toán"
              variant="primary"
              size="md"
              disabled={createMutation.isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
