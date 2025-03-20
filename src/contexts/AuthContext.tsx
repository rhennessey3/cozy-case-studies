
import React, { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

// Re-export constants for backward compatibility
export { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/constants/authConstants';

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, initializing, login, logout } = useSupabaseAuth();

  if (initializing) {
    // Simple loading indicator
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
