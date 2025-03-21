
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/constants/authConstants';

/**
 * Logs in a user with the provided password
 */
export const loginUser = async (password: string): Promise<boolean> => {
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
        
        // If the error indicates the user doesn't exist or invalid credentials, 
        // assume it's the first login and try to create the user
        if (error.message.includes('Invalid login credentials')) {
          console.log('User does not exist in Supabase. Attempting to create the admin user...');
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            options: {
              // Bypass email confirmation for admin user
              emailRedirectTo: `${window.location.origin}/admin/case-studies`
            }
          });
          
          if (signUpError) {
            // If we hit a rate limit, inform the user but consider it a partial success
            if (signUpError.message.includes('rate limit') || signUpError.status === 429) {
              toast.warning('Email sending rate limited. Please wait a few minutes and try again.');
              return false;
            }
            
            console.error('Failed to create admin user:', signUpError);
            toast.error('Failed to create admin user: ' + signUpError.message);
            return false;
          }
          
          if (signUpData.user) {
            toast.success('Admin user created. You can now log in.');
            // For new signups, we'll count this as success even without immediate login
            // Since they may need to confirm their email first
            return true;
          }
        }
        
        toast.error('Authentication failed: ' + error.message);
        return false;
      }
      
      // Successfully authenticated with Supabase
      console.log('Successfully authenticated with Supabase:', data.session ? 'Session created' : 'No session');
      return true;
    } catch (error: any) {
      console.error('Exception during login:', error);
      toast.error('An error occurred during login: ' + (error.message || 'Unknown error'));
      return false;
    }
  }
  return false;
};

/**
 * Logs out the current user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut();
    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

/**
 * Verifies if the user is authenticated with Supabase
 */
export const verifySupabaseAuthentication = async (): Promise<boolean> => {
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch (error) {
    console.error('Error verifying Supabase authentication:', error);
    return false;
  }
};
