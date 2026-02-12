import { DocumentListPage } from '../../components/common/DocumentListPage';

const mockDocuments = [
  { id: '1', code: 'VKDTT01', title: 'Văn kiện Đảng toàn tập - Tập 1', type: 'Văn kiện', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '10/01/2025', uploadDate: '10/01/2025', status: 'approved' as const },
  { id: '2', code: 'VKDTT02', title: 'Văn kiện Đảng toàn tập - Tập 2', type: 'Văn kiện', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '15/02/2025', uploadDate: '15/02/2025', status: 'approved' as const },
  { id: '3', code: 'VKDTT03', title: 'Văn kiện Đảng toàn tập - Tập 3', type: 'Văn kiện', classification: 'Nội bộ', author: 'Ban Chấp hành Trung ương', createdDate: '20/03/2025', uploadDate: '20/03/2025', status: 'pending' as const },
];

export function PartyDocumentsCompletePage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách Văn kiện Đảng toàn tập"
      role="supervisor"
      initialDocuments={mockDocuments}
    />
  );
}
