import { DocumentListPage } from '../../components/common/DocumentListPage';
import { allMockDocuments } from '../../data/mockDocuments';

export function HistoricalDocumentsPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách tài liệu về Lịch sử Đảng"
      role="supervisor"
      initialDocuments={allMockDocuments}
    />
  );
}
