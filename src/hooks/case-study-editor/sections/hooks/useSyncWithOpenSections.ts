
import { useEffect } from 'react';
import { SectionResponse } from '../types/sectionTypes';

/**
 * Hook to synchronize sections with open sections state
 */
export const useSyncWithOpenSections = (
  sections: SectionResponse[],
  cleanupOrphanedSections: (validSectionIds: Set<string>) => void
) => {
  // Clean up orphaned openSection entries when sections change
  useEffect(() => {
    if (sections.length > 0) {
      const validSectionIds = new Set(sections.map(section => section.id));
      cleanupOrphanedSections(validSectionIds);
    }
  }, [sections, cleanupOrphanedSections]);
};
