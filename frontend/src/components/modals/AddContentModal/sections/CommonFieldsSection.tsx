import React from 'react';
import { ContentFormData } from '../../../../types/content';

interface CommonFieldsSectionProps {
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
}

export function CommonFieldsSection({ formData, onFormDataChange, errors }: CommonFieldsSectionProps) {
  const [authorInput, setAuthorInput] = React.useState('');
  
  // Mock data for user and organization
  const currentUser = 'Nguyễn Văn A';
  const currentOrganization = 'Ban Tuyên giáo Tỉnh ủy';
  const currentDate = new Date().toLocaleDateString('vi-VN');

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
        Thông tin chung
      </h4>

      <div className="space-y-[16px]">
        {/* Mã nội dung */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Mã nội dung <span className="text-[#b9000e]">*</span>
          </label>
          <input
            type="text"
            value={formData.common?.code || ''}
            onChange={(e) => onFormDataChange({
              ...formData,
              common: { ...formData.common, code: e.target.value } as any,
            })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            placeholder="VB-20250130-0001"
          />
          {errors.code && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.code}</p>
          )}
        </div>

        {/* Tên nội dung */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Tên nội dung <span className="text-[#b9000e]">*</span>
          </label>
          <input
            type="text"
            value={formData.common?.title || ''}
            onChange={(e) => onFormDataChange({
              ...formData,
              common: { ...formData.common, title: e.target.value } as any,
            })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            placeholder="Nhập tên nội dung"
          />
          {errors.title && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.title}</p>
          )}
        </div>

        {/* Độ mật */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Độ mật <span className="text-[#b9000e]">*</span>
          </label>
          <select
            value={formData.common?.classification || ''}
            onChange={(e) => onFormDataChange({
              ...formData,
              common: { ...formData.common, classification: e.target.value } as any,
            })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
          >
            <option value="">Chọn độ mật</option>
            <option value="CONG_KHAI">Công khai</option>
            <option value="NOI_BO">Nội bộ</option>
            <option value="MAT">Mật</option>
            <option value="TOI_MAT">Tối mật</option>
          </select>
          {errors.classification && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.classification}</p>
          )}
        </div>

        {/* Trạng thái - Disabled, default "Nháp" */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Trạng thái
          </label>
          <input
            type="text"
            value="Nháp"
            disabled
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-[#f9fafb] text-[#6b7280] cursor-not-allowed"
          />
        </div>

        {/* Đơn vị người tải lên - Disabled, auto-filled */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Đơn vị người tải lên
          </label>
          <input
            type="text"
            value={currentOrganization}
            disabled
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-[#f9fafb] text-[#6b7280] cursor-not-allowed"
          />
        </div>

        {/* Người tải lên - Disabled, auto-filled */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Người tải lên
          </label>
          <input
            type="text"
            value={currentUser}
            disabled
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-[#f9fafb] text-[#6b7280] cursor-not-allowed"
          />
        </div>

        {/* Ngày tải lên - Disabled, current date */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Ngày tải lên
          </label>
          <input
            type="text"
            value={currentDate}
            disabled
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-[#f9fafb] text-[#6b7280] cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
