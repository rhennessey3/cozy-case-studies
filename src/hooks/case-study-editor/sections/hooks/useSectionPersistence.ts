
import { useEffect, useRef, useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from '../types/sectionTypes';
import { mapSectionWithOrdersToSectionResponses } from '../utils/sectionResponseMapper';

/**
 * Hook to handle saving sections to Supabase
 */
export const useSectionPersistence = (
  sections: SectionWithOrder[],
  caseStudyId: string | null,
  initialized: boolean,
  saveToSupabase: (sections: SectionResponse[]) => void,
  refreshFromSupabase: () => void
) => {
  const isUpdatingRef = useRef(false);
  
  // Save to Supabase when sections change
  useEffect(() => {
    console.log('useEffect - Section state changed, current sections:', sections.length);
    if (caseStudyId && sections.length > 0 && initialized && !isUpdatingRef.current) {
      console.log('Conditions met for saving sections to Supabase');
      isUpdatingRef.current = true;
      
      // Convert sections from SectionWithOrder to SectionResponse before saving
      const sectionResponses = mapSectionWithOrdersToSectionResponses(sections, caseStudyId);
      console.log('Mapped sections to SectionResponses for saving:', sectionResponses);
      
      saveToSupabase(sectionResponses);
      console.log('Sections saved to Supabase');
      
      setTimeout(() => {
        isUpdatingRef.current = false;
        console.log('Reset isUpdatingRef to false');
      }, 100);
    } else {
      console.log(
        'Skip saving to Supabase - conditions not met:', 
        { haveCaseStudyId: !!caseStudyId, sectionsCount: sections.length, initialized, isUpdating: isUpdatingRef.current }
      );
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);
  
  // Add explicit refresh function
  const refresh = useCallback(() => {
    console.log('Explicitly refreshing sections from database');
    if (caseStudyId) {
      refreshFromSupabase();
    }
  }, [caseStudyId, refreshFromSupabase]);
  
  return {
    isUpdatingRef,
    refresh
  };
};
