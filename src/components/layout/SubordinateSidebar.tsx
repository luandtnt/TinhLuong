import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { FileText } from 'lucide-react';

interface SubordinateSidebarProps {
  onClose?: () => void;
}

const IconDocument = () => (
  <div className="relative shrink-0 size-[18px]">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 3.75C3 3.33579 3.33579 3 3.75 3H14.25C14.6642 3 15 3.33579 15 3.75V14.25C15 14.6642 14.6642 15 14.25 15H3.75C3.33579 15 3 14.6642 3 14.25V3.75ZM4.5 4.5V13.5H13.5V4.5H4.5Z" fill="#111827"/>
    </svg>
  </div>
);

const IconArrowDown = ({ isOpen }: { isOpen: boolean }) => (
  <div className="flex items-center justify-center relative shrink-0">
    <div className={`transition-transform ${isOpen ? '' : '-scale-y-100'}`}>
      <svg className="block size-[18px]" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.71967 6.96967C5.01256 6.67678 5.48744 6.67678 5.78033 6.96967L9 10.1893L12.2197 6.96967C12.5126 6.67678 12.9874 6.67678 13.2803 6.96967C13.5732 7.26256 13.5732 7.73744 13.2803 8.03033L9.53033 11.7803C9.23744 12.0732 8.76256 12.0732 8.46967 11.7803L4.71967 8.03033C4.42678 7.73744 4.42678 7.26256 4.71967 6.96967Z" fill="#111827"/>
      </svg>
    </div>
  </div>
);

export function SubordinateSidebar({ onClose }: SubordinateSidebarProps) {
  const location = useLocation();
  const [isDocumentManagementOpen, setIsDocumentManagementOpen] = useState(true);

  const documentLinks = [
    { path: '/dashboard/historical-documents', label: 'Tài liệu Lịch sử Đảng' },
    { path: '/dashboard/party-term-documents', label: 'Tài liệu Đảng kỳ' },
    { path: '/dashboard/party-charter-documents', label: 'Tài liệu Điều lệ Đảng' },
    { path: '/dashboard/political-books', label: 'Sách chính trị' },
    { path: '/dashboard/party-documents-complete', label: 'Văn kiện Đảng toàn tập' },
    { path: '/dashboard/party-documents-intro', label: 'Giới thiệu văn kiện Đảng' },
    { path: '/dashboard/party-congress', label: 'Văn kiện Đại hội Đảng' },
    { path: '/dashboard/central-committee-meeting', label: 'Hội nghị BCH Trung ương' },
  ];

  const menuSections = [
    { label: 'TRA CỨU', path: '#' },
    { label: 'SOẠN THẢO VĂN BẢN', path: '#' },
    { label: 'TÓM TẮT VĂN BẢN', path: '#' },
    { label: 'PHÂN TÍCH, DỰ BÁO', path: '#' },
    { label: 'THEO DÕI DƯ LUẬN', path: '#' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/dashboard/historical-documents' && location.pathname === '/dashboard');
  };

  return (
    <aside className="w-[280px] h-full bg-white border-r border-[#e5e7eb] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white content-stretch flex flex-col gap-[10px] items-center py-[10px] relative size-full">
          {/* QUẢN LÝ TÀI LIỆU Section */}
          <div className="relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
              <button
                onClick={() => setIsDocumentManagementOpen(!isDocumentManagementOpen)}
                className="h-[46px] relative rounded-[8px] shrink-0 w-full hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[6px] items-center px-[10px] py-[12px] relative size-full">
                    <IconDocument />
                    <p className="flex-[1_0_0] font-['Inter',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">QUẢN LÝ TÀI LIỆU</p>
                    <IconArrowDown isOpen={isDocumentManagementOpen} />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Document Links */}
          {isDocumentManagementOpen && (
            <>
              {documentLinks.map((link) => (
                <div key={link.path} className="relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
                    <Link
                      to={link.path}
                      className={`relative rounded-[8px] shrink-0 w-full transition-colors ${
                        isActive(link.path) ? 'bg-[#b9000e]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex items-center px-[40px] py-[12px] relative w-full">
                          <div className={`flex flex-col font-['Inter',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] ${
                            isActive(link.path) ? 'text-white' : 'text-[#111827]'
                          }`}>
                            <p className="leading-[20px] whitespace-pre-wrap">{link.label}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Other Menu Sections */}
          {menuSections.map((section, index) => (
            <div key={index} className="relative shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
                {section.path === '#' ? (
                  <button className="h-[46px] relative rounded-[8px] shrink-0 w-full hover:bg-gray-50 transition-colors">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[6px] items-center px-[10px] py-[12px] relative size-full">
                        <IconDocument />
                        <p className="flex-[1_0_0] font-['Inter',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">{section.label}</p>
                      </div>
                    </div>
                  </button>
                ) : (
                  <Link
                    to={section.path}
                    className={`h-[46px] relative rounded-[8px] shrink-0 w-full transition-colors ${
                      isActive(section.path) ? 'bg-[#b9000e]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[6px] items-center px-[10px] py-[12px] relative size-full">
                        <IconDocument />
                        <p className={`flex-[1_0_0] font-['Inter',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[14px] whitespace-pre-wrap ${
                          isActive(section.path) ? 'text-white' : 'text-[#111827]'
                        }`}>{section.label}</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
