
import { supabase } from '@/integrations/supabase/client';

export const AUTH_STORAGE_KEY = 'admin_authenticated';

/**
 * Check if we're in local auth mode
 */
export const isLocalAuthMode = (): boolean => {
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
  const localAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
  
  return isLocalAuthOnly || localAuthState === 'true';
};

/**
 * Check if the user is authenticated via Supabase
 */
export const checkSupabaseAuth = async (): Promise<boolean> => {
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch (error) {
    console.error('Error checking Supabase auth:', error);
    return false;
  }
};
