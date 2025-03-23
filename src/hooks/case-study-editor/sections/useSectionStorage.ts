
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SectionResponse } from './types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook for persisting sections to Supabase
 */
export const useSectionStorage = (caseStudyId: string | null) => {
  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch sections from Supabase
  const fetchSections = useCallback(async () => {
    if (!caseStudyId) {
      console.log('useSectionStorage: No caseStudyId provided, setting empty sections');
      setIsLoading(false);
      setSections([]);
      return;
    }
    
    console.log(`useSectionStorage: Fetching sections for case study ${caseStudyId}`);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId);
      
      if (error) {
        console.error('useSectionStorage: Error fetching sections from database:', error);
        setError(error.message);
        setIsLoading(false);
        return;
      }
      
      console.log(`useSectionStorage: Fetched ${data?.length || 0} sections from database`);
      if (data && data.length > 0) {
        console.log('useSectionStorage: First few sections:', data.slice(0, 2));
      }
      setSections(data || []);
    } catch (err) {
      console.error('useSectionStorage: Exception fetching sections:', err);
      setError('Failed to fetch sections');
    } finally {
      setIsLoading(false);
    }
  }, [caseStudyId]);
  
  // Initial load of sections
  useEffect(() => {
    console.log('useSectionStorage: Initial load effect triggered');
    fetchSections();
  }, [fetchSections]);
  
  // Save sections to Supabase
  const persistSections = useCallback(async (updatedSections: SectionResponse[]) => {
    if (!caseStudyId) {
      console.warn('useSectionStorage: Cannot save sections: No case study ID provided');
      return;
    }
    
    console.log(`useSectionStorage: Saving ${updatedSections.length} sections to database`);
    
    try {
      // We'll use upsert to handle both inserts and updates
      const { error } = await supabase
        .from('case_study_sections')
        .upsert(
          updatedSections.map(section => ({
            ...section,
            case_study_id: caseStudyId
          })),
          { onConflict: 'id' }
        );
      
      if (error) {
        console.error('useSectionStorage: Error saving sections to database:', error);
        toast.error('Error saving sections: ' + error.message);
        setError(error.message);
        return;
      }
      
      console.log('useSectionStorage: Sections saved successfully to database');
      // After successful save, immediately refresh the sections to ensure UI consistency
      fetchSections();
    } catch (err) {
      console.error('useSectionStorage: Exception saving sections:', err);
      toast.error('Error saving sections to database');
      setError('Failed to save sections');
    }
  }, [caseStudyId, fetchSections]);
  
  // Implement a refresh function
  const refresh = useCallback(() => {
    console.log('useSectionStorage: Refreshing sections from database');
    fetchSections();
  }, [fetchSections]);
  
  return {
    sections,
    setSections: persistSections,
    isLoading,
    error,
    refresh
  };
};
