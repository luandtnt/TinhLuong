import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '../common/Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  icon
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[8px] w-[700px] h-[240px] overflow-hidden shadow-xl flex flex-col">
        {/* Header - Fixed height */}
        <div className="bg-[#b9000e] px-[24px] py-[16px] flex items-center justify-between h-[56px]">
          <h2 className="text-[18px] font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded p-1 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body - Fixed height */}
        <div className="px-[20px] py-[20px] h-[120px] flex items-center justify-center overflow-auto">
          <div className="text-[15px] text-[#111827] leading-[24px] text-center w-full">
            {message}
          </div>
        </div>

        {/* Footer - Fixed height */}
        <div className="px-[24px] py-[16px] border-t border-[#e5e7eb] flex justify-end gap-[12px] h-[64px]">
          <Button
            onClick={onClose}
            icon={<X size={18} />}
            label={cancelText}
            variant="outline"
            size="md"
          />
          <Button
            onClick={onConfirm}
            icon={icon}
            label={confirmText}
            variant="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
