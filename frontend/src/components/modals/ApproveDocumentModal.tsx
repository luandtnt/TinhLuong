import { ConfirmationModal } from './ConfirmationModal';
import { CheckCircle } from 'lucide-react';

interface ApproveDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentName: string;
}

export function ApproveDocumentModal({
  isOpen,
  onClose,
  onConfirm,
  documentName
}: ApproveDocumentModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Phê duyệt tài liệu"
      icon={<CheckCircle size={20} />}
      message={
        <p>
          Tài liệu <span className="font-semibold">{documentName}</span> sẽ được phê duyệt. Bạn có chắc chắn muốn phê duyệt tài liệu hay không?
        </p>
      }
      confirmText="Phê duyệt"
      cancelText="Hủy bỏ"
    />
  );
}
