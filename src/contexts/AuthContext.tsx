
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  // Create the admin user in Supabase if it doesn't exist
  const createAdminUserIfNeeded = async () => {
    try {
      // First check if user exists by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });

      // If sign in fails with invalid credentials, create the user
      if (signInError && signInError.message.includes('Invalid login credentials')) {
        console.log('Admin user does not exist. Creating admin user...');
        const { error: signUpError } = await supabase.auth.signUp({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        });

        if (signUpError) {
          console.error('Failed to create admin user:', signUpError);
        } else {
          console.log('Admin user created successfully');
        }
      } else if (signInError) {
        console.error('Other sign in error:', signInError);
      } else {
        console.log('Admin user exists and credentials are valid');
        // Sign out after verification since we don't want to be logged in yet
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Error checking/creating admin user:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if admin user exists and create if needed
        await createAdminUserIfNeeded();

        // Check local authentication status
        const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
        
        if (authStatus === 'true') {
          setIsAuthenticated(true);
          
          // Get current Supabase session
          const { data } = await supabase.auth.getSession();
          
          // If no active Supabase session, attempt to sign in
          if (!data.session) {
            console.log('No active Supabase session found. Signing in with admin credentials...');
            const { error } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD
            });
            
            if (error) {
              console.error('Failed to sign in with admin credentials:', error);
              // If we can't authenticate with Supabase, reset local auth state
              setIsAuthenticated(false);
              localStorage.removeItem(AUTH_STORAGE_KEY);
              toast.error('Session expired. Please log in again.');
            } else {
              console.log('Successfully signed in with admin credentials');
            }
          } else {
            console.log('Active Supabase session found');
          }
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
      } finally {
        setInitializing(false);
      }
    };
    
    initAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session ? 'User is signed in' : 'No user');
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      try {
        // First, ensure we're signed out
        await supabase.auth.signOut();
        
        // Sign in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD
        });
        
        if (error) {
          console.error('Supabase login failed:', error);
          toast.error(`Authentication error: ${error.message}`);
          return false;
        }
        
        // Update local authentication state
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        console.log('Login successful - both local and Supabase authentication completed');
        return true;
      } catch (error) {
        console.error('Exception during login:', error);
        toast.error('An error occurred during login');
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
    // You could return a loading spinner here if needed
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
