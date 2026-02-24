import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import api from '../../lib/api';

interface AddOtRecordModalProps {
  onClose: () => void;
  batchId: string;
}

interface Employee {
  id: string;
  code: string;
  fullName: string;
  department: { name: string };
}

export function AddOtRecordModal({ onClose, batchId }: AddOtRecordModalProps) {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    otType: 'WEEKDAY',
    hours: 1,
  });

  const queryClient = useQueryClient();

  const { data: employees = [] } = useQuery({
    queryKey: ['employees-for-ot'],
    queryFn: async () => {
      const response = await api.get('/employees');
      return response.data as Employee[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await api.post(`/ot/batches/${batchId}/records`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ot-batches'] });
      onClose();
      alert('Thêm OT thành công!');
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể thêm OT'}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId) {
      alert('Vui lòng chọn nhân viên');
      return;
    }
    createMutation.mutate(formData);
  };

  const otTypes = [
    { value: 'WEEKDAY', label: 'Ngày thường' },
    { value: 'WEEKEND', label: 'Cuối tuần' },
    { value: 'HOLIDAY', label: 'Ngày lễ' },
    { value: 'NIGHT_SHIFT', label: 'Làm đêm' },
    { value: 'COMPENSATORY', label: 'Nghỉ bù' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[500px]">
        <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Thêm OT/Làm thêm giờ
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
                Ngày làm OT <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Loại OT <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.otType}
                onChange={(e) => setFormData({ ...formData, otType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                required
              >
                {otTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Số giờ <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                min="0.5"
                max="24"
                step="0.5"
                required
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
