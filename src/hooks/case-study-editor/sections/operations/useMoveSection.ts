
import { useCallback } from 'react';

// Simplified hook that returns a no-op function since section ordering is removed
export const useMoveSection = () => {
  return useCallback(async () => {
    // This is now a no-op function since section ordering functionality is removed
    console.log('Section ordering functionality has been removed');
    return;
  }, []);
};
