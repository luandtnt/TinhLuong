import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Send } from 'lucide-react';
import { Review } from '../../types/review';
import { getReviewById } from '../../data/mockReviews';
import { Button } from '../../components/common/Button';
import { StarRating } from '../../components/common/StarRating';
import { DeleteReviewButton } from '../../components/common/DeleteReviewButton';
import { DeleteDocumentModal } from '../../components/modals';

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <label className="text-[14px] font-medium text-[#111827]">
        {label}
      </label>
      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[12px] py-[8px] text-[14px] text-[#111827]">
        {value || '-'}
      </div>
    </div>
  );
}

export function ReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (id) {
      const foundReview = getReviewById(id);
      setReview(foundReview || null);
    }
  }, [id]);

  const handleBack = () => {
    navigate('/dashboard/reviews');
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    navigate('/dashboard/reviews');
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      alert('Vui lòng nhập nội dung trả lời');
      return;
    }
    // In real app, call API to submit reply
    alert('Đã gửi trả lời thành công!');
    setReplyText('');
  };

  const getRatingLabel = (rating: number) => {
    if (rating === 5) return 'Xuất sắc';
    if (rating === 4) return 'Tốt';
    if (rating === 3) return 'Trung bình';
    if (rating === 2) return 'Kém';
    return 'Rất kém';
  };

  if (!review) {
    return (
      <div className="bg-[#f5f5f5] flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[16px] text-[#6b7280] mb-[16px]">
            Không tìm thấy đánh giá
          </p>
          <Button onClick={handleBack} label="Quay lại" variant="outline" size="md" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto">
      <div className="p-[16px]">
        {/* Header */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] flex items-center justify-between gap-[10px] flex-wrap border border-[#e5e7eb]">
          <div className="flex items-center gap-[12px]">
            <button
              onClick={handleBack}
              className="p-[8px] hover:bg-gray-100 rounded-[4px] transition-colors"
            >
              <ArrowLeft size={20} className="text-[#6b7280]" />
            </button>
            <h1 className="text-[18px] font-semibold text-[#111827]">
              Chi tiết đánh giá
            </h1>
          </div>
          <DeleteReviewButton onClick={handleDelete} />
        </div>

        {/* Content */}
        <div className="max-w-[950px] mx-auto space-y-[16px]">
          {/* Điểm đánh giá */}
          <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
            <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
              Điểm đánh giá
            </h4>
            <div className="flex items-center gap-[24px]">
              <div className="flex flex-col items-center">
                <div className="text-[40px] font-bold text-[#b9000e] leading-none">
                  {review.rating.toFixed(1)}
                </div>
                <div className="text-[12px] text-[#6b7280] mt-[4px]">
                  trên 5
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-[8px]">
                  <StarRating rating={review.rating} size={24} />
                </div>
                <p className="text-[14px] text-[#6b7280]">
                  {getRatingLabel(review.rating)}
                </p>
              </div>
            </div>
          </div>

          {/* Nội dung bình luận */}
          <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
            <h4 className="text-[16px] font-semibold text-[#111827] mb-[12px]">
              Nội dung bình luận
            </h4>
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[12px] py-[8px] text-[14px] text-[#111827] min-h-[80px]">
              {review.reviewContent}
            </div>
          </div>

          {/* Người đánh giá */}
          <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
            <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
              Người đánh giá
            </h4>
            <div className="grid grid-cols-3 gap-[16px]">
              <ReadOnlyField 
                label="Họ và tên" 
                value={review.reviewer} 
              />
              <ReadOnlyField 
                label="Vai trò" 
                value="Người đánh giá" 
              />
              <ReadOnlyField 
                label="Ngày đánh giá" 
                value={new Date(review.createdDate).toLocaleDateString('vi-VN')} 
              />
            </div>
          </div>

          {/* Tài liệu */}
          <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
            <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
              Tài liệu
            </h4>
            <div className="grid grid-cols-2 gap-[16px]">
              <ReadOnlyField 
                label="Mã tài liệu" 
                value={review.materialId} 
              />
              <ReadOnlyField 
                label="Tên tài liệu" 
                value={review.materialTitle} 
              />
            </div>
          </div>

          {/* Trả lời bình luận */}
          <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
            <h4 className="text-[16px] font-semibold text-[#111827] mb-[12px]">
              Trả lời bình luận
            </h4>
            <div className="space-y-[12px]">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập nội dung trả lời..."
                className="w-full min-h-[120px] px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] text-[#111827] resize-vertical focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleReplySubmit}
                  icon={<Send size={18} />}
                  label="Gửi trả lời"
                  variant="primary"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteDocumentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        documentName={review.code}
      />
    </div>
  );
}
