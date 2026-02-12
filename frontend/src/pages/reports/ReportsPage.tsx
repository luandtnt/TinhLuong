import { useState } from 'react';
import { DocumentStatisticsReport } from './DocumentStatisticsReport';
import { UsageReport } from './UsageReport';

type ReportType = 'statistics' | 'usage';

interface ReportMenuItem {
  id: ReportType;
  label: string;
  description: string;
}

const reportMenuItems: ReportMenuItem[] = [
  {
    id: 'statistics',
    label: 'Bảng thống kê số lượng tài liệu',
    description: 'Thống kê mức độ khai thác tài liệu',
  },
  {
    id: 'usage',
    label: 'Báo cáo sử dụng khai thác',
    description: 'Biểu đồ tăng trưởng theo tháng',
  },
];

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('statistics');

  return (
    <div className="flex h-full bg-[#f5f5f5]">
      {/* Left Sidebar - Report List */}
      <aside className="w-[320px] bg-white border-r border-[#e5e7eb] flex flex-col">
        <div className="p-[16px] border-b border-[#e5e7eb]">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Danh sách báo cáo
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-[12px]">
          <div className="space-y-[8px]">
            {reportMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedReport(item.id)}
                className={`w-full text-left p-[16px] rounded-[8px] transition-colors ${
                  selectedReport === item.id
                    ? 'bg-[#b9000e] text-white'
                    : 'bg-white border border-[#e5e7eb] hover:bg-gray-50 text-[#111827]'
                }`}
              >
                <div className="font-medium text-[14px] mb-[4px]">
                  {item.label}
                </div>
                <div className={`text-[12px] ${
                  selectedReport === item.id ? 'text-white/80' : 'text-[#6b7280]'
                }`}>
                  {item.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content - Report Display */}
      <main className="flex-1 overflow-auto">
        {selectedReport === 'statistics' && <DocumentStatisticsReport />}
        {selectedReport === 'usage' && <UsageReport />}
      </main>
    </div>
  );
}
