import { X } from 'lucide-react';

interface RejectButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

export function RejectButton({ onClick, disabled = false, label = "Từ chối" }: RejectButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-white relative rounded-[8px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <X size={18} className="text-[#b9000e] shrink-0" />
        <p className="font-['Inter',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px] whitespace-nowrap">
          {label}
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </button>
  );
}
