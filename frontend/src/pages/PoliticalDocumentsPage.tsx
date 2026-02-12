import { useState } from 'react';
import { Search, Download, Edit, Eye } from 'lucide-react';
import { AddDataSourceModal } from '../features/data-sources/components/AddDataSourceModal';
import { EditDataSourceModal } from '../features/data-sources/components/EditDataSourceModal';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { DeleteIcon } from '../components/icons/DeleteIcon';

interface Document {
  id: string;
  code: string;
  name: string;
  dateAdded: string;
}

export function PoliticalDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', code: '', name: 'Nhấp để báo cáo', dateAdded: 'Ngày lập BC' },
    { id: '2', code: '/BC056T', name: 'Văn bản lý luận chính trị', dateAdded: '09/08/2025' },
    { id: '3', code: '/BC056T', name: 'Văn bản lý luận chính trị', dateAdded: '18/02/2024' },
    { id: '4', code: '/BC051HH', name: 'Văn bản lý luận chính trị', dateAdded: '02/05/2025' },
    { id: '5', code: '/BC056T', name: 'Văn bản lý luận chính trị', dateAdded: '03/02/2025' },
    { id: '6', code: '/BC051HH', name: 'Văn bản lý luận chính trị', dateAdded: '30/08/2024' },
    { id: '7', code: '/BC051HH', name: 'Văn bản lý luận chính trị', dateAdded: '14/09/2025' },
    { id: '8', code: '/BC051HH', name: 'Văn bản lý luận chính trị', dateAdded: '20/03/2025' },
    { id: '9', code: '/BC051HH', name: 'Văn bản lý luận chính trị', dateAdded: '01/05/2025' },
    { id: '10', code: '/BC056T', name: 'Văn bản lý luận chính trị', dateAdded: '09/10/2025' },
    { id: '11', code: '/BC056T', name: 'Văn bản lý luận chính trị', dateAdded: '09/02/2024' },
    { id: '12', code: '/BC051HH', name: 'Văn bản lý luận chính trị', dateAdded: '09/01/2024' },
  ]);

  const totalPages = Math.ceil(documents.length / itemsPerPage);

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

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa văn bản này?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để xóa');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.length} văn bản đã chọn?`)) {
      setDocuments(documents.filter(doc => !selectedItems.includes(doc.id)));
      setSelectedItems([]);
    }
  };

  const handleEdit = (doc: Document) => {
    setEditingDocument(doc);
    setShowEditModal(true);
  };

  const handleExport = () => {
    alert('Đang xuất danh sách...');
  };

  const handleApprove = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để phê duyệt');
      return;
    }
    alert(`Đã phê duyệt ${selectedItems.length} văn bản`);
  };

  const handleReject = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một mục để từ chối');
      return;
    }
    alert(`Đã từ chối ${selectedItems.length} văn bản`);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header - Using Custom Header Component */}
        <div className="border-b border-gray-200">
          <PageHeader
            onDelete={handleDeleteSelected}
            onReject={handleReject}
            onApprove={handleApprove}
            onExport={handleExport}
            onAddNew={() => setShowAddModal(true)}
          />
        </div>

        {/* Toolbar */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Không tìm kiếm nền tảm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-[14px] w-[300px] outline-none focus:border-[#b9000e]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleDeleteSelected}
              icon={<DeleteIcon />}
              label="Xóa"
              variant="outline"
              size="md"
            />
            <Button
              onClick={handleExport}
              icon={<Download size={16} />}
              label="Xuất danh sách"
              variant="outline"
              size="md"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-[50px] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === documents.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#b9000e] focus:ring-[#b9000e]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#111827] uppercase tracking-wide">
                  MÃ VĂN BẢN
                </th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#111827] uppercase tracking-wide">
                  TÊN VĂN BẢN
                </th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#111827] uppercase tracking-wide">
                  NGÀY THÊM
                </th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#111827] uppercase tracking-wide">
                  THAO TÁC
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(doc.id)}
                      onChange={(e) => handleSelectItem(doc.id, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#b9000e] focus:ring-[#b9000e]"
                    />
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#111827]">
                    {index === 0 ? (
                      <span className="text-gray-400 italic">{doc.code || 'Nhấp để báo cáo'}</span>
                    ) : (
                      doc.code
                    )}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#111827]">{doc.name}</td>
                  <td className="px-4 py-3 text-[14px] text-[#111827]">
                    {index === 0 ? (
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <rect x="3" y="4" width="10" height="10" rx="1" stroke="#6B7280" strokeWidth="1.5" />
                          <path d="M5 2V4M11 2V4M3 7H13" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="text-gray-400">{doc.dateAdded}</span>
                        <button className="text-[#b9000e] font-medium hover:underline ml-2">
                          Xóa bộ lọc
                        </button>
                      </div>
                    ) : (
                      doc.dateAdded
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Edit"
                      >
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Download"
                      >
                        <Download size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center gap-2 text-[14px] text-[#6b7280]">
            <span>Đã chọn: {selectedItems.length} bản ghi | Hiển thị</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#b9000e]"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>Tổng: 12 bản ghi</span>
          </div>

          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-[14px] text-[#6b7280] hover:bg-gray-100 rounded">
              Đến trang
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1 rounded ${currentPage === 1
                ? 'bg-[#b9000e] text-white'
                : 'border border-gray-300 hover:bg-gray-50'
                }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-1 rounded ${currentPage === 2
                ? 'bg-[#b9000e] text-white'
                : 'border border-gray-300 hover:bg-gray-50'
                }`}
            >
              2
            </button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              15
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddDataSourceModal onClose={() => setShowAddModal(false)} />}
      {showEditModal && editingDocument && (
        <EditDataSourceModal
          document={editingDocument}
          onClose={() => {
            setShowEditModal(false);
            setEditingDocument(null);
          }}
        />
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-[#b9000e] text-white w-14 h-14 rounded-full shadow-lg hover:bg-[#9a000c] transition-colors flex items-center justify-center"
        aria-label="Add new document"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}