
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Use the same admin credentials consistently across the application
// These must match the credentials in Supabase
export const ADMIN_EMAIL = 'admin@example.com';
export const ADMIN_PASSWORD = 'admin123';
const AUTH_STORAGE_KEY = 'admin_authenticated';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      
      // Attempt to sync with Supabase session
      supabase.auth.getSession().then(({ data }) => {
        if (!data.session) {
          // If no Supabase session exists but we're locally authenticated,
          // attempt to sign in to Supabase silently
          supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
          }).catch(error => {
            console.error("Failed to sync Supabase session:", error);
          });
        }
      });
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      
      // Also authenticate with Supabase when logging in
      supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      }).catch(error => {
        console.error("Supabase login failed:", error);
      });
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    
    // Also sign out from Supabase
    supabase.auth.signOut().catch(error => {
      console.error("Supabase logout failed:", error);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
