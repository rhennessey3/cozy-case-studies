
import { supabase } from '@/integrations/supabase/client';

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

/**
 * This function always returns false now that we're only using Supabase
 * and no longer supporting local authentication mode
 */
export const isLocalAuthMode = (): boolean => {
  // We're fully migrated to Supabase auth, so always return false
  return false;
};
