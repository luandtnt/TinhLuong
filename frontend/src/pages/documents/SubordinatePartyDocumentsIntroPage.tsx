import { DocumentListPage } from '../../components/common/DocumentListPage';

const mockDocuments = [
  { id: '1', code: 'GTVKD01', title: 'Giới thiệu Văn kiện Đại hội XII', type: 'Tài liệu', classification: 'Công khai', author: 'Ban Tuyên giáo Trung ương', createdDate: '08/03/2025', status: 'approved' as const },
  { id: '2', code: 'GTVKD02', title: 'Giới thiệu Văn kiện Đại hội XIII', type: 'Tài liệu', classification: 'Công khai', author: 'Ban Tuyên giáo Trung ương', createdDate: '12/05/2025', status: 'draft' as const },
  { id: '3', code: 'GTVKD03', title: 'Giới thiệu Nghị quyết Trung ương', type: 'Tài liệu', classification: 'Nội bộ', author: 'Ban Tuyên giáo Trung ương', createdDate: '18/07/2025', status: 'rejected' as const },
];

export function SubordinatePartyDocumentsIntroPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách Giới thiệu văn kiện Đảng"
      role="subordinate"
      initialDocuments={mockDocuments}
    />
  );
}
