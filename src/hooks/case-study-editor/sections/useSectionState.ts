
import { useRef, useCallback } from 'react';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';
import { useOpenSections } from './useOpenSections';
import { useSectionInitHook } from './hooks/useSectionInitHook';
import { useAddSectionHook } from './hooks/useAddSectionHook';
import { useRemoveSectionHook } from './hooks/useRemoveSectionHook';
import { useTogglePublishedHook } from './hooks/useTogglePublishedHook';
import { useSectionStorage } from './useSectionStorage';

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
  
  // Initialize sections state with sections from Supabase
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
  
  // Use a ref to indicate if we're currently updating to prevent infinite loops
  const isUpdatingRef = useRef(false);
  
  // Create all the section operation hooks with memoized callbacks
  const addSection = useAddSectionHook(caseStudyId, sections, setSections, setOpenSections);
  const removeSection = useRemoveSectionHook(setSections, setOpenSections);
  const toggleSectionPublished = useTogglePublishedHook(setSections);
  
  // Create a set of valid section IDs and clean up orphaned openSections
  const validSectionIds = new Set(sections.map(section => section.id));
  cleanupOrphanedSections(validSectionIds);

  // Return memoized callbacks to prevent infinite re-renders
  const addSectionCallback = useCallback((type: string) => {
    return addSection(type);
  }, [addSection]);

  const removeSectionCallback = useCallback((id: string) => {
    removeSection(id);
  }, [removeSection]);

  const toggleSectionPublishedCallback = useCallback((id: string, published: boolean) => {
    toggleSectionPublished(id, published);
  }, [toggleSectionPublished]);
  
  // Return the public API for the hook with stable function references
  return {
    sections,
    openSections,
    toggleSection,
    addSection: addSectionCallback,
    removeSection: removeSectionCallback,
    toggleSectionPublished: toggleSectionPublishedCallback
  };
};
