import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Send, CheckCircle, DollarSign, X } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { TableHeader } from '../../components/common/TableHeader';
import { CustomCheckbox } from '../../components/common/CustomCheckbox';
import { EyeIcon } from '../../components/icons/table-actions/EyeIcon';
import { CreatePaymentBatchModal } from '../../components/payroll/CreatePaymentBatchModal';
import api from '../../lib/api';

interface PaymentBatch {
  id: string;
  code: string;
  periodId: string;
  name: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  totalEmployees: number;
  submittedAt?: string;
  approvedAt?: string;
  paidAt?: string;
  createdAt: string;
}

interface Payment {
  id: string;
  employeeCode: string;
  employeeName: string;
  departmentName?: string;
  amount: number;
  status: string;
}

export function PaymentPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<PaymentBatch | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const queryClient = useQueryClient();

  const { data: batches = [], isLoading } = useQuery({
    queryKey: ['payment-batches'],
    queryFn: async () => {
      const response = await api.get('/payroll/payments/batches');
      return response.data as PaymentBatch[];
    },
  });

  const { data: batchDetails, isLoading: loadingDetails } = useQuery({
    queryKey: ['payment-batch-details', selectedBatch?.id],
    queryFn: async () => {
      if (!selectedBatch) return null;
      const response = await api.get(`/payroll/payments/batches/${selectedBatch.id}`);
      return response.data;
    },
    enabled: !!selectedBatch && showDetailModal,
  });

  const submitMutation = useMutation({
    mutationFn: async (batchId: string) => {
      await api.post(`/payroll/payments/batches/${batchId}/submit`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-batches'] });
      alert('Nộp duyệt thành công!');
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (batchId: string) => {
      await api.post(`/payroll/payments/batches/${batchId}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-batches'] });
      alert('Phê duyệt thành công!');
    },
  });

  const confirmPaidMutation = useMutation({
    mutationFn: async (batchId: string) => {
      await api.post(`/payroll/payments/batches/${batchId}/confirm-paid`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-batches'] });
      alert('Xác nhận đã chi thành công!');
    },
  });

  const tableColumns = [
    { key: 'code', label: 'Mã đợt', align: 'left' as const, minWidth: '120px' },
    { key: 'name', label: 'Tên đợt thanh toán', align: 'left' as const, minWidth: '200px' },
    { key: 'paymentMethod', label: 'Hình thức', align: 'left' as const, minWidth: '150px' },
    { key: 'totalEmployees', label: 'Số NV', align: 'center' as const, minWidth: '80px' },
    { key: 'totalAmount', label: 'Tổng tiền', align: 'right' as const, minWidth: '150px' },
    { key: 'status', label: 'Trạng thái', align: 'center' as const, minWidth: '140px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '200px' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; bg: string; border: string; text: string }> = {
      DRAFT: { label: 'Nháp', bg: 'bg-[#f9fafb]', border: 'border-[#d1d5db]', text: 'text-[#6b7280]' },
      PENDING: { label: 'Chờ duyệt', bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', text: 'text-[#b45309]' },
      APPROVED: { label: 'Đã duyệt', bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', text: 'text-[#15803d]' },
      PAID: { label: 'Đã chi', bg: 'bg-[#dcfce7]', border: 'border-[#86efac]', text: 'text-[#15803d]' },
      CANCELLED: { label: 'Đã hủy', bg: 'bg-[#fef2f2]', border: 'border-[#fecaca]', text: 'text-[#dc2626]' },
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

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      CASH: 'Tiền mặt',
      BANK_TRANSFER: 'Chuyển khoản',
      ATM_CARD: 'Qua thẻ ATM',
      TREASURY: 'Rút dự toán KB',
    };
    return labels[method] || method;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount));
  };

  const handleViewDetails = (batch: PaymentBatch) => {
    setSelectedBatch(batch);
    setShowDetailModal(true);
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
    <>
      <div className="bg-[#f5f5f5] flex-1 overflow-auto">
        <div className="p-[16px]">
          <div className="bg-white rounded-[8px] p-[16px] mb-[16px] flex items-center justify-between gap-[10px] border border-[#e5e7eb]">
            <h1 className="text-[18px] font-semibold text-[#111827]">
              Thanh toán / Trả lương
            </h1>
            <div className="flex gap-[10px]">
              <Button
                onClick={() => setShowCreateModal(true)}
                icon={<Plus size={18} />}
                label="Tạo đợt thanh toán"
                variant="primary"
                size="md"
              />
            </div>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[16px]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <TableHeader
                    columns={tableColumns}
                    showCheckbox={true}
                    allChecked={selectedItems.length === batches.length && batches.length > 0}
                    onCheckAll={(checked) => {
                      if (checked) {
                        setSelectedItems(batches.map(b => b.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </thead>
                <tbody>
                  {batches.map((batch) => (
                    <tr key={batch.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                      <td className="px-[16px] py-[12px] text-center">
                        <CustomCheckbox
                          checked={selectedItems.includes(batch.id)}
                          onChange={(checked) => {
                            if (checked) {
                              setSelectedItems([...selectedItems, batch.id]);
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== batch.id));
                            }
                          }}
                        />
                      </td>
                      <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                        {batch.code}
                      </td>
                      <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                        {batch.name}
                      </td>
                      <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                        {getPaymentMethodLabel(batch.paymentMethod)}
                      </td>
                      <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-center">
                        {batch.totalEmployees}
                      </td>
                      <td className="px-[16px] py-[12px] text-[14px] text-[#b9000e] font-semibold text-right">
                        {formatCurrency(batch.totalAmount)}
                      </td>
                      <td className="px-[16px] py-[12px] text-center">
                        {getStatusBadge(batch.status)}
                      </td>
                      <td className="px-[16px] py-[12px] text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDetails(batch)}
                            className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
                            title="Xem chi tiết"
                          >
                            <EyeIcon />
                          </button>
                          {batch.status === 'DRAFT' && (
                            <Button
                              onClick={() => submitMutation.mutate(batch.id)}
                              icon={<Send size={16} />}
                              label="Nộp duyệt"
                              variant="outline"
                              size="sm"
                            />
                          )}
                          {batch.status === 'PENDING' && (
                            <Button
                              onClick={() => approveMutation.mutate(batch.id)}
                              icon={<CheckCircle size={16} />}
                              label="Phê duyệt"
                              variant="primary"
                              size="sm"
                            />
                          )}
                          {batch.status === 'APPROVED' && (
                            <Button
                              onClick={() => confirmPaidMutation.mutate(batch.id)}
                              icon={<DollarSign size={16} />}
                              label="Xác nhận đã chi"
                              variant="primary"
                              size="sm"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[8px] w-[90%] max-w-[1000px] max-h-[90vh] overflow-auto">
            <div className="p-[24px] border-b border-[#e5e7eb] flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-[#111827]">
                  Chi tiết đợt thanh toán: {selectedBatch.code}
                </h2>
                <p className="text-[14px] text-[#6b7280] mt-1">
                  {selectedBatch.name} - {getPaymentMethodLabel(selectedBatch.paymentMethod)}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-[24px]">
              {loadingDetails ? (
                <p className="text-center text-gray-500">Đang tải...</p>
              ) : batchDetails ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#e5e7eb]">
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#111827]">Mã NV</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#111827]">Họ tên</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#111827]">Phòng ban</th>
                        <th className="px-[16px] py-[12px] text-right text-[14px] font-semibold text-[#111827]">Số tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchDetails.payments?.map((payment: Payment) => (
                        <tr key={payment.id} className="border-b border-[#e5e7eb]">
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{payment.employeeCode}</td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{payment.employeeName}</td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{payment.departmentName}</td>
                          <td className="px-[16px] py-[12px] text-[14px] text-[#b9000e] font-semibold text-right">
                            {formatCurrency(payment.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 font-semibold">
                        <td colSpan={3} className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                          Tổng cộng ({batchDetails.totalEmployees} nhân viên)
                        </td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#b9000e] font-semibold text-right">
                          {formatCurrency(batchDetails.totalAmount)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreatePaymentBatchModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}
