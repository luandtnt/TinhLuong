import { ContentFormData, AudioFields } from '../../../../types/content';
import { LanguageCombobox } from '../../../common/LanguageCombobox';

interface AudioFieldsSectionProps {
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
}

export function AudioFieldsSection({ formData, onFormDataChange, errors }: AudioFieldsSectionProps) {
  const specific = (formData.specific as AudioFields) || {};

  const updateSpecific = (updates: Partial<AudioFields>) => {
    onFormDataChange({
      ...formData,
      specific: { ...specific, ...updates } as any,
    });
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
        Thông tin audio
      </h4>

      <div className="space-y-[16px]">
        {/* Người trình bày */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Người trình bày
          </label>
          <input
            type="text"
            value={specific.presenter || ''}
            onChange={(e) => updateSpecific({ presenter: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            placeholder="Nhập tên người trình bày"
          />
        </div>

        {/* Ngày phát hành + Đơn vị phát hành */}
        <div className="grid grid-cols-2 gap-[16px]">
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
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Đơn vị phát hành <span className="text-[#b9000e]">*</span>
            </label>
            <input
              type="text"
              value={specific.platform || ''}
              onChange={(e) => updateSpecific({ platform: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="VOV, Spotify..."
            />
            {errors.platform && (
              <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.platform}</p>
            )}
          </div>
        </div>

        {/* Tên chương trình + Số tập */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Tên chương trình
            </label>
            <input
              type="text"
              value={specific.programName || ''}
              onChange={(e) => updateSpecific({ programName: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên chương trình"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Số tập
            </label>
            <input
              type="text"
              value={specific.episodeNumber || ''}
              onChange={(e) => updateSpecific({ episodeNumber: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Tập 1"
            />
          </div>
        </div>

        {/* Chất lượng + Băng gỡ */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Chất lượng
            </label>
            <select
              value={specific.quality || ''}
              onChange={(e) => updateSpecific({ quality: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            >
              <option value="">Chọn chất lượng</option>
              <option value="128kbps">128 kbps</option>
              <option value="192kbps">192 kbps</option>
              <option value="256kbps">256 kbps</option>
              <option value="320kbps">320 kbps</option>
              <option value="Lossless">Lossless</option>
            </select>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Băng gỡ
            </label>
            <input
              type="text"
              value={specific.bandwidth || ''}
              onChange={(e) => updateSpecific({ bandwidth: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập băng gỡ"
            />
          </div>
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
