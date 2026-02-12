import { CustomCheckbox } from './CustomCheckbox';

interface TableHeaderProps {
  columns: Array<{
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    minWidth?: string;
  }>;
  showCheckbox?: boolean;
  allChecked?: boolean;
  onCheckAll?: (checked: boolean) => void;
}

export function TableHeader({
  columns,
  showCheckbox = true,
  allChecked = false,
  onCheckAll
}: TableHeaderProps) {
  return (
    <tr className="bg-[#f3f4f6] border-b border-[#e5e7eb]">
      {showCheckbox && (
        <th className="px-[16px] py-[12px] text-center w-[62px]">
          {onCheckAll && (
            <CustomCheckbox
              checked={allChecked}
              onChange={onCheckAll}
            />
          )}
        </th>
      )}
      
      {columns.map((column) => (
        <th
          key={column.key}
          className={`px-[16px] py-[12px] text-${column.align || 'left'} text-[12px] font-semibold text-[#111827]`}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </th>
      ))}
    </tr>
  );
}
