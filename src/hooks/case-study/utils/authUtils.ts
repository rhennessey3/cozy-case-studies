
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if the user is authenticated via Supabase
 * @returns Promise that resolves to whether the user is authenticated
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

/**
 * @deprecated Local auth mode is no longer supported
 * @returns Always returns false since we only use Supabase auth now
 */
export const isLocalAuthMode = (): boolean => {
  return false;
};
