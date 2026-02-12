import { DocumentListPage } from '../../components/common/DocumentListPage';

const mockDocuments = [
  { id: '1', code: 'HNBCH01', title: 'Nghị quyết Hội nghị BCH Trung ương lần thứ 1', type: 'Nghị quyết', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '15/01/2025', uploadDate: '15/01/2025', status: 'approved' as const },
  { id: '2', code: 'HNBCH02', title: 'Nghị quyết Hội nghị BCH Trung ương lần thứ 2', type: 'Nghị quyết', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '20/03/2025', uploadDate: '20/03/2025', status: 'approved' as const },
  { id: '3', code: 'HNBCH03', title: 'Nghị quyết Hội nghị BCH Trung ương lần thứ 3', type: 'Nghị quyết', classification: 'Nội bộ', author: 'Ban Chấp hành Trung ương', createdDate: '25/05/2025', uploadDate: '25/05/2025', status: 'rejected' as const },
];

export function CentralCommitteeMeetingPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách Hội nghị BCH Trung ương"
      role="supervisor"
      initialDocuments={mockDocuments}
    />
  );
}
