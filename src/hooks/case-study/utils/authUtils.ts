
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
