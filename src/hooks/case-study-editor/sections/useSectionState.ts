
import { useRef } from 'react';
import { SectionResponse } from './types/sectionTypes';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { useOpenSections } from './useOpenSections';
import { useSectionStorage } from './useSectionStorage';
import { useAddSectionHook } from './hooks/useAddSectionHook';
import { useRemoveSectionHook } from './hooks/useRemoveSectionHook';
import { useMoveSectionHook } from './hooks/useMoveSectionHook';
import { useTogglePublishedHook } from './hooks/useTogglePublishedHook';
import { useSectionInitHook } from './hooks/useSectionInitHook';
import { useSyncWithOpenSections } from './hooks/useSyncWithOpenSections';
import { 
  mapSectionResponseToSectionWithOrder, 
  mapSectionResponsesToSectionWithOrders,
  mapSectionWithOrdersToSectionResponses 
} from './utils/sectionResponseMapper';

/**
 * Main hook for managing sections state
 */
export const useSectionState = (caseStudyId: string | null = null) => {
  // Use Supabase for section data persistence
  const { 
    sections: supabaseSections, 
    setSections: saveToSupabase,
    isLoading: supabaseLoading
  } = useSectionStorage(caseStudyId);
  
  // Initialize sections state
  const {
    sections,
    setSections,
    initialized
  } = useSectionInitHook(caseStudyId, supabaseSections, supabaseLoading);
  
  // Reference to track last valid sections
  const lastValidSectionsRef = useRef<SectionResponse[]>([]);
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections();
  
  // Sync sections with open sections state
  useSyncWithOpenSections(sections, cleanupOrphanedSections);
  
  // Use refs for handler functions to ensure they don't change between renders
  const isUpdatingRef = useRef(false);
  
  // Save to Supabase when sections change
  const handleSectionsChange = (updatedSections: SectionResponse[]) => {
    if (caseStudyId && updatedSections.length > 0 && initialized && !isUpdatingRef.current) {
      // Handle potential type conversion before saving
      const sectionsToSave = updatedSections.map(section => {
        // Ensure all required fields are present
        return {
          ...section,
          case_study_id: section.case_study_id || caseStudyId
        };
      });
      saveToSupabase(sectionsToSave);
    }
    
    // Update the reference to last valid sections
    lastValidSectionsRef.current = updatedSections;
  };
  
  // Create all the section operation hooks
  const addSection = useAddSectionHook(caseStudyId, sections, setSections, setOpenSections);
  const removeSection = useRemoveSectionHook(setSections, setOpenSections);
  const moveSection = useMoveSectionHook(sections, setSections);
  const toggleSectionPublished = useTogglePublishedHook(setSections);
  
  // Return the public API for the hook
  return {
    sections,
    openSections,
    toggleSection,
    addSection,
    removeSection,
    moveSection,
    toggleSectionPublished
  };
};
