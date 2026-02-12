import { useState } from 'react';
import { X, Upload, XCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
}

export function DataSourceModal() {
  const [formData, setFormData] = useState({
    documentCode: 'https://chatgpt.com/',
    documentName: 'https://chatgpt.com/',
    addedBy: 'Nguyễn Thị B',
    dateAdded: '21/10/2025',
    notes: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: '1', name: 'vlbn002-nhap-du-lieu-nguoi-su', type: 'excel' },
    { id: '2', name: 'vlbn002-nhap-du-lieu-nguoi-su', type: 'excel' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
          id: Date.now() + index + '',
          name: file.name,
          type: file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? 'excel' : 'other'
        }));
        setUploadedFiles(prev => [...prev, ...newFiles]);
      }
    };
    input.click();
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData, uploadedFiles);
    // Handle form submission
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Handle cancel action
  };

  return (
    <div className="bg-[rgba(0,0,0,0.2)] fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-[1112px] rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#b9000e] h-[60px] flex items-center justify-between px-[10px]">
          <p className="font-semibold text-[18px] text-white leading-[24px]">
            Thêm mới nguồn dữ liệu
          </p>
          <button
            onClick={handleCancel}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-[16px] flex flex-col gap-[16px]">
          {/* First Row: Document Code, Added By, Date Added */}
          <div className="flex gap-[16px]">
            <div className="flex-1 flex flex-col gap-[4px]">
              <label className="font-medium text-[14px] text-[#111827] leading-[20px]">
                Mã văn bản <span className="text-[#ff0004]">*</span>
              </label>
              <input
                type="text"
                value={formData.documentCode}
                onChange={(e) => handleInputChange('documentCode', e.target.value)}
                className="bg-white h-[36px] px-[12px] py-[8px] rounded-[8px] border border-[#c9cdd4] text-[14px] text-[#111827] leading-[20px] outline-none focus:border-[#b9000e]"
              />
            </div>

            <div className="flex-1 flex flex-col gap-[4px]">
              <label className="font-medium text-[14px] text-[#111827] leading-[20px]">
                Người thêm <span className="text-[#ff0004]">*</span>
              </label>
              <input
                type="text"
                value={formData.addedBy}
                disabled
                className="bg-[#efefef] h-[36px] px-[12px] py-[8px] rounded-[8px] border border-[#c9cdd4] text-[14px] text-[#111827] leading-[20px] cursor-not-allowed"
              />
            </div>

            <div className="flex-1 flex flex-col gap-[4px]">
              <label className="font-medium text-[14px] text-[#111827] leading-[20px]">
                Ngày thêm <span className="text-[#ff0004]">*</span>
              </label>
              <input
                type="text"
                value={formData.dateAdded}
                disabled
                className="bg-[#efefef] h-[36px] px-[12px] py-[8px] rounded-[8px] border border-[#c9cdd4] text-[14px] text-[#111827] leading-[20px] cursor-not-allowed"
              />
            </div>
          </div>

          {/* Second Row: Document Name, Notes */}
          <div className="flex gap-[16px]">
            <div className="flex-1 flex flex-col gap-[4px]">
              <label className="font-medium text-[14px] text-[#111827] leading-[20px]">
                Tên văn bản <span className="text-[#ff0004]">*</span>
              </label>
              <input
                type="text"
                value={formData.documentName}
                onChange={(e) => handleInputChange('documentName', e.target.value)}
                className="bg-white h-[36px] px-[12px] py-[8px] rounded-[8px] border border-[#c9cdd4] text-[14px] text-[#111827] leading-[20px] outline-none focus:border-[#b9000e]"
              />
            </div>

            <div className="flex-1 flex flex-col gap-[4px]">
              <label className="font-medium text-[14px] text-[#111827] leading-[20px]">
                Ghi chú
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Nhập ghi chú"
                className="bg-white h-[36px] px-[12px] py-[8px] rounded-[8px] border border-[#c9cdd4] text-[14px] text-[#111827] leading-[20px] outline-none focus:border-[#b9000e] placeholder:text-[#111827]"
              />
            </div>
          </div>

          {/* File Upload Button */}
          <button
            onClick={handleFileSelect}
            className="bg-[#b9000e] h-[35px] px-[13px] py-[9px] rounded-[3px] flex items-center gap-[7px] self-start hover:bg-[#9a000c] transition-colors"
          >
            <Upload size={14} className="text-white" />
            <span className="text-[14px] text-white font-medium">Chọn tệp tin</span>
          </button>

          {/* File Upload Area and Instructions */}
          <div className="flex gap-[12px]">
            {/* File Display Area */}
            <div className="flex-1 min-h-[260px] rounded-[4px] border border-dashed border-[#c7c7c7] p-[16px] flex gap-[12px] flex-wrap content-start">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="relative border border-[#bfbfbf] rounded-[8px] p-[12px] flex flex-col gap-[16px] items-center w-[210px]">
                  <div className="w-[40px] h-[40px] flex items-center justify-center">
                    <ExcelIcon />
                  </div>
                  <p className="text-[13px] text-[#414142] font-medium text-center break-all line-clamp-2 w-full">
                    {file.name}
                  </p>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="absolute top-[1.5px] right-[1.5px] text-[#FE1E1E] hover:opacity-80 transition-opacity"
                    aria-label="Remove file"
                  >
                    <XCircle size={15} fill="#FE1E1E" className="text-white" />
                  </button>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="border border-[#bdbdbd] rounded-[8px] p-[10px] w-[340px]">
              <div className="text-[14px] text-[#414142] font-medium space-y-2">
                <p>- Bạn có thể chọn nhiều định dạng file: .doc, .docx, .pdf, .xls, .xlsx, .jpg, .jpeg, .png, .gif.</p>
                <p>- Hỗ trợ dung lượng 1 file lên tới 10MB.</p>
                <p>- Bạn có thể chọn và tải 1 hoặc nhiều file trong 1 lần thao tác.</p>
                <p>- Bạn có thể thực hiện kéo thả 1 hoặc nhiều file từ máy tính cá nhân.</p>
                <p>- Bạn có thể xem nội dung các file sau khi tải lên bằng cách kích đúp vào file muốn xem.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white h-[60px] border-t border-[rgba(17,24,39,0.2)] flex items-center justify-end px-[10px] gap-[10px]">
          <button
            onClick={handleCancel}
            className="bg-white border border-[#d1d5db] rounded-[8px] px-[14px] py-[8px] flex items-center gap-[8px] hover:bg-gray-50 transition-colors"
          >
            <X size={18} className="text-[#111827]" />
            <span className="text-[14px] text-[#111827] font-medium leading-[20px]">Hủy bỏ</span>
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#b9000e] rounded-[8px] px-[10px] py-[8px] h-[36px] flex items-center gap-[10px] hover:bg-[#9a000c] transition-colors"
          >
            <PlusIcon />
            <span className="text-[14px] text-white font-medium leading-[20px]">Thêm mới</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ExcelIcon() {
  return (
    <div className="relative w-[40px] h-[40px]">
      <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="4" fill="#2E7D32" />
        <rect x="8" y="12" width="24" height="16" fill="#EBEEF0" />
        <path d="M14 16h4v2h-4v-2zm0 4h4v2h-4v-2z" fill="#388E3C" />
        <path d="M22 16h4v2h-4v-2zm0 4h4v2h-4v-2z" fill="#398E3D" />
        <text x="20" y="28" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">XLS</text>
      </svg>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 3.75C9.41421 3.75 9.75 4.08579 9.75 4.5V8.25H13.5C13.9142 8.25 14.25 8.58579 14.25 9C14.25 9.41421 13.9142 9.75 13.5 9.75H9.75V13.5C9.75 13.9142 9.41421 14.25 9 14.25C8.58579 14.25 8.25 13.9142 8.25 13.5V9.75H4.5C4.08579 9.75 3.75 9.41421 3.75 9C3.75 8.58579 4.08579 8.25 4.5 8.25H8.25V4.5C8.25 4.08579 8.58579 3.75 9 3.75Z" fill="white" />
    </svg>
  );
}
