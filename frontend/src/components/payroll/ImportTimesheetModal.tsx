import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Upload, Download } from 'lucide-react';
import { Button } from '../common/Button';
import api from '../../lib/api';

interface ImportTimesheetModalProps {
  onClose: () => void;
  batchId: string;
}

export function ImportTimesheetModal({ onClose, batchId }: ImportTimesheetModalProps) {
  const [csvData, setCsvData] = useState('');
  const queryClient = useQueryClient();

  const importMutation = useMutation({
    mutationFn: async (timesheets: any[]) => {
      await api.post(`/timesheets/batches/${batchId}/timesheets/bulk`, { timesheets });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheet-batches'] });
      onClose();
      alert('Import chấm công thành công!');
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể import chấm công'}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!csvData.trim()) {
      alert('Vui lòng nhập dữ liệu CSV');
      return;
    }

    try {
      // Parse CSV
      const lines = csvData.trim().split('\n');
      const timesheets = lines.slice(1).map(line => {
        const [employeeId, workDays, leaveDays, unpaidLeaveDays] = line.split(',').map(s => s.trim());
        return {
          employeeId,
          workDays: parseFloat(workDays) || 0,
          leaveDays: parseFloat(leaveDays) || 0,
          unpaidLeaveDays: parseFloat(unpaidLeaveDays) || 0,
        };
      });

      importMutation.mutate(timesheets);
    } catch (error) {
      alert('Lỗi định dạng CSV. Vui lòng kiểm tra lại.');
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      // Fetch employees to create a real template
      const response = await api.get('/employees');
      const employees = response.data;
      
      let template = 'employeeId,workDays,leaveDays,unpaidLeaveDays\n';
      
      // Add first 3 employees as examples
      employees.slice(0, 3).forEach((emp: any) => {
        template += `${emp.id},22,0,0\n`;
      });
      
      const blob = new Blob([template], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'timesheet-template.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Không thể tải file mẫu');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[600px]">
        <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Import chấm công từ CSV
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-[24px]">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Tải file mẫu để xem định dạng CSV
              </p>
              <Button
                type="button"
                onClick={handleDownloadTemplate}
                icon={<Download size={18} />}
                label="Tải file mẫu"
                variant="outline"
                size="sm"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-2">
                Dữ liệu CSV <span className="text-red-500">*</span>
              </label>
              <textarea
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b9000e] font-mono text-sm"
                rows={10}
                placeholder="employeeId,workDays,leaveDays,unpaidLeaveDays&#10;abc-123-uuid,22,0,0&#10;def-456-uuid,20,2,0"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Định dạng: employeeId (UUID), ngày công, nghỉ phép, nghỉ không lương. 
                Tải file mẫu để lấy danh sách employeeId đúng.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                <strong>Lưu ý:</strong> Dòng đầu tiên là header. employeeId phải là UUID hợp lệ từ database. 
                Tải file mẫu để lấy danh sách employeeId đúng của các nhân viên.
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
              icon={<Upload size={18} />}
              label="Import"
              variant="primary"
              size="md"
              disabled={importMutation.isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
