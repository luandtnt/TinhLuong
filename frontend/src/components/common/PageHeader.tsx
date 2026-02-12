import { Button } from "./Button";
import { DeleteIcon } from "../icons/DeleteIcon";
import { RejectIcon } from "../icons/RejectIcon";
import { ApproveIcon } from "../icons/ApproveIcon";
import { ExportIcon } from "../icons/ExportIcon";
import { AddIcon } from "../icons/AddIcon";

interface PageHeaderProps {
  onDelete?: () => void;
  onReject?: () => void;
  onApprove?: () => void;
  onExport?: () => void;
  onAddNew?: () => void;
  title?: string;
}

export function PageHeader({ onDelete, onReject, onApprove, onExport, onAddNew, title = "Danh sách tài liệu về Lịch sử Đảng" }: PageHeaderProps) {
  return (
    <div className="bg-white flex flex-col md:flex-row gap-[10px] items-start md:items-center p-[10px] relative w-full">
      {/* Title */}
      <div className="flex items-center min-h-px min-w-px relative flex-1 w-full md:w-auto">
        <p className="font-semibold leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] md:text-[18px]">
          {title}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-[10px] w-full md:w-auto">
        {onDelete && (
          <Button 
            onClick={onDelete} 
            icon={<DeleteIcon />} 
            label="Xóa" 
            variant="outline"
            size="md"
          />
        )}
        {onReject && (
          <Button 
            onClick={onReject} 
            icon={<RejectIcon />} 
            label="Từ chối" 
            variant="outline"
            size="md"
          />
        )}
        {onApprove && (
          <Button 
            onClick={onApprove} 
            icon={<ApproveIcon />} 
            label="Phê duyệt" 
            variant="outline"
            size="md"
          />
        )}
        {onExport && (
          <Button 
            onClick={onExport} 
            icon={<ExportIcon />} 
            label="Xuất danh sách" 
            variant="outline"
            size="md"
          />
        )}
        {onAddNew && (
          <Button 
            onClick={onAddNew} 
            icon={<AddIcon />} 
            label="Thêm mới" 
            variant="primary"
            size="md"
          />
        )}
      </div>
    </div>
  );
}