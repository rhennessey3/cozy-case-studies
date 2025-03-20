
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Session, User } from '@supabase/supabase-js';

// Use the same admin credentials consistently across the application
// These must match the credentials in Supabase
export const ADMIN_EMAIL = 'admin@example.com';
export const ADMIN_PASSWORD = 'admin123';
const AUTH_STORAGE_KEY = 'admin_authenticated';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Function to verify if we can authenticate with Supabase
  const verifySupabaseAuthentication = async (): Promise<boolean> => {
    try {
      // Clear any existing session first
      await supabase.auth.signOut();
      
      // Try to authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });
      
      if (error) {
        console.error('Supabase authentication verification failed:', error);
        return false;
      }
      
      return !!data.session;
    } catch (error) {
      console.error('Exception during Supabase authentication verification:', error);
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
          console.log('Auth state changed:', event, newSession ? 'User is signed in' : 'No user');
          setSession(newSession);
          setUser(newSession?.user ?? null);
        });

        // Check local authentication status
        const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
        
        if (authStatus === 'true') {
          setIsAuthenticated(true);
          
          // Get current Supabase session
          const { data } = await supabase.auth.getSession();
          
          // If no active Supabase session, attempt to sign in
          if (!data.session) {
            console.log('No active Supabase session found but local auth is true. Attempting to sign in...');
            const canAuthenticate = await verifySupabaseAuthentication();
            
            if (!canAuthenticate) {
              console.log('Failed to authenticate with Supabase despite local auth. Resetting auth state.');
              setIsAuthenticated(false);
              localStorage.removeItem(AUTH_STORAGE_KEY);
            }
          } else {
            console.log('Active Supabase session found and local auth is true.');
          }
        } else {
          // No local authentication, ensure we're signed out from Supabase too
          await supabase.auth.signOut();
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error during auth initialization:', error);
      } finally {
        setInitializing(false);
      }
    };
    
    initAuth();
  }, []);

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      try {
        // First, ensure we're signed out
        await supabase.auth.signOut();
        
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD
        });
        
        if (error) {
          console.error('Supabase login failed:', error);
          
          // Check if this is a login issue with Supabase only
          const supportsAutoLogin = await verifySupabaseAuthentication();
          
          if (!supportsAutoLogin) {
            // Supabase login consistently fails - might need to set up the account
            toast.error(`Supabase authentication failed. Please ensure the admin account is set up in Supabase.`);
            return false;
          }
        }
        
        // Update local authentication state regardless of Supabase result
        // This allows local development to proceed even if Supabase auth has issues
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        console.log('Login successful - local authentication completed');
        
        // If Supabase session is established, log it
        if (data.session) {
          console.log('Supabase authentication also successful');
        }
        
        return true;
      } catch (error: any) {
        console.error('Exception during login:', error);
        toast.error('An error occurred during login: ' + (error.message || 'Unknown error'));
        return false;
      }
    }
    return false;
  };

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Update local authentication state
      setIsAuthenticated(false);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      console.log('Logout successful - both local and Supabase sessions cleared');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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
