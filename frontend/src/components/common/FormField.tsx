import { ReactNode } from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { CalendarIcon } from '../icons/CalendarIcon';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children?: ReactNode;
  type?: 'text' | 'select' | 'date' | 'textarea';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  rows?: number;
}

export function FormField({
  label,
  required = false,
  children,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  options = [],
  disabled = false,
  rows = 4,
}: FormFieldProps) {
  if (children) {
    return (
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <div className="flex gap-[6px] items-center">
          <p className="font-medium text-[14px] text-[#111827] leading-[20px]">
            {label}
            {required && <span className="text-[#ff0004]"> *</span>}
          </p>
        </div>
        {children}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <div className="flex gap-[6px] items-center">
          <p className="font-medium text-[14px] text-[#111827] leading-[20px]">
            {label}
            {required && <span className="text-[#ff0004]"> *</span>}
          </p>
        </div>
        <div className={`bg-white relative rounded-[8px] border border-[#c9cdd4] ${disabled ? 'bg-[#c9cdd4]' : ''}`}>
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className="w-full px-[12px] py-[8px] text-[14px] text-[#111827] placeholder:text-[#979797] leading-[20px] bg-transparent outline-none resize-none rounded-[8px]"
          />
        </div>
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <div className="flex gap-[6px] items-center">
          <p className="font-medium text-[14px] text-[#111827] leading-[20px]">
            {label}
            {required && <span className="text-[#ff0004]"> *</span>}
          </p>
        </div>
        <div className={`bg-white h-[36px] relative rounded-[8px] border border-[#c9cdd4] ${disabled ? 'bg-[#c9cdd4]' : ''}`}>
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="w-full h-full px-[12px] py-[8px] text-[14px] text-[#111827] leading-[20px] bg-transparent outline-none appearance-none pr-[36px]"
          >
            <option value="" className="text-[#979797]">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'date') {
    return (
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <div className="flex gap-[6px] items-center">
          <p className="font-medium text-[14px] text-[#111827] leading-[20px]">
            {label}
            {required && <span className="text-[#ff0004]"> *</span>}
          </p>
        </div>
        <div className={`bg-white h-[36px] relative rounded-[8px] border border-[#c9cdd4] ${disabled ? 'bg-[#c9cdd4]' : ''}`}>
          <input
            type="date"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full h-full px-[12px] py-[8px] text-[14px] text-[#111827] placeholder:text-[#979797] leading-[20px] bg-transparent outline-none"
          />
          <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
            <CalendarIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[4px] flex-1 min-w-0">
      <div className="flex gap-[6px] items-center">
        <p className="font-medium text-[14px] text-[#111827] leading-[20px]">
          {label}
          {required && <span className="text-[#ff0004]"> *</span>}
        </p>
      </div>
      <div className={`bg-white h-[36px] relative rounded-[8px] border border-[#c9cdd4] ${disabled ? 'bg-[#c9cdd4]' : ''}`}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-full px-[12px] py-[8px] text-[14px] text-[#111827] placeholder:text-[#979797] leading-[20px] bg-transparent outline-none"
        />
      </div>
    </div>
  );
}