
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
  const [saveInProgress, setSaveInProgress] = useState(false);
  
  // Use specialized hooks for fetching and persistence
  const { sections, isLoading, error: fetchError, fetchSections } = useSectionFetch(caseStudyId);
  const { persistSections } = useSectionPersistence();
  
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
    if (!caseStudyId) {
      console.warn('useSectionStorage: Cannot save sections without case study ID');
      return;
    }
    
    // Prevent multiple concurrent save operations
    if (saveInProgress) {
      console.log('useSectionStorage: Save already in progress, skipping');
      return;
    }
    
    setSaveInProgress(true);
    console.log(`useSectionStorage: Saving ${updatedSections.length} sections`);
    
    try {
      const success = await persistSections(updatedSections, caseStudyId);
      
      if (success) {
        console.log('useSectionStorage: Sections saved successfully, now verifying');
        
        // Refresh sections after successful save
        console.log('useSectionStorage: Refreshing sections from database after save');
        fetchSections();
        
        // Only show toast once - not every time this function is called
        toast.success('Sections saved', { id: 'sections-saved' });
      } else {
        console.error('useSectionStorage: Failed to save sections');
        toast.error('Failed to save sections', { id: 'sections-save-error' });
      }
    } catch (err) {
      console.error('useSectionStorage: Exception in setSections:', err);
      toast.error('Error saving sections to database', { id: 'sections-save-exception' });
      setError('Failed to save sections');
    } finally {
      setSaveInProgress(false);
    }
  }, [caseStudyId, fetchSections, persistSections, saveInProgress]);
  
  // Implement a refresh function
  const refresh = useCallback(() => {
    console.log('useSectionStorage: Manual refresh requested');
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
