
import { useOpenSections as useHookOpenSections } from './hooks/useOpenSections';

export const useOpenSections = (sessionStorageKey?: string) => {
  // Default storage key for backwards compatibility
  const defaultStorageKey = 'case-study-sections-open-state';
  return useHookOpenSections(sessionStorageKey || defaultStorageKey);
};
