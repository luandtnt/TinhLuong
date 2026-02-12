import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, FileDown, Save } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { TableHeader } from '../../components/common/TableHeader';
import { TableFooter } from '../../components/common/TableFooter';
import { CustomCheckbox } from '../../components/common/CustomCheckbox';
import { EditIcon } from '../../components/icons/table-actions/EditIcon';
import api from '../../lib/api';
import { SalaryComponent, InsuranceRate, OtRule, TaxBracket } from '../../types/payroll';

type ConfigTab = 'salary' | 'insurance' | 'ot' | 'tax';

export function PayrollConfigsPage() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('salary');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const queryClient = useQueryClient();

  // Fetch data based on active tab
  const { data: salaryComponents = [], isLoading: loadingSalary } = useQuery({
    queryKey: ['salary-components'],
    queryFn: async () => {
      const response = await api.get('/configs/salary-components');
      return response.data as SalaryComponent[];
    },
    enabled: activeTab === 'salary',
  });

  const { data: insuranceRates = [], isLoading: loadingInsurance } = useQuery({
    queryKey: ['insurance-rates'],
    queryFn: async () => {
      const response = await api.get('/configs/insurance-rates');
      return response.data as InsuranceRate[];
    },
    enabled: activeTab === 'insurance',
  });

  const { data: otRules = [], isLoading: loadingOt } = useQuery({
    queryKey: ['ot-rules'],
    queryFn: async () => {
      const response = await api.get('/configs/ot-rules');
      return response.data as OtRule[];
    },
    enabled: activeTab === 'ot',
  });

  const { data: taxBrackets = [], isLoading: loadingTax } = useQuery({
    queryKey: ['tax-brackets'],
    queryFn: async () => {
      const response = await api.get('/configs/tax-brackets');
      return response.data as TaxBracket[];
    },
    enabled: activeTab === 'tax',
  });

  const tabs = [
    { key: 'salary' as ConfigTab, label: 'Khoản lương/Phụ cấp' },
    { key: 'insurance' as ConfigTab, label: 'Tỷ lệ BH/KPCĐ' },
    { key: 'ot' as ConfigTab, label: 'Quy tắc OT' },
    { key: 'tax' as ConfigTab, label: 'Thuế TNCN' },
  ];

  const handleSelectAll = (checked: boolean) => {
    const currentData = getCurrentData();
    if (checked) {
      setSelectedItems(currentData.map((item: any) => item.id));
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

  const getCurrentData = () => {
    switch (activeTab) {
      case 'salary':
        return salaryComponents;
      case 'insurance':
        return insuranceRates;
      case 'ot':
        return otRules;
      case 'tax':
        return taxBrackets;
      default:
        return [];
    }
  };

  const isLoading = loadingSalary || loadingInsurance || loadingOt || loadingTax;
  const currentData = getCurrentData();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'salary':
        return <SalaryComponentsTable data={salaryComponents} selectedItems={selectedItems} onSelectItem={handleSelectItem} />;
      case 'insurance':
        return <InsuranceRatesTable data={insuranceRates} selectedItems={selectedItems} onSelectItem={handleSelectItem} />;
      case 'ot':
        return <OtRulesTable data={otRules} selectedItems={selectedItems} onSelectItem={handleSelectItem} />;
      case 'tax':
        return <TaxBracketsTable data={taxBrackets} selectedItems={selectedItems} onSelectItem={handleSelectItem} />;
      default:
        return null;
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

  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto">
      <div className="p-[16px]">
        {/* Page Title and Action Buttons */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] flex items-center justify-between gap-[10px] border border-[#e5e7eb]">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            Thiết lập tham số lương
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
              onClick={() => alert('Thêm mới')}
              icon={<Plus size={18} />}
              label="Thêm mới"
              variant="primary"
              size="md"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#e5e7eb] rounded-[8px] mb-[16px]">
          <div className="flex border-b border-[#e5e7eb]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSelectedItems([]);
                }}
                className={`px-[24px] py-[12px] text-[14px] font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-[#b9000e] border-b-2 border-[#b9000e]'
                    : 'text-[#6b7280] hover:text-[#111827]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[16px]">
          <div className="overflow-x-auto">
            {renderTabContent()}
          </div>

          <TableFooter
            selectedCount={selectedItems.length}
            currentPage={currentPage}
            totalPages={Math.ceil(currentData.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={currentData.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

// Salary Components Table
function SalaryComponentsTable({ 
  data, 
  selectedItems, 
  onSelectItem 
}: { 
  data: SalaryComponent[]; 
  selectedItems: string[]; 
  onSelectItem: (id: string, checked: boolean) => void;
}) {
  const columns = [
    { key: 'code', label: 'Mã', align: 'left' as const, minWidth: '100px' },
    { key: 'name', label: 'Tên khoản', align: 'left' as const, minWidth: '200px' },
    { key: 'type', label: 'Loại', align: 'left' as const, minWidth: '120px' },
    { key: 'isTaxable', label: 'Chịu thuế', align: 'center' as const, minWidth: '100px' },
    { key: 'isInsurable', label: 'Đóng BH', align: 'center' as const, minWidth: '100px' },
    { key: 'effectiveDate', label: 'Hiệu lực từ', align: 'left' as const, minWidth: '120px' },
    { key: 'status', label: 'Trạng thái', align: 'center' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '120px' },
  ];

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      SALARY: 'Lương',
      ALLOWANCE: 'Phụ cấp',
      BONUS: 'Thưởng',
      DEDUCTION: 'Khấu trừ',
      OT_PAY: 'Tiền OT',
    };
    return types[type] || type;
  };

  return (
    <table className="w-full">
      <thead>
        <TableHeader
          columns={columns}
          showCheckbox={true}
          allChecked={selectedItems.length === data.length && data.length > 0}
          onCheckAll={(checked) => {
            if (checked) {
              data.forEach(item => onSelectItem(item.id, true));
            } else {
              data.forEach(item => onSelectItem(item.id, false));
            }
          }}
        />
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
            <td className="px-[16px] py-[12px] text-center">
              <CustomCheckbox
                checked={selectedItems.includes(item.id)}
                onChange={(checked) => onSelectItem(item.id, checked)}
              />
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{item.code}</td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{item.name}</td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{getTypeLabel(item.type)}</td>
            <td className="px-[16px] py-[12px] text-center">
              <span className={`inline-flex px-[8px] py-[2px] rounded-[4px] text-[12px] ${
                item.isTaxable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.isTaxable ? 'Có' : 'Không'}
              </span>
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <span className={`inline-flex px-[8px] py-[2px] rounded-[4px] text-[12px] ${
                item.isInsurable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.isInsurable ? 'Có' : 'Không'}
              </span>
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
              {new Date(item.effectiveDate).toLocaleDateString('vi-VN')}
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <span className={`inline-flex px-[10px] py-[4px] rounded-[8px] text-[14px] font-medium ${
                item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.isActive ? 'Đang dùng' : 'Ngừng dùng'}
              </span>
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <button
                onClick={() => alert(`Sửa ${item.code}`)}
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
  );
}

// Insurance Rates Table
function InsuranceRatesTable({ 
  data, 
  selectedItems, 
  onSelectItem 
}: { 
  data: InsuranceRate[]; 
  selectedItems: string[]; 
  onSelectItem: (id: string, checked: boolean) => void;
}) {
  const columns = [
    { key: 'name', label: 'Tên', align: 'left' as const, minWidth: '200px' },
    { key: 'type', label: 'Loại BH', align: 'left' as const, minWidth: '120px' },
    { key: 'employeeRate', label: 'Tỷ lệ NLĐ (%)', align: 'right' as const, minWidth: '120px' },
    { key: 'employerRate', label: 'Tỷ lệ Đơn vị (%)', align: 'right' as const, minWidth: '120px' },
    { key: 'effectiveDate', label: 'Hiệu lực từ', align: 'left' as const, minWidth: '120px' },
    { key: 'status', label: 'Trạng thái', align: 'center' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '120px' },
  ];

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      SOCIAL: 'BHXH',
      HEALTH: 'BHYT',
      UNEMPLOYMENT: 'BHTN',
      UNION: 'Công đoàn',
    };
    return types[type] || type;
  };

  return (
    <table className="w-full">
      <thead>
        <TableHeader
          columns={columns}
          showCheckbox={true}
          allChecked={selectedItems.length === data.length && data.length > 0}
          onCheckAll={(checked) => {
            if (checked) {
              data.forEach(item => onSelectItem(item.id, true));
            } else {
              data.forEach(item => onSelectItem(item.id, false));
            }
          }}
        />
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
            <td className="px-[16px] py-[12px] text-center">
              <CustomCheckbox
                checked={selectedItems.includes(item.id)}
                onChange={(checked) => onSelectItem(item.id, checked)}
              />
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{item.name}</td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{getTypeLabel(item.type)}</td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
              {Number(item.employeeRate).toFixed(2)}%
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
              {Number(item.employerRate).toFixed(2)}%
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
              {new Date(item.effectiveDate).toLocaleDateString('vi-VN')}
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <span className={`inline-flex px-[10px] py-[4px] rounded-[8px] text-[14px] font-medium ${
                item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.isActive ? 'Đang dùng' : 'Ngừng dùng'}
              </span>
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <button
                onClick={() => alert(`Sửa ${item.name}`)}
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
  );
}

// OT Rules Table
function OtRulesTable({ 
  data, 
  selectedItems, 
  onSelectItem 
}: { 
  data: OtRule[]; 
  selectedItems: string[]; 
  onSelectItem: (id: string, checked: boolean) => void;
}) {
  const columns = [
    { key: 'name', label: 'Tên quy tắc', align: 'left' as const, minWidth: '200px' },
    { key: 'otType', label: 'Loại OT', align: 'left' as const, minWidth: '150px' },
    { key: 'multiplier', label: 'Hệ số', align: 'right' as const, minWidth: '100px' },
    { key: 'effectiveDate', label: 'Hiệu lực từ', align: 'left' as const, minWidth: '120px' },
    { key: 'status', label: 'Trạng thái', align: 'center' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '120px' },
  ];

  const getOtTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      WEEKDAY: 'Ngày thường',
      WEEKEND: 'Cuối tuần',
      HOLIDAY: 'Lễ tết',
      NIGHT_SHIFT: 'Làm đêm',
      COMPENSATORY: 'Nghỉ bù',
    };
    return types[type] || type;
  };

  return (
    <table className="w-full">
      <thead>
        <TableHeader
          columns={columns}
          showCheckbox={true}
          allChecked={selectedItems.length === data.length && data.length > 0}
          onCheckAll={(checked) => {
            if (checked) {
              data.forEach(item => onSelectItem(item.id, true));
            } else {
              data.forEach(item => onSelectItem(item.id, false));
            }
          }}
        />
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
            <td className="px-[16px] py-[12px] text-center">
              <CustomCheckbox
                checked={selectedItems.includes(item.id)}
                onChange={(checked) => onSelectItem(item.id, checked)}
              />
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{item.name}</td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{getOtTypeLabel(item.otType)}</td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
              x{Number(item.multiplier).toFixed(2)}
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
              {new Date(item.effectiveDate).toLocaleDateString('vi-VN')}
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <span className={`inline-flex px-[10px] py-[4px] rounded-[8px] text-[14px] font-medium ${
                item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.isActive ? 'Đang dùng' : 'Ngừng dùng'}
              </span>
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <button
                onClick={() => alert(`Sửa ${item.name}`)}
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
  );
}

// Tax Brackets Table
function TaxBracketsTable({ 
  data, 
  selectedItems, 
  onSelectItem 
}: { 
  data: TaxBracket[]; 
  selectedItems: string[]; 
  onSelectItem: (id: string, checked: boolean) => void;
}) {
  const columns = [
    { key: 'fromAmount', label: 'Từ (VNĐ)', align: 'right' as const, minWidth: '150px' },
    { key: 'toAmount', label: 'Đến (VNĐ)', align: 'right' as const, minWidth: '150px' },
    { key: 'rate', label: 'Thuế suất (%)', align: 'right' as const, minWidth: '120px' },
    { key: 'deduction', label: 'Khấu trừ (VNĐ)', align: 'right' as const, minWidth: '150px' },
    { key: 'effectiveDate', label: 'Hiệu lực từ', align: 'left' as const, minWidth: '120px' },
    { key: 'status', label: 'Trạng thái', align: 'center' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '120px' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <table className="w-full">
      <thead>
        <TableHeader
          columns={columns}
          showCheckbox={true}
          allChecked={selectedItems.length === data.length && data.length > 0}
          onCheckAll={(checked) => {
            if (checked) {
              data.forEach(item => onSelectItem(item.id, true));
            } else {
              data.forEach(item => onSelectItem(item.id, false));
            }
          }}
        />
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
            <td className="px-[16px] py-[12px] text-center">
              <CustomCheckbox
                checked={selectedItems.includes(item.id)}
                onChange={(checked) => onSelectItem(item.id, checked)}
              />
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
              {formatCurrency(Number(item.fromAmount))}
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
              {item.toAmount ? formatCurrency(Number(item.toAmount)) : 'Trở lên'}
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
              {Number(item.rate).toFixed(0)}%
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-right">
              {formatCurrency(Number(item.deduction))}
            </td>
            <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
              {new Date(item.effectiveDate).toLocaleDateString('vi-VN')}
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <span className={`inline-flex px-[10px] py-[4px] rounded-[8px] text-[14px] font-medium ${
                item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.isActive ? 'Đang dùng' : 'Ngừng dùng'}
              </span>
            </td>
            <td className="px-[16px] py-[12px] text-center">
              <button
                onClick={() => alert(`Sửa bậc thuế`)}
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
  );
}
