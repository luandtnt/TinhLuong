import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useRole } from '../../contexts/RoleContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { role } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute: Current role:', role, 'Path:', location.pathname);

  useEffect(() => {
    // If no role is selected and not on login page, redirect to login
    if (!role && location.pathname !== '/login') {
      console.log('⚠️ ProtectedRoute: No role found, redirecting to login');
      navigate('/login');
    }
  }, [role, navigate, location.pathname]);

  // If no role, don't render children (will redirect in useEffect)
  if (!role && location.pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}
