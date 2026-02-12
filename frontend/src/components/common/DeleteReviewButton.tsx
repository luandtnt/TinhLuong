import { Trash2 } from 'lucide-react';

interface DeleteReviewButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function DeleteReviewButton({ onClick, disabled = false }: DeleteReviewButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-white relative rounded-[8px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative rounded-[inherit]">
        <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]">
          <Trash2 size={20} style={{ color: '#B9000E' }} />
        </div>
        <p className="font-['Inter',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">
          Xóa đánh giá
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </button>
  );
}
