
import { useCallback } from 'react';

/**
 * This hook is a simplified version of the former reordering functionality
 * Now it's kept as a no-op for backward compatibility
 */
export const useMoveSectionHook = () => {
  return useCallback(() => {
    console.log('Section ordering functionality has been removed');
    return Promise.resolve();
  }, []);
};
