import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, FileDown, Upload } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { TableHeader } from '../../components/common/TableHeader';
import { TableFooter } from '../../components/common/TableFooter';
import { CustomCheckbox } from '../../components/common/CustomCheckbox';
import { EditIcon } from '../../components/icons/table-actions/EditIcon';
import api from '../../lib/api';
import { Timesheet } from '../../types/payroll';

export function TimesheetsPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState('2025-01');

  const queryClient = useQueryClient();

  // Parse selected month
  const [year, month] = selectedMonth.split('-').map(Number);

  // Fetch timesheets for selected month
  const { data: timesheets = [], isLoading } = useQuery({
    queryKey: ['timesheets', year, month],
    queryFn: async () => {
      const response = await api.get(`/timesheets?year=${year}&month=${month}`);
      return response.data as Timesheet[];
    },
  });

  const tableColumns = [
    { key: 'employeeCode', label: 'Mã NV', align: 'left' as const, minWidth: '100px' },
    { key: 'employeeName', label: 'Họ tên', align: 'left' as const, minWidth: '200px' },
    { key: 'department', label: 'Đơn vị', align: 'left' as const, minWidth: '150px' },
    { key: 'workDays', label: 'Ngày công', align: 'right' as const, minWidth: '100px' },
    { key: 'leaveDays', label: 'Nghỉ phép', align: 'right' as const, minWidth: '100px' },
    { key: 'unpaidLeaveDays', label: 'Nghỉ không lương', align: 'right' as const, minWidth: '120px' },
    { key: 'otHours', label: 'Giờ OT', align: 'right' as const, minWidth: '100px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '120px' },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(timesheets.map(t => t.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleImportExcel = () => {
    alert('Chức năng import Excel đang phát triển');
  };

  const handleExport = () => {
    alert('Đang xuất danh sách...');
  };

  const handleAddNew = () => {
    alert('Thêm chấm công mới');
  };

  if (isLoading) {
    return (
      <div className="bg-[#f5f5f5] flex-1 overflow-auto p-[16px]">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto">
      <div className="p-[16px]">
        {/* Page Title and Action Buttons */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] flex items-center justify-between gap-[10px] border border-[#e5e7eb]">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            Tổng hợp chấm công - nghỉ - OT
          </h1>
          <div className="flex gap-[10px]">
            <Button
              onClick={handleImportExcel}
              icon={<Upload size={18} />}
              label="Import Excel"
              variant="outline"
              size="md"
            />
            <Button
              onClick={handleExport}
              icon={<FileDown size={20} />}
              label="Xuất danh sách"
              variant="outline"
              size="md"
            />
            <Button
              onClick={handleAddNew}
              icon={<Plus size={18} />}
              label="Thêm mới"
              variant="primary"
              size="md"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] border border-[#e5e7eb]">
          <div className="flex items-center gap-[16px]">
            <label className="text-[14px] font-medium text-[#111827]">
              Kỳ chấm công:
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-[12px] py-[8px] border border-[#e5e7eb] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
            />
            <div className="flex-1" />
            <div className="text-[14px] text-[#6b7280]">
              Tổng số: <span className="font-semibold text-[#111827]">{timesheets.length}</span> nhân viên
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[16px]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <TableHeader
                  columns={tableColumns}
                  showCheckbox={true}
                  allChecked={selectedItems.length === timesheets.length && timesheets.length > 0}
                  onCheckAll={handleSelectAll}
                />
              </thead>
              <tbody>
                {timesheets.map((timesheet) => (
                  <tr key={timesheet.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                    <td className="px-[16px] py-[12px] text-center">
                      <CustomCheckbox
                        checked={selectedItems.includes(timesheet.id)}
                        onChange={(checked) => handleSelectItem(timesheet.id, checked)}
                      />
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {timesheet.employee?.code || '-'}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {timesheet.employee?.fullName || '-'}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {timesheet.employee?.department?.name || '-'}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                      {Number(timesheet.workDays).toFixed(1)}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                      {Number(timesheet.leaveDays).toFixed(1)}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                      {Number(timesheet.unpaidLeaveDays).toFixed(1)}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#6b7280] text-right">
                      0.0
                    </td>
                    <td className="px-[16px] py-[12px] text-center">
                      <button
                        onClick={() => alert(`Sửa chấm công ${timesheet.employee?.code}`)}
                        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
                        title="Sửa"
                      >
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TableFooter
            selectedCount={selectedItems.length}
            currentPage={currentPage}
            totalPages={Math.ceil(timesheets.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={timesheets.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
