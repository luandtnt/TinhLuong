import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRole } from '../contexts/RoleContext';
import { authenticateUser } from '../data/mockUsers';
import { Eye, EyeOff } from 'lucide-react';
import loginBg from '../assets/login_bg_3.png';
import logoVptwd from '../assets/logo_vptwd.png';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useRole();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const user = authenticateUser(username, password);
      
      if (user) {
        setUser(user);
        navigate('/dashboard');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '29px' }}>
        <img 
          src={logoVptwd} 
          alt="Logo" 
          style={{ height: '70px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* Login Card - 592px width (1.1x) */}
      <div style={{ width: '100%', maxWidth: '592px', margin: '0 auto' }}>
        <div 
          style={{
            backgroundColor: 'white',
            borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            padding: '56px 42px'
          }}
        >
          {/* Title */}
          <h1 
            style={{
              fontSize: '32px',
              fontWeight: '800',
              textAlign: 'center',
              color: '#1a1a1a',
              marginBottom: '42px'
            }}
          >
            Đăng nhập
          </h1>

          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div style={{ marginBottom: '29px' }}>
              <label
                htmlFor="username"
                style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '11px'
                }}
              >
                Tên tài khoản
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên tài khoản"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 14px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  backgroundColor: 'white',
                  border: '1px solid #d0d0d0',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#b9000e';
                  e.target.style.boxShadow = '0 0 0 2px rgba(185, 0, 14, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d0d0d0';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '29px' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '11px'
                }}
              >
                Mật khẩu
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 42px 0 14px',
                    fontSize: '15px',
                    color: '#1a1a1a',
                    backgroundColor: 'white',
                    border: '1px solid #d0d0d0',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#b9000e';
                    e.target.style.boxShadow = '0 0 0 2px rgba(185, 0, 14, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d0d0d0';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Links Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '29px' }}>
              <button
                type="button"
                onClick={() => alert('Chức năng đổi mật khẩu')}
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#555',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#b9000e';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#555';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Đổi mật khẩu
              </button>
              <button
                type="button"
                onClick={() => alert('Chức năng quên mật khẩu')}
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#555',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#b9000e';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#555';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Quên mật khẩu
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ padding: '11px', backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '7px', marginBottom: '21px' }}>
                <p style={{ fontSize: '14px', color: '#b91c1c', textAlign: 'center', margin: 0, fontWeight: '500' }}>{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: isLoading ? '#d4001a' : '#b9000e',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(185, 0, 14, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#9a0000';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(185, 0, 14, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#b9000e';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(185, 0, 14, 0.3)';
                }
              }}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>

      {/* Demo Accounts Info */}
      <div style={{ marginTop: '21px', width: '100%', maxWidth: '592px' }}>
        <details style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '7px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', padding: '14px' }}>
          <summary style={{ fontSize: '14px', color: '#666', cursor: 'pointer', fontWeight: '500', textAlign: 'center' }}>
            Tài khoản demo
          </summary>
          <div style={{ marginTop: '11px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '7px 11px', borderRadius: '5px' }}>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>Lãnh đạo:</span>
              <code style={{ fontFamily: 'monospace', color: '#b9000e', fontSize: '12px' }}>lanhdao1 / 123456</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '7px 11px', borderRadius: '5px' }}>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>Chuyên viên:</span>
              <code style={{ fontFamily: 'monospace', color: '#b9000e', fontSize: '12px' }}>chuyenvien1 / 123456</code>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
