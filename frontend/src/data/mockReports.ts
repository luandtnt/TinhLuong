// Mock data for reports

export interface DocumentStatistics {
  id: string;
  documentType: string;
  totalViews: number;
  totalDownloads: number;
  totalComments: number;
  totalRatings: number;
  notes?: string;
}

export interface MonthlyUsageData {
  month: string;
  documentCount: number;
}

export const mockDocumentStatistics: DocumentStatistics[] = [
  {
    id: '1',
    documentType: 'Tài liệu về Lịch sử Đảng',
    totalViews: 1250,
    totalDownloads: 450,
    totalComments: 85,
    totalRatings: 120,
  },
  {
    id: '2',
    documentType: 'Tài liệu Đảng kỳ',
    totalViews: 980,
    totalDownloads: 320,
    totalComments: 65,
    totalRatings: 95,
  },
  {
    id: '3',
    documentType: 'Tài liệu Điều lệ Đảng',
    totalViews: 1450,
    totalDownloads: 580,
    totalComments: 110,
    totalRatings: 145,
  },
  {
    id: '4',
    documentType: 'Sách chính trị',
    totalViews: 2100,
    totalDownloads: 890,
    totalComments: 175,
    totalRatings: 220,
  },
  {
    id: '5',
    documentType: 'Văn kiện Đảng toàn tập',
    totalViews: 1680,
    totalDownloads: 620,
    totalComments: 95,
    totalRatings: 150,
  },
  {
    id: '6',
    documentType: 'Giới thiệu văn kiện Đảng',
    totalViews: 890,
    totalDownloads: 280,
    totalComments: 45,
    totalRatings: 70,
  },
  {
    id: '7',
    documentType: 'Văn kiện Đại hội Đảng',
    totalViews: 1920,
    totalDownloads: 750,
    totalComments: 140,
    totalRatings: 185,
  },
  {
    id: '8',
    documentType: 'Tài liệu Hội nghị BCH Trung ương',
    totalViews: 1340,
    totalDownloads: 510,
    totalComments: 88,
    totalRatings: 125,
  },
];

export const mockMonthlyUsage: MonthlyUsageData[] = [
  { month: 'Tháng 1', documentCount: 325 },
  { month: 'Tháng 2', documentCount: 318 },
  { month: 'Tháng 3', documentCount: 435 },
  { month: 'Tháng 4', documentCount: 512 },
  { month: 'Tháng 5', documentCount: 340 },
  { month: 'Tháng 6', documentCount: 390 },
  { month: 'Tháng 7', documentCount: 465 },
  { month: 'Tháng 8', documentCount: 540 },
  { month: 'Tháng 9', documentCount: 620 },
];
