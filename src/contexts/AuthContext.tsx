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
        // If error is that user doesn't exist, try to create the user
        if (error.message.includes('Invalid login credentials')) {
          console.log('User does not exist in Supabase. Attempting to create the admin user...');
          
          // Try to sign up with admin credentials
          const { error: signUpError } = await supabase.auth.signUp({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
          });
          
          if (signUpError) {
            console.error('Failed to create admin user:', signUpError);
            return false;
          }
          
          // Try to authenticate again
          const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
          });
          
          if (retryError) {
            console.error('Failed to authenticate after creating admin user:', retryError);
            return false;
          }
          
          return !!retryData.session;
        }
        
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
        console.log('Initializing auth state...');
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
          console.log('Auth state changed:', event, newSession ? 'User is signed in' : 'No user');
          setSession(newSession);
          setUser(newSession?.user ?? null);
        });

        // Check local authentication status
        const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
        
        if (authStatus === 'true') {
          // First set authenticated to true based on local storage
          setIsAuthenticated(true);
          
          // Get current Supabase session
          const { data } = await supabase.auth.getSession();
          
          // If no active Supabase session, attempt to sign in
          if (!data.session) {
            console.log('No active Supabase session found but local auth is true. Attempting to sign in...');
            const canAuthenticate = await verifySupabaseAuthentication();
            
            if (!canAuthenticate) {
              console.log('Failed to authenticate with Supabase despite local auth. Not resetting auth state to maintain local functionality.');
              // We keep isAuthenticated as true to allow local functionality to work
              // This is a development convenience
            } else {
              console.log('Successfully authenticated with Supabase.');
            }
          } else {
            console.log('Active Supabase session found and local auth is true.');
          }
        } else {
          // No local authentication, ensure we're signed out from Supabase too
          await supabase.auth.signOut();
          setIsAuthenticated(false);
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
        
        console.log('Password correct. Attempting to sign in with Supabase...');
        
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD
        });
        
        if (error) {
          console.error('Supabase login failed:', error);
          
          // If the error indicates the user doesn't exist, try to create it
          if (error.message.includes('Invalid login credentials')) {
            console.log('User does not exist in Supabase. Attempting to create the admin user...');
            
            // Try to sign up with admin credentials
            const { error: signUpError } = await supabase.auth.signUp({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD
            });
            
            if (signUpError) {
              console.error('Failed to create admin user:', signUpError);
              
              // If we can't create the user, we'll still allow local authentication
              console.log('Proceeding with local-only authentication as a fallback.');
              setIsAuthenticated(true);
              localStorage.setItem(AUTH_STORAGE_KEY, 'true');
              return true;
            }
            
            // Try to authenticate again
            const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD
            });
            
            if (retryError) {
              console.error('Failed to authenticate after creating admin user:', retryError);
              
              // If we still can't authenticate, just use local auth
              console.log('Proceeding with local-only authentication as a fallback.');
              setIsAuthenticated(true);
              localStorage.setItem(AUTH_STORAGE_KEY, 'true');
              return true;
            }
            
            // Successfully authenticated after creating user
            console.log('Successfully created and authenticated admin user with Supabase.');
            setIsAuthenticated(true);
            localStorage.setItem(AUTH_STORAGE_KEY, 'true');
            return true;
          }
          
          // Try local authentication as a fallback for development
          console.log('Proceeding with local-only authentication as a fallback.');
          setIsAuthenticated(true);
          localStorage.setItem(AUTH_STORAGE_KEY, 'true');
          return true;
        }
        
        // Successfully authenticated with Supabase
        console.log('Successfully authenticated with Supabase:', data.session ? 'Session created' : 'No session');
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        return true;
      } catch (error: any) {
        console.error('Exception during login:', error);
        toast.error('An error occurred during login: ' + (error.message || 'Unknown error'));
        
        // For development purposes, allow local authentication even on error
        console.log('Proceeding with local-only authentication as a fallback after error.');
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        return true;
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
