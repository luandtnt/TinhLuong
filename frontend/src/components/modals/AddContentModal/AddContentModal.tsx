import { useState } from 'react';
import { X } from 'lucide-react';
import { ContentType, ContentFormData } from '../../../types/content';
import { StepSelectType } from './StepSelectType';
import { StepContentForm } from './StepContentForm';
import { ConfirmChangeTypeModal } from './ConfirmChangeTypeModal';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddContentModal({ isOpen, onClose, onSuccess }: AddContentModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [formData, setFormData] = useState<Partial<ContentFormData>>({});
  const [showConfirmChangeType, setShowConfirmChangeType] = useState(false);

  if (!isOpen) return null;

  const handleSelectType = (type: ContentType) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      setFormData({
        ...formData,
        type: selectedType,
      });
      setStep(2);
    }
  };

  const handleBack = () => {
    // Check if form has changes
    const hasChanges = 
      formData.common?.title ||
      formData.common?.summary ||
      (formData.common?.authors && formData.common.authors.length > 0) ||
      formData.file;

    if (hasChanges) {
      setShowConfirmChangeType(true);
    } else {
      setStep(1);
      setSelectedType(null);
      setFormData({});
    }
  };

  const handleConfirmChangeType = () => {
    // Keep common fields and source metadata, reset type-specific fields
    const commonFields = formData.common;
    const sourceMetadata = formData.sourceMetadata;
    
    setFormData({
      common: commonFields,
      sourceMetadata: sourceMetadata,
    });
    setStep(1);
    setSelectedType(null);
    setShowConfirmChangeType(false);
  };

  const handleFormDataChange = (data: Partial<ContentFormData>) => {
    setFormData(data);
  };

  const handleSaveDraft = async () => {
    try {
      // Mock API call
      const payload = {
        ...formData,
        status: 'DRAFT',
        createdAt: new Date().toISOString(),
        createdBy: 'Current User',
      };

      console.log('Saving draft:', payload);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success toast
      showToast('Lưu nháp thành công.');
      
      // Reset and close
      resetModal();
      onSuccess();
    } catch (error) {
      showToast('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleSubmit = async () => {
    try {
      // Mock API call
      const payload = {
        ...formData,
        status: 'PENDING_APPROVAL',
        createdAt: new Date().toISOString(),
        createdBy: 'Current User',
        submittedAt: new Date().toISOString(),
      };

      console.log('Submitting for approval:', payload);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success toast
      showToast('Đã nộp cấp trên thành công.');
      
      // Reset and close
      resetModal();
      onSuccess();
    } catch (error) {
      showToast('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedType(null);
    setFormData({});
    onClose();
  };

  const showToast = (message: string) => {
    // Simple toast implementation - in real app, use a toast library
    const toast = document.createElement('div');
    toast.className = 'fixed top-[20px] right-[20px] bg-[#111827] text-white px-[16px] py-[12px] rounded-[8px] shadow-lg z-[10000]';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return (
    <>
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
            <div>
              <h2 className="text-[20px] font-semibold">Thêm mới tài liệu</h2>
              <p className="text-[14px] opacity-90 mt-[4px]">Bước {step}/2</p>
            </div>
            <button
              onClick={resetModal}
              className="p-[8px] hover:bg-white hover:bg-opacity-20 rounded-[4px] transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {step === 1 ? (
              <StepSelectType
                selectedType={selectedType}
                onSelectType={handleSelectType}
                onCancel={resetModal}
                onNext={handleNext}
              />
            ) : (
              <StepContentForm
                contentType={selectedType!}
                formData={formData}
                onFormDataChange={handleFormDataChange}
                onBack={handleBack}
                onSaveDraft={handleSaveDraft}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>

      {/* Confirm Change Type Modal */}
      <ConfirmChangeTypeModal
        isOpen={showConfirmChangeType}
        onClose={() => setShowConfirmChangeType(false)}
        onConfirm={handleConfirmChangeType}
      />
    </>
  );
}
