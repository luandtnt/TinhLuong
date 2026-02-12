import { DocumentListPage } from '../../components/common/DocumentListPage';

const mockDocuments = [
  { id: '1', code: 'VKDH01', title: 'Văn kiện Đại hội Đảng lần thứ XII', type: 'Văn kiện', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '20/01/2025', uploadDate: '20/01/2025', status: 'approved' as const },
  { id: '2', code: 'VKDH02', title: 'Văn kiện Đại hội Đảng lần thứ XIII', type: 'Văn kiện', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '25/02/2025', uploadDate: '25/02/2025', status: 'approved' as const },
  { id: '3', code: 'VKDH03', title: 'Báo cáo chính trị Đại hội XIII', type: 'Văn kiện', classification: 'Công khai', author: 'Ban Chấp hành Trung ương', createdDate: '10/04/2025', uploadDate: '10/04/2025', status: 'pending' as const },
];

export function PartyCongressPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách Văn kiện Đại hội Đảng"
      role="supervisor"
      initialDocuments={mockDocuments}
    />
  );
}
