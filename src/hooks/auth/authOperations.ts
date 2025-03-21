
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
        
        // Check if we need to create the user
        if (error.message.includes('Invalid login credentials')) {
          try {
            console.log('User does not exist in Supabase. Attempting to create the admin user...');
            
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD,
              options: {
                // Make sure the redirect goes to the admin page after email confirmation
                emailRedirectTo: `${window.location.origin}/admin/case-studies`
              }
            });
            
            if (signUpError) {
              // Special handling for rate limit errors
              if (signUpError.message.includes('rate limit') || signUpError.status === 429) {
                console.warn('Hit email rate limit when creating admin user');
                toast.warning('Email sending rate limited. Please wait a few minutes and try again.');
                return false;
              }
              
              console.error('Failed to create admin user:', signUpError);
              toast.error('Failed to create admin user: ' + signUpError.message);
              return false;
            }
            
            if (signUpData.user) {
              console.log('Admin user created successfully. Email confirmation may be required.');
              toast.success('Admin user created. Please check your email for confirmation link or disable email confirmation in Supabase settings.');
              // For new signups, return success but let user know about confirmation
              return true;
            }
          } catch (signUpException: any) {
            console.error('Exception during admin user creation:', signUpException);
            toast.error('Error creating admin account: ' + (signUpException.message || 'Unknown error'));
            return false;
          }
        } else if (error.message.includes('Email not confirmed')) {
          toast.warning('Email not confirmed. Please check your inbox for a confirmation email.');
          return false;
        } else {
          toast.error('Authentication failed: ' + error.message);
          return false;
        }
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
