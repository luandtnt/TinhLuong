import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MockUser } from '../data/mockUsers';

export type UserRole = 'supervisor' | 'subordinate' | null;

interface RoleContextType {
  role: UserRole;
  user: MockUser | null;
  setRole: (role: UserRole) => void;
  setUser: (user: MockUser | null) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  // Initialize role from localStorage
  const [role, setRoleState] = useState<UserRole>(() => {
    console.log('🚀 RoleProvider v2.0: Initializing...');
    const savedRole = localStorage.getItem('userRole');
    console.log('🔍 RoleProvider: Reading from localStorage:', savedRole);
    // Validate that savedRole is a valid UserRole
    if (savedRole === 'supervisor' || savedRole === 'subordinate') {
      console.log('✅ RoleProvider: Valid role found:', savedRole);
      return savedRole;
    }
    console.log('❌ RoleProvider: No valid role, returning null');
    return null;
  });

  // Initialize user from localStorage
  const [user, setUserState] = useState<MockUser | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Mark as initialized after first render
    setIsInitialized(true);
    console.log('✨ RoleProvider: Initialized with role:', role, 'user:', user?.username);
  }, []);

  // Custom setRole that also saves to localStorage
  const setRole = (newRole: UserRole) => {
    console.log('📝 RoleProvider: Setting role to:', newRole);
    setRoleState(newRole);
    if (newRole === null) {
      console.log('🗑️ RoleProvider: Removing role from localStorage');
      localStorage.removeItem('userRole');
    } else {
      console.log('💾 RoleProvider: Saving role to localStorage:', newRole);
      localStorage.setItem('userRole', newRole);
    }
  };

  // Custom setUser that also saves to localStorage
  const setUser = (newUser: MockUser | null) => {
    console.log('📝 RoleProvider: Setting user to:', newUser?.username);
    setUserState(newUser);
    if (newUser === null) {
      localStorage.removeItem('currentUser');
    } else {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      // Also set role based on user
      setRole(newUser.role);
    }
  };

  // Logout function
  const logout = () => {
    console.log('👋 RoleProvider: Logging out');
    setRoleState(null);
    setUserState(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
  };

  // Don't render children until initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <RoleContext.Provider value={{ role, user, setRole, setUser, logout }}>
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
