import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface MultiLanguageComboboxProps {
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

const languages = [
  'Tiếng Việt',
  'English',
  'Français',
  'Deutsch',
  'Español',
  'Italiano',
  'Português',
  'Русский',
  '中文',
  '日本語',
  '한국어',
  'العربية',
  'हिन्दी',
  'ไทย',
  'Bahasa Indonesia',
  'Bahasa Melayu',
];

export function MultiLanguageCombobox({ values, onChange, className = '' }: MultiLanguageComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLanguages = languages.filter(lang =>
    lang.toLowerCase().includes(searchTerm.toLowerCase()) && !values.includes(lang)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (language: string) => {
    if (!values.includes(language)) {
      onChange([...values, language]);
    }
    setSearchTerm('');
  };

  const handleRemove = (language: string) => {
    onChange(values.filter(v => v !== language));
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Selected Languages */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mb-[8px]">
          {values.map((language) => (
            <div
              key={language}
              className="inline-flex items-center gap-[6px] px-[10px] py-[4px] bg-[#f3f4f6] rounded-[4px]"
            >
              <span className="text-[14px] text-[#111827]">{language}</span>
              <button
                type="button"
                onClick={() => handleRemove(language)}
                className="text-[#6b7280] hover:text-[#b91c1c]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
      >
        <span className="text-[#6b7280]">
          {values.length === 0 ? 'Chọn ngôn ngữ' : `Đã chọn ${values.length} ngôn ngữ`}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#6b7280] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-[4px] bg-white border border-[#e5e7eb] rounded-[4px] shadow-lg max-h-[300px] overflow-hidden">
          {/* Search Input */}
          <div className="p-[8px] border-b border-[#e5e7eb]">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm ngôn ngữ..."
              className="w-full px-[8px] py-[6px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            />
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-[240px]">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => handleSelect(language)}
                  className="w-full px-[12px] py-[8px] text-left text-[14px] hover:bg-[#f9fafb] transition-colors text-[#111827]"
                >
                  {language}
                </button>
              ))
            ) : (
              <div className="px-[12px] py-[8px] text-[14px] text-[#6b7280] text-center">
                {searchTerm ? 'Không tìm thấy ngôn ngữ' : 'Đã chọn tất cả'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
