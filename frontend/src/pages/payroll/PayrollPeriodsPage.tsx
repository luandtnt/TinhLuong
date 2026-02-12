import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileDown, Plus, Calculator, Send, CheckCircle, Lock, Printer } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { TableHeader } from '../../components/common/TableHeader';
import { TableFooter } from '../../components/common/TableFooter';
import { CustomCheckbox } from '../../components/common/CustomCheckbox';
import { EyeIcon } from '../../components/icons/table-actions/EyeIcon';
import { EditIcon } from '../../components/icons/table-actions/EditIcon';
import { PayrollDetailModal } from '../../components/payroll/PayrollDetailModal';
import { AdjustPayrollModal, PayrollAdjustment } from '../../components/payroll/AdjustPayrollModal';
import api from '../../lib/api';
import { PayrollPeriod, PayrollDetail } from '../../types/payroll';

export function PayrollPeriodsPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPeriod, setSelectedPeriod] = useState<PayrollPeriod | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<PayrollDetail | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  const queryClient = useQueryClient();

  // Fetch payroll periods
  const { data: periods = [], isLoading } = useQuery({
    queryKey: ['payroll-periods'],
    queryFn: async () => {
      const response = await api.get('/payroll/periods');
      return response.data as PayrollPeriod[];
    },
  });

  // Fetch payroll details for selected period
  const { data: payrollDetails = [], isLoading: loadingDetails } = useQuery({
    queryKey: ['payroll-details', selectedPeriod?.id],
    queryFn: async () => {
      if (!selectedPeriod) return [];
      const response = await api.get(`/payroll/periods/${selectedPeriod.id}/details`);
      return response.data as PayrollDetail[];
    },
    enabled: !!selectedPeriod && showDetails,
  });

  // Calculate payroll mutation
  const calculateMutation = useMutation({
    mutationFn: async (periodId: string) => {
      const response = await api.post(`/payroll/periods/${periodId}/calculate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-details'] });
      alert('Tính lương thành công!');
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể tính lương'}`);
    },
  });

  // Submit payroll mutation
  const submitMutation = useMutation({
    mutationFn: async (periodId: string) => {
      const response = await api.post(`/payroll/periods/${periodId}/submit`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-periods'] });
      alert('Nộp duyệt thành công!');
    },
  });

  // Approve payroll mutation
  const approveMutation = useMutation({
    mutationFn: async (periodId: string) => {
      const response = await api.post(`/payroll/periods/${periodId}/approve`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-periods'] });
      alert('Phê duyệt thành công!');
    },
  });

  // Close payroll mutation
  const closeMutation = useMutation({
    mutationFn: async (periodId: string) => {
      const response = await api.post(`/payroll/periods/${periodId}/close`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-periods'] });
      alert('Chốt kỳ lương thành công!');
    },
  });

  // Adjust payroll mutation
  const adjustMutation = useMutation({
    mutationFn: async (adjustment: PayrollAdjustment) => {
      const response = await api.patch(`/payroll/details/${adjustment.detailId}/adjust`, {
        bonuses: adjustment.bonuses,
        deductions: adjustment.deductions,
        note: adjustment.note,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-details'] });
      setShowAdjustModal(false);
      alert('Điều chỉnh lương thành công!');
    },
    onError: (error: any) => {
      alert(`Lỗi: ${error.response?.data?.message || 'Không thể điều chỉnh lương'}`);
    },
  });

  const tableColumns = [
    { key: 'code', label: 'Mã kỳ', align: 'left' as const, minWidth: '120px' },
    { key: 'period', label: 'Kỳ lương', align: 'left' as const, minWidth: '150px' },
    { key: 'status', label: 'Trạng thái', align: 'center' as const, minWidth: '160px' },
    { key: 'closedAt', label: 'Ngày chốt', align: 'left' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '200px' },
  ];

  const detailColumns = [
    { key: 'employeeCode', label: 'Mã NV', align: 'left' as const, minWidth: '100px' },
    { key: 'employeeName', label: 'Họ tên', align: 'left' as const, minWidth: '180px' },
    { key: 'actualSalary', label: 'Lương thực tế', align: 'right' as const, minWidth: '120px' },
    { key: 'allowances', label: 'Phụ cấp', align: 'right' as const, minWidth: '100px' },
    { key: 'otAmount', label: 'OT', align: 'right' as const, minWidth: '100px' },
    { key: 'insurance', label: 'Bảo hiểm', align: 'right' as const, minWidth: '100px' },
    { key: 'tax', label: 'Thuế TNCN', align: 'right' as const, minWidth: '100px' },
    { key: 'netSalary', label: 'Thực lĩnh', align: 'right' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '100px' },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(periods.map(p => p.id));
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

  const handleViewDetails = (period: PayrollPeriod) => {
    setSelectedPeriod(period);
    setShowDetails(true);
  };

  const handleCalculate = (periodId: string) => {
    if (confirm('Bạn có chắc muốn tính lương cho kỳ này?')) {
      calculateMutation.mutate(periodId);
    }
  };

  const handleSubmit = (periodId: string) => {
    if (confirm('Bạn có chắc muốn nộp duyệt kỳ lương này?')) {
      submitMutation.mutate(periodId);
    }
  };

  const handleApprove = (periodId: string) => {
    if (confirm('Bạn có chắc muốn phê duyệt kỳ lương này?')) {
      approveMutation.mutate(periodId);
    }
  };

  const handleClose = (periodId: string) => {
    if (confirm('Chốt kỳ lương sẽ tạo snapshot và không thể sửa trực tiếp. Bạn có chắc?')) {
      closeMutation.mutate(periodId);
    }
  };

  const handleViewDetail = (detail: PayrollDetail) => {
    setSelectedDetail(detail);
    setShowDetailModal(true);
  };

  const handleAdjustDetail = (detail: PayrollDetail) => {
    setSelectedDetail(detail);
    setShowAdjustModal(true);
  };

  const handleSaveAdjustment = (adjustment: PayrollAdjustment) => {
    adjustMutation.mutate(adjustment);
  };

  const handleExportExcel = () => {
    if (!selectedPeriod) return;
    
    // Create CSV content
    const headers = ['Mã NV', 'Họ tên', 'Phòng ban', 'Lương thực tế', 'Phụ cấp', 'Thưởng', 'OT', 'Bảo hiểm', 'Thuế TNCN', 'Truy thu', 'Thực lĩnh'];
    const rows = payrollDetails.map(detail => {
      const totalAllowances = Object.values(detail.allowances).reduce((sum, val) => sum + Number(val), 0);
      const totalBonuses = Object.values(detail.bonuses).reduce((sum, val) => sum + Number(val), 0);
      const totalInsurance = Number(detail.socialInsurance) + Number(detail.healthInsurance) + Number(detail.unemploymentIns) + Number(detail.unionFee);
      
      return [
        detail.employee?.code,
        detail.employee?.fullName,
        detail.employee?.department?.name,
        Number(detail.actualSalary),
        totalAllowances + Number(detail.kpiBonus) + totalBonuses,
        Number(detail.otAmount),
        totalInsurance,
        Number(detail.personalIncomeTax),
        Number(detail.clawbackAmount),
        Number(detail.netSalary),
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    // Download CSV
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bang-luong-${selectedPeriod.month}-${selectedPeriod.year}.csv`;
    link.click();
  };

  const handlePrintPayroll = async () => {
    if (!selectedPeriod) return;
    
    try {
      const response = await api.get(`/payroll/periods/${selectedPeriod.id}/print/payroll-summary`, {
        responseType: 'blob',
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error printing payroll:', error);
      alert('Có lỗi khi in bảng lương');
    }
  };

  const handlePrintInsurance = async () => {
    if (!selectedPeriod) return;
    
    try {
      const response = await api.get(`/payroll/periods/${selectedPeriod.id}/print/insurance`, {
        responseType: 'blob',
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error printing insurance:', error);
      alert('Có lỗi khi in bảng bảo hiểm');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; bg: string; border: string; text: string }> = {
      DRAFT: { label: 'Nháp', bg: 'bg-[#f9fafb]', border: 'border-[#d1d5db]', text: 'text-[#6b7280]' },
      PENDING: { label: 'Chờ duyệt', bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', text: 'text-[#b45309]' },
      APPROVED: { label: 'Đã duyệt', bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', text: 'text-[#15803d]' },
      CLOSED: { label: 'Đã chốt', bg: 'bg-[#dcfce7]', border: 'border-[#86efac]', text: 'text-[#15803d]' },
      ACCOUNTED: { label: 'Đã hạch toán', bg: 'bg-[#e0e7ff]', border: 'border-[#c7d2fe]', text: 'text-[#4338ca]' },
      PAID: { label: 'Đã chi', bg: 'bg-[#f3e8ff]', border: 'border-[#e9d5ff]', text: 'text-[#7c3aed]' },
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount));
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

  // Show details view
  if (showDetails && selectedPeriod) {
    return (
      <>
        <div className="bg-[#f5f5f5] flex-1 overflow-auto">
          <div className="p-[16px]">
            {/* Header */}
            <div className="bg-white rounded-[8px] p-[16px] mb-[16px] border border-[#e5e7eb]">
              <div className="flex items-center justify-between">
                <div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-[#b9000e] hover:underline text-[14px] font-medium mb-2"
                  >
                    ← Quay lại
                  </button>
                  <h1 className="text-[18px] font-semibold text-[#111827]">
                    Bảng lương tháng {selectedPeriod.month}/{selectedPeriod.year}
                  </h1>
                  <p className="text-[14px] text-[#6b7280] mt-1">
                    Trạng thái: {getStatusBadge(selectedPeriod.status)}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  {selectedPeriod.status === 'DRAFT' && (
                    <>
                      <Button
                        onClick={() => handleCalculate(selectedPeriod.id)}
                        icon={<Calculator size={18} />}
                        label="Tính lương"
                        variant="primary"
                        size="md"
                        disabled={calculateMutation.isPending}
                      />
                      <Button
                        onClick={() => handleSubmit(selectedPeriod.id)}
                        icon={<Send size={18} />}
                        label="Nộp duyệt"
                        variant="outline"
                        size="md"
                      />
                    </>
                  )}
                  {selectedPeriod.status === 'PENDING' && (
                    <Button
                      onClick={() => handleApprove(selectedPeriod.id)}
                      icon={<CheckCircle size={18} />}
                      label="Phê duyệt"
                      variant="primary"
                      size="md"
                    />
                  )}
                  {selectedPeriod.status === 'APPROVED' && (
                    <Button
                      onClick={() => handleClose(selectedPeriod.id)}
                      icon={<Lock size={18} />}
                      label="Chốt kỳ lương"
                      variant="primary"
                      size="md"
                    />
                  )}
                  <Button
                    onClick={handleExportExcel}
                    icon={<FileDown size={20} />}
                    label="Xuất Excel"
                    variant="outline"
                    size="md"
                  />
                  <Button
                    onClick={handlePrintPayroll}
                    icon={<Printer size={18} />}
                    label="In bảng lương"
                    variant="outline"
                    size="md"
                  />
                  <Button
                    onClick={handlePrintInsurance}
                    icon={<Printer size={18} />}
                    label="In bảng BH"
                    variant="outline"
                    size="md"
                  />
                </div>
              </div>
            </div>

            {/* Details Table */}
            <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[16px]">
              {loadingDetails ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">Đang tải chi tiết...</p>
                </div>
              ) : payrollDetails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-gray-500 mb-4">Chưa có dữ liệu bảng lương</p>
                  <Button
                    onClick={() => handleCalculate(selectedPeriod.id)}
                    icon={<Calculator size={18} />}
                    label="Tính lương ngay"
                    variant="primary"
                    size="md"
                  />
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <TableHeader
                          columns={detailColumns}
                          showCheckbox={false}
                          allChecked={false}
                          onCheckAll={() => {}}
                        />
                      </thead>
                      <tbody>
                        {payrollDetails.map((detail) => {
                          const totalAllowances = Object.values(detail.allowances).reduce((sum, val) => sum + Number(val), 0);
                          const totalBonuses = Object.values(detail.bonuses).reduce((sum, val) => sum + Number(val), 0);
                          const totalInsurance = Number(detail.socialInsurance) + Number(detail.healthInsurance) + Number(detail.unemploymentIns) + Number(detail.unionFee);
                          
                          return (
                            <tr key={detail.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                              <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                                {detail.employee?.code}
                              </td>
                              <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                                {detail.employee?.fullName}
                              </td>
                              <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                                {formatCurrency(Number(detail.actualSalary))}
                              </td>
                              <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                                {formatCurrency(totalAllowances + Number(detail.kpiBonus) + totalBonuses)}
                              </td>
                              <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                                {formatCurrency(Number(detail.otAmount))}
                              </td>
                              <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                                {formatCurrency(totalInsurance)}
                              </td>
                              <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                                {formatCurrency(Number(detail.personalIncomeTax))}
                              </td>
                              <td className="px-[16px] py-[12px] text-[14px] font-semibold text-[#b9000e] text-right">
                                {formatCurrency(Number(detail.netSalary))}
                              </td>
                              <td className="px-[16px] py-[12px] text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleViewDetail(detail)}
                                    className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
                                    title="Xem chi tiết"
                                  >
                                    <EyeIcon />
                                  </button>
                                  {selectedPeriod.status === 'DRAFT' && (
                                    <button
                                      onClick={() => handleAdjustDetail(detail)}
                                      className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
                                      title="Điều chỉnh"
                                    >
                                      <EditIcon />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 font-semibold">
                          <td colSpan={2} className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                            Tổng cộng
                          </td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                            {formatCurrency(payrollDetails.reduce((sum, d) => sum + Number(d.actualSalary), 0))}
                          </td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                            {formatCurrency(payrollDetails.reduce((sum, d) => {
                              const allowances = Object.values(d.allowances).reduce((s, v) => s + Number(v), 0);
                              const bonuses = Object.values(d.bonuses).reduce((s, v) => s + Number(v), 0);
                              return sum + allowances + Number(d.kpiBonus) + bonuses;
                            }, 0))}
                          </td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                            {formatCurrency(payrollDetails.reduce((sum, d) => sum + Number(d.otAmount), 0))}
                          </td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                            {formatCurrency(payrollDetails.reduce((sum, d) => 
                              sum + Number(d.socialInsurance) + Number(d.healthInsurance) + Number(d.unemploymentIns) + Number(d.unionFee), 0
                            ))}
                          </td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
                            {formatCurrency(payrollDetails.reduce((sum, d) => sum + Number(d.personalIncomeTax), 0))}
                          </td>
                          <td className="px-[16px] py-[12px] text-[14px] font-semibold text-[#b9000e] text-right">
                            {formatCurrency(payrollDetails.reduce((sum, d) => sum + Number(d.netSalary), 0))}
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        {showDetailModal && selectedDetail && (
          <PayrollDetailModal
            detail={selectedDetail}
            onClose={() => setShowDetailModal(false)}
          />
        )}

        {showAdjustModal && selectedDetail && (
          <AdjustPayrollModal
            detail={selectedDetail}
            onClose={() => setShowAdjustModal(false)}
            onSave={handleSaveAdjustment}
          />
        )}
      </>
    );
  }

  // Show periods list
  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto">
      <div className="p-[16px]">
        {/* Page Title and Action Buttons */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] flex items-center justify-between gap-[10px] border border-[#e5e7eb]">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            Danh sách kỳ lương
          </h1>
          <div className="flex gap-[10px]">
            <Button
              onClick={() => alert('Xuất Excel')}
              icon={<FileDown size={20} />}
              label="Xuất danh sách"
              variant="outline"
              size="md"
            />
            <Button
              onClick={() => alert('Tạo kỳ mới')}
              icon={<Plus size={18} />}
              label="Tạo kỳ mới"
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
                  allChecked={selectedItems.length === periods.length && periods.length > 0}
                  onCheckAll={handleSelectAll}
                />
              </thead>
              <tbody>
                {periods.map((period) => (
                  <tr key={period.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                    <td className="px-[16px] py-[12px] text-center">
                      <CustomCheckbox
                        checked={selectedItems.includes(period.id)}
                        onChange={(checked) => handleSelectItem(period.id, checked)}
                      />
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {period.code}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      Tháng {period.month}/{period.year}
                    </td>
                    <td className="px-[16px] py-[12px] text-center">
                      {getStatusBadge(period.status)}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {period.closedAt ? new Date(period.closedAt).toLocaleDateString('vi-VN') : '-'}
                    </td>
                    <td className="px-[16px] py-[12px] text-center">
                      <button
                        onClick={() => handleViewDetails(period)}
                        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
                        title="Xem chi tiết"
                      >
                        <EyeIcon />
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
            totalPages={Math.ceil(periods.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={periods.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
