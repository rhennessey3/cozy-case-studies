
import { useState } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from './types/sectionTypes';
import { useOpenSections } from '@/components/case-study-editor/sections/hooks/useOpenSections';
import { useSectionStorage } from './useSectionStorage';
import { isAdminRoute } from '@/hooks/isAdminRoute';
import { useSectionInitialization } from './hooks/useSectionInitialization';
import { useSectionPersistence } from './hooks/useSectionPersistence';
import { useSectionHandlers } from './hooks/useSectionHandlers';
import { useSyncWithOpenSections } from './hooks/useSyncWithOpenSections';

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
  
  console.log('Supabase sections loaded:', supabaseSections?.length || 0, 'loading state:', supabaseLoading);
  
  // Initialize section state using the dedicated hook
  const {
    sections,
    setSections,
    initialized,
    lastValidSectionsRef
  } = useSectionInitialization(caseStudyId, supabaseSections, supabaseLoading);
  
  // Track whether we're in an admin route for additional logging
  const isAdmin = isAdminRoute();
  console.log('Route context:', isAdmin ? 'ADMIN' : 'PUBLIC');
  
  // Session storage key for UI state
  const sessionStorageKey = `case-study-sections-${caseStudyId || 'new'}`;
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections(sessionStorageKey);
  
  // Sync with Supabase and provide refresh mechanism
  const { refresh } = useSectionPersistence(
    sections,
    caseStudyId,
    initialized,
    saveToSupabase,
    refreshFromSupabase
  );
  
  // Create section operation handlers
  const {
    addSection,
    removeSection,
    toggleSectionPublished
  } = useSectionHandlers(
    sections,
    setSections,
    setOpenSections,
    lastValidSectionsRef,
    caseStudyId
  );
  
  // Sync sections with open sections state
  useSyncWithOpenSections(sections, cleanupOrphanedSections);

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
