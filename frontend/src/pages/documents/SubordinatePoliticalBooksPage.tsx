import { DocumentListPage } from '../../components/common/DocumentListPage';

const mockDocuments = [
  { id: '1', code: 'SCT01', title: 'Chủ nghĩa Mác - Lênin', type: 'Sách', classification: 'Công khai', author: 'NXB Chính trị Quốc gia', createdDate: '05/02/2025', status: 'approved' as const },
  { id: '2', code: 'SCT02', title: 'Tư tưởng Hồ Chí Minh', type: 'Sách', classification: 'Công khai', author: 'NXB Chính trị Quốc gia', createdDate: '12/04/2024', status: 'draft' as const },
  { id: '3', code: 'SCT03', title: 'Kinh tế chính trị Mác - Lênin', type: 'Sách', classification: 'Công khai', author: 'NXB Chính trị Quốc gia', createdDate: '18/07/2025', status: 'rejected' as const },
  { id: '4', code: 'SCT04', title: 'Chủ nghĩa xã hội khoa học', type: 'Sách', classification: 'Nội bộ', author: 'NXB Chính trị Quốc gia', createdDate: '25/09/2025', status: 'pending' as const },
];

export function SubordinatePoliticalBooksPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách Sách chính trị"
      role="subordinate"
      initialDocuments={mockDocuments}
    />
  );
}
