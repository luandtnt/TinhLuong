import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ContentType, ContentFormData, FileMetadata } from '../../../types/content';
import { Button } from '../../common/Button';
import { generateContentCode, validateISBN } from '../../../utils/contentCode';
import { extractFileMetadata } from '../../../utils/fileMeta';
import { CommonFieldsSection } from './sections/CommonFieldsSection';
import { SourceMetadataSection } from './sections/SourceMetadataSection';
import { FileUploadSection } from './sections/FileUploadSection';
import { VanBanFieldsSection } from './sections/VanBanFieldsSection';
import { SachFieldsSection } from './sections/SachFieldsSection';
import { AudioFieldsSection } from './sections/AudioFieldsSection';
import { VideoFieldsSection } from './sections/VideoFieldsSection';
import { HinhAnhFieldsSection } from './sections/HinhAnhFieldsSection';

interface StepContentFormProps {
  contentType: ContentType;
  formData: Partial<ContentFormData>;
  onFormDataChange: (data: Partial<ContentFormData>) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

const contentTypeLabels: Record<ContentType, string> = {
  VAN_BAN: 'Văn bản',
  SACH: 'Sách',
  AUDIO: 'Audio',
  VIDEO: 'Video',
  HINH_ANH: 'Hình ảnh',
};

export function StepContentForm({
  contentType,
  formData,
  onFormDataChange,
  onBack,
  onSaveDraft,
  onSubmit,
}: StepContentFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  // Initialize form data
  useEffect(() => {
    if (!formData.common?.code) {
      onFormDataChange({
        ...formData,
        common: {
          ...formData.common,
          code: generateContentCode(contentType),
          authors: formData.common?.authors || [],
          language: formData.common?.language || 'Tiếng Việt',
        } as any,
        sourceMetadata: {
          ...formData.sourceMetadata,
          sourceType: formData.sourceMetadata?.sourceType || 'INTERNAL',
        } as any,
      });
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsProcessingFile(true);
    setUploadedFile(file);
    
    try {
      const metadata = await extractFileMetadata(file);
      setFileMetadata(metadata);
      onFormDataChange({
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
    onFormDataChange({
      ...formData,
      file: null,
      fileMetadata: undefined,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Common fields validation
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

    // Source metadata validation
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

    // File validation
    if (!uploadedFile && !formData.fileUrl) {
      newErrors.file = 'Vui lòng tải lên tệp hoặc nhập URL nguồn.';
    }

    // Type-specific validation
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

  const handleSaveDraft = () => {
    if (validateForm()) {
      onSaveDraft();
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b border-[#e5e7eb] p-[18px] flex items-center gap-[12px] flex-shrink-0">
        <button
          onClick={onBack}
          className="p-[8px] hover:bg-[#f3f4f6] rounded-[4px] transition-colors"
        >
          <ArrowLeft size={20} className="text-[#6b7280]" />
        </button>
        <div>
          <h3 className="text-[17px] font-semibold text-[#111827]">
            Thêm mới – {contentTypeLabels[contentType]}
          </h3>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-[28px]">
        <div className="max-w-[950px] mx-auto space-y-[24px]">
          {/* Common Fields */}
          <CommonFieldsSection
            formData={formData}
            onFormDataChange={onFormDataChange}
            errors={errors}
          />

          {/* Type-specific Fields */}
          {contentType === 'VAN_BAN' && (
            <VanBanFieldsSection
              formData={formData}
              onFormDataChange={onFormDataChange}
              errors={errors}
            />
          )}
          {contentType === 'SACH' && (
            <SachFieldsSection
              formData={formData}
              onFormDataChange={onFormDataChange}
              errors={errors}
            />
          )}
          {contentType === 'AUDIO' && (
            <AudioFieldsSection
              formData={formData}
              onFormDataChange={onFormDataChange}
              errors={errors}
            />
          )}
          {contentType === 'VIDEO' && (
            <VideoFieldsSection
              formData={formData}
              onFormDataChange={onFormDataChange}
              errors={errors}
            />
          )}
          {contentType === 'HINH_ANH' && (
            <HinhAnhFieldsSection
              formData={formData}
              onFormDataChange={onFormDataChange}
              errors={errors}
            />
          )}

          {/* Source Metadata */}
          <SourceMetadataSection
            contentType={contentType}
            formData={formData}
            onFormDataChange={onFormDataChange}
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
            onFormDataChange={onFormDataChange}
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-[#e5e7eb] p-[20px] flex justify-end gap-[10px] flex-shrink-0">
        <Button
          onClick={onBack}
          label="Đổi loại"
          variant="outline"
          size="md"
        />
        <Button
          onClick={handleSaveDraft}
          label="Lưu nháp"
          variant="outline"
          size="md"
        />
        <Button
          onClick={handleSubmit}
          label="Nộp cấp trên"
          variant="primary"
          size="md"
        />
      </div>
    </div>
  );
}
