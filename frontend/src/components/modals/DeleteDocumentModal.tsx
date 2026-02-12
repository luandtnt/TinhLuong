import { ConfirmationModal } from './ConfirmationModal';
import { Trash2 } from 'lucide-react';

interface DeleteDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentName: string;
}

export function DeleteDocumentModal({
  isOpen,
  onClose,
  onConfirm,
  documentName
}: DeleteDocumentModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Xóa tài liệu"
      icon={<Trash2 size={20} />}
      message={
        <p>
          Tài liệu <span className="font-semibold">{documentName}</span> sẽ bị xóa. Bạn có chắc chắn muốn xóa tài liệu hay không?
        </p>
      }
      confirmText="Xóa"
      cancelText="Hủy bỏ"
    />
  );
}
