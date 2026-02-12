import { DocumentListPage } from '../../components/common/DocumentListPage';

const mockDocuments = [
  { id: '1', code: 'DLD01', title: 'Điều lệ Đảng Cộng sản Việt Nam', type: 'Tài liệu', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '15/01/2025', uploadDate: '15/01/2025', status: 'approved' as const },
  { id: '2', code: 'DLD02', title: 'Điều lệ Đảng (sửa đổi, bổ sung)', type: 'Tài liệu', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '20/03/2024', uploadDate: '20/03/2024', status: 'approved' as const },
  { id: '3', code: 'DLD03', title: 'Hướng dẫn thực hiện Điều lệ Đảng', type: 'Tài liệu', classification: 'Nội bộ', author: 'Ban Tổ chức Trung ương', createdDate: '10/06/2025', uploadDate: '10/06/2025', status: 'pending' as const },
];

export function PartyCharterDocumentsPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách Tài liệu Điều lệ Đảng"
      role="supervisor"
      initialDocuments={mockDocuments}
    />
  );
}
