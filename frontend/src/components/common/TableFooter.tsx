import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { ChevronLeftIcon } from '../icons/pagination/ChevronLeftIcon';
import { ChevronRightIcon } from '../icons/pagination/ChevronRightIcon';
import { ChevronDownRotatable } from '../icons/pagination/ChevronDownRotatable';

interface TableFooterProps {
  selectedCount: number;
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onItemsPerPageChange: (value: number) => void;
  onPageChange: (page: number) => void;
}

export function TableFooter({
  selectedCount,
  itemsPerPage,
  totalItems,
  currentPage,
  totalPages,
  onItemsPerPageChange,
  onPageChange,
}: TableFooterProps) {
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`h-[36px] w-[35px] flex items-center justify-center p-[10px] rounded-[8px] relative ${currentPage === i
              ? 'bg-[#b9000e]'
              : 'bg-[rgba(185,0,14,0.2)] border border-[#e5e7eb]'
              }`}
          >
            <p className={`font-medium text-[14px] leading-[22px] text-center w-full ${currentPage === i ? 'text-white' : 'text-[#111827]'
              }`}>{i}</p>
          </button>
        );
      }
    } else {
      // Show first page
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`h-[36px] w-[35px] flex items-center justify-center p-[10px] rounded-[8px] relative ${currentPage === 1
            ? 'bg-[#b9000e]'
            : 'bg-[rgba(185,0,14,0.2)] border border-[#e5e7eb]'
            }`}
        >
          <p className={`font-medium text-[14px] leading-[22px] text-center w-full ${currentPage === 1 ? 'text-white' : 'text-[#111827]'
            }`}>1</p>
        </button>
      );

      // Show current page if not first or last
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pages.push(
          <div key="ellipsis1" className="h-[36px] w-[35px] flex items-center justify-center p-[10px] rounded-[8px] border border-[#e5e7eb] relative">
            <p className="text-[14px] leading-[22px] text-[#111827] text-center w-full">...</p>
          </div>
        );

        pages.push(
          <button
            key={currentPage}
            onClick={() => onPageChange(currentPage)}
            className="bg-[#b9000e] h-[36px] w-[35px] flex items-center justify-center p-[10px] rounded-[8px]"
          >
            <p className="font-medium text-[14px] leading-[22px] text-white text-center w-full">{currentPage}</p>
          </button>
        );
      }

      // Show ellipsis and last page
      pages.push(
        <div key="ellipsis2" className="h-[36px] w-[35px] flex items-center justify-center p-[10px] rounded-[8px] border border-[#e5e7eb] relative">
          <p className="text-[14px] leading-[22px] text-[#111827] text-center w-full">...</p>
        </div>
      );

      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`h-[36px] w-[35px] flex items-center justify-center p-[10px] rounded-[8px] relative ${currentPage === totalPages
            ? 'bg-[#b9000e]'
            : 'border border-[#e5e7eb]'
            }`}
        >
          <p className={`font-medium text-[14px] leading-[22px] text-center ${currentPage === totalPages ? 'text-white' : 'text-[#111827]'
            }`}>{totalPages}</p>
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-[10px] py-[16px] border-t border-[#e5e7eb] gap-4">
      {/* Left side - Record count and items per page */}
      <div className="flex flex-wrap gap-[10px] items-center">
        <p className="font-medium text-[14px] text-[#111827] leading-[22px] whitespace-nowrap">
          Đã chọn: {selectedCount} bản ghi | Hiển thị
        </p>

        <div className="relative bg-white h-[36px] w-[64px] rounded-[8px] border border-[#e5e7eb]">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none w-full h-full px-[10px] font-medium text-[14px] text-[#111827] leading-[22px] bg-transparent outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon />
          </div>
        </div>

        <p className="font-medium text-[14px] text-[#111827] leading-[22px] whitespace-nowrap">
          Tổng: {totalItems} bản ghi
        </p>
      </div>

      {/* Right side - Pagination */}
      <div className="flex flex-wrap gap-[5px] items-center w-full lg:w-auto justify-center lg:justify-end">
        {/* Page dropdown - hidden on mobile */}
        <div className="relative bg-white h-[36px] w-[117px] rounded-[8px] border border-[#e5e7eb] hidden md:flex">
          <div className="flex items-center justify-center gap-[10px] h-full px-[10px]">
            <p className="font-medium text-[14px] text-[#111827] leading-[22px] whitespace-nowrap">
              Đến trang
            </p>
            <ChevronDownRotatable />
          </div>
        </div>

        {/* Previous double arrow */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-[36px] w-[36px] flex items-center justify-center p-[10px] rounded-[8px] border border-[#e5e7eb] disabled:opacity-50"
        >
          <div className="rotate-180">
            <ChevronRightIcon />
          </div>
        </button>

        {/* Previous single arrow */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-[36px] w-[36px] flex items-center justify-center p-[10px] rounded-[8px] border border-[#e5e7eb] disabled:opacity-50"
        >
          <div className="flex items-center justify-center size-[18px]">
            <div className="rotate-90">
              <ChevronDownRotatable />
            </div>
          </div>
        </button>

        {/* Page numbers */}
        {renderPageNumbers()}

        {/* Next single arrow */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-[36px] w-[36px] flex items-center justify-center p-[10px] rounded-[8px] border border-[#e5e7eb] disabled:opacity-50"
        >
          <div className="flex items-center justify-center size-[18px]">
            <div className="rotate-180">
              <div className="rotate-90">
                <ChevronDownRotatable />
              </div>
            </div>
          </div>
        </button>

        {/* Next double arrow */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-[36px] w-[36px] flex items-center justify-center p-[10px] rounded-[8px] border border-[#e5e7eb] disabled:opacity-50"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}