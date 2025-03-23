
import { useEffect, useRef } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { mapSectionWithOrdersToSectionResponses } from '../utils/sectionResponseMapper';

/**
 * Hook to handle persistence of sections to Supabase
 * This is a simplified version that uses the refactored useSectionStorage hooks
 */
export const useSectionPersistence = (
  caseStudyId: string | null,
  sections: SectionWithOrder[],
  saveToSupabase: (sections: SectionResponse[]) => Promise<void>,
  initialized: boolean
) => {
  // Use refs to track update state
  const isUpdatingRef = useRef(false);
  
  // Save to Supabase when sections change
  useEffect(() => {
    if (caseStudyId && sections.length > 0 && initialized && !isUpdatingRef.current) {
      console.log('useSectionPersistence: Saving sections to Supabase:', sections.length);
      isUpdatingRef.current = true;
      
      // Convert sections from SectionWithOrder to SectionResponse before saving
      const sectionResponses = mapSectionWithOrdersToSectionResponses(sections, caseStudyId);
      saveToSupabase(sectionResponses);
      
      // Reset the updating flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);
  
  return {
    isUpdatingRef
  };
};
