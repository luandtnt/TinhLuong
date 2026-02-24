import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import api from '../../lib/api';

interface AddClawbackRecordModalProps {
  onClose: () => void;
  batchId: string;
}

interface Employee {
  id: string;
  code: string;
  fullName: string;
  department: { name: string };
}

export function AddClawbackRecordModal({ onClose, batchId }: AddClawbackRecordModalProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [formData, setFormData] = useState({
    employeeId: '',
    clawbackType: 'SALARY_REDUCTION',
    originalYear: currentYear,
    originalMonth: currentMonth,
    amount: 0,
    reason: '',
  });

  const queryClient = useQueryClient();

  const { data: employees = [] } = useQuery({
    queryKey: ['employees-for-clawback'],
    queryFn: async () => {
      const response = await api.get('/employees');
      return response.data as Employee[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await api.post(`/clawbacks/batches/${batchId}/records`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clawback-batches'] });
      onClose();
      alert('Thêm truy thu thành công!');
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể thêm truy thu'}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId) {
      alert('Vui lòng chọn nhân viên');
      return;
    }
    if (formData.amount <= 0) {
      alert('Số tiền phải lớn hơn 0');
      return;
    }
    if (!formData.reason.trim()) {
      alert('Vui lòng nhập lý do');
      return;
    }
    createMutation.mutate(formData);
  };

  const clawbackTypes = [
    { value: 'SALARY_REDUCTION', label: 'Giảm lương' },
    { value: 'ALLOWANCE_REDUCTION', label: 'Giảm phụ cấp' },
    { value: 'OVERPAYMENT', label: 'Trả thừa' },
    { value: 'OTHER', label: 'Khác' },
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[500px]">
        <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Thêm truy thu lương
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-[24px]">
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Nhân viên <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                required
              >
                <option value="">-- Chọn nhân viên --</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.code} - {emp.fullName} ({emp.department.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Loại truy thu <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.clawbackType}
                onChange={(e) => setFormData({ ...formData, clawbackType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                required
              >
                {clawbackTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2">
                  Năm gốc <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.originalYear}
                  onChange={(e) => setFormData({ ...formData, originalYear: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                  required
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2">
                  Tháng gốc <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.originalMonth}
                  onChange={(e) => setFormData({ ...formData, originalMonth: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                  required
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      Tháng {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Số tiền <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                min="0"
                step="1000"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Lý do <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                rows={3}
                required
                placeholder="Nhập lý do truy thu..."
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
              label="Lưu"
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
