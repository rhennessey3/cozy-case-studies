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
                // No need for email confirmation since it's disabled
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
              console.log('Admin user created successfully:', signUpData.user);
              
              // Since email confirmation is disabled, try logging in immediately
              const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
              });
              
              if (loginError) {
                console.error('Login after signup failed:', loginError);
                toast.error('Account created but login failed: ' + loginError.message);
                return false;
              }
              
              console.log('Successfully logged in after account creation');
              toast.success('Admin account created and logged in successfully');
              return true;
            }
          } catch (signUpException: any) {
            console.error('Exception during admin user creation:', signUpException);
            toast.error('Error creating admin account: ' + (signUpException.message || 'Unknown error'));
            return false;
          }
        } else if (error.message.includes('Email not confirmed')) {
          // This should no longer happen since email confirmation is disabled
          toast.warning('Your account exists but email is not confirmed. Please check your email or contact your administrator.');
          return false;
        } else {
          toast.error('Authentication failed: ' + error.message);
          return false;
        }
      }
      
      // Successfully authenticated with Supabase
      console.log('Successfully authenticated with Supabase:', data.session ? 'Session created' : 'No session');
      toast.success('Login successful');
      return true;
    } catch (error: any) {
      console.error('Exception during login:', error);
      toast.error('An error occurred during login: ' + (error.message || 'Unknown error'));
      return false;
    }
  } else {
    toast.error('Incorrect password');
    return false;
  }
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
