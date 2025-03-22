
/**
 * This hook is deprecated and will be removed in a future version.
 * Section ordering functionality has been removed.
 * @deprecated Use the new section management system instead
 */
export const useMoveSectionHook = () => {
  return () => {
    console.log('Section ordering functionality has been removed');
    return Promise.resolve();
  };
};
