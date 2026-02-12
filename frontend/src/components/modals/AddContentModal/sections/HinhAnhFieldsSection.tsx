import { ContentFormData, HinhAnhFields } from '../../../../types/content';

interface HinhAnhFieldsSectionProps {
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
}

export function HinhAnhFieldsSection({ formData, onFormDataChange, errors }: HinhAnhFieldsSectionProps) {
  const specific = (formData.specific as HinhAnhFields) || {};

  const updateSpecific = (updates: Partial<HinhAnhFields>) => {
    onFormDataChange({
      ...formData,
      specific: { ...specific, ...updates } as any,
    });
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
        Thông tin hình ảnh
      </h4>

      <div className="space-y-[16px]">
        {/* Tác giả ảnh */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Tác giả ảnh
          </label>
          <input
            type="text"
            value={specific.photographer || ''}
            onChange={(e) => updateSpecific({ photographer: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            placeholder="Nhập tên tác giả ảnh"
          />
        </div>

        {/* Thời gian chụp + Địa điểm */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Thời gian chụp
            </label>
            <input
              type="date"
              value={specific.captureDate || ''}
              onChange={(e) => updateSpecific({ captureDate: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Địa điểm
            </label>
            <input
              type="text"
              value={specific.location || ''}
              onChange={(e) => updateSpecific({ location: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập địa điểm chụp"
            />
          </div>
        </div>

        {/* Loại hình ảnh */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Loại hình ảnh
          </label>
          <select
            value={specific.imageType || ''}
            onChange={(e) => updateSpecific({ imageType: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
          >
            <option value="">Chọn loại hình ảnh</option>
            <option value="Ảnh chụp">Ảnh chụp</option>
            <option value="Infographic">Infographic</option>
            <option value="Sơ đồ">Sơ đồ</option>
            <option value="Bản đồ">Bản đồ</option>
            <option value="Ảnh scan">Ảnh scan</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        {/* Chú thích ảnh */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Chú thích ảnh
          </label>
          <textarea
            value={specific.caption || ''}
            onChange={(e) => updateSpecific({ caption: e.target.value })}
            rows={2}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent resize-vertical"
            placeholder="Mô tả ngắn gọn về hình ảnh"
          />
        </div>

        {/* Tên bộ sưu tập */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Tên bộ sưu tập
          </label>
          <input
            type="text"
            value={specific.collection || ''}
            onChange={(e) => updateSpecific({ collection: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            placeholder="Nhập tên bộ sưu tập"
          />
        </div>
      </div>
    </div>
  );
}
