import { useState } from 'react';
import { mockDocumentStatistics } from '../../data/mockReports';
import { Button } from '../../components/common/Button';
import { Download } from 'lucide-react';

export function DocumentStatisticsReport() {
  const [statistics] = useState(mockDocumentStatistics);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [reportUnit, setReportUnit] = useState('');
  const [reportNumber, setReportNumber] = useState('');
  const [showReport, setShowReport] = useState(false);

  const totalViews = statistics.reduce((sum, item) => sum + item.totalViews, 0);
  const totalDownloads = statistics.reduce((sum, item) => sum + item.totalDownloads, 0);
  const totalComments = statistics.reduce((sum, item) => sum + item.totalComments, 0);
  const totalRatings = statistics.reduce((sum, item) => sum + item.totalRatings, 0);

  const handleExport = () => {
    console.log('Xuất báo cáo');
  };

  const handleViewReport = () => {
    if (!dateFrom || !dateTo) {
      alert('Vui lòng chọn khoảng thời gian báo cáo');
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
        
        <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[8px]">
              Đơn vị cấp trên
            </label>
            <input
              type="text"
              value={reportUnit}
              onChange={(e) => setReportUnit(e.target.value)}
              placeholder="Nhập tên đơn vị cấp trên"
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[8px]">
              Số báo cáo
            </label>
            <input
              type="text"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
              placeholder="Nhập số báo cáo"
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[24px] mb-[28px]">
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[8px]">
              Từ ngày <span className="text-[#b9000e]">*</span>
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#111827] mb-[8px]">
              Đến ngày <span className="text-[#b9000e]">*</span>
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-[12px] py-[8px] border border-[#e5e7eb] rounded-[4px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b9000e]"
            />
          </div>
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
          <div className="text-center mb-[24px]">
            <div className="flex justify-between items-start mb-[24px]">
              <div className="text-left">
                <div className="text-[14px] text-[#111827] mb-[8px]">
                  <span className="font-semibold">ĐƠN VỊ CẤP TRÊN:</span>
                  <span className="ml-[8px]">{reportUnit || '...........'}</span>
                </div>
                <div className="text-[14px] text-[#111827]">
                  <span className="font-semibold">ĐƠN VỊ BÁO CÁO:</span>
                  <span className="ml-[8px]">...........</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] text-[#111827] font-semibold mb-[4px]">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </div>
                <div className="text-[14px] text-[#111827] mb-[8px]">
                  Độc lập - Tự do - Hạnh phúc
                </div>
                <div className="text-[14px] text-[#111827] italic">
                  ..., ngày ... tháng ... năm ...
                </div>
              </div>
            </div>

            <div className="text-[14px] text-[#111827] mb-[8px]">
              <span className="font-semibold">Số:</span>
              <span className="ml-[8px]">{reportNumber || '.../.../...'}</span>
            </div>

            <h1 className="text-[18px] font-bold text-[#111827] mb-[12px]">
              BÁO CÁO THỐNG KÊ MỨC ĐỘ KHAI THÁC TÀI LIỆU
            </h1>
            <div className="text-[14px] text-[#111827] mb-[20px]">
              Từ ngày <span className="font-medium">{dateFrom ? new Date(dateFrom).toLocaleDateString('vi-VN') : '...'}</span>
              {' '}đến ngày <span className="font-medium">{dateTo ? new Date(dateTo).toLocaleDateString('vi-VN') : '...'}</span>
            </div>
          </div>

          {/* Statistics Table */}
          <div className="overflow-x-auto mb-[32px]">
            <h3 className="text-[16px] font-semibold text-[#111827] mb-[16px]">
              I. BẢNG THỐNG KÊ MỨC ĐỘ KHAI THÁC DỮ LIỆU
            </h3>
            <table className="w-full border-collapse border border-[#111827]">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="border border-[#111827] px-[12px] py-[10px] text-[14px] font-semibold text-[#111827] text-center w-[60px]">
                    STT
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[10px] text-[14px] font-semibold text-[#111827] text-left">
                    Loại tài liệu
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[10px] text-[14px] font-semibold text-[#111827] text-center w-[120px]">
                    Tổng lượt xem
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[10px] text-[14px] font-semibold text-[#111827] text-center w-[120px]">
                    Tổng lượt tải xuống
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[10px] text-[14px] font-semibold text-[#111827] text-center w-[120px]">
                    Tổng lượt bình luận
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[10px] text-[14px] font-semibold text-[#111827] text-center w-[120px]">
                    Tổng lượt đánh giá
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[10px] text-[14px] font-semibold text-[#111827] text-center w-[100px]">
                    Ghi chú
                  </th>
                </tr>
                <tr className="bg-[#f9fafb]">
                  <th className="border border-[#111827] px-[12px] py-[8px] text-[13px] font-medium text-[#6b7280] text-center">
                    A
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[8px] text-[13px] font-medium text-[#6b7280] text-center">
                    B
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[8px] text-[13px] font-medium text-[#6b7280] text-center">
                    1
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[8px] text-[13px] font-medium text-[#6b7280] text-center">
                    2
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[8px] text-[13px] font-medium text-[#6b7280] text-center">
                    3
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[8px] text-[13px] font-medium text-[#6b7280] text-center">
                    4
                  </th>
                  <th className="border border-[#111827] px-[12px] py-[8px] text-[13px] font-medium text-[#6b7280] text-center">
                    5
                  </th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                      {index + 1}
                    </td>
                    <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827]">
                      {item.documentType}
                    </td>
                    <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                      {item.totalViews.toLocaleString('vi-VN')}
                    </td>
                    <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                      {item.totalDownloads.toLocaleString('vi-VN')}
                    </td>
                    <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                      {item.totalComments.toLocaleString('vi-VN')}
                    </td>
                    <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                      {item.totalRatings.toLocaleString('vi-VN')}
                    </td>
                    <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                      {item.notes || ''}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#f9fafb] font-semibold">
                  <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                    10
                  </td>
                  <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827]">
                    Tổng
                  </td>
                  <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                    {totalViews.toLocaleString('vi-VN')}
                  </td>
                  <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                    {totalDownloads.toLocaleString('vi-VN')}
                  </td>
                  <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                    {totalComments.toLocaleString('vi-VN')}
                  </td>
                  <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                    {totalRatings.toLocaleString('vi-VN')}
                  </td>
                  <td className="border border-[#111827] px-[12px] py-[10px] text-[14px] text-[#111827] text-center">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-[64px] flex justify-between">
            <div className="text-[14px] text-[#111827]">
              <div className="font-semibold mb-[8px]">Nơi nhận:</div>
              <div className="ml-[8px]">- Như trên;</div>
              <div className="ml-[8px]">- Lưu.</div>
            </div>
            <div className="text-center text-[14px] text-[#111827]">
              <div className="font-semibold mb-[8px]">QUYỀN HẠN CHỨC VỤ NGƯỜI KÝ</div>
              <div className="italic text-[13px] text-[#6b7280]">(Ký, ghi rõ họ tên, đóng dấu)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
