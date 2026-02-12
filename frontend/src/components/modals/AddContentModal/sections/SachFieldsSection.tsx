import React from 'react';
import { ContentFormData, SachFields } from '../../../../types/content';
import { LanguageCombobox } from '../../../common/LanguageCombobox';
import { MultiLanguageCombobox } from '../../../common/MultiLanguageCombobox';
import { X } from 'lucide-react';

interface SachFieldsSectionProps {
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  errors: Record<string, string>;
}

export function SachFieldsSection({ formData, onFormDataChange, errors }: SachFieldsSectionProps) {
  const specific = (formData.specific as SachFields) || {};
  const [authorInput, setAuthorInput] = React.useState('');

  const updateSpecific = (updates: Partial<SachFields>) => {
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
        Thông tin sách
      </h4>

      <div className="space-y-[16px]">
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
              placeholder="Nhập tên tác giả"
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

        {/* Chủ biên + Năm sáng tác + Năm xuất bản */}
        <div className="grid grid-cols-3 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Chủ biên
            </label>
            <input
              type="text"
              value={specific.chiefEditor || ''}
              onChange={(e) => updateSpecific({ chiefEditor: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên chủ biên"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Năm sáng tác
            </label>
            <input
              type="number"
              value={specific.compositionYear || ''}
              onChange={(e) => updateSpecific({ compositionYear: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="2024"
              min="1900"
              max="2100"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Năm xuất bản <span className="text-[#b9000e]">*</span>
            </label>
            <input
              type="number"
              value={specific.publishYear || ''}
              onChange={(e) => updateSpecific({ publishYear: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="2025"
              min="1900"
              max="2100"
            />
            {errors.publishYear && (
              <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.publishYear}</p>
            )}
          </div>
        </div>

        {/* Nhà xuất bản + Nơi xuất bản */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Nhà xuất bản <span className="text-[#b9000e]">*</span>
            </label>
            <input
              type="text"
              value={specific.publisher || ''}
              onChange={(e) => updateSpecific({ publisher: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="NXB Chính trị Quốc gia"
            />
            {errors.publisher && (
              <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.publisher}</p>
            )}
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Nơi xuất bản
            </label>
            <input
              type="text"
              value={specific.publishLocation || ''}
              onChange={(e) => updateSpecific({ publishLocation: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Hà Nội"
            />
          </div>
        </div>

        {/* Lần tái bản + Ấn bản + Mã số ISBN */}
        <div className="grid grid-cols-3 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Lần tái bản
            </label>
            <input
              type="text"
              value={specific.reprintEdition || ''}
              onChange={(e) => updateSpecific({ reprintEdition: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Lần 1"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Ấn bản
            </label>
            <input
              type="text"
              value={specific.edition || ''}
              onChange={(e) => updateSpecific({ edition: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Lần thứ 2"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Mã số ISBN
            </label>
            <input
              type="text"
              value={specific.isbn || ''}
              onChange={(e) => updateSpecific({ isbn: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="978-604-0-00000-0"
            />
            {errors.isbn && (
              <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.isbn}</p>
            )}
          </div>
        </div>

        {/* Ngôn ngữ phát hành */}
        <div>
          <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
            Ngôn ngữ phát hành
          </label>
          <LanguageCombobox
            value={formData.common?.language || 'Tiếng Việt'}
            onChange={(value) => onFormDataChange({
              ...formData,
              common: { ...formData.common, language: value } as any,
            })}
          />
        </div>

        {/* Người dịch + Ngôn ngữ được phiên dịch */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Người dịch
            </label>
            <input
              type="text"
              value={specific.translator || ''}
              onChange={(e) => updateSpecific({ translator: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên người dịch"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Ngôn ngữ được phiên dịch
            </label>
            <MultiLanguageCombobox
              values={specific.translatedLanguages || []}
              onChange={(values) => updateSpecific({ translatedLanguages: values })}
            />
          </div>
        </div>

        {/* Biên tập viên + Bộ phận biên tập */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Biên tập viên
            </label>
            <input
              type="text"
              value={specific.editor || ''}
              onChange={(e) => updateSpecific({ editor: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên biên tập viên"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
              Bộ phận biên tập
            </label>
            <input
              type="text"
              value={specific.editorialDepartment || ''}
              onChange={(e) => updateSpecific({ editorialDepartment: e.target.value })}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
              placeholder="Nhập tên bộ phận"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
