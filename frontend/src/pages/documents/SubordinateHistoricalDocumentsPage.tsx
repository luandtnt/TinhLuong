import { DocumentListPage } from '../../components/common/DocumentListPage';
import { allMockDocuments } from '../../data/mockDocuments';

export function SubordinateHistoricalDocumentsPage() {
  return (
    <DocumentListPage
      pageTitle="Danh sách tài liệu về Lịch sử Đảng"
      role="subordinate"
      initialDocuments={allMockDocuments}
    />
  );
}
