import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import api from '../../lib/api';

interface CreateTimesheetModalProps {
  onClose: () => void;
  batchId: string;
}

interface Employee {
  id: string;
  code: string;
  fullName: string;
  department: { name: string };
}

export function CreateTimesheetModal({ onClose, batchId }: CreateTimesheetModalProps) {
  const [formData, setFormData] = useState({
    employeeId: '',
    workDays: 22,
    leaveDays: 0,
    unpaidLeaveDays: 0,
  });

  const queryClient = useQueryClient();

  const { data: employees = [] } = useQuery({
    queryKey: ['employees-for-timesheet'],
    queryFn: async () => {
      const response = await api.get('/employees');
      return response.data as Employee[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await api.post(`/timesheets/batches/${batchId}/timesheets`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheet-batches'] });
      onClose();
      alert('Thêm chấm công thành công!');
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể thêm chấm công'}`);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[500px]">
        <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Thêm chấm công
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
                Ngày công <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.workDays}
                onChange={(e) => setFormData({ ...formData, workDays: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                min="0"
                max="31"
                step="0.5"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Nghỉ phép (có lương)
              </label>
              <input
                type="number"
                value={formData.leaveDays}
                onChange={(e) => setFormData({ ...formData, leaveDays: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                min="0"
                max="31"
                step="0.5"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Nghỉ không lương
              </label>
              <input
                type="number"
                value={formData.unpaidLeaveDays}
                onChange={(e) => setFormData({ ...formData, unpaidLeaveDays: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                min="0"
                max="31"
                step="0.5"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-blue-800">
                Tổng: {formData.workDays + formData.leaveDays + formData.unpaidLeaveDays} ngày
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
