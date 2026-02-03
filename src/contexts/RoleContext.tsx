import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'supervisor' | 'subordinate' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  // Initialize role from localStorage
  const [role, setRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || null;
  });

  // Custom setRole that also saves to localStorage
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === null) {
      localStorage.removeItem('userRole');
    } else {
      localStorage.setItem('userRole', newRole);
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
