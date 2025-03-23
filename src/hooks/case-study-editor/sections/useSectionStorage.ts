
import { useState, useCallback, useEffect } from 'react';
import { SectionResponse } from './types/sectionTypes';
import { toast } from 'sonner';
import { useSectionFetch } from './storage/useSectionFetch';
import { useSectionPersistence } from './storage/useSectionPersistence';

/**
 * Hook for persisting sections to Supabase
 * This is a refactored version that delegates fetching and persistence to specialized hooks
 */
export const useSectionStorage = (caseStudyId: string | null) => {
  const [error, setError] = useState<string | null>(null);
  
  // Use specialized hooks for fetching and persistence
  const { sections, isLoading, error: fetchError, fetchSections } = useSectionFetch(caseStudyId);
  const { persistSections, verifySectionSave } = useSectionPersistence();
  
  // Initial load of sections
  useEffect(() => {
    console.log('useSectionStorage: Initial load effect triggered');
    fetchSections();
  }, [fetchSections]);
  
  // Update error state if fetch error occurs
  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    }
  }, [fetchError]);
  
  // Save sections to Supabase
  const setSections = useCallback(async (updatedSections: SectionResponse[]) => {
    try {
      const success = await persistSections(updatedSections, caseStudyId);
      
      if (success) {
        // Verify storage for alignment sections
        if (caseStudyId) {
          await verifySectionSave(caseStudyId, 'alignment');
        }
        
        // Refresh sections after successful save
        await fetchSections();
      }
    } catch (err) {
      console.error('useSectionStorage: Exception in setSections:', err);
      setError('Failed to save sections');
    }
  }, [caseStudyId, fetchSections, persistSections, verifySectionSave]);
  
  // Implement a refresh function
  const refresh = useCallback(() => {
    console.log('useSectionStorage: Refreshing sections from database');
    fetchSections();
  }, [fetchSections]);
  
  return {
    sections,
    setSections,
    isLoading,
    error,
    refresh
  };
};
