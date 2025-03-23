import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { useAddSectionHook } from './useAddSectionHook';
import { useRemoveSectionHook } from './useRemoveSectionHook';
import { useTogglePublishedHook } from './useTogglePublishedHook';

/**
 * Hook for section CRUD operations
 * This refactored version combines specialized hooks for better maintainability
 */
export const useSectionOperations = (
  caseStudyId: string | null,
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  saveToSupabase: (sections: SectionResponse[]) => Promise<void>
) => {
  // Use specialized hooks for different operations
  const addSectionHook = useAddSectionHook(caseStudyId, [] as SectionResponse[], setSections, setOpenSections);
  const removeSectionHook = useRemoveSectionHook(setSections, setOpenSections);
  const toggleSectionPublishedHook = useTogglePublishedHook(setSections);
  
  // Wrapper for addSection
  const addSection = useCallback(async (type: string) => {
    console.log('useSectionOperations: Adding section of type:', type);
    return addSectionHook(type as any);
  }, [addSectionHook]);
  
  // Wrapper for removeSection
  const removeSection = useCallback((id: string) => {
    console.log('useSectionOperations: Removing section:', id);
    removeSectionHook(id);
  }, [removeSectionHook]);
  
  // Wrapper for toggleSectionPublished
  const toggleSectionPublished = useCallback((id: string, published: boolean) => {
    console.log('useSectionOperations: Toggling published state:', id, published);
    toggleSectionPublishedHook(id, published);
  }, [toggleSectionPublishedHook]);
  
  // Refresh sections from database
  const refresh = useCallback(() => {
    console.log('useSectionOperations: Explicitly refreshing sections from database');
    // This is a no-op in the original implementation, keeping it for compatibility
  }, []);
  
  return {
    addSection,
    removeSection,
    toggleSectionPublished,
    refresh
  };
};
