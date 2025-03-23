
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
    if (!caseStudyId) {
      console.warn('useSectionStorage: Cannot save sections without case study ID');
      return;
    }
    
    console.log(`useSectionStorage: Saving ${updatedSections.length} sections`);
    
    // Debug: Log titles of alignment sections before saving
    const alignmentSections = updatedSections.filter(s => s.component === 'alignment');
    if (alignmentSections.length > 0) {
      console.log('Alignment sections before saving:', alignmentSections.map(s => ({
        id: s.id,
        title: s.title || '[No title]'
      })));
    }
    
    try {
      const success = await persistSections(updatedSections, caseStudyId);
      
      if (success) {
        console.log('useSectionStorage: Sections saved successfully, now verifying');
        
        // Verify storage specifically for alignment sections
        const alignmentSections = await verifySectionSave(caseStudyId, 'alignment');
        
        if (alignmentSections) {
          console.log(`useSectionStorage: Verified ${alignmentSections.length} alignment sections`);
          
          // Debug: Log the verified alignment section titles
          console.log('Verified alignment section titles:', 
            alignmentSections.map((s: any) => ({
              id: s.id,
              title: s.title || '[No title]'
            }))
          );
        }
        
        // Refresh sections after successful save
        console.log('useSectionStorage: Refreshing sections from database after save');
        fetchSections();
        
        toast.success('Sections saved');
      } else {
        console.error('useSectionStorage: Failed to save sections');
        toast.error('Failed to save sections');
      }
    } catch (err) {
      console.error('useSectionStorage: Exception in setSections:', err);
      toast.error('Error saving sections to database');
      setError('Failed to save sections');
    }
  }, [caseStudyId, fetchSections, persistSections, verifySectionSave]);
  
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
