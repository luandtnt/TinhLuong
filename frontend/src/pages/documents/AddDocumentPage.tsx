import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X, Upload } from 'lucide-react';
import { FormField } from '../../components/common/FormField';
import imgExcel from 'figma:asset/db11df3f5392b60548bb6c766aca52ccaf4405cb.png';
import svgPaths from '../../legacy-figma/svg-plyngvb3lg';

// Icon Components
function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g clipPath="url(#clip0_1_6481)">
        <path d={svgPaths.p4b48000} fill="#374151" />
      </g>
      <defs>
        <clipPath id="clip0_1_6481">
          <rect fill="white" height="18" width="18" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d={svgPaths.p3d2a5200} fill="#B9000E" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d={svgPaths.p748e500} fill="white" />
    </svg>
  );
}

export function AddDocumentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    type: '',
    classification: '',
    status: 'Nháp',
    author: '',
    editor: '',
    publicationYear: '',
    publishingYear: '',
    publisher: '',
    publishingLocation: '',
    edition: '',
    releaseLanguage: '',
    translator: '',
    translatedLanguage: '',
    documentSize: '',
    hiddenCopy: '',
    actualPages: '',
    editorialStaff: '',
    editorialDepartment: '',
    uploaderUnit: 'Chọ Phòng Tổ chức - Đảng ủy Khối Doanh nghiệp',
    uploader: 'Nguyễn Thị B',
    uploadDate: '2026-01-30',
    summary: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['code', 'title', 'type', 'classification', 'author', 'summary'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
      return;
    }

    alert('Thêm mới tài liệu thành công!');
    navigate('/dashboard');
  };

  const handleSubmitToSuperior = () => {
    // Validate required fields
    const requiredFields = ['code', 'title', 'type', 'classification', 'author', 'summary'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
      return;
    }

    alert('Nộp cấp trên thành công!');
    navigate('/dashboard');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#b9000e] h-[60px] flex items-center justify-between px-[10px]">
        <p className="font-semibold text-[18px] text-white leading-[24px]">
          Thêm mới tài liệu về Lịch sử Đảng
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-[32px] h-[32px] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      {/* Form Content */}
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[8px] shadow-sm p-4 md:p-6">
          <div className="flex flex-col gap-[16px]">
            {/* Row 1: Mã tài liệu, Tên tài liệu, Loại tài liệu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Mã tài liệu"
                required
                placeholder="Nhập mã tài liệu"
                value={formData.code}
                onChange={(val) => updateField('code', val)}
              />
              <FormField
                label="Tên tài liệu"
                required
                placeholder="Nhập tên tài liệu"
                value={formData.title}
                onChange={(val) => updateField('title', val)}
              />
              <FormField
                label="Loại tài liệu"
                required
                type="select"
                placeholder="Chọn loại tài liệu"
                value={formData.type}
                onChange={(val) => updateField('type', val)}
                options={[
                  { value: 'Sách', label: 'Sách' },
                  { value: 'Văn bản', label: 'Văn bản' },
                  { value: 'Báo cáo', label: 'Báo cáo' },
                  { value: 'Tạp chí', label: 'Tạp chí' },
                ]}
              />
            </div>

            {/* Row 2: Độ mật, Trạng thái, Tác giả/Cơ quan biên soạn */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Độ mật"
                required
                type="select"
                placeholder="Chọn độ mật"
                value={formData.classification}
                onChange={(val) => updateField('classification', val)}
                options={[
                  { value: 'Công khai', label: 'Công khai' },
                  { value: 'Nội bộ', label: 'Nội bộ' },
                  { value: 'Hạn chế', label: 'Hạn chế' },
                  { value: 'Mật', label: 'Mật' },
                ]}
              />
              <FormField
                label="Trạng thái"
                required
                value={formData.status}
                disabled
              />
              <FormField
                label="Tác giả/ Cơ quan biên soạn"
                required
                placeholder="Nhập tên tác giả/ cơ quan biên soạn"
                value={formData.author}
                onChange={(val) => updateField('author', val)}
              />
            </div>

            {/* Row 3: Chủ biên, Năm sáng tác, Năm xuất bản */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Chủ biên"
                placeholder="Nhập tên chủ biên"
                value={formData.editor}
                onChange={(val) => updateField('editor', val)}
              />
              <FormField
                label="Năm sáng tác"
                type="select"
                placeholder="Chọn năm sáng tác"
                value={formData.publicationYear}
                onChange={(val) => updateField('publicationYear', val)}
                options={Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return { value: year.toString(), label: year.toString() };
                })}
              />
              <FormField
                label="Năm xuất bản"
                type="select"
                placeholder="Chọn năm xuất bản"
                value={formData.publishingYear}
                onChange={(val) => updateField('publishingYear', val)}
                options={Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return { value: year.toString(), label: year.toString() };
                })}
              />
            </div>

            {/* Row 4: Nhà xuất bản, Nơi xuất bản, Lần tái bản */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Nhà xuất bản"
                placeholder="Nhập nhà xuất bản"
                value={formData.publisher}
                onChange={(val) => updateField('publisher', val)}
              />
              <FormField
                label="Nơi xuất bản"
                placeholder="Nhập nơi xuất bản"
                value={formData.publishingLocation}
                onChange={(val) => updateField('publishingLocation', val)}
              />
              <FormField
                label="Lần tái bản"
                placeholder="Nhập lần tái bản"
                value={formData.edition}
                onChange={(val) => updateField('edition', val)}
              />
            </div>

            {/* Row 5: Ngôn ngữ phát hành, Người dịch, Ngôn ngữ được phiên dịch */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Ngôn ngữ phát hành"
                type="select"
                placeholder="Chọn ngôn ngữ phát hành"
                value={formData.releaseLanguage}
                onChange={(val) => updateField('releaseLanguage', val)}
                options={[
                  { value: 'Tiếng Việt', label: 'Tiếng Việt' },
                  { value: 'Tiếng Anh', label: 'Tiếng Anh' },
                  { value: 'Tiếng Pháp', label: 'Tiếng Pháp' },
                  { value: 'Tiếng Nga', label: 'Tiếng Nga' },
                  { value: 'Tiếng Trung', label: 'Tiếng Trung' },
                ]}
              />
              <FormField
                label="Người dịch"
                placeholder="Nhập tên người dịch"
                value={formData.translator}
                onChange={(val) => updateField('translator', val)}
              />
              <FormField
                label="Ngôn ngữ được phiên dịch"
                type="select"
                placeholder="Chọn ngôn ngữ được phiên dịch"
                value={formData.translatedLanguage}
                onChange={(val) => updateField('translatedLanguage', val)}
                options={[
                  { value: 'Tiếng Việt', label: 'Tiếng Việt' },
                  { value: 'Tiếng Anh', label: 'Tiếng Anh' },
                  { value: 'Tiếng Pháp', label: 'Tiếng Pháp' },
                  { value: 'Tiếng Nga', label: 'Tiếng Nga' },
                  { value: 'Tiếng Trung', label: 'Tiếng Trung' },
                ]}
              />
            </div>

            {/* Row 6: Kích thước tài liệu, Ẩn bản, Số trang thực đối */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Kích thước tài liệu"
                placeholder="Nhập kích thước tài liệu"
                value={formData.documentSize}
                onChange={(val) => updateField('documentSize', val)}
              />
              <FormField
                label="Ẩn bản"
                placeholder="Nhập ẩn bản"
                value={formData.hiddenCopy}
                onChange={(val) => updateField('hiddenCopy', val)}
              />
              <FormField
                label="Số trang thực đối"
                placeholder="Nhập số trang thực đối"
                value={formData.actualPages}
                onChange={(val) => updateField('actualPages', val)}
              />
            </div>

            {/* Row 7: Mã số ISBN, Biên tập viên, Bộ phận biên tập */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Mã số ISBN"
                placeholder="Nhập mã số ISBN"
              />
              <FormField
                label="Biên tập viên"
                placeholder="Nhập tên biên tập viên"
                value={formData.editorialStaff}
                onChange={(val) => updateField('editorialStaff', val)}
              />
              <FormField
                label="Bộ phận biên tập"
                placeholder="Nhập bộ phận biên tập"
                value={formData.editorialDepartment}
                onChange={(val) => updateField('editorialDepartment', val)}
              />
            </div>

            {/* Row 8: Đơn vị của người tải lên, Người tải lên, Ngày tải lên */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              <FormField
                label="Đơn vị của người tải lên"
                value={formData.uploaderUnit}
                disabled
              />
              <FormField
                label="Người tải lên"
                value={formData.uploader}
                disabled
              />
              <FormField
                label="Ngày tải lên"
                type="date"
                value={formData.uploadDate}
                disabled
              />
            </div>

            {/* Tóm tắt nội dung */}
            <div className="w-full">
              <FormField
                label="Tóm tắt nội dung"
                required
                type="textarea"
                placeholder="Nhập tóm tắt nội dung"
                value={formData.summary}
                onChange={(val) => updateField('summary', val)}
                rows={5}
              />
            </div>

            {/* File Upload Section - New Layout */}
            <div className="w-full">
              <div className="flex gap-[6px] items-center mb-[4px]">
                <p className="font-medium text-[14px] text-[#111827] leading-[20px]">
                  Thêm tập tin
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-[12px]">
                {/* Left side - Upload area with file previews */}
                <div className="flex-1 border border-dashed border-[#c7c7c7] rounded-[4px] p-[16px] min-h-[200px]">
                  {/* Upload Button */}
                  <label className="block cursor-pointer mb-[16px]">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                    />
                    <div className="bg-white border border-[#c9cdd4] rounded-[8px] p-[20px] hover:border-[#b9000e] transition-colors">
                      <div className="flex flex-col items-center gap-[10px]">
                        <div className="w-[60px] h-[60px] bg-[#f0f2f4] rounded-full flex items-center justify-center">
                          <Upload size={28} className="text-[#b9000e]" />
                        </div>
                        <p className="text-[14px] text-[#111827] text-center">
                          Nhấp để chọn file hoặc kéo thả file vào đây
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-[12px]">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="w-[120px] bg-white border border-[#bfbfbf] rounded-[8px] p-[12px]">
                            <div className="flex flex-col items-center gap-[8px]">
                              <div className="w-[50px] h-[50px] flex items-center justify-center">
                                <img src={imgExcel} alt={file.name} className="w-full h-full object-contain" />
                              </div>
                              <p className="text-[13px] text-[#414142] text-center w-full truncate leading-normal">
                                {file.name}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                            className="absolute top-[1.5px] right-[1.5px] w-[15px] h-[15px] flex items-center justify-center"
                          >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                              <path d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM10.5 9.79289L9.79289 10.5L7.5 8.20711L5.20711 10.5L4.5 9.79289L6.79289 7.5L4.5 5.20711L5.20711 4.5L7.5 6.79289L9.79289 4.5L10.5 5.20711L8.20711 7.5L10.5 9.79289Z" fill="#FE1E1E"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right side - Guidelines */}
                <div className="w-full lg:w-[340px] bg-white border border-[#bdbdbd] rounded-[8px] p-[10px]">
                  <div className="text-[14px] text-[#414142] leading-normal space-y-[8px]">
                    <p>- Bạn có thể chọn nhiều định dạng file: .doc, .docx, .pdf, .xls, .xlsx, .jpg, .jpeg, .png, .gif.</p>
                    <p>- Hỗ trợ dung lượng 1 file lên tới 10MB.</p>
                    <p>- Bạn có thể chọn và tải 1 hoặc nhiều file trong 1 lần thao tác.</p>
                    <p>- Bạn có thể thực hiện kéo thả 1 hoặc nhiều file từ máy tính cá nhân.</p>
                    <p>- Bạn có thể xem nội dung các file sau khi tải lên bằng cách kích đúp vào file muốn xem.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-[10px] justify-end mt-[24px] pt-[24px] border-t border-[rgba(17,24,39,0.2)]">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-[14px] py-[8px] bg-white border border-[#d1d5db] rounded-[8px] text-[#111827] font-medium text-[14px] hover:bg-gray-50 transition-colors flex items-center gap-[8px]"
            >
              <PlusIcon />
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmitToSuperior}
              className="px-[14px] py-[8px] bg-white border border-[#b9000e] rounded-[8px] text-[#b9000e] font-medium text-[14px] hover:bg-gray-50 transition-colors flex items-center gap-[8px]"
            >
              <ExportIcon />
              Nộp cấp trên
            </button>
            <button
              onClick={handleSubmit}
              className="px-[14px] py-[8px] bg-[#b9000e] rounded-[8px] text-white font-medium text-[14px] hover:bg-[#9a000c] transition-colors flex items-center gap-[8px]"
            >
              <SaveIcon />
              Lưu nháp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}