import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, FileDown, Send, Upload, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { TableHeader } from '../../components/common/TableHeader';
import { TableFooter } from '../../components/common/TableFooter';
import { CustomCheckbox } from '../../components/common/CustomCheckbox';
import { EyeIcon } from '../../components/icons/table-actions/EyeIcon';
import { EditIcon } from '../../components/icons/table-actions/EditIcon';
import { CreateTimesheetBatchModal } from '../../components/payroll/CreateTimesheetBatchModal';
import { CreateTimesheetModal } from '../../components/payroll/CreateTimesheetModal';
import { ImportTimesheetModal } from '../../components/payroll/ImportTimesheetModal';
import { useRole } from '../../contexts/RoleContext';
import api from '../../lib/api';
import { TimesheetBatch } from '../../types/payroll';

export function TimesheetsPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<TimesheetBatch | null>(null);
  const [showAddTimesheetModal, setShowAddTimesheetModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const queryClient = useQueryClient();
  const { role } = useRole();

  // Fetch timesheet batches
  const { data: batches = [], isLoading } = useQuery({
    queryKey: ['timesheet-batches'],
    queryFn: async () => {
      const response = await api.get('/timesheets/batches');
      return response.data as TimesheetBatch[];
    },
  });

  // Update selectedBatch when data changes
  useEffect(() => {
    if (selectedBatch && batches.length > 0) {
      const updatedBatch = batches.find(b => b.id === selectedBatch.id);
      if (updatedBatch) {
        setSelectedBatch(updatedBatch);
      }
    }
  }, [batches]);

  const tableColumns = [
    { key: 'code', label: 'Mã bảng', align: 'left' as const, minWidth: '120px' },
    { key: 'name', label: 'Tên bảng', align: 'left' as const, minWidth: '250px' },
    { key: 'period', label: 'Kỳ', align: 'left' as const, minWidth: '100px' },
    { key: 'count', label: 'Số NV', align: 'right' as const, minWidth: '100px' },
    { key: 'status', label: 'Trạng thái', align: 'center' as const, minWidth: '140px' },
    { key: 'submittedAt', label: 'Ngày nộp', align: 'left' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '150px' },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(batches.map(b => b.id));
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; bg: string; border: string; text: string }> = {
      DRAFT: { label: 'Nháp', bg: 'bg-[#f9fafb]', border: 'border-[#d1d5db]', text: 'text-[#6b7280]' },
      SUBMITTED: { label: 'Đã nộp', bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', text: 'text-[#b45309]' },
      APPROVED: { label: 'Đã duyệt', bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', text: 'text-[#15803d]' },
      REJECTED: { label: 'Từ chối', bg: 'bg-[#fef2f2]', border: 'border-[#fecaca]', text: 'text-[#b91c1c]' },
    };

    const config = statusConfig[status] || statusConfig.DRAFT;

    return (
      <div className={`${config.bg} inline-flex items-center px-[8px] py-[2px] relative rounded-[6px]`}>
        <div aria-hidden="true" className={`absolute border ${config.border} border-solid inset-0 pointer-events-none rounded-[6px]`} />
        <p className={`font-medium leading-[20px] not-italic relative ${config.text} text-[14px] whitespace-nowrap`}>
          {config.label}
        </p>
      </div>
    );
  };

  const handleSubmitBatch = async (batchId: string) => {
    if (!confirm('Bạn có chắc muốn nộp duyệt bảng này?')) return;
    
    try {
      await api.post(`/timesheets/batches/${batchId}/submit`);
      queryClient.invalidateQueries({ queryKey: ['timesheet-batches'] });
      alert('Nộp duyệt thành công!');
    } catch (error: any) {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể nộp duyệt'}`);
    }
  };

  const handleApproveBatch = async (batchId: string) => {
    if (!confirm('Bạn có chắc muốn phê duyệt bảng này?')) return;
    
    try {
      await api.post(`/timesheets/batches/${batchId}/approve`);
      queryClient.invalidateQueries({ queryKey: ['timesheet-batches'] });
      alert('Phê duyệt thành công!');
    } catch (error: any) {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể phê duyệt'}`);
    }
  };

  const handleBulkSubmit = async () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất 1 bảng');
      return;
    }

    if (!confirm(`Bạn có chắc muốn nộp duyệt ${selectedItems.length} bảng?`)) return;

    try {
      await Promise.all(
        selectedItems.map(id => api.post(`/timesheets/batches/${id}/submit`))
      );
      queryClient.invalidateQueries({ queryKey: ['timesheet-batches'] });
      setSelectedItems([]);
      alert('Nộp duyệt thành công!');
    } catch (error: any) {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể nộp duyệt'}`);
    }
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

  // Detail view
  if (selectedBatch) {
    return (
      <div className="bg-[#f5f5f5] flex-1 overflow-auto">
        <div className="p-[16px]">
          {/* Header */}
          <div className="bg-white rounded-[8px] p-[16px] mb-[16px] border border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-[18px] font-semibold text-[#111827]">
                    Chi tiết bảng chấm công: {selectedBatch.code}
                  </h1>
                  <p className="text-sm text-gray-600">{selectedBatch.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedBatch.status === 'DRAFT' && (
                  <>
                    <Button
                      onClick={() => handleSubmitBatch(selectedBatch.id)}
                      icon={<Send size={18} />}
                      label="Nộp duyệt"
                      variant="outline"
                      size="md"
                    />
                    <Button
                      onClick={() => setShowImportModal(true)}
                      icon={<Upload size={18} />}
                      label="Import CSV"
                      variant="outline"
                      size="md"
                    />
                    <Button
                      onClick={() => setShowAddTimesheetModal(true)}
                      icon={<Plus size={18} />}
                      label="Thêm chấm công"
                      variant="primary"
                      size="md"
                    />
                  </>
                )}
                {selectedBatch.status === 'SUBMITTED' && role === 'supervisor' && (
                  <Button
                    onClick={() => handleApproveBatch(selectedBatch.id)}
                    label="Phê duyệt"
                    variant="primary"
                    size="md"
                  />
                )}
              </div>
            </div>

            {/* Batch Info */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm text-gray-600">Kỳ chấm công</p>
                <p className="font-medium">
                  Tháng {selectedBatch.month}/{selectedBatch.year}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <div className="mt-1">{getStatusBadge(selectedBatch.status)}</div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số nhân viên</p>
                <p className="font-medium text-blue-600">{selectedBatch.timesheets?.length || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày nộp</p>
                <p className="font-medium">
                  {selectedBatch.submittedAt ? new Date(selectedBatch.submittedAt).toLocaleDateString('vi-VN') : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Timesheets Table */}
          <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[16px]">
            <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Danh sách chấm công</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e5e7eb]">
                    <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#111827]">
                      Mã NV
                    </th>
                    <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#111827]">
                      Họ tên
                    </th>
                    <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#111827]">
                      Đơn vị
                    </th>
                    <th className="px-[16px] py-[12px] text-right text-[14px] font-semibold text-[#111827]">
                      Ngày công
                    </th>
                    <th className="px-[16px] py-[12px] text-right text-[14px] font-semibold text-[#111827]">
                      Nghỉ phép
                    </th>
                    <th className="px-[16px] py-[12px] text-right text-[14px] font-semibold text-[#111827]">
                      Nghỉ không lương
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBatch.timesheets && selectedBatch.timesheets.length > 0 ? (
                    selectedBatch.timesheets.map((timesheet: any) => (
                      <tr key={timesheet.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                        <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                          {timesheet.employee?.code}
                        </td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                          {timesheet.employee?.fullName}
                        </td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                          {timesheet.employee?.department?.name}
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-[16px] py-[24px] text-center text-gray-500">
                        Chưa có bản ghi chấm công nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showAddTimesheetModal && (
          <CreateTimesheetModal
            batchId={selectedBatch.id}
            onClose={() => setShowAddTimesheetModal(false)}
          />
        )}

        {showImportModal && (
          <ImportTimesheetModal
            batchId={selectedBatch.id}
            onClose={() => setShowImportModal(false)}
          />
        )}
      </div>
    );
  }

  // List view
  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto">
      <div className="p-[16px]">
        {/* Page Title and Action Buttons */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] flex items-center justify-between gap-[10px] border border-[#e5e7eb]">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            Danh sách bảng chấm công
          </h1>
          <div className="flex gap-[10px]">
            <Button
              onClick={() => handleBulkSubmit()}
              icon={<Send size={18} />}
              label="Nộp duyệt"
              variant="outline"
              size="md"
              disabled={selectedItems.length === 0}
            />
            <Button
              onClick={() => alert('Xuất Excel')}
              icon={<FileDown size={20} />}
              label="Xuất danh sách"
              variant="outline"
              size="md"
            />
            <Button
              onClick={() => setShowCreateBatchModal(true)}
              icon={<Plus size={18} />}
              label="Tạo bảng mới"
              variant="primary"
              size="md"
            />
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
                  allChecked={selectedItems.length === batches.length && batches.length > 0}
                  onCheckAll={handleSelectAll}
                />
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                    <td className="px-[16px] py-[12px] text-center">
                      <CustomCheckbox
                        checked={selectedItems.includes(batch.id)}
                        onChange={(checked) => handleSelectItem(batch.id, checked)}
                      />
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {batch.code}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {batch.name}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {batch.month}/{batch.year}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                      {batch.timesheets?.length || 0}
                    </td>
                    <td className="px-[16px] py-[12px] text-center">
                      {getStatusBadge(batch.status)}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {batch.submittedAt ? new Date(batch.submittedAt).toLocaleDateString('vi-VN') : '-'}
                    </td>
                    <td className="px-[16px] py-[12px] text-center">
                      <div className="flex gap-[8px] justify-center">
                        <button
                          onClick={() => setSelectedBatch(batch)}
                          className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 transition-colors"
                          title="Xem"
                        >
                          <EyeIcon />
                        </button>
                        {batch.status === 'DRAFT' && (
                          <button
                            onClick={() => alert(`Sửa ${batch.code}`)}
                            className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
                            title="Sửa"
                          >
                            <EditIcon />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TableFooter
            selectedCount={selectedItems.length}
            currentPage={currentPage}
            totalPages={Math.ceil(batches.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={batches.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>

      {showCreateBatchModal && (
        <CreateTimesheetBatchModal onClose={() => setShowCreateBatchModal(false)} />
      )}
    </div>
  );
}
