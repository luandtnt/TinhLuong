import svgPaths from '../../legacy-figma/svg-ou7fvf0xne';

interface SubordinateTableActionsCellProps {
  documentId: string;
  onView?: (documentId: string) => void;
  onEdit?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
  onSubmit?: (documentId: string) => void;
}

function MiSubmit() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p21310d80} fill="#111827" />
        </g>
      </svg>
    </div>
  );
}

function Eye() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p3962d7f0} stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15" />
          <path d={svgPaths.p3b27f100} stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15" />
        </g>
      </svg>
    </div>
  );
}

function IconInterfaceOutlineEditRectangle() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path clipRule="evenodd" d={svgPaths.p35246b80} fill="#111827" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function IconInterfaceOutlineTrash() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path clipRule="evenodd" d={svgPaths.p204174c0} fill="#111827" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

export function SubordinateTableActionsCell({ 
  documentId,
  onView,
  onEdit,
  onDelete,
  onSubmit
}: SubordinateTableActionsCellProps) {
  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSubmit?.(documentId);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView?.(documentId);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(documentId);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(documentId);
  };

  return (
    <div className="flex gap-[8px] items-center justify-center">
      <button
        onClick={handleSubmit}
        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-100 transition-colors"
        title="Nộp lên cấp trên"
      >
        <MiSubmit />
      </button>
      <button
        onClick={handleView}
        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-100 transition-colors"
        title="Xem tài liệu"
      >
        <Eye />
      </button>
      <button
        onClick={handleEdit}
        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-100 transition-colors"
        title="Chỉnh sửa"
      >
        <IconInterfaceOutlineEditRectangle />
      </button>
      <button
        onClick={handleDelete}
        className="bg-white p-[2px] rounded-[4px] hover:bg-gray-100 transition-colors"
        title="Xóa"
      >
        <IconInterfaceOutlineTrash />
      </button>
    </div>
  );
}