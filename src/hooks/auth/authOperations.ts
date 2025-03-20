
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_STORAGE_KEY } from '@/constants/authConstants';

// Check if we're using local auth only mode
const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';

/**
 * Attempts to verify if Supabase authentication is working
 */
export const verifySupabaseAuthentication = async (): Promise<boolean> => {
  // If we're in local auth only mode, don't try to verify with Supabase
  if (isLocalAuthOnly) {
    console.log('Local auth only mode is enabled. Skipping Supabase authentication verification.');
    return true;
  }
  
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

/**
 * Logs in a user with the provided password
 */
export const loginUser = async (password: string): Promise<boolean> => {
  if (password === ADMIN_PASSWORD) {
    try {
      // In local auth only mode, skip Supabase authentication
      if (isLocalAuthOnly) {
        console.log('Local auth only mode enabled. Skipping Supabase authentication.');
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        return true;
      }
      
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
            localStorage.setItem(AUTH_STORAGE_KEY, 'true');
            return true;
          }
          
          // Successfully authenticated after creating user
          console.log('Successfully created and authenticated admin user with Supabase.');
          localStorage.setItem(AUTH_STORAGE_KEY, 'true');
          return true;
        }
        
        // Try local authentication as a fallback for development
        console.log('Proceeding with local-only authentication as a fallback.');
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        return true;
      }
      
      // Successfully authenticated with Supabase
      console.log('Successfully authenticated with Supabase:', data.session ? 'Session created' : 'No session');
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    } catch (error: any) {
      console.error('Exception during login:', error);
      toast.error('An error occurred during login: ' + (error.message || 'Unknown error'));
      
      // For development purposes, allow local authentication even on error
      console.log('Proceeding with local-only authentication as a fallback after error.');
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
  }
  return false;
};

/**
 * Logs out the current user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    // Sign out from Supabase (if not in local auth only mode)
    if (!isLocalAuthOnly) {
      await supabase.auth.signOut();
    }
    
    // Update local authentication state
    localStorage.removeItem(AUTH_STORAGE_KEY);
    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
