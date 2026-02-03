import { CalendarIcon } from '../icons/CalendarIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface TableFilterRowProps {
  filters: {
    code?: string;
    title?: string;
    type?: string;
    classification?: string;
    author?: string;
    createdDate?: string;
    status?: string;
    [key: string]: string | undefined;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  showCheckbox?: boolean;
  columns?: Array<{
    key: string;
    type: 'text' | 'select' | 'date';
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
}

type FilterColumn = {
  key: string;
  type: 'text' | 'select' | 'date';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
};

export function TableFilterRow({
  filters,
  onFilterChange,
  onClearFilters,
  showCheckbox = true,
  columns = []
}: TableFilterRowProps) {
  const handleInputChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const renderFilterCell = (column: FilterColumn) => {
    if (!column) return null;

    switch (column.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={column.placeholder || ''}
            value={filters[column.key] || ''}
            onChange={(e) => handleInputChange(column.key, e.target.value)}
            className="w-full px-[10px] py-[8px] text-[14px] text-[#111827] border border-[#e5e7eb] rounded-[4px] outline-none focus:border-[#b9000e] placeholder:text-[#6b7280]"
          />
        );

      case 'date':
        return (
          <div className="flex items-center gap-[8px] px-[10px] py-[8px] border border-[#e5e7eb] rounded-[4px] cursor-pointer hover:border-[#b9000e]">
            <input
              type="text"
              placeholder={column.placeholder || 'Chọn ngày'}
              value={filters[column.key] || ''}
              onChange={(e) => handleInputChange(column.key, e.target.value)}
              className="flex-1 text-[14px] text-[#111827] outline-none placeholder:text-[#6b7280] bg-transparent"
            />
            <CalendarIcon />
          </div>
        );

      case 'select':
        return (
          <div className="relative">
            <select
              value={filters[column.key] || ''}
              onChange={(e) => handleInputChange(column.key, e.target.value)}
              className="w-full appearance-none px-[10px] py-[8px] text-[14px] text-[#111827] border border-[#e5e7eb] rounded-[4px] outline-none focus:border-[#b9000e] bg-white pr-[32px]"
            >
              <option value="">{column.placeholder || 'Tất cả'}</option>
              {column.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <tr className="bg-white border-b border-[#e5e7eb]">
      {showCheckbox && <td className="px-[16px] py-[12px]"></td>}
      
      {columns.map((column, index) => (
        <td key={column.key || index} className="px-[10px] py-[12px]">
          {renderFilterCell(column)}
        </td>
      ))}

      <td className="px-[10px] py-[12px]">
        <button
          onClick={onClearFilters}
          className="text-[14px] font-medium text-[#b9000e] hover:underline whitespace-nowrap"
        >
          Xóa bộ lọc
        </button>
      </td>
    </tr>
  );
}
