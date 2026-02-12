import { ConfirmationModal } from './ConfirmationModal';
import { XCircle } from 'lucide-react';

interface RejectDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentName: string;
}

export function RejectDocumentModal({
  isOpen,
  onClose,
  onConfirm,
  documentName
}: RejectDocumentModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Từ chối phê duyệt tài liệu"
      icon={<XCircle size={20} />}
      message={
        <p>
          Tài liệu <span className="font-semibold">{documentName}</span> sẽ bị từ chối. Bạn có chắc chắn muốn từ chối tài liệu hay không?
        </p>
      }
      confirmText="Từ chối"
      cancelText="Hủy bỏ"
    />
  );
}
