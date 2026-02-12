import { Upload, File, X } from 'lucide-react';
import { ContentType, FileMetadata, ContentFormData } from '../../../../types/content';
import { formatFileSize, formatDuration } from '../../../../utils/fileMeta';

interface FileUploadSectionProps {
  contentType: ContentType;
  uploadedFile: File | null;
  fileMetadata: FileMetadata | null;
  isProcessing: boolean;
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
  errors: Record<string, string>;
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
}

const acceptedFileTypes: Record<ContentType, string> = {
  VAN_BAN: '.pdf,.docx,.doc',
  SACH: '.pdf,.epub',
  AUDIO: '.mp3,.m4a,.wav',
  VIDEO: '.mp4,.mov,.avi',
  HINH_ANH: '.jpg,.jpeg,.png,.webp,.svg',
};

export function FileUploadSection({
  contentType,
  uploadedFile,
  fileMetadata,
  isProcessing,
  onFileUpload,
  onRemoveFile,
  errors,
  formData,
  onFormDataChange,
}: FileUploadSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
        Tệp đính kèm
      </h4>

      {!uploadedFile ? (
        <div>
          <label className="block">
            <div className="border-2 border-dashed border-[#e5e7eb] rounded-[8px] p-[32px] text-center cursor-pointer hover:border-[#b9000e] hover:bg-[#fff5f5] transition-colors">
              <Upload size={48} className="mx-auto text-[#6b7280] mb-[12px]" />
              <p className="text-[14px] text-[#111827] mb-[4px]">
                Kéo thả tệp vào đây hoặc click để chọn
              </p>
              <p className="text-[12px] text-[#6b7280]">
                Định dạng: {acceptedFileTypes[contentType]}
              </p>
            </div>
            <input
              type="file"
              accept={acceptedFileTypes[contentType]}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {errors.file && (
            <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.file}</p>
          )}
        </div>
      ) : (
        <div>
          {isProcessing ? (
            <div className="flex items-center gap-[12px] p-[16px] bg-[#f9fafb] rounded-[8px]">
              <div className="animate-spin rounded-full h-[24px] w-[24px] border-b-2 border-[#b9000e]"></div>
              <span className="text-[14px] text-[#6b7280]">Đang xử lý tệp...</span>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-[12px] p-[16px] bg-[#f9fafb] rounded-[8px]">
                <File size={24} className="text-[#b9000e] flex-shrink-0 mt-[2px]" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#111827] truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-[12px] text-[#6b7280]">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
                <button
                  onClick={onRemoveFile}
                  className="p-[4px] hover:bg-[#e5e7eb] rounded-[4px] transition-colors flex-shrink-0"
                >
                  <X size={20} className="text-[#6b7280]" />
                </button>
              </div>

              {/* File Metadata */}
              {fileMetadata && (
                <div className="mt-[16px] p-[16px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px]">
                  <h5 className="text-[14px] font-semibold text-[#111827] mb-[12px]">
                    Thông tin kỹ thuật
                  </h5>
                  <div className="space-y-[8px] text-[14px]">
                    <div className="flex justify-between">
                      <span className="text-[#6b7280]">Tên file:</span>
                      <span className="text-[#111827] font-medium">{fileMetadata.fileName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6b7280]">Dung lượng:</span>
                      <span className="text-[#111827] font-medium">{formatFileSize(fileMetadata.fileSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6b7280]">Định dạng:</span>
                      <span className="text-[#111827] font-medium">{fileMetadata.fileFormat}</span>
                    </div>
                    
                    {fileMetadata.pageCount && (
                      <div className="flex justify-between">
                        <span className="text-[#6b7280]">Số trang:</span>
                        <span className="text-[#111827] font-medium">{fileMetadata.pageCount}</span>
                      </div>
                    )}
                    
                    {fileMetadata.duration && (
                      <div className="flex justify-between">
                        <span className="text-[#6b7280]">Thời lượng:</span>
                        <span className="text-[#111827] font-medium">{formatDuration(fileMetadata.duration)}</span>
                      </div>
                    )}
                    
                    {fileMetadata.resolution && (
                      <div className="flex justify-between">
                        <span className="text-[#6b7280]">Độ phân giải:</span>
                        <span className="text-[#111827] font-medium">{fileMetadata.resolution}</span>
                      </div>
                    )}
                    
                    {fileMetadata.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-[#6b7280]">Kích thước:</span>
                        <span className="text-[#111827] font-medium">
                          {fileMetadata.dimensions.width} × {fileMetadata.dimensions.height} px
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tóm tắt nội dung - chỉ hiện sau khi upload file */}
              <div className="mt-[16px]">
                <label className="block text-[14px] font-medium text-[#111827] mb-[6px]">
                  Tóm tắt nội dung <span className="text-[#b9000e]">*</span>
                </label>
                <textarea
                  value={formData.common?.summary || ''}
                  onChange={(e) => onFormDataChange({
                    ...formData,
                    common: { ...formData.common, summary: e.target.value } as any,
                  })}
                  rows={4}
                  className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px]"
                  placeholder="Mô tả nội dung..."
                />
                {errors.summary && (
                  <p className="text-[12px] text-[#b91c1c] mt-[4px]">{errors.summary}</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
