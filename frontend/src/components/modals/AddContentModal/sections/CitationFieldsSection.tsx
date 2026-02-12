import { ContentFormData } from '../../../../types/content';

interface CitationFieldsSectionProps {
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
  citationPreview: string;
}

export function CitationFieldsSection({ formData, onFormDataChange, errors, citationPreview }: CitationFieldsSectionProps) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
        Thông tin trích dẫn
      </h4>

      <div className="space-y-[16px]">
        {/* Chuẩn trích dẫn */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Chuẩn trích dẫn <span className="text-[#b9000e]">*</span>
          </label>
          <div className="flex gap-[16px]">
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="radio"
                name="citationStyle"
                value="APA7"
                checked={formData.citation?.style === 'APA7'}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  citation: { ...formData.citation, style: 'APA7' } as any,
                })}
                className="w-[16px] h-[16px]"
              />
              <span className="text-[14px] text-[#111827]">APA 7</span>
            </label>
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="radio"
                name="citationStyle"
                value="HARVARD"
                checked={formData.citation?.style === 'HARVARD'}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  citation: { ...formData.citation, style: 'HARVARD' } as any,
                })}
                className="w-[16px] h-[16px]"
              />
              <span className="text-[14px] text-[#111827]">Harvard (Author–Date)</span>
            </label>
          </div>
          {errors.citationStyle && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.citationStyle}</p>
          )}
        </div>

        {/* Nguồn */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Nguồn
          </label>
          <div className="flex gap-[16px]">
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="radio"
                name="sourceType"
                value="NOI_BO"
                checked={formData.citation?.sourceType === 'NOI_BO'}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  citation: { ...formData.citation, sourceType: 'NOI_BO', url: undefined } as any,
                })}
                className="w-[16px] h-[16px]"
              />
              <span className="text-[14px] text-[#111827]">Nội bộ</span>
            </label>
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="radio"
                name="sourceType"
                value="TRUC_TUYEN"
                checked={formData.citation?.sourceType === 'TRUC_TUYEN'}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  citation: { ...formData.citation, sourceType: 'TRUC_TUYEN' } as any,
                })}
                className="w-[16px] h-[16px]"
              />
              <span className="text-[14px] text-[#111827]">Trực tuyến</span>
            </label>
          </div>
        </div>

        {/* URL (if online) */}
        {formData.citation?.sourceType === 'TRUC_TUYEN' && (
          <>
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Đường dẫn (URL) <span className="text-[#b9000e]">*</span>
              </label>
              <input
                type="url"
                value={formData.citation?.url || ''}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  citation: { ...formData.citation, url: e.target.value } as any,
                })}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
                placeholder="https://example.com"
              />
              {errors.citationUrl && (
                <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.citationUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Ngày truy cập
              </label>
              <input
                type="text"
                value={formData.citation?.accessDate || new Date().toLocaleDateString('vi-VN')}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  citation: { ...formData.citation, accessDate: e.target.value } as any,
                })}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-[#f9fafb]"
                readOnly
              />
            </div>
          </>
        )}

        {/* Citation Preview */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Dòng trích dẫn (tự tạo)
          </label>
          <p className="text-[12px] text-[#6b7280] mb-[8px]">
            Hệ thống sẽ tự tạo dòng trích dẫn khi bạn nhập đủ thông tin nguồn.
          </p>
          <div className="p-[12px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] text-[14px] text-[#111827] italic min-h-[60px]">
            {citationPreview}
          </div>
        </div>
      </div>
    </div>
  );
}
