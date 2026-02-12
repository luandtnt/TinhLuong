interface StatusBadgeProps {
  status: 'approved' | 'rejected' | 'pending' | 'draft';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          bg: 'bg-[#f0fdf4]',
          border: 'border-[#bbf7d0]',
          text: 'text-[#15803d]',
          label: 'Đã phê duyệt'
        };
      case 'rejected':
        return {
          bg: 'bg-[#fef2f2]',
          border: 'border-[#fecaca]',
          text: 'text-[#b91c1c]',
          label: 'Từ chối'
        };
      case 'pending':
        return {
          bg: 'bg-[#fffbeb]',
          border: 'border-[#fde68a]',
          text: 'text-[#b45309]',
          label: 'Chờ phê duyệt'
        };
      case 'draft':
        return {
          bg: 'bg-[#f9fafb]',
          border: 'border-[#d1d5db]',
          text: 'text-[#6b7280]',
          label: 'Nháp'
        };
      default:
        return {
          bg: 'bg-[#f9fafb]',
          border: 'border-[#d1d5db]',
          text: 'text-[#6b7280]',
          label: 'Không xác định'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bg} inline-flex items-center px-[8px] py-[2px] relative rounded-[6px]`}>
      <div aria-hidden="true" className={`absolute border ${config.border} border-solid inset-0 pointer-events-none rounded-[6px]`} />
      <p className={`font-medium leading-[20px] not-italic relative ${config.text} text-[14px] whitespace-nowrap`}>
        {config.label}
      </p>
    </div>
  );
}