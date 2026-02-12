import { DocumentListPage } from '../../components/common/DocumentListPage';

const mockDocuments = [
  { id: '1', code: 'DK01', title: 'Tài liệu Đảng kỳ lần thứ I', type: 'Tài liệu', classification: 'Công khai', author: 'Ban Tuyên giáo', createdDate: '09/09/2025', status: 'approved' as const },
  { id: '2', code: 'DK02', title: 'Tài liệu Đảng kỳ lần thứ II', type: 'Tài liệu', classification: 'Công khai', author: 'Ban Tuyên giáo', createdDate: '19/02/2024', status: 'draft' as const },
  { id: '3', code: 'DK03', title: 'Tài liệu Đảng kỳ lần thứ III', type: 'Tài liệu', classification: 'Nội bộ', author: 'Ban Tuyên giáo', createdDate: '02/05/2025', status: 'rejected' as const },
  { id: '4', code: 'DK04', title: 'Tài liệu Đảng kỳ lần thứ IV', type: 'Tài liệu', classification: 'Nội bộ', author: 'Ban Tuyên giáo', createdDate: '03/02/2025', status: 'pending' as const },
];

export function SubordinatePartyTermDocumentsPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách Tài liệu Đảng kỳ"
      role="subordinate"
      initialDocuments={mockDocuments}
    />
  );
}
