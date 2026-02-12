import { useNavigate } from 'react-router';
import { useRole } from '../contexts/RoleContext';
import { Users, UserCheck } from 'lucide-react';

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleRoleSelect = (selectedRole: 'supervisor' | 'subordinate') => {
    setRole(selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b9000e] via-[#d4021a] to-[#b9000e] flex items-center justify-center p-4">
      <div className="w-full max-w-[900px]">
        {/* Header */}
        <div className="text-center mb-[48px]">
          <h1 className="text-[32px] md:text-[40px] font-bold text-white mb-[12px] leading-tight">
            Hệ thống CSDL Lý Luận Chính Trị
          </h1>
        </div>

        {/* Role Selection Cards */}
        <div className="mb-[32px]">
          <p className="text-center text-[16px] text-white font-medium mb-[24px]">
            Vui lòng chọn vai trò của bạn để tiếp tục
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {/* Supervisor Card */}
            <button
              onClick={() => handleRoleSelect('supervisor')}
              className="bg-white rounded-[12px] p-[32px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex flex-col items-center gap-[20px]">
                <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#b9000e] to-[#d4021a] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck size={40} className="text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-[24px] font-bold text-[#111827] mb-[8px]">
                    Lãnh đạo
                  </h3>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed">
                    Phê duyệt và quản lý tài liệu<br />
                    từ chuyên viên
                  </p>
                </div>
                <div className="mt-[8px] px-[24px] py-[10px] bg-[#b9000e] text-white rounded-[8px] font-medium text-[14px] group-hover:bg-[#9a000c] transition-colors">
                  Chọn vai trò này
                </div>
              </div>
            </button>

            {/* Subordinate Card */}
            <button
              onClick={() => handleRoleSelect('subordinate')}
              className="bg-white rounded-[12px] p-[32px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex flex-col items-center gap-[20px]">
                <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#6b7280] to-[#4b5563] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={40} className="text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-[24px] font-bold text-[#111827] mb-[8px]">
                    Chuyên viên
                  </h3>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed">
                    Tạo mới và nộp tài liệu<br />
                    lên lãnh đạo
                  </p>
                </div>
                <div className="mt-[8px] px-[24px] py-[10px] bg-[#6b7280] text-white rounded-[8px] font-medium text-[14px] group-hover:bg-[#4b5563] transition-colors">
                  Chọn vai trò này
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-[14px] text-white/80">
            Hệ thống CSDL Lý Luận Chính Trị - Phiên bản 1.0
          </p>
        </div>
      </div>
    </div>
  );
}