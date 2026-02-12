import { ConfirmationModal } from './ConfirmationModal';
import { Upload } from 'lucide-react';

interface SubmitDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentName: string;
  targetName?: string;
}

export function SubmitDocumentModal({
  isOpen,
  onClose,
  onConfirm,
  documentName,
  targetName = 'Lãnh đạo Nguyễn Văn A'
}: SubmitDocumentModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Nộp tài liệu"
      icon={<Upload size={20} />}
      message={
        <p>
          Tài liệu <span className="font-semibold">{documentName}</span> sẽ được nộp lên <span className="font-semibold">{targetName}</span>. Bạn có chắc chắn muốn nộp tài liệu hay không?
        </p>
      }
      confirmText="Nộp cấp trên"
      cancelText="Hủy bỏ"
    />
  );
}
