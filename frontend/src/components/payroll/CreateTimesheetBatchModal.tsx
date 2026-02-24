import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import api from '../../lib/api';

interface CreateTimesheetBatchModalProps {
  onClose: () => void;
}

export function CreateTimesheetBatchModal({ onClose }: CreateTimesheetBatchModalProps) {
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    name: '',
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await api.post('/timesheets/batches', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheet-batches'] });
      onClose();
      alert('Tạo bảng chấm công thành công!');
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể tạo bảng chấm công'}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Vui lòng nhập tên bảng chấm công');
      return;
    }
    createMutation.mutate(formData);
  };

  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[500px]">
        <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Tạo bảng chấm công mới
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-[24px]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2">
                  Năm <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
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
                  Tháng <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
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
                Tên bảng chấm công <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
                placeholder="VD: Chấm công tháng 3/2026"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-blue-800">
                Sau khi tạo bảng, bạn có thể thêm chi tiết chấm công cho từng nhân viên hoặc import từ Excel
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
              label="Tạo bảng chấm công"
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
