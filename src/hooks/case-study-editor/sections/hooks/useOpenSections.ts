
import { useCallback } from 'react';
import { useOpenSections as useComponentOpenSections } from '@/components/case-study-editor/sections/hooks/useOpenSections';
import { SectionResponse } from '../types/sectionTypes';

/**
 * Hook to manage the open/closed state of sections (UI state only)
 * This is a wrapper around the component-level hook to maintain separation of concerns
 */
export const useOpenSections = (sessionStorageKey: string) => {
  // Use the component-level hook
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useComponentOpenSections(sessionStorageKey);
  
  // Wrapper for synchronizing open sections with valid sections
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
    cleanupOrphanedSections,
    synchronizeOpenSections
  };
};
