import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import api from '../../lib/api';

interface CreateOtBatchModalProps {
  onClose: () => void;
}

interface PayrollPeriod {
  id: string;
  code: string;
  year: number;
  month: number;
  status: string;
}

export function CreateOtBatchModal({ onClose }: CreateOtBatchModalProps) {
  const [formData, setFormData] = useState({
    periodId: '',
    name: '',
  });

  const queryClient = useQueryClient();

  const { data: periods = [] } = useQuery({
    queryKey: ['payroll-periods-for-ot'],
    queryFn: async () => {
      const response = await api.get('/payroll/periods');
      return response.data as PayrollPeriod[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await api.post('/ot/batches', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ot-batches'] });
      alert('Tạo đợt OT thành công!');
      onClose();
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể tạo đợt OT'}`);
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

  const draftPeriods = periods.filter(p => p.status === 'DRAFT' || p.status === 'PENDING');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[500px]">
        <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Tạo đợt OT/Làm thêm giờ
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
                {draftPeriods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.code} - Tháng {period.month}/{period.year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Tên đợt OT <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                placeholder="VD: OT tháng 1/2025"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-blue-800">
                Sau khi tạo đợt, bạn có thể thêm chi tiết OT cho từng nhân viên
              </p>
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
              label="Tạo đợt OT"
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
