
import { useCallback, useEffect } from 'react';
import { SectionResponse } from './types/sectionTypes';
import { isAdminRoute } from '@/hooks/isAdminRoute';
import { useSectionStorage } from './useSectionStorage';
import { useSectionInitialization } from './hooks/useSectionInitialization';
import { useSectionUIState } from './hooks/useSectionUIState';
import { useSectionOperations } from './hooks/useSectionOperations';
import { useSectionPersistence } from './hooks/useSectionPersistence';

export const useSectionState = (
  caseStudyId: string | null = null
) => {
  console.log('useSectionState INIT with caseStudyId:', caseStudyId);
  
  // Use Supabase for section data persistence
  const { 
    sections: supabaseSections, 
    setSections: saveToSupabase,
    isLoading: supabaseLoading,
    refresh: refreshFromSupabase
  } = useSectionStorage(caseStudyId);
  
  // Track whether we're in an admin route for additional logging
  const isAdmin = isAdminRoute();
  console.log('Route context:', isAdmin ? 'ADMIN' : 'PUBLIC');
  
  // Initialize sections from Supabase
  const {
    sections,
    setSections,
    initialized,
    lastValidSectionsRef
  } = useSectionInitialization(supabaseSections, supabaseLoading);
  
  // Session storage key for UI state
  const sessionStorageKey = caseStudyId || 'new';
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    synchronizeOpenSections
  } = useSectionUIState(sessionStorageKey);
  
  // Sync sections with open sections state
  useEffect(() => {
    synchronizeOpenSections(sections as unknown as SectionResponse[]);
  }, [sections, synchronizeOpenSections]);
  
  // Section CRUD operations
  const {
    addSection,
    removeSection,
    toggleSectionPublished,
    refresh: operationsRefresh
  } = useSectionOperations(
    caseStudyId, 
    setSections as React.Dispatch<React.SetStateAction<SectionResponse[]>>, 
    setOpenSections,
    saveToSupabase
  );
  
  // Persist sections to Supabase
  useSectionPersistence(
    caseStudyId,
    sections,
    saveToSupabase,
    initialized
  );
  
  // Combined refresh function
  const refresh = useCallback(() => {
    console.log('useSectionState: Refreshing sections');
    refreshFromSupabase();
    operationsRefresh();
  }, [refreshFromSupabase, operationsRefresh]);
  
  // Return stable function references to prevent infinite re-renders
  return {
    sections: sections as unknown as SectionResponse[], // Cast to satisfy TypeScript
    openSections,
    toggleSection,
    addSection,
    removeSection,
    toggleSectionPublished,
    refresh
  };
};
