import { useState } from 'react';
import { Bell, RefreshCw, User, ChevronDown, Menu, LogOut, UserCircle, Settings } from 'lucide-react';
import backgroundImage from '../../assets/nen.jpg';
import { useRole } from '../../contexts/RoleContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationCount = 3; // Example notification count
  const { user, logout } = useRole();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header
      className="h-[60px] flex items-center justify-between px-4 lg:px-6 relative shadow-md"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Left side - Menu and Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-white hover:opacity-80 transition-opacity lg:hidden"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-white text-[14px] md:text-[16px] font-medium">Trang chủ</span>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-white hover:bg-white/10 transition-all p-2 rounded-lg relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[400px] bg-white rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 text-[16px]">Thông báo</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-[14px] text-gray-800 font-medium">Bạn có tin nhắn mới</p>
                  <p className="text-[12px] text-gray-500 mt-1">5 phút trước</p>
                </div>
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-[14px] text-gray-800 font-medium">Cập nhật hệ thống</p>
                  <p className="text-[12px] text-gray-500 mt-1">1 giờ trước</p>
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer">
                  <p className="text-[14px] text-gray-800 font-medium">Thông báo bảo trì</p>
                  <p className="text-[12px] text-gray-500 mt-1">2 giờ trước</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <button 
          onClick={handleRefresh}
          className="text-white hover:bg-white/10 transition-all p-2 rounded-lg" 
          aria-label="Refresh"
        >
          <RefreshCw size={20} />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-white hover:bg-white/10 transition-all p-2 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
              <User size={18} />
            </div>
            <span className="text-[14px] font-medium hidden sm:inline">{user?.fullName || 'Admin'}</span>
            <ChevronDown size={16} className={`hidden sm:inline transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-red-50">
                <p className="font-semibold text-gray-800">{user?.fullName || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                <p className="text-xs text-gray-400 mt-1">{user?.organization || ''}</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <UserCircle size={16} />
                  Hồ sơ
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <Settings size={16} />
                  Cài đặt
                </button>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}