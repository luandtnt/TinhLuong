import { useState } from 'react';
import { mockMonthlyUsage } from '../../data/mockReports';
import { Button } from '../../components/common/Button';
import { Download } from 'lucide-react';

export function UsageReport() {
  const [usageData] = useState(mockMonthlyUsage);
  const [year, setYear] = useState('');
  const [showReport, setShowReport] = useState(false);

  const maxValue = Math.max(...usageData.map(d => d.documentCount));
  const chartHeight = 350;
  const chartWidth = 900;
  const padding = { top: 20, right: 40, bottom: 60, left: 60 };
  const barWidth = 50;
  const barSpacing = (chartWidth - padding.left - padding.right - (barWidth * usageData.length)) / (usageData.length - 1);

  const handleExport = () => {
    console.log('Xuất báo cáo');
  };

  const handleViewReport = () => {
    if (!year) {
      alert('Vui lòng chọn năm báo cáo');
      return;
    }
    setShowReport(true);
  };

  return (
    <div className="p-[24px]">
      {/* Input Form */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[32px] mb-[16px]">
        <h2 className="text-[18px] font-semibold text-[#111827] mb-[24px]">
          Thông tin báo cáo
        </h2>
        
        <div className="mb-[28px]">
          <label className="block text-[14px] font-medium text-[#111827] mb-[8px]">
            Năm báo cáo <span className="text-[#b9000e]">*</span>
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full max-w-[300px] px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
          >
            <option value="">Chọn năm</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className="flex justify-center mt-[8px]">
          <Button
            variant="primary"
            label="Xem báo cáo"
            onClick={handleViewReport}
            className="px-[32px]"
          />
        </div>
      </div>

      {/* Export Button - Only show after viewing report */}
      {showReport && (
        <div className="flex justify-center mb-[16px]">
          <Button
            variant="primary"
            label="Xuất báo cáo"
            icon={<Download size={16} />}
            onClick={handleExport}
            className="px-[32px]"
          />
        </div>
      )}

      {/* Report Content - Only show after clicking "Xem báo cáo" */}
      {showReport && (
        <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[32px]">
          {/* Header */}
          <div className="mb-[28px]">
            <h1 className="text-[20px] font-bold text-[#111827] mb-[20px]">
              Báo cáo sử dụng khai thác tài liệu
            </h1>
            <div className="text-[14px] text-[#111827]">
              <span className="font-medium">Năm:</span>
              <span className="ml-[8px] font-semibold">{year}</span>
            </div>
          </div>

          {/* Chart */}
          <div className="border border-[#e5e7eb] rounded-[8px] p-[32px] bg-white mb-[32px]">
            <div className="mb-[20px] flex items-center gap-[8px]">
              <div className="w-[12px] h-[12px] bg-[#0066ff] rounded-[2px]"></div>
              <span className="text-[14px] font-medium text-[#111827]">Số lượng tài liệu</span>
            </div>

            {/* SVG Chart */}
            <div className="flex justify-center">
              <svg width={chartWidth} height={chartHeight + padding.top + padding.bottom} className="overflow-visible">
                {/* Grid lines */}
                <g>
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const y = padding.top + chartHeight - (chartHeight * ratio);
                    return (
                      <g key={i}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <text
                          x={padding.left - 10}
                          y={y + 4}
                          textAnchor="end"
                          fontSize="12"
                          fill="#6b7280"
                        >
                          {Math.round(maxValue * ratio)}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Y-axis */}
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={padding.top + chartHeight}
                  stroke="#111827"
                  strokeWidth="2"
                />

                {/* X-axis */}
                <line
                  x1={padding.left}
                  y1={padding.top + chartHeight}
                  x2={chartWidth - padding.right}
                  y2={padding.top + chartHeight}
                  stroke="#111827"
                  strokeWidth="2"
                />

                {/* Bars */}
                {usageData.map((data, index) => {
                  const x = padding.left + index * (barWidth + barSpacing);
                  const barHeight = (data.documentCount / maxValue) * chartHeight;
                  const y = padding.top + chartHeight - barHeight;

                  return (
                    <g key={index}>
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill="#0066ff"
                        className="hover:fill-[#0052cc] cursor-pointer transition-colors"
                      >
                        <title>{data.documentCount} tài liệu</title>
                      </rect>

                      {/* Value label on top of bar */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 5}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#111827"
                        fontWeight="500"
                      >
                        {data.documentCount}
                      </text>

                      {/* X-axis label */}
                      <text
                        x={x + barWidth / 2}
                        y={padding.top + chartHeight + 20}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#6b7280"
                      >
                        {data.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Chart Title */}
            <div className="text-center mt-[20px]">
              <p className="text-[14px] font-medium text-[#111827]">
                SỐ LƯỢNG TÀI LIỆU TĂNG TRƯỞNG THEO CÁC THÁNG TRONG NĂM
              </p>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="mt-[28px] grid grid-cols-3 gap-[20px]">
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] p-[20px]">
              <div className="text-[14px] text-[#6b7280] mb-[4px]">Tổng số tài liệu</div>
              <div className="text-[24px] font-bold text-[#111827]">
                {usageData.reduce((sum, d) => sum + d.documentCount, 0).toLocaleString('vi-VN')}
              </div>
            </div>
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] p-[20px]">
              <div className="text-[14px] text-[#6b7280] mb-[4px]">Trung bình/tháng</div>
              <div className="text-[24px] font-bold text-[#111827]">
                {Math.round(usageData.reduce((sum, d) => sum + d.documentCount, 0) / usageData.length).toLocaleString('vi-VN')}
              </div>
            </div>
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] p-[20px]">
              <div className="text-[14px] text-[#6b7280] mb-[4px]">Tháng cao nhất</div>
              <div className="text-[24px] font-bold text-[#111827]">
                {usageData.reduce((max, d) => d.documentCount > max.documentCount ? d : max).month}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
