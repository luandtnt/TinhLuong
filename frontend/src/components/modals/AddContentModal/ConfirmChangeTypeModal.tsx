import { Button } from '../../common/Button';

interface ConfirmChangeTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmChangeTypeModal({ isOpen, onClose, onConfirm }: ConfirmChangeTypeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center">
      <div className="bg-white rounded-[8px] w-[700px] shadow-xl">
        {/* Header */}
        <div className="bg-[#b9000e] text-white px-[24px] py-[16px] rounded-t-[8px]">
          <h3 className="text-[18px] font-semibold">Xác nhận đổi loại nội dung</h3>
        </div>

        {/* Body */}
        <div className="p-[20px]">
          <p className="text-[14px] text-[#111827] text-center">
            Bạn đang đổi loại nội dung. Một số trường không tương thích sẽ bị xóa. 
            <br />
            Bạn có muốn tiếp tục không?
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e5e7eb] px-[20px] py-[16px] flex justify-end gap-[10px]">
          <Button
            onClick={onClose}
            label="Hủy"
            variant="outline"
            size="md"
          />
          <Button
            onClick={onConfirm}
            label="Tiếp tục"
            variant="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
