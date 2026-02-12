import { ContentFormData, VideoFields } from '../../../../types/content';
import { LanguageCombobox } from '../../../common/LanguageCombobox';

interface VideoFieldsSectionProps {
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
}

export function VideoFieldsSection({ formData, onFormDataChange, errors }: VideoFieldsSectionProps) {
  const specific = (formData.specific as VideoFields) || {};

  const updateSpecific = (updates: Partial<VideoFields>) => {
    onFormDataChange({
      ...formData,
      specific: { ...specific, ...updates } as any,
    });
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
        Thông tin video
      </h4>

      <div className="space-y-[16px]">
        {/* Ngày phát hành */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Ngày phát hành <span className="text-[#b9000e]">*</span>
          </label>
          <input
            type="date"
            value={specific.releaseDate || ''}
            onChange={(e) => updateSpecific({ releaseDate: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
          />
          {errors.releaseDate && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.releaseDate}</p>
          )}
        </div>

        {/* Đạo diễn + Hãng sản xuất */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Đạo diễn
            </label>
            <input
              type="text"
              value={specific.director || ''}
              onChange={(e) => updateSpecific({ director: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên đạo diễn"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Hãng sản xuất
            </label>
            <input
              type="text"
              value={specific.productionCompany || ''}
              onChange={(e) => updateSpecific({ productionCompany: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên hãng sản xuất"
            />
          </div>
        </div>

        {/* Nền tảng + Tên kênh */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Nền tảng <span className="text-[#b9000e]">*</span>
            </label>
            <input
              type="text"
              value={specific.platform || ''}
              onChange={(e) => updateSpecific({ platform: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="YouTube, VTV..."
            />
            {errors.platform && (
              <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.platform}</p>
            )}
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Tên kênh
            </label>
            <input
              type="text"
              value={specific.channelName || ''}
              onChange={(e) => updateSpecific({ channelName: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên kênh"
            />
          </div>
        </div>

        {/* Định dạng hình ảnh */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Định dạng hình ảnh
          </label>
          <select
            value={specific.videoFormat || ''}
            onChange={(e) => updateSpecific({ videoFormat: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
          >
            <option value="">Chọn định dạng</option>
            <option value="720p">720p (HD)</option>
            <option value="1080p">1080p (Full HD)</option>
            <option value="1440p">1440p (2K)</option>
            <option value="2160p">2160p (4K)</option>
            <option value="4320p">4320p (8K)</option>
          </select>
        </div>

        {/* Sự kiện + Địa điểm */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Sự kiện
            </label>
            <input
              type="text"
              value={specific.eventName || ''}
              onChange={(e) => updateSpecific({ eventName: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên sự kiện"
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
              placeholder="Nhập địa điểm"
            />
          </div>
        </div>

        {/* Kịch bản */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Kịch bản
          </label>
          <textarea
            value={specific.screenplay || ''}
            onChange={(e) => updateSpecific({ screenplay: e.target.value })}
            rows={3}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent resize-vertical"
            placeholder="Nhập thông tin kịch bản"
          />
        </div>

        {/* Ngôn ngữ */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Ngôn ngữ
          </label>
          <LanguageCombobox
            value={specific.language || formData.common?.language || 'Tiếng Việt'}
            onChange={(value) => updateSpecific({ language: value })}
          />
        </div>
      </div>
    </div>
  );
}
