import { ReactNode } from 'react';
import { useRole } from '../../contexts/RoleContext';

interface RoleBasedRouteProps {
  supervisorComponent: ReactNode;
  subordinateComponent: ReactNode;
}

export function RoleBasedRoute({ supervisorComponent, subordinateComponent }: RoleBasedRouteProps) {
  const { role } = useRole();

  if (role === 'supervisor') {
    return <>{supervisorComponent}</>;
  }

  if (role === 'subordinate') {
    return <>{subordinateComponent}</>;
  }

  // Fallback (shouldn't happen due to ProtectedRoute)
  return null;
}
