
/**
 * Utility functions related to authentication.
 * Note: Admin functionality has been removed, these are kept for compatibility.
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Check if the app is using local auth mode (deprecated)
 */
export const isLocalAuthMode = (): boolean => {
  // Always false since admin functionality is removed
  return false;
};

/**
 * Check if the user is authenticated with Supabase (deprecated)
 */
export const checkSupabaseAuth = async (): Promise<boolean> => {
  // Always false since admin functionality is removed
  return false;
};
