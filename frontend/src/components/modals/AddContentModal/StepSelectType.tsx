import { FileText, BookOpen, Headphones, Video, Image, Check } from 'lucide-react';
import { ContentType } from '../../../types/content';
import { Button } from '../../common/Button';

interface StepSelectTypeProps {
  selectedType: ContentType | null;
  onSelectType: (type: ContentType) => void;
  onCancel: () => void;
  onNext: () => void;
}

const contentTypes = [
  { type: 'VAN_BAN' as ContentType, label: 'Văn bản', icon: FileText },
  { type: 'SACH' as ContentType, label: 'Sách', icon: BookOpen },
  { type: 'AUDIO' as ContentType, label: 'Audio', icon: Headphones },
  { type: 'VIDEO' as ContentType, label: 'Video', icon: Video },
  { type: 'HINH_ANH' as ContentType, label: 'Hình ảnh', icon: Image },
];

export function StepSelectType({ selectedType, onSelectType, onCancel, onNext }: StepSelectTypeProps) {
  const handleKeyDown = (e: React.KeyboardEvent, type: ContentType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectType(type);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full py-[32px] px-[40px]">
          <div className="w-full max-w-[800px]">
            {/* Title and instruction */}
            <div className="text-center mb-[32px]">
              <h3 className="text-[18px] font-semibold text-[#111827] mb-[8px]">
                Chọn loại tài liệu
              </h3>
              <p className="text-[14px] text-[#6b7280]">
                Vui lòng chọn 01 loại để tiếp tục.
              </p>
            </div>
            
            {/* Grid 3 columns */}
            <div className="grid grid-cols-3 gap-[20px] max-w-[700px] mx-auto">
              {contentTypes.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => onSelectType(type)}
                  onKeyDown={(e) => handleKeyDown(e, type)}
                  tabIndex={0}
                  className={`
                    relative flex flex-col items-center justify-center
                    p-[24px] rounded-[8px] border-2 transition-all
                    cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:ring-offset-2
                    ${selectedType === type 
                      ? 'border-[#b9000e] bg-[#fff5f5] shadow-md' 
                      : 'border-[#d1d5db] bg-white hover:border-[#b9000e] hover:shadow-sm'
                    }
                  `}
                  aria-pressed={selectedType === type}
                  aria-label={`Chọn loại ${label}`}
                >
                  {/* Check icon when selected */}
                  {selectedType === type && (
                    <div className="absolute top-[8px] right-[8px] w-[20px] h-[20px] bg-[#b9000e] rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                  
                  <Icon 
                    size={48} 
                    className={`${selectedType === type ? 'text-[#b9000e]' : 'text-[#6b7280]'} transition-colors mb-[12px]`}
                    strokeWidth={1.5}
                  />
                  <span className={`
                    text-[15px] font-semibold text-center
                    ${selectedType === type ? 'text-[#b9000e]' : 'text-[#111827]'}
                  `}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e5e7eb] p-[20px] flex justify-end gap-[10px] flex-shrink-0">
        <Button
          onClick={onCancel}
          label="Hủy"
          variant="outline"
          size="md"
        />
        <button
          onClick={onNext}
          disabled={!selectedType}
          className={`
            px-[16px] py-[8px] rounded-[4px] text-[14px] font-medium transition-all
            ${selectedType
              ? 'bg-[#b9000e] text-white hover:bg-[#9a0000] cursor-pointer'
              : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed opacity-60'
            }
          `}
          aria-disabled={!selectedType}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
