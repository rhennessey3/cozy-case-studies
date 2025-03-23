
import { useEffect, useRef, useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from '../types/sectionTypes';
import { mapSectionWithOrdersToSectionResponses } from '../utils/sectionResponseMapper';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

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
  const lastSavedSectionsRef = useRef<string>('');
  
  // Save to Supabase when sections change
  useEffect(() => {
    console.log('useEffect - Section state changed, current sections:', sections.length);
    
    // Skip saving if we're already in the middle of an update
    if (isUpdatingRef.current) {
      console.log('Skip saving - already updating');
      return;
    }
    
    // Skip saving if no case study ID or no sections
    if (!caseStudyId || sections.length === 0 || !initialized) {
      console.log(
        'Skip saving to Supabase - conditions not met:', 
        { haveCaseStudyId: !!caseStudyId, sectionsCount: sections.length, initialized }
      );
      return;
    }
    
    // Create a string representation of sections to compare with last saved state
    const sectionsJson = JSON.stringify(sections.map(s => ({ id: s.id, title: s.title, component: s.component })));
    
    // Skip if we've already saved this exact state (prevents duplicate saves)
    if (sectionsJson === lastSavedSectionsRef.current) {
      console.log('Skip saving - sections unchanged since last save');
      return;
    }
    
    console.log('Conditions met for saving sections to Supabase');
    isUpdatingRef.current = true;
    
    // Ensure each section has a unique ID
    const sectionsWithUniqueIds = sections.map(section => {
      // If a section doesn't have an ID or has a temporary ID, generate a new UUID
      if (!section.id || section.id.startsWith('temp-')) {
        return { 
          ...section, 
          id: uuidv4(),
        };
      }
      return section;
    });
    
    // Convert sections from SectionWithOrder to SectionResponse before saving
    const sectionResponses = mapSectionWithOrdersToSectionResponses(sectionsWithUniqueIds, caseStudyId);
    console.log('Mapped sections to SectionResponses for saving:', sectionResponses);
    
    try {
      saveToSupabase(sectionResponses);
      console.log('Sections saved to Supabase');
      lastSavedSectionsRef.current = sectionsJson;
    } catch (error) {
      console.error('Error saving sections to Supabase:', error);
      toast.error('Failed to save sections to database');
    } finally {
      setTimeout(() => {
        isUpdatingRef.current = false;
        console.log('Reset isUpdatingRef to false');
      }, 300);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);
  
  // Add explicit refresh function with debounce
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const refresh = useCallback(() => {
    console.log('Explicitly refreshing sections from database');
    
    // Clear any existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    // Only refresh if we have a case study ID
    if (!caseStudyId) {
      console.log('Cannot refresh without a case study ID');
      return;
    }
    
    // Set a flag to prevent refresh loops
    if (isUpdatingRef.current) {
      console.log('Skip refresh - already updating');
      return;
    }
    
    isUpdatingRef.current = true;
    
    // Debounce the refresh
    refreshTimeoutRef.current = setTimeout(() => {
      refreshFromSupabase();
      
      // Reset the updating flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 300);
    }, 200);
  }, [caseStudyId, refreshFromSupabase]);
  
  return {
    isUpdatingRef,
    refresh
  };
};
