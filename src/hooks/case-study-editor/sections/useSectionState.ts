
import { useRef, useCallback, useState, useEffect } from 'react';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';
import { useOpenSections } from './useOpenSections';
import { useSectionInitHook } from './hooks/useSectionInitHook';
import { useAddSectionHook } from './hooks/useAddSectionHook';
import { useRemoveSectionHook } from './hooks/useRemoveSectionHook';
import { useTogglePublishedHook } from './hooks/useTogglePublishedHook';
import { useSectionStorage } from './useSectionStorage';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

/**
 * Main hook for managing sections state
 * @param caseStudyId The ID of the case study
 * @returns Object containing section state and operations
 */
export const useSectionState = (caseStudyId: string | null = null) => {
  // Use Supabase for section data persistence
  const { 
    sections: supabaseSections, 
    setSections: saveToSupabase,
    isLoading: supabaseLoading,
    refresh: refreshFromSupabase
  } = useSectionStorage(caseStudyId);
  
  // Initialize sections state with sections from Supabase
  const {
    sections,
    setSections,
    initialized
  } = useSectionInitHook(caseStudyId, supabaseSections, supabaseLoading);
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections();
  
  // Create all the section operation hooks with memoized callbacks
  const addSection = useAddSectionHook(caseStudyId, sections, setSections, setOpenSections);
  const removeSection = useRemoveSectionHook(setSections, setOpenSections);
  const toggleSectionPublished = useTogglePublishedHook(setSections);
  
  // Clean up orphaned openSections
  useEffect(() => {
    const validSectionIds = new Set(sections.map(section => section.id));
    cleanupOrphanedSections(validSectionIds);
  }, [sections, cleanupOrphanedSections]);

  // Save to Supabase when sections change
  useEffect(() => {
    if (caseStudyId && initialized && sections.length > 0) {
      saveToSupabase(sections);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);

  // Return memoized callbacks to prevent re-renders
  const addSectionCallback = useCallback((type: SectionWithOrder['type']) => {
    return addSection(type);
  }, [addSection]);

  const removeSectionCallback = useCallback((id: string) => {
    removeSection(id);
  }, [removeSection]);

  const toggleSectionPublishedCallback = useCallback((id: string, published: boolean) => {
    toggleSectionPublished(id, published);
  }, [toggleSectionPublished]);
  
  return {
    sections,
    openSections,
    toggleSection,
    addSection: addSectionCallback,
    removeSection: removeSectionCallback,
    toggleSectionPublished: toggleSectionPublishedCallback,
    refresh: refreshFromSupabase
  };
};
