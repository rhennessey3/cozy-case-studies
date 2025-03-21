
import { useEffect } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { mapSectionResponsesToSectionWithOrders } from '../utils/sectionResponseMapper';

/**
 * Hook to sync sections with open sections state to clean up orphaned entries
 */
export const useSyncWithOpenSections = (
  sections: SectionResponse[] | SectionWithOrder[],
  cleanupOrphanedSections: (validIds: Set<string>) => void
) => {
  useEffect(() => {
    if (sections.length > 0) {
      // Create a set of valid section IDs
      const validSectionIds = new Set(sections.map(section => section.id));
      
      // Clean up orphaned entries in openSections
      cleanupOrphanedSections(validSectionIds);
    }
  }, [sections, cleanupOrphanedSections]);
};
