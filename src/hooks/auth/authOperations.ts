
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
            toast.error('Failed to create admin user: ' + signUpError.message);
            return false;
          }
          
          // Try to authenticate again
          const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
          });
          
          if (retryError) {
            console.error('Failed to authenticate after creating admin user:', retryError);
            toast.error('Failed to authenticate: ' + retryError.message);
            return false;
          }
          
          // Successfully authenticated after creating user
          console.log('Successfully created and authenticated admin user with Supabase.');
          return true;
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
