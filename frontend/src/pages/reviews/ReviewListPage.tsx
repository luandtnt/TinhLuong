import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Trash2 } from 'lucide-react';
import { Review } from '../../types/review';
import { mockReviews } from '../../data/mockReviews';
import { StarRating } from '../../components/common/StarRating';
import { CustomCheckbox } from '../../components/common/CustomCheckbox';
import { TableHeader } from '../../components/common/TableHeader';
import { TableFooter } from '../../components/common/TableFooter';
import { DeleteDocumentModal } from '../../components/modals';

export function ReviewListPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    code: '',
    reviewer: '',
    content: '',
    materialId: '',
    dateFrom: '',
    dateTo: '',
    rating: '',
  });

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const tableColumns = [
    { key: 'reviewCode', label: 'Mã bình luận', align: 'left' as const, minWidth: '120px' },
    { key: 'code', label: 'Mã Tài liệu', align: 'left' as const, minWidth: '120px' },
    { key: 'materialTitle', label: 'Tên Tài liệu', align: 'left' as const, minWidth: '200px' },
    { key: 'reviewer', label: 'Đơn Vị/Người đánh giá', align: 'left' as const, minWidth: '180px' },
    { key: 'content', label: 'Nội dung', align: 'left' as const, minWidth: '250px' },
    { key: 'date', label: 'Ngày Tạo đánh giá', align: 'center' as const, minWidth: '140px' },
    { key: 'rating', label: 'Đánh giá', align: 'center' as const, minWidth: '120px' },
    { key: 'actions', label: 'Thao tác', align: 'center' as const, minWidth: '100px' },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(reviews.map(review => review.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleView = (reviewId: string) => {
    navigate(`/dashboard/reviews/${reviewId}`);
  };

  const handleDelete = (reviewId: string) => {
    setDeletingReviewId(reviewId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingReviewId) {
      setReviews(reviews.filter(review => review.id !== deletingReviewId));
      setDeletingReviewId(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để xóa');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSelected = () => {
    setReviews(reviews.filter(review => !selectedItems.includes(review.id)));
    setSelectedItems([]);
    setIsDeleteModalOpen(false);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      code: '',
      reviewer: '',
      content: '',
      materialId: '',
      dateFrom: '',
      dateTo: '',
      rating: '',
    });
  };

  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto">
      <div className="p-[16px]">
        {/* Page Title */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] border border-[#e5e7eb]">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            Danh sách đánh giá, bình luận
          </h1>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[16px]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <TableHeader
                  columns={tableColumns}
                  showCheckbox={true}
                  allChecked={selectedItems.length === reviews.length && reviews.length > 0}
                  onCheckAll={handleSelectAll}
                />
                
                {/* Filter Row */}
                <tr className="border-b border-[#e5e7eb]">
                  <td className="px-[16px] py-[12px]">
                    {/* Empty cell for checkbox column - no filter */}
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <input
                      type="text"
                      value={filters.code}
                      onChange={(e) => handleFilterChange('code', e.target.value)}
                      placeholder="Nhập mã bình luận"
                      className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b9000e]"
                    />
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <input
                      type="text"
                      value={filters.materialId}
                      onChange={(e) => handleFilterChange('materialId', e.target.value)}
                      placeholder="Nhập mã tài liệu"
                      className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b9000e]"
                    />
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <input
                      type="text"
                      placeholder="Nhập tên tài liệu"
                      className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b9000e]"
                    />
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <input
                      type="text"
                      value={filters.reviewer}
                      onChange={(e) => handleFilterChange('reviewer', e.target.value)}
                      placeholder="Nhập tên đơn vị/người đánh giá"
                      className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b9000e]"
                    />
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <input
                      type="text"
                      value={filters.content}
                      onChange={(e) => handleFilterChange('content', e.target.value)}
                      placeholder="Nhập nội dung"
                      className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b9000e]"
                    />
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                      className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b9000e]"
                    />
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b9000e]"
                    >
                      <option value="">Tất cả</option>
                      <option value="5">5 sao</option>
                      <option value="4">4 sao</option>
                      <option value="3">3 sao</option>
                      <option value="2">2 sao</option>
                      <option value="1">1 sao</option>
                    </select>
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <button
                      onClick={handleClearFilters}
                      className="text-[14px] text-[#b9000e] hover:underline whitespace-nowrap font-medium"
                    >
                      Xóa bỏ lọc
                    </button>
                  </td>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                    <td className="px-[16px] py-[12px] text-center">
                      <CustomCheckbox
                        checked={selectedItems.includes(review.id)}
                        onChange={(checked) => handleSelectItem(review.id, checked)}
                      />
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {review.code}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {review.materialId}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      <div className="line-clamp-2">
                        {review.materialTitle}
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {review.reviewer}
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      <div className="line-clamp-2">
                        {review.reviewContent}
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827] text-center">
                      {new Date(review.createdDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <div className="flex justify-center">
                        <StarRating rating={review.rating} />
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <div className="flex items-center justify-center gap-[8px]">
                        <button
                          onClick={() => handleView(review.id)}
                          className="p-[6px] hover:bg-gray-100 rounded-[4px] transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} className="text-[#6b7280]" />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-[6px] hover:bg-gray-100 rounded-[4px] transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} className="text-[#6b7280]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TableFooter
            selectedCount={selectedItems.length}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={reviews.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteDocumentModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingReviewId(null);
        }}
        onConfirm={deletingReviewId ? confirmDelete : confirmDeleteSelected}
        documentName={
          deletingReviewId
            ? reviews.find(r => r.id === deletingReviewId)?.code || 'đánh giá'
            : `${selectedItems.length} đánh giá`
        }
      />
    </div>
  );
}
