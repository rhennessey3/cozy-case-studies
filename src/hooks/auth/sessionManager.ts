
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

/**
 * Initializes authentication state and sets up listeners
 */
export const useSessionManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('Initializing auth state with Supabase...');
        
        // Set up auth state change listener
        const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
          console.log('Auth state changed:', event, newSession ? 'User is signed in' : 'No user');
          setSession(newSession);
          setUser(newSession?.user ?? null);
          setIsAuthenticated(!!newSession);
        });
        
        // Get current Supabase session
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData.session);
        setUser(sessionData.session?.user ?? null);
        setIsAuthenticated(!!sessionData.session);

        return () => {
          data.subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error during auth initialization:', error);
      } finally {
        setInitializing(false);
      }
    };
    
    initAuth();
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated,
    initializing,
    session,
    user
  };
};
