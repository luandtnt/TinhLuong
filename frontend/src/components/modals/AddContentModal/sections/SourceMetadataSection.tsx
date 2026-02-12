import { ContentFormData, ContentType, SourceMetadata } from '../../../../types/content';
import { HelpCircle } from 'lucide-react';

interface SourceMetadataSectionProps {
  contentType: ContentType;
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
}

export function SourceMetadataSection({ contentType, formData, onFormDataChange, errors }: SourceMetadataSectionProps) {
  const sourceMetadata: Partial<SourceMetadata> = formData.sourceMetadata || {};

  const updateSourceMetadata = (updates: Partial<SourceMetadata>) => {
    onFormDataChange({
      ...formData,
      sourceMetadata: { ...sourceMetadata, ...updates } as SourceMetadata,
    });
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <div className="flex items-start gap-[8px] mb-[16px]">
        <h4 className="text-[16px] font-semibold text-[#111827]">
          Thông tin nguồn & xuất bản
        </h4>
        <div className="group relative">
          <HelpCircle size={16} className="text-[#6b7280] cursor-help" />
          <div className="absolute left-0 top-[24px] hidden group-hover:block z-10 w-[280px] p-[8px] bg-[#111827] text-white text-[12px] rounded-[4px] shadow-lg">
            Thông tin giúp xác định nguồn gốc và chuẩn hóa dữ liệu tài liệu.
          </div>
        </div>
      </div>

      <div className="space-y-[16px]">
        {/* Nguồn */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Nguồn <span className="text-[#b9000e]">*</span>
          </label>
          <select
            value={sourceMetadata.sourceType || ''}
            onChange={(e) => {
              const newSourceType = e.target.value as 'INTERNAL' | 'ONLINE';
              if (newSourceType === 'INTERNAL') {
                updateSourceMetadata({ 
                  sourceType: 'INTERNAL',
                  url: undefined,
                  accessedAt: undefined
                });
              } else {
                updateSourceMetadata({ 
                  sourceType: 'ONLINE',
                  accessedAt: new Date().toLocaleDateString('vi-VN'),
                  internalCode: undefined,
                  providerOrg: undefined
                });
              }
            }}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
          >
            <option value="">Chọn nguồn</option>
            <option value="INTERNAL">Nội bộ</option>
            <option value="ONLINE">Trực tuyến</option>
          </select>
          {errors.sourceType && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.sourceType}</p>
          )}
        </div>

        {/* Nếu Trực tuyến */}
        {sourceMetadata.sourceType === 'ONLINE' && (
          <>
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Đường dẫn <span className="text-[#b9000e]">*</span>
              </label>
              <input
                type="url"
                value={sourceMetadata.url || ''}
                onChange={(e) => updateSourceMetadata({ url: e.target.value })}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
                placeholder="https://example.com"
              />
              {errors.sourceUrl && (
                <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.sourceUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Ngày truy cập
              </label>
              <input
                type="text"
                value={sourceMetadata.accessedAt || new Date().toLocaleDateString('vi-VN')}
                onChange={(e) => updateSourceMetadata({ accessedAt: e.target.value })}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-[#f9fafb]"
                readOnly
              />
            </div>
          </>
        )}

        {/* Nếu Nội bộ */}
        {sourceMetadata.sourceType === 'INTERNAL' && (
          <>
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Mã lưu trữ nội bộ
              </label>
              <input
                type="text"
                value={sourceMetadata.internalCode || ''}
                onChange={(e) => updateSourceMetadata({ internalCode: e.target.value })}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
                placeholder="Nhập mã lưu trữ"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Đơn vị cung cấp
              </label>
              <input
                type="text"
                value={sourceMetadata.providerOrg || ''}
                onChange={(e) => updateSourceMetadata({ providerOrg: e.target.value })}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
                placeholder="Nhập tên đơn vị"
              />
            </div>
          </>
        )}

        {/* Bản quyền */}
        <div className="pt-[16px] border-t border-[#e5e7eb]">
          <h5 className="text-[14px] font-semibold text-[#111827] mb-[12px]">
            Bản quyền
          </h5>
          
          <div className="space-y-[16px]">
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Loại bản quyền
              </label>
              <select
                value={sourceMetadata.rights || ''}
                onChange={(e) => updateSourceMetadata({ rights: e.target.value as any })}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
              >
                <option value="">Chọn loại bản quyền</option>
                <option value="NOI_BO">Nội bộ</option>
                <option value="CONG_KHAI">Công khai</option>
                <option value="CC">Creative Commons</option>
                <option value="DUOC_PHEP_SU_DUNG">Được phép sử dụng</option>
                <option value="KHAC">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                Ghi chú bản quyền
              </label>
              <textarea
                value={sourceMetadata.rightsNote || ''}
                onChange={(e) => updateSourceMetadata({ rightsNote: e.target.value })}
                rows={2}
                className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
                placeholder="Ghi chú về bản quyền (nếu có)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
