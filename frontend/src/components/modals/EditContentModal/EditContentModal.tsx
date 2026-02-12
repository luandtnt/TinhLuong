import { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { ContentType, ContentFormData } from '../../../types/content';
import { Button } from '../../common/Button';
import { generateContentCode, validateISBN } from '../../../utils/contentCode';
import { extractFileMetadata } from '../../../utils/fileMeta';
import { CommonFieldsSection } from '../AddContentModal/sections/CommonFieldsSection';
import { SourceMetadataSection } from '../AddContentModal/sections/SourceMetadataSection';
import { FileUploadSection } from '../AddContentModal/sections/FileUploadSection';
import { VanBanFieldsSection } from '../AddContentModal/sections/VanBanFieldsSection';
import { SachFieldsSection } from '../AddContentModal/sections/SachFieldsSection';
import { AudioFieldsSection } from '../AddContentModal/sections/AudioFieldsSection';
import { VideoFieldsSection } from '../AddContentModal/sections/VideoFieldsSection';
import { HinhAnhFieldsSection } from '../AddContentModal/sections/HinhAnhFieldsSection';

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  documentId: string;
  initialData?: Partial<ContentFormData>;
}

const contentTypeLabels: Record<ContentType, string> = {
  VAN_BAN: 'Văn bản',
  SACH: 'Sách',
  AUDIO: 'Audio',
  VIDEO: 'Video',
  HINH_ANH: 'Hình ảnh',
};

export function EditContentModal({
  isOpen,
  onClose,
  onSuccess,
  documentId,
  initialData,
}: EditContentModalProps) {
  const [formData, setFormData] = useState<Partial<ContentFormData>>(initialData || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileMetadata, setFileMetadata] = useState<any>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const contentType = formData.type || 'SACH';

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.fileMetadata) {
        setFileMetadata(initialData.fileMetadata);
      }
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    setIsProcessingFile(true);
    setUploadedFile(file);
    
    try {
      const metadata = await extractFileMetadata(file);
      setFileMetadata(metadata);
      setFormData({
        ...formData,
        file,
        fileMetadata: metadata,
      });
    } catch (error) {
      console.error('Error extracting file metadata:', error);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileMetadata(null);
    setFormData({
      ...formData,
      file: null,
      fileMetadata: undefined,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.common?.code) {
      newErrors.code = 'Vui lòng nhập mã nội dung.';
    }
    if (!formData.common?.title) {
      newErrors.title = 'Vui lòng nhập tên nội dung.';
    }
    if (!formData.common?.classification) {
      newErrors.classification = 'Vui lòng chọn độ mật.';
    }
    if (!formData.common?.authors || formData.common.authors.length === 0) {
      newErrors.authors = 'Vui lòng nhập tác giả/cơ quan.';
    }
    if (!formData.common?.summary) {
      newErrors.summary = 'Vui lòng nhập tóm tắt nội dung.';
    }

    if (!formData.sourceMetadata?.sourceType) {
      newErrors.sourceType = 'Vui lòng chọn nguồn.';
    }
    if (formData.sourceMetadata?.sourceType === 'ONLINE') {
      if (!formData.sourceMetadata?.url) {
        newErrors.sourceUrl = 'Vui lòng nhập đường dẫn URL.';
      } else if (!isValidUrl(formData.sourceMetadata.url)) {
        newErrors.sourceUrl = 'URL không hợp lệ.';
      }
    }

    if (contentType === 'VAN_BAN') {
      const specific = formData.specific as any;
      if (!specific?.documentType) {
        newErrors.documentType = 'Vui lòng chọn loại văn bản.';
      }
      if (!specific?.issueDate) {
        newErrors.issueDate = 'Vui lòng chọn ngày ban hành.';
      }
    } else if (contentType === 'SACH') {
      const specific = formData.specific as any;
      if (!specific?.publishYear) {
        newErrors.publishYear = 'Vui lòng nhập năm xuất bản.';
      }
      if (!specific?.publisher) {
        newErrors.publisher = 'Vui lòng nhập nhà xuất bản.';
      }
      if (specific?.isbn && !validateISBN(specific.isbn)) {
        newErrors.isbn = 'ISBN không hợp lệ (chỉ chấp nhận ISBN-10 hoặc ISBN-13).';
      }
    } else if (contentType === 'AUDIO' || contentType === 'VIDEO') {
      const specific = formData.specific as any;
      if (!specific?.releaseDate) {
        newErrors.releaseDate = 'Vui lòng chọn ngày phát hành.';
      }
      if (!specific?.platform) {
        newErrors.platform = 'Vui lòng nhập nền tảng/đơn vị phát hành.';
      }
    } else if (contentType === 'HINH_ANH') {
      const specific = formData.specific as any;
      if (!specific?.creationDate) {
        newErrors.creationDate = 'Vui lòng chọn ngày tạo.';
      }
      if (!specific?.imageType) {
        newErrors.imageType = 'Vui lòng chọn loại hình ảnh.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        id: documentId,
        updatedAt: new Date().toISOString(),
      };

      console.log('Updating document:', payload);
      await new Promise(resolve => setTimeout(resolve, 500));

      showToast('Cập nhật tài liệu thành công.');
      onSuccess();
      onClose();
    } catch (error) {
      showToast('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-[20px] right-[20px] bg-[#111827] text-white px-[16px] py-[12px] rounded-[8px] shadow-lg z-[10000]';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return (
    <div 
      className="fixed" 
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 99999
      }}
    >
      <div 
        className="bg-white rounded-[8px] flex flex-col shadow-xl"
        style={{
          width: '75vw',
          height: '75vh',
          maxHeight: '75vh'
        }}
      >
        {/* Header */}
        <div className="bg-[#b9000e] text-white px-[24px] py-[18px] flex items-center justify-between rounded-t-[8px] flex-shrink-0">
          <h2 className="text-[20px] font-semibold">
            Chỉnh sửa – {contentTypeLabels[contentType]}
          </h2>
          <button
            onClick={onClose}
            className="p-[8px] hover:bg-white hover:bg-opacity-20 rounded-[4px] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-[28px]">
          <div className="max-w-[950px] mx-auto space-y-[24px]">
            {/* Common Fields */}
            <CommonFieldsSection
              formData={formData}
              onFormDataChange={setFormData}
              errors={errors}
            />

            {/* Type-specific Fields */}
            {contentType === 'VAN_BAN' && (
              <VanBanFieldsSection
                formData={formData}
                onFormDataChange={setFormData}
                errors={errors}
              />
            )}
            {contentType === 'SACH' && (
              <SachFieldsSection
                formData={formData}
                onFormDataChange={setFormData}
                errors={errors}
              />
            )}
            {contentType === 'AUDIO' && (
              <AudioFieldsSection
                formData={formData}
                onFormDataChange={setFormData}
                errors={errors}
              />
            )}
            {contentType === 'VIDEO' && (
              <VideoFieldsSection
                formData={formData}
                onFormDataChange={setFormData}
                errors={errors}
              />
            )}
            {contentType === 'HINH_ANH' && (
              <HinhAnhFieldsSection
                formData={formData}
                onFormDataChange={setFormData}
                errors={errors}
              />
            )}

            {/* Source Metadata */}
            <SourceMetadataSection
              contentType={contentType}
              formData={formData}
              onFormDataChange={setFormData}
              errors={errors}
            />

            {/* File Upload */}
            <FileUploadSection
              contentType={contentType}
              uploadedFile={uploadedFile}
              fileMetadata={fileMetadata}
              isProcessing={isProcessingFile}
              onFileUpload={handleFileUpload}
              onRemoveFile={handleRemoveFile}
              errors={errors}
              formData={formData}
              onFormDataChange={setFormData}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#e5e7eb] p-[20px] flex justify-end gap-[10px] flex-shrink-0">
          <Button
            onClick={onClose}
            label="Hủy bỏ"
            variant="outline"
            size="md"
          />
          <Button
            onClick={handleSave}
            label="Lưu thay đổi"
            variant="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
