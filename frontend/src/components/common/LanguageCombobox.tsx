import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface LanguageComboboxProps {
  value: string;
  onChange: (value: string) => void;
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

export function LanguageCombobox({ value, onChange, className = '' }: LanguageComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLanguages = languages.filter(lang =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
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
    onChange(language);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredLanguages.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredLanguages.length) {
          handleSelect(filteredLanguages[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
      >
        <span className="text-[#111827]">{value || 'Chọn ngôn ngữ'}</span>
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Tìm kiếm ngôn ngữ..."
              className="w-full px-[8px] py-[6px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:border-transparent"
            />
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-[240px]">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language, index) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => handleSelect(language)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full px-[12px] py-[8px] text-left text-[14px] flex items-center justify-between transition-colors ${
                    highlightedIndex === index
                      ? 'bg-[#f3f4f6]'
                      : 'hover:bg-[#f9fafb]'
                  } ${value === language ? 'bg-[#fff5f5]' : ''}`}
                >
                  <span className={value === language ? 'text-[#b9000e] font-medium' : 'text-[#111827]'}>
                    {language}
                  </span>
                  {value === language && (
                    <Check size={16} className="text-[#b9000e]" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-[12px] py-[8px] text-[14px] text-[#6b7280] text-center">
                Không tìm thấy ngôn ngữ
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
