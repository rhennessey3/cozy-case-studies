
/**
 * @deprecated This hook is deprecated and maintained only for backwards compatibility
 * @returns A no-op function 
 */
export const useMoveSection = () => {
  return () => {
    console.log('Section ordering functionality has been removed');
    return Promise.resolve();
  };
};
