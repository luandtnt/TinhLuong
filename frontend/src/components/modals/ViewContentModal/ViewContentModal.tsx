import { X, File } from 'lucide-react';
import { ContentType, ContentFormData } from '../../../types/content';
import { Button } from '../../common/Button';
import { formatFileSize, formatDuration } from '../../../utils/fileMeta';

interface ViewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Partial<ContentFormData> & { status?: 'approved' | 'draft' | 'pending' | 'rejected' };
  onApprove?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  role?: 'supervisor' | 'subordinate';
}

const contentTypeLabels: Record<ContentType, string> = {
  VAN_BAN: 'Văn bản',
  SACH: 'Sách',
  AUDIO: 'Audio',
  VIDEO: 'Video',
  HINH_ANH: 'Hình ảnh',
};

const classificationLabels: Record<string, string> = {
  CONG_KHAI: 'Công khai',
  NOI_BO: 'Nội bộ',
  MAT: 'Mật',
  TOI_MAT: 'Tối mật',
};

const sourceTypeLabels: Record<string, string> = {
  INTERNAL: 'Nội bộ',
  ONLINE: 'Trực tuyến',
};

const rightsLabels: Record<string, string> = {
  NOI_BO: 'Nội bộ',
  CONG_KHAI: 'Công khai',
  CC: 'Creative Commons',
  DUOC_PHEP_SU_DUNG: 'Được phép sử dụng',
  KHAC: 'Khác',
};

function ReadOnlyField({ label, value, required = false }: { label: string; value?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <label className="text-[14px] font-medium text-[#111827]">
        {label} {required && <span className="text-[#b9000e]">*</span>}
      </label>
      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[12px] py-[8px] text-[14px] text-[#111827]">
        {value || '-'}
      </div>
    </div>
  );
}

export function ViewContentModal({
  isOpen,
  onClose,
  data,
  onApprove,
  onReject,
  onCancel,
  role = 'subordinate',
}: ViewContentModalProps) {
  if (!isOpen) return null;

  const contentType = data.type || 'SACH';
  const common = data.common || {} as any;
  const sourceMetadata = data.sourceMetadata || {} as any;
  const specific = data.specific || {};
  const fileMetadata = data.fileMetadata;

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
            Xem chi tiết – {contentTypeLabels[contentType]}
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
            {/* Thông tin chung */}
            <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
              <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                Thông tin chung
              </h4>
              <div className="grid grid-cols-3 gap-[16px]">
                <ReadOnlyField label="Mã nội dung" value={common.code} required />
                <ReadOnlyField label="Tên nội dung" value={common.title} required />
                <ReadOnlyField label="Độ mật" value={common.classification ? classificationLabels[common.classification] : undefined} required />
                <ReadOnlyField label="Trạng thái" value={data.status === 'approved' ? 'Đã phê duyệt' : data.status === 'pending' ? 'Chờ phê duyệt' : data.status === 'rejected' ? 'Từ chối' : 'Nháp'} />
                <ReadOnlyField label="Đơn vị người tải lên" value={(data as any).uploaderOrg} />
                <ReadOnlyField label="Người tải lên" value={(data as any).uploader} />
              </div>
            </div>

            {/* Thông tin đặc thù theo loại */}
            {contentType === 'VAN_BAN' && (
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
                <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                  Thông tin văn bản
                </h4>
                <div className="grid grid-cols-3 gap-[16px]">
                  <ReadOnlyField label="Loại văn bản" value={(specific as any).documentType} required />
                  <ReadOnlyField label="Ngày ban hành" value={(specific as any).issueDate} required />
                  <ReadOnlyField label="Số hiệu/Ký hiệu" value={(specific as any).documentNumber} />
                  <ReadOnlyField label="Cơ quan ban hành" value={(specific as any).issuer} />
                  <ReadOnlyField label="Nơi ban hành" value={(specific as any).issueLocation} />
                  <ReadOnlyField label="Tình trạng hiệu lực" value={(specific as any).effectiveStatus === 'CON_HIEU_LUC' ? 'Còn hiệu lực' : (specific as any).effectiveStatus === 'DA_THAY_THE' ? 'Đã thay thế' : (specific as any).effectiveStatus === 'BAI_BO' ? 'Bãi bỏ' : undefined} />
                  <div className="col-span-3">
                    <ReadOnlyField label="Văn bản liên quan" value={(specific as any).relatedDocuments} />
                  </div>
                  <div className="col-span-3">
                    <ReadOnlyField 
                      label="Tác giả" 
                      value={common.authors?.join(', ')} 
                      required 
                    />
                  </div>
                  <ReadOnlyField label="Ngôn ngữ" value={common.language} />
                </div>
              </div>
            )}

            {contentType === 'SACH' && (
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
                <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                  Thông tin sách
                </h4>
                <div className="grid grid-cols-3 gap-[16px]">
                  <div className="col-span-3">
                    <ReadOnlyField 
                      label="Tác giả" 
                      value={common.authors?.join(', ')} 
                      required 
                    />
                  </div>
                  <ReadOnlyField label="Chủ biên" value={(specific as any).chiefEditor} />
                  <ReadOnlyField label="Năm sáng tác" value={(specific as any).compositionYear} />
                  <ReadOnlyField label="Năm xuất bản" value={(specific as any).publishYear} required />
                  <ReadOnlyField label="Nhà xuất bản" value={(specific as any).publisher} required />
                  <ReadOnlyField label="Nơi xuất bản" value={(specific as any).publishLocation} />
                  <ReadOnlyField label="Lần tái bản" value={(specific as any).reprintEdition} />
                  <ReadOnlyField label="Ấn bản" value={(specific as any).edition} />
                  <ReadOnlyField label="ISBN" value={(specific as any).isbn} />
                  <ReadOnlyField label="Ngôn ngữ phát hành" value={common.language} />
                  <ReadOnlyField label="Người dịch" value={(specific as any).translator} />
                  <ReadOnlyField label="Ngôn ngữ được phiên dịch" value={(specific as any).translatedLanguages?.join(', ')} />
                  <ReadOnlyField label="Biên tập viên" value={(specific as any).editor} />
                  <ReadOnlyField label="Bộ phận biên tập" value={(specific as any).editorialDepartment} />
                </div>
              </div>
            )}

            {contentType === 'AUDIO' && (
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
                <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                  Thông tin audio
                </h4>
                <div className="grid grid-cols-3 gap-[16px]">
                  <ReadOnlyField label="Người trình bày" value={(specific as any).presenter} />
                  <ReadOnlyField label="Ngày phát hành" value={(specific as any).releaseDate} required />
                  <ReadOnlyField label="Đơn vị phát hành" value={(specific as any).platform} required />
                  <ReadOnlyField label="Tên chương trình" value={(specific as any).programName} />
                  <ReadOnlyField label="Số tập" value={(specific as any).episodeNumber} />
                  <ReadOnlyField label="Chất lượng" value={(specific as any).quality} />
                  <ReadOnlyField label="Băng gỡ" value={(specific as any).bandwidth} />
                  <ReadOnlyField label="Ngôn ngữ" value={(specific as any).language} />
                </div>
              </div>
            )}

            {contentType === 'VIDEO' && (
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
                <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                  Thông tin video
                </h4>
                <div className="grid grid-cols-3 gap-[16px]">
                  <ReadOnlyField label="Ngày phát hành" value={(specific as any).releaseDate} required />
                  <ReadOnlyField label="Đạo diễn" value={(specific as any).director} />
                  <ReadOnlyField label="Hãng sản xuất" value={(specific as any).productionCompany} />
                  <ReadOnlyField label="Nền tảng" value={(specific as any).platform} required />
                  <ReadOnlyField label="Tên kênh" value={(specific as any).channelName} />
                  <ReadOnlyField label="Định dạng hình ảnh" value={(specific as any).videoFormat} />
                  <ReadOnlyField label="Sự kiện" value={(specific as any).eventName} />
                  <ReadOnlyField label="Địa điểm" value={(specific as any).location} />
                  <ReadOnlyField label="Ngôn ngữ" value={(specific as any).language} />
                  <div className="col-span-3">
                    <ReadOnlyField label="Kịch bản" value={(specific as any).screenplay} />
                  </div>
                </div>
              </div>
            )}

            {contentType === 'HINH_ANH' && (
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
                <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                  Thông tin hình ảnh
                </h4>
                <div className="grid grid-cols-3 gap-[16px]">
                  <ReadOnlyField label="Tác giả ảnh" value={(specific as any).photographer} />
                  <ReadOnlyField label="Thời gian chụp" value={(specific as any).captureDate} />
                  <ReadOnlyField label="Địa điểm" value={(specific as any).location} />
                  <ReadOnlyField label="Loại hình ảnh" value={(specific as any).imageType} />
                  <ReadOnlyField label="Tên bộ sưu tập" value={(specific as any).collection} />
                  <div className="col-span-3">
                    <ReadOnlyField label="Chú thích ảnh" value={(specific as any).caption} />
                  </div>
                </div>
              </div>
            )}

            {/* Thông tin nguồn & xuất bản */}
            <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
              <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                Thông tin nguồn & xuất bản
              </h4>
              <div className="grid grid-cols-3 gap-[16px]">
                <ReadOnlyField 
                  label="Nguồn" 
                  value={sourceMetadata.sourceType ? sourceTypeLabels[sourceMetadata.sourceType] : undefined} 
                  required 
                />
                {sourceMetadata.sourceType === 'ONLINE' && (
                  <>
                    <ReadOnlyField label="Đường dẫn" value={sourceMetadata.url} required />
                    <ReadOnlyField label="Ngày truy cập" value={sourceMetadata.accessedAt} />
                  </>
                )}
                {sourceMetadata.sourceType === 'INTERNAL' && (
                  <>
                    <ReadOnlyField label="Mã lưu trữ nội bộ" value={sourceMetadata.internalCode} />
                    <ReadOnlyField label="Đơn vị cung cấp" value={sourceMetadata.providerOrg} />
                  </>
                )}
                <ReadOnlyField 
                  label="Bản quyền" 
                  value={sourceMetadata.rights ? rightsLabels[sourceMetadata.rights] : undefined} 
                />
                {sourceMetadata.rightsNote && (
                  <div className="col-span-3">
                    <ReadOnlyField label="Ghi chú bản quyền" value={sourceMetadata.rightsNote} />
                  </div>
                )}
              </div>
            </div>

            {/* Tệp đính kèm */}
            {fileMetadata && (
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
                <h4 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
                  Tệp đính kèm
                </h4>
                <div className="flex items-start gap-[12px] p-[16px] bg-[#f9fafb] rounded-[8px]">
                  <File size={24} className="text-[#b9000e] flex-shrink-0 mt-[2px]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#111827] truncate">
                      {fileMetadata.fileName}
                    </p>
                    <p className="text-[12px] text-[#6b7280]">
                      {formatFileSize(fileMetadata.fileSize)}
                    </p>
                  </div>
                </div>

                {/* File Metadata */}
                <div className="mt-[16px] p-[16px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px]">
                  <h5 className="text-[14px] font-semibold text-[#111827] mb-[12px]">
                    Thông tin kỹ thuật
                  </h5>
                  <div className="space-y-[8px] text-[14px]">
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
              </div>
            )}

            {/* Tóm tắt nội dung */}
            {common.summary && (
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
                <h4 className="text-[16px] font-semibold text-[#111827] mb-[12px]">
                  Tóm tắt nội dung
                </h4>
                <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[12px] py-[8px] text-[14px] text-[#111827] min-h-[80px]">
                  {common.summary}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#e5e7eb] p-[20px] flex justify-end gap-[10px] flex-shrink-0">
          <Button
            onClick={onClose}
            label="Đóng"
            variant="outline"
            size="md"
          />
          {role === 'supervisor' && (
            <>
              {onReject && (
                <Button
                  onClick={onReject}
                  label="Từ chối phê duyệt"
                  variant="outline"
                  size="md"
                />
              )}
              {onCancel && (
                <Button
                  onClick={onCancel}
                  label="Huỷ phê duyệt"
                  variant="outline"
                  size="md"
                />
              )}
              {onApprove && (
                <Button
                  onClick={onApprove}
                  label="Phê duyệt"
                  variant="primary"
                  size="md"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
