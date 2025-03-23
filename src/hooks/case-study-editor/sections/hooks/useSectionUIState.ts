
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { useOpenSections } from '@/components/case-study-editor/sections/hooks/useOpenSections';

/**
 * Hook to manage section UI state (open/closed sections)
 */
export const useSectionUIState = (sessionStorageKey: string) => {
  // Session storage key for UI state
  const storageKey = `case-study-sections-${sessionStorageKey || 'new'}`;
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections(storageKey);
  
  // Clean up orphaned sections based on valid section IDs
  const synchronizeOpenSections = useCallback((sections: SectionResponse[]) => {
    if (sections.length > 0) {
      // Create a set of valid section IDs
      const validSectionIds = new Set(sections.map(section => section.id));
      
      // Clean up orphaned entries in openSections
      cleanupOrphanedSections(validSectionIds);
    }
  }, [cleanupOrphanedSections]);
  
  return {
    openSections,
    setOpenSections,
    toggleSection,
    synchronizeOpenSections
  };
};
