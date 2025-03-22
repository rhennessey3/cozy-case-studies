
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
  
  // Reference to track last valid sections
  const lastValidSectionsRef = useRef<SectionResponse[]>([]);
  
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
  
  // Create a set of valid section IDs and clean up orphaned openSections
  useEffect(() => {
    const validSectionIds = new Set(sections.map(section => section.id));
    cleanupOrphanedSections(validSectionIds);
  }, [sections, cleanupOrphanedSections]);

  // Save to Supabase when sections change
  useEffect(() => {
    if (caseStudyId && initialized && sections.length > 0) {
      console.log("Saving updated sections to Supabase:", sections);
      saveToSupabase(sections);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);

  // Return memoized callbacks to prevent infinite re-renders
  const addSectionCallback = useCallback((type: SectionWithOrder['type']) => {
    console.log(`Adding section of type: ${type}`);
    return addSection(type);
  }, [addSection]);

  const removeSectionCallback = useCallback((id: string) => {
    console.log(`Removing section with ID: ${id}`);
    removeSection(id);
  }, [removeSection]);

  const toggleSectionPublishedCallback = useCallback((id: string, published: boolean) => {
    console.log(`Toggling published state for section ${id} to ${published}`);
    toggleSectionPublished(id, published);
  }, [toggleSectionPublished]);
  
  // Return the public API for the hook with stable function references
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
