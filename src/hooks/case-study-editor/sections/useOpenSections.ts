
import { useOpenSections as useComponentOpenSections } from '@/components/case-study-editor/sections/hooks/useOpenSections';

export const useOpenSections = (sessionStorageKey?: string) => {
  // Default storage key for backwards compatibility
  const defaultStorageKey = 'case-study-sections-open-state';
  return useComponentOpenSections(sessionStorageKey || defaultStorageKey);
};
