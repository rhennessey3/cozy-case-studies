
import { useCallback } from 'react';

/**
 * This hook previously handled section reordering functionality
 * Now it's a no-op placeholder for backward compatibility
 * @returns A no-op function 
 */
export const useMoveSection = () => {
  return useCallback(() => {
    console.log('Section ordering functionality has been removed');
    return Promise.resolve();
  }, []);
};
