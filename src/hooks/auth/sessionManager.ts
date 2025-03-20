
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';
import { verifySupabaseAuthentication } from './authOperations';

// Check if we're using local auth only mode
const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';

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
        console.log('Initializing auth state...');
        console.log('Local auth only mode:', isLocalAuthOnly ? 'enabled' : 'disabled');
        
        // Set up auth state change listener (only if not in local auth only mode)
        let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} };
        
        if (!isLocalAuthOnly) {
          const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
            console.log('Auth state changed:', event, newSession ? 'User is signed in' : 'No user');
            setSession(newSession);
            setUser(newSession?.user ?? null);
          });
          subscription = data.subscription;
        }

        // Check local authentication status
        const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
        
        if (authStatus === 'true') {
          // First set authenticated to true based on local storage
          setIsAuthenticated(true);
          
          // If we're not in local auth only mode, attempt to verify with Supabase
          if (!isLocalAuthOnly) {
            // Get current Supabase session
            const { data } = await supabase.auth.getSession();
            
            // If no active Supabase session, attempt to sign in
            if (!data.session) {
              console.log('No active Supabase session found but local auth is true. Attempting to sign in...');
              const canAuthenticate = await verifySupabaseAuthentication();
              
              if (!canAuthenticate) {
                console.log('Failed to authenticate with Supabase despite local auth. Keeping local auth functionality.');
              } else {
                console.log('Successfully authenticated with Supabase.');
              }
            } else {
              console.log('Active Supabase session found and local auth is true.');
            }
          } else {
            console.log('Using local authentication only. Skipping Supabase session check.');
          }
        } else {
          // No local authentication, ensure we're signed out from Supabase too (if not in local auth only mode)
          if (!isLocalAuthOnly) {
            await supabase.auth.signOut();
          }
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
  }, [isLocalAuthOnly]);

  return {
    isAuthenticated,
    setIsAuthenticated,
    initializing,
    session,
    user
  };
};
