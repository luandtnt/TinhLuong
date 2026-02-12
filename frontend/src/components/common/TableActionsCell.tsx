import { ApproveCircleIcon } from "../icons/table-actions/ApproveCircleIcon";
import { RejectCircleIcon } from "../icons/table-actions/RejectCircleIcon";
import { EyeIcon } from "../icons/table-actions/EyeIcon";

interface TableActionsCellProps {
  documentId: string;
  onView?: (documentId: string) => void;
  onApprove?: (documentId: string) => void;
  onReject?: (documentId: string) => void;
}

export function TableActionsCell({ 
  documentId, 
  onView,
  onApprove,
  onReject 
}: TableActionsCellProps) {
  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApprove?.(documentId);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReject?.(documentId);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView?.(documentId);
  };

  return (
    <div className="flex gap-[8px] items-center justify-center">
      <button
        onClick={handleApprove}
        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
        title="Phê duyệt"
      >
        <ApproveCircleIcon />
      </button>
      
      <button
        onClick={handleReject}
        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
        title="Từ chối"
      >
        <RejectCircleIcon />
      </button>
      
      <button
        onClick={handleView}
        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-50 opacity-50 transition-colors"
        title="Xem"
      >
        <EyeIcon />
      </button>
    </div>
  );
}