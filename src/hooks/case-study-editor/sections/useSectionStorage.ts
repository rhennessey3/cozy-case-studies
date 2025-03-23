
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
      setIsLoading(false);
      setSections([]);
      return;
    }
    
    console.log(`Fetching sections for case study ${caseStudyId}`);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId);
      
      if (error) {
        console.error('Error fetching sections from database:', error);
        setError(error.message);
        setIsLoading(false);
        return;
      }
      
      console.log(`Fetched ${data?.length || 0} sections from database`);
      setSections(data || []);
    } catch (err) {
      console.error('Exception fetching sections:', err);
      setError('Failed to fetch sections');
    } finally {
      setIsLoading(false);
    }
  }, [caseStudyId]);
  
  // Initial load of sections
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);
  
  // Save sections to Supabase
  const persistSections = useCallback(async (updatedSections: SectionResponse[]) => {
    if (!caseStudyId) {
      console.warn('Cannot save sections: No case study ID provided');
      return;
    }
    
    console.log(`Saving ${updatedSections.length} sections to database`);
    
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
        console.error('Error saving sections to database:', error);
        setError(error.message);
        return;
      }
      
      console.log('Sections saved successfully to database');
    } catch (err) {
      console.error('Exception saving sections:', err);
      setError('Failed to save sections');
    }
  }, [caseStudyId]);
  
  // Implement a refresh function
  const refresh = useCallback(() => {
    console.log('Refreshing sections from database');
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
