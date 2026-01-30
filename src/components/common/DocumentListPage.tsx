import { useState } from 'react';
import { Upload, FileDown } from 'lucide-react';
import { TableActionsCell } from './TableActionsCell';
import { SubordinateTableActionsCell } from './SubordinateTableActionsCell';
import { StatusBadge } from './StatusBadge';
import { TableFooter } from './TableFooter';
import { CustomCheckbox } from './CustomCheckbox';
import { Button } from './Button';
import { DeleteIcon } from '../icons/DeleteIcon';
import { AddIcon } from '../icons/AddIcon';
import { TableHeader } from './TableHeader';
import { TableFilterRow } from './TableFilterRow';
import { SubmitDocumentModal, RejectDocumentModal, ApproveDocumentModal, DeleteDocumentModal, AddContentModal, EditContentModal, ViewContentModal } from '../modals';
import { ContentFormData } from '../../types/content';

interface Document {
  id: string;
  code: string;
  title: string;
  type: string;
  classification: string;
  author: string;
  createdDate: string;
  status: 'approved' | 'draft' | 'pending' | 'rejected';
  uploadDate?: string;
}

interface DocumentListPageProps {
  pageTitle: string;
  role: 'supervisor' | 'subordinate';
  initialDocuments: Document[];
}

function SubordinateStatusBadge({ status }: { status: Document['status'] }) {
  const statusConfig = {
    approved: { label: 'Đã phê duyệt', bg: '#dcfce7', text: '#15803d' },
    draft: { label: 'Nhập', bg: '#f3f4f6', text: '#6b7280' },
    pending: { label: 'Chờ phê duyệt', bg: '#fef3c7', text: '#b45309' },
    rejected: { label: 'Từ chối', bg: '#fee2e2', text: '#b91c1c' },
  };

  const config = statusConfig[status];

  return (
    <div
      className="inline-flex px-[10px] py-[4px] rounded-[8px] text-[14px] font-medium"
      style={{
        backgroundColor: config.bg,
        color: config.text,
      }}
    >
      {config.label}
    </div>
  );
}

export function DocumentListPage({ pageTitle, role, initialDocuments }: DocumentListPageProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [isEditContentModalOpen, setIsEditContentModalOpen] = useState(false);
  const [isViewContentModalOpen, setIsViewContentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const [filters, setFilters] = useState({
    code: '',
    title: '',
    type: '',
    classification: '',
    author: '',
    createdDate: '',
    status: ''
  });

  const totalPages = 15;

  const tableColumns = [
    { key: 'code', label: 'Mã Tài Liệu', align: 'left' as const, minWidth: '120px' },
    { key: 'title', label: 'Tên Tài Liệu', align: 'left' as const, minWidth: '250px' },
    { key: 'type', label: 'Loại Tài Liệu', align: 'left' as const, minWidth: '120px' },
    { key: 'classification', label: 'Độ Mật', align: 'left' as const, minWidth: '100px' },
    { key: 'author', label: 'Tác Giả', align: 'left' as const, minWidth: '120px' },
    { key: role === 'supervisor' ? 'uploadDate' : 'createdDate', label: role === 'supervisor' ? 'Ngày Tải Lên' : 'Ngày Tạo Lần', align: 'left' as const, minWidth: '110px' },
    { key: 'status', label: 'Trạng Thái', align: role === 'supervisor' ? 'center' as const : 'left' as const, minWidth: '150px' },
    { key: 'actions', label: 'Thao tác', align: role === 'supervisor' ? 'center' as const : 'left' as const, minWidth: '120px' }
  ];

  const filterColumns = [
    { key: 'code', type: 'text' as const, placeholder: 'Nhập mã tài liệu' },
    { key: 'title', type: 'text' as const, placeholder: 'Nhập tên tài liệu' },
    { key: 'type', type: 'date' as const, placeholder: 'Ngày lập BC' },
    { 
      key: 'classification', 
      type: 'select' as const, 
      placeholder: role === 'supervisor' ? 'Tất cả' : 'Tìm cả',
      options: [
        { value: 'Công khai', label: 'Công khai' },
        { value: 'Nội bộ', label: 'Nội bộ' },
        { value: 'Hạn chế', label: 'Hạn chế' },
        { value: 'Mật', label: 'Mật' }
      ]
    },
    { key: 'author', type: 'text' as const, placeholder: role === 'supervisor' ? 'Nhập tên tác giả' : 'Nhập tác giả' },
    { key: 'createdDate', type: 'date' as const, placeholder: 'Chọn ngày' },
    { 
      key: 'status', 
      type: 'select' as const, 
      placeholder: role === 'supervisor' ? 'Tất cả' : 'Tìm cả',
      options: role === 'supervisor' 
        ? [
            { value: 'approved', label: 'Đã phê duyệt' },
            { value: 'rejected', label: 'Từ chối' },
            { value: 'pending', label: 'Chờ phê duyệt' }
          ]
        : [
            { value: 'approved', label: 'Đã phê duyệt' },
            { value: 'draft', label: 'Nhập' },
            { value: 'pending', label: 'Chờ phê duyệt' },
            { value: 'rejected', label: 'Từ chối' }
          ]
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(documents.map(doc => doc.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để xóa');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setDocuments(documents.filter(doc => !selectedItems.includes(doc.id)));
    setSelectedItems([]);
    setIsDeleteModalOpen(false);
  };

  const handleSubmitToSuperior = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để nộp lên cấp trên');
      return;
    }
    setIsSubmitModalOpen(true);
  };

  const confirmSubmit = () => {
    setDocuments(docs => docs.map(doc => 
      selectedItems.includes(doc.id) ? { ...doc, status: 'pending' as const } : doc
    ));
    setSelectedItems([]);
    setIsSubmitModalOpen(false);
  };

  const handleApprove = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để phê duyệt');
      return;
    }
    setIsApproveModalOpen(true);
  };

  const confirmApprove = () => {
    setDocuments(docs => docs.map(doc => 
      selectedItems.includes(doc.id) ? { ...doc, status: 'approved' as const } : doc
    ));
    setSelectedItems([]);
    setIsApproveModalOpen(false);
  };

  const handleReject = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để từ chối');
      return;
    }
    setIsRejectModalOpen(true);
  };

  const confirmReject = () => {
    setDocuments(docs => docs.map(doc => 
      selectedItems.includes(doc.id) ? { ...doc, status: 'rejected' as const } : doc
    ));
    setSelectedItems([]);
    setIsRejectModalOpen(false);
  };

  const handleExport = () => {
    alert('Đang xuất danh sách...');
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      code: '',
      title: '',
      type: '',
      classification: '',
      author: '',
      createdDate: '',
      status: ''
    });
  };

  // Convert Document to ContentFormData for modals
  const convertToContentFormData = (doc: Document): Partial<ContentFormData> => {
    // Try to find extended document data
    const extendedDoc = (doc as any).contentData;
    
    if (extendedDoc) {
      // If we have full content data, use it
      return extendedDoc;
    }
    
    // Fallback: create basic structure from simple document
    return {
      type: 'SACH', // Default
      common: {
        code: doc.code,
        title: doc.title,
        classification: doc.classification as any,
        authors: [doc.author],
        summary: 'Thông tin tóm tắt chưa được cập nhật.',
        language: 'Tiếng Việt',
      },
      sourceMetadata: {
        sourceType: 'INTERNAL',
        rights: 'NOI_BO',
      },
      specific: {
        publishYear: '2024',
        publisher: 'Chưa cập nhật',
        hasTranslation: false,
      },
      fileMetadata: {
        fileName: 'document.pdf',
        fileSize: 1024000,
        fileFormat: 'PDF',
      },
    };
  };

  // Modal handlers
  const handleView = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      setSelectedDocument(doc);
      setIsViewContentModalOpen(true);
    }
  };

  const handleEdit = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      setSelectedDocument(doc);
      setIsEditContentModalOpen(true);
    }
  };

  const handleDocumentDelete = (documentId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
      setDocuments(documents.filter(d => d.id !== documentId));
    }
  };

  const handleDocumentSubmit = (documentId: string) => {
    // In real app, call API to submit document to supervisor
    alert(`Nộp tài liệu ${documentId} lên cấp trên thành công!`);
    // Optionally update document status to 'pending'
  };

  const handleDocumentApprove = (documentId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === documentId ? { ...doc, status: 'approved' as const } : doc
    ));
    setIsViewContentModalOpen(false);
  };

  const handleDocumentReject = (documentId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === documentId ? { ...doc, status: 'rejected' as const } : doc
    ));
    setIsViewContentModalOpen(false);
  };

  const handleDocumentCancel = (documentId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === documentId ? { ...doc, status: 'draft' as const } : doc
    ));
    setIsViewContentModalOpen(false);
  };

  return (
    <div className="bg-[#f5f5f5] flex-1 overflow-auto">
      <div className="p-[16px]">
        {/* Page Title and Action Buttons */}
        <div className="bg-white rounded-[8px] p-[16px] mb-[16px] flex items-center justify-between gap-[10px] flex-wrap border border-[#e5e7eb]">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            {pageTitle}
          </h1>
          <div className="flex gap-[10px] flex-wrap">
            <Button
              onClick={handleDeleteSelected}
              icon={<DeleteIcon />}
              label="Xóa"
              variant="outline"
              size="md"
            />
            {role === 'subordinate' ? (
              <Button
                onClick={handleSubmitToSuperior}
                icon={<Upload size={18} />}
                label="Nộp cấp trên"
                variant="outline"
                size="md"
              />
            ) : (
              <>
                <Button
                  onClick={handleReject}
                  label="Từ chối"
                  variant="outline"
                  size="md"
                />
                <Button
                  onClick={handleApprove}
                  label="Phê duyệt"
                  variant="outline"
                  size="md"
                />
              </>
            )}
            <Button
              onClick={handleExport}
              icon={<FileDown size={20} />}
              label="Xuất danh sách"
              variant="outline"
              size="md"
            />
            <Button
              onClick={() => setIsAddContentModalOpen(true)}
              icon={<AddIcon />}
              label="Thêm mới"
              variant="primary"
              size="md"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[16px]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <TableHeader
                  columns={tableColumns}
                  showCheckbox={true}
                  allChecked={selectedItems.length === documents.length && documents.length > 0}
                  onCheckAll={handleSelectAll}
                />
                
                <TableFilterRow
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  showCheckbox={true}
                  columns={filterColumns}
                />
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                    <td className="px-[16px] py-[12px] text-center">
                      <CustomCheckbox
                        checked={selectedItems.includes(doc.id)}
                        onChange={(checked) => handleSelectItem(doc.id, checked)}
                      />
                    </td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{doc.code}</td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{doc.title}</td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{doc.type}</td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{doc.classification}</td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">{doc.author}</td>
                    <td className="px-[16px] py-[12px] text-[14px] text-[#111827]">
                      {role === 'supervisor' ? doc.uploadDate : doc.createdDate}
                    </td>
                    <td className={`px-[16px] py-[12px] ${role === 'supervisor' ? 'text-center' : ''}`}>
                      {role === 'supervisor' ? (
                        <StatusBadge status={doc.status as 'approved' | 'rejected' | 'pending'} />
                      ) : (
                        <SubordinateStatusBadge status={doc.status} />
                      )}
                    </td>
                    <td className={`px-[16px] py-[12px] ${role === 'supervisor' ? 'text-center' : ''}`}>
                      {role === 'supervisor' ? (
                        <TableActionsCell 
                          documentId={doc.id}
                          onView={handleView}
                          onApprove={handleDocumentApprove}
                          onReject={handleDocumentReject}
                        />
                      ) : (
                        <SubordinateTableActionsCell 
                          documentId={doc.id}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDocumentDelete}
                          onSubmit={handleDocumentSubmit}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TableFooter
            selectedCount={selectedItems.length}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={documents.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>

      {/* Modals */}
      {role === 'subordinate' ? (
        <>
          <SubmitDocumentModal
            isOpen={isSubmitModalOpen}
            onClose={() => setIsSubmitModalOpen(false)}
            onConfirm={confirmSubmit}
            documentName={`${selectedItems.length} tài liệu`}
            targetName="cấp trên"
          />
          <DeleteDocumentModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            documentName={`${selectedItems.length} tài liệu`}
          />
        </>
      ) : (
        <>
          <RejectDocumentModal
            isOpen={isRejectModalOpen}
            onClose={() => setIsRejectModalOpen(false)}
            onConfirm={confirmReject}
            documentName={`${selectedItems.length} tài liệu`}
          />
          <ApproveDocumentModal
            isOpen={isApproveModalOpen}
            onClose={() => setIsApproveModalOpen(false)}
            onConfirm={confirmApprove}
            documentName={`${selectedItems.length} tài liệu`}
          />
          <DeleteDocumentModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            documentName={`${selectedItems.length} tài liệu`}
          />
        </>
      )}

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={() => setIsAddContentModalOpen(false)}
        onSuccess={() => {
          setIsAddContentModalOpen(false);
          // Refresh document list here
        }}
      />

      {/* Edit Content Modal */}
      {selectedDocument && (
        <EditContentModal
          isOpen={isEditContentModalOpen}
          onClose={() => {
            setIsEditContentModalOpen(false);
            setSelectedDocument(null);
          }}
          onSuccess={() => {
            setIsEditContentModalOpen(false);
            setSelectedDocument(null);
            // Refresh document list here
          }}
          documentId={selectedDocument.id}
          initialData={convertToContentFormData(selectedDocument)}
        />
      )}

      {/* View Content Modal */}
      {selectedDocument && (
        <ViewContentModal
          isOpen={isViewContentModalOpen}
          onClose={() => {
            setIsViewContentModalOpen(false);
            setSelectedDocument(null);
          }}
          data={convertToContentFormData(selectedDocument)}
          role={role}
          onApprove={role === 'supervisor' ? () => handleDocumentApprove(selectedDocument.id) : undefined}
          onReject={role === 'supervisor' ? () => handleDocumentReject(selectedDocument.id) : undefined}
          onCancel={role === 'supervisor' ? () => handleDocumentCancel(selectedDocument.id) : undefined}
        />
      )}
    </div>
  );
}
