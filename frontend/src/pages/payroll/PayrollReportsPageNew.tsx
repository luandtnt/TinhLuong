import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileDown, TrendingUp, Users, DollarSign, FileText } from 'lucide-react';
import { Button } from '../../components/common/Button';
import api from '../../lib/api';
import { PayrollPeriod } from '../../types/payroll';

type ReportType = 'department' | 'comparison' | 'tax' | 'insurance';

export function PayrollReportsPageNew() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('department');
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>('');
  const [fromYear, setFromYear] = useState(2025);
  const [fromMonth, setFromMonth] = useState(1);
  const [toYear, setToYear] = useState(2025);
  const [toMonth, setToMonth] = useState(12);

  const { data: periods = [] } = useQuery({
    queryKey: ['payroll-periods'],
    queryFn: async () => {
      const response = await api.get('/payroll/periods');
      return response.data as PayrollPeriod[];
    },
  });

  const { data: departmentData = [], isLoading: loadingDept } = useQuery({
    queryKey: ['department-summary', selectedPeriodId],
    queryFn: async () => {
      const response = await api.get(`/payroll/reports/department-summary/${selectedPeriodId}`);
      return response.data;
    },
    enabled: selectedReport === 'department' && !!selectedPeriodId,
  });

  const { data: comparisonData = [], isLoading: loadingComp } = useQuery({
    queryKey: ['period-comparison', fromYear, fromMonth, toYear, toMonth],
    queryFn: async () => {
      const response = await api.get('/payroll/reports/period-comparison', {
        params: { fromYear, fromMonth, toYear, toMonth },
      });
      return response.data;
    },
    enabled: selectedReport === 'comparison',
  });

  const { data: taxData = [], isLoading: loadingTax } = useQuery({
    queryKey: ['tax-report', selectedPeriodId],
    queryFn: async () => {
      const response = await api.get(`/payroll/reports/tax/${selectedPeriodId}`);
      return response.data;
    },
    enabled: selectedReport === 'tax' && !!selectedPeriodId,
  });

  const { data: insuranceData = [], isLoading: loadingIns } = useQuery({
    queryKey: ['insurance-report', selectedPeriodId],
    queryFn: async () => {
      const response = await api.get(`/payroll/reports/insurance/${selectedPeriodId}`);
      return response.data;
    },
    enabled: selectedReport === 'insurance' && !!selectedPeriodId,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount));
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => row[h]).join(',')),
    ].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const reportCards = [
    { type: 'department' as ReportType, title: 'Tổng hợp theo phòng ban', icon: <Users size={24} />, color: 'bg-blue-500' },
    { type: 'comparison' as ReportType, title: 'So sánh giữa các kỳ', icon: <TrendingUp size={24} />, color: 'bg-green-500' },
    { type: 'tax' as ReportType, title: 'Chi tiết thuế TNCN', icon: <DollarSign size={24} />, color: 'bg-orange-500' },
    { type: 'insurance' as ReportType, title: 'Báo cáo bảo hiểm', icon: <FileText size={24} />, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto p-[16px]">
      <div className="bg-white rounded-[8px] p-[16px] mb-[16px] border border-[#e5e7eb]">
        <h1 className="text-[18px] font-semibold text-[#111827]">Báo cáo lương</h1>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-[16px]">
        {reportCards.map((card) => (
          <button
            key={card.type}
            onClick={() => setSelectedReport(card.type)}
            className={`bg-white rounded-[8px] p-[16px] border-2 transition-all $${
              selectedReport === card.type ? 'border-[#b9000e] shadow-md' : 'border-[#e5e7eb] hover:border-[#d1d5db]'
            }`}
          >
            <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3`}>
              {card.icon}
            </div>
            <h3 className="text-[14px] font-semibold text-[#111827]">{card.title}</h3>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[8px] p-[16px] mb-[16px] border border-[#e5e7eb]">
        <div className="flex items-center gap-4">
          {(selectedReport === 'department' || selectedReport === 'tax' || selectedReport === 'insurance') && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Chọn kỳ lương</label>
              <select value={selectedPeriodId} onChange={(e) => setSelectedPeriodId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- Chọn kỳ lương --</option>
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>Tháng {period.month}/{period.year}</option>
                ))}
              </select>
            </div>
          )}
          {selectedReport === 'comparison' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Từ tháng</label>
                <div className="flex gap-2">
                  <input type="number" min="1" max="12" value={fromMonth} onChange={(e) => setFromMonth(parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tháng" />
                  <input type="number" min="2020" max="2030" value={fromYear} onChange={(e) => setFromYear(parseInt(e.target.value))}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Năm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đến tháng</label>
                <div className="flex gap-2">
                  <input type="number" min="1" max="12" value={toMonth} onChange={(e) => setToMonth(parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tháng" />
                  <input type="number" min="2020" max="2030" value={toYear} onChange={(e) => setToYear(parseInt(e.target.value))}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Năm" />
                </div>
              </div>
            </>
          )}
          <div className="ml-auto">
            <Button onClick={() => {
                const data = selectedReport === 'department' ? departmentData :
                            selectedReport === 'comparison' ? comparisonData :
                            selectedReport === 'tax' ? taxData : insuranceData;
                exportToCSV(data, `bao-cao-${selectedReport}.csv`);
              }}
              icon={<FileDown size={18} />} label="Xuất Excel" variant="outline" size="md" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] p-[16px] border border-[#e5e7eb]">
        {selectedReport === 'department' && (
          <>{loadingDept ? <div className="text-center py-8 text-gray-500">Đang tải...</div> :
            departmentData.length === 0 ? <div className="text-center py-8 text-gray-500">Chưa có dữ liệu</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mã phòng ban</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tên phòng ban</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Số nhân viên</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tổng lương</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Bảo hiểm</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thuế</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thực lĩnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentData.map((dept: any) => (
                      <tr key={dept.departmentId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{dept.departmentCode}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{dept.departmentName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{dept.employeeCount}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(dept.totalGrossSalary)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(dept.totalInsurance)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(dept.totalTax)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#b9000e] text-right">{formatCurrency(dept.totalNetSalary)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">Tổng cộng</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {departmentData.reduce((sum: number, d: any) => sum + d.employeeCount, 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(departmentData.reduce((sum: number, d: any) => sum + d.totalGrossSalary, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(departmentData.reduce((sum: number, d: any) => sum + d.totalInsurance, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(departmentData.reduce((sum: number, d: any) => sum + d.totalTax, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#b9000e] text-right">
                        {formatCurrency(departmentData.reduce((sum: number, d: any) => sum + d.totalNetSalary, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}</>
        )}

        {selectedReport === 'comparison' && (
          <>{loadingComp ? <div className="text-center py-8 text-gray-500">Đang tải...</div> :
            comparisonData.length === 0 ? <div className="text-center py-8 text-gray-500">Chưa có dữ liệu</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Kỳ lương</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Số NV</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tổng lương</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Bảo hiểm</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thuế</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thực lĩnh</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tăng/Giảm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((period: any, index: number) => {
                      const prevPeriod = index > 0 ? comparisonData[index - 1] : null;
                      const change = prevPeriod ? period.totalNetSalary - prevPeriod.totalNetSalary : 0;
                      const changePercent = prevPeriod && prevPeriod.totalNetSalary > 0 ? (change / prevPeriod.totalNetSalary) * 100 : 0;
                      return (
                        <tr key={period.period} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{period.period}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{period.employeeCount}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(period.totalGrossSalary)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(period.totalInsurance)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(period.totalTax)}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-[#b9000e] text-right">{formatCurrency(period.totalNetSalary)}</td>
                          <td className="px-4 py-3 text-sm text-right">
                            {prevPeriod ? (
                              <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {change >= 0 ? '+' : ''}{formatCurrency(change)} ({changePercent.toFixed(1)}%)
                              </span>
                            ) : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}</>
        )}

        {selectedReport === 'tax' && (
          <>{loadingTax ? <div className="text-center py-8 text-gray-500">Đang tải...</div> :
            taxData.length === 0 ? <div className="text-center py-8 text-gray-500">Chưa có dữ liệu</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mã NV</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Họ tên</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Phòng ban</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thu nhập</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thu nhập chịu thuế</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Giảm trừ</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thuế TNCN</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Thuế suất</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxData.map((tax: any) => (
                      <tr key={tax.employeeId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{tax.employeeCode}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{tax.employeeName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{tax.departmentName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(tax.grossIncome)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(tax.taxableIncome)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(tax.taxDeductions)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#b9000e] text-right">{formatCurrency(tax.personalIncomeTax)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{tax.effectiveTaxRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">Tổng cộng</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(taxData.reduce((sum: number, t: any) => sum + t.grossIncome, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(taxData.reduce((sum: number, t: any) => sum + t.taxableIncome, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(taxData.reduce((sum: number, t: any) => sum + t.taxDeductions, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#b9000e] text-right">
                        {formatCurrency(taxData.reduce((sum: number, t: any) => sum + t.personalIncomeTax, 0))}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}</>
        )}

        {selectedReport === 'insurance' && (
          <>{loadingIns ? <div className="text-center py-8 text-gray-500">Đang tải...</div> :
            insuranceData.length === 0 ? <div className="text-center py-8 text-gray-500">Chưa có dữ liệu</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mã NV</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Họ tên</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Lương đóng BH</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">BHXH</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">BHYT</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">BHTN</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Công đoàn</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tổng NLĐ</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tổng NSDLĐ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insuranceData.map((ins: any) => (
                      <tr key={ins.employeeId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{ins.employeeCode}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{ins.employeeName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(ins.insuranceBase)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(ins.socialInsurance)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(ins.healthInsurance)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(ins.unemploymentIns)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(ins.unionFee)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#b9000e] text-right">{formatCurrency(ins.totalInsurance)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-blue-600 text-right">{formatCurrency(ins.totalEmployerIns)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">Tổng cộng</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(insuranceData.reduce((sum: number, i: any) => sum + i.insuranceBase, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(insuranceData.reduce((sum: number, i: any) => sum + i.socialInsurance, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(insuranceData.reduce((sum: number, i: any) => sum + i.healthInsurance, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(insuranceData.reduce((sum: number, i: any) => sum + i.unemploymentIns, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(insuranceData.reduce((sum: number, i: any) => sum + i.unionFee, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#b9000e] text-right">
                        {formatCurrency(insuranceData.reduce((sum: number, i: any) => sum + i.totalInsurance, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-blue-600 text-right">
                        {formatCurrency(insuranceData.reduce((sum: number, i: any) => sum + i.totalEmployerIns, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}</>
        )}
      </div>
    </div>
  );
}
