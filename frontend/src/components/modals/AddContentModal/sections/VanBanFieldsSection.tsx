import React from 'react';
import { ContentFormData, VanBanFields } from '../../../../types/content';
import { LanguageCombobox } from '../../../common/LanguageCombobox';
import { X } from 'lucide-react';

interface VanBanFieldsSectionProps {
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
}

export function VanBanFieldsSection({ formData, onFormDataChange, errors }: VanBanFieldsSectionProps) {
  const specific = (formData.specific as VanBanFields) || {};
  const [authorInput, setAuthorInput] = React.useState('');

  const updateSpecific = (updates: Partial<VanBanFields>) => {
    onFormDataChange({
      ...formData,
      specific: { ...specific, ...updates } as any,
    });
  };

  const handleAddAuthor = () => {
    if (authorInput.trim()) {
      const authors = [...(formData.common?.authors || []), authorInput.trim()];
      onFormDataChange({
        ...formData,
        common: { ...formData.common, authors } as any,
      });
      setAuthorInput('');
    }
  };

  const handleRemoveAuthor = (index: number) => {
    const authors = formData.common?.authors?.filter((_, i) => i !== index) || [];
    onFormDataChange({
      ...formData,
      common: { ...formData.common, authors } as any,
    });
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
        Thông tin văn bản
      </h4>

      <div className="space-y-[16px]">
        {/* Loại văn bản */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Loại văn bản <span className="text-[#b9000e]">*</span>
          </label>
          <select
            value={specific.documentType || ''}
            onChange={(e) => updateSpecific({ documentType: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
          >
            <option value="">Chọn loại văn bản</option>
            <option value="Nghị quyết">Nghị quyết</option>
            <option value="Chỉ thị">Chỉ thị</option>
            <option value="Kết luận">Kết luận</option>
            <option value="Hướng dẫn">Hướng dẫn</option>
            <option value="Báo cáo">Báo cáo</option>
            <option value="Bài viết">Bài viết</option>
            <option value="Khác">Khác</option>
          </select>
          {errors.documentType && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.documentType}</p>
          )}
        </div>

        {/* Ngày ban hành */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Ngày ban hành <span className="text-[#b9000e]">*</span>
          </label>
          <input
            type="date"
            value={specific.issueDate || ''}
            onChange={(e) => updateSpecific({ issueDate: e.target.value, issueYear: e.target.value.split('-')[0] })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
          />
          {errors.issueDate && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.issueDate}</p>
          )}
        </div>

        {/* Số hiệu/Ký hiệu */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Số hiệu/Ký hiệu
          </label>
          <input
            type="text"
            value={specific.documentNumber || ''}
            onChange={(e) => updateSpecific({ documentNumber: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
            placeholder="Số 01/NQ-TW"
          />
        </div>

        {/* Cơ quan ban hành */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Cơ quan ban hành
          </label>
          <input
            type="text"
            value={specific.issuer || formData.common?.organization || ''}
            onChange={(e) => updateSpecific({ issuer: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
            placeholder="Ban Chấp hành Trung ương"
          />
        </div>

        {/* Nơi ban hành */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Nơi ban hành
          </label>
          <input
            type="text"
            value={specific.issueLocation || ''}
            onChange={(e) => updateSpecific({ issueLocation: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
            placeholder="Hà Nội"
          />
        </div>

        {/* Tình trạng hiệu lực */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Tình trạng hiệu lực
          </label>
          <select
            value={specific.effectiveStatus || 'CON_HIEU_LUC'}
            onChange={(e) => updateSpecific({ effectiveStatus: e.target.value as any })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
          >
            <option value="CON_HIEU_LUC">Còn hiệu lực</option>
            <option value="DA_THAY_THE">Đã thay thế</option>
            <option value="BAI_BO">Bãi bỏ</option>
          </select>
        </div>

        {/* Văn bản liên quan */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Văn bản liên quan
          </label>
          <textarea
            value={specific.relatedDocuments || ''}
            onChange={(e) => updateSpecific({ relatedDocuments: e.target.value })}
            rows={2}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
            placeholder="Mã hoặc tên các văn bản liên quan"
          />
        </div>

        {/* Tác giả */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Tác giả <span className="text-[#b9000e]">*</span>
          </label>
          <div className="flex gap-[8px] mb-[8px]">
            <input
              type="text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddAuthor()}
              className="flex-1 px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên tác giả hoặc cơ quan"
            />
            <button
              onClick={handleAddAuthor}
              type="button"
              className="px-[16px] py-[8px] bg-[#b9000e] text-white rounded-[4px] text-[14px] hover:bg-[#9a0000]"
            >
              Thêm
            </button>
          </div>
          {formData.common?.authors && formData.common.authors.length > 0 && (
            <div className="flex flex-wrap gap-[8px]">
              {formData.common.authors.map((author, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-[6px] px-[10px] py-[4px] bg-[#f3f4f6] rounded-[4px]"
                >
                  <span className="text-[14px] text-[#111827]">{author}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAuthor(index)}
                    className="text-[#6b7280] hover:text-[#b91c1c]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.authors && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.authors}</p>
          )}
        </div>

        {/* Ngôn ngữ */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Ngôn ngữ
          </label>
          <LanguageCombobox
            value={formData.common?.language || 'Tiếng Việt'}
            onChange={(value) => onFormDataChange({
              ...formData,
              common: { ...formData.common, language: value } as any,
            })}
          />
        </div>
      </div>
    </div>
  );
}
