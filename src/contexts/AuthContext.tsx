
import React, { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth';

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
  // Admin functionality has been removed
  const authValues = {
    isAuthenticated: false,
    login: async () => false,
    logout: async () => {},
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};
