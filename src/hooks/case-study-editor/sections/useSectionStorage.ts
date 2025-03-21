
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define the interface for storing section state
interface SectionState {
  [key: string]: any;
}

export const useSectionStorage = (caseStudyId: string | null) => {
  const [sectionsState, setSectionsState] = useState<SectionState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load sections from Supabase
  const loadSections = async () => {
    if (!caseStudyId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Get the case study sections from the case_study_sections table
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('section_data')
        .eq('case_study_id', caseStudyId)
        .single();

      if (error) {
        throw new Error(`Failed to load sections: ${error.message}`);
      }

      if (data && data.section_data) {
        setSectionsState(data.section_data);
      } else {
        setSectionsState({});
      }
    } catch (err: any) {
      console.error('Error loading sections:', err);
      setError(err.message);
      setSectionsState({});
    } finally {
      setIsLoading(false);
    }
  };

  // Save sections to Supabase
  const saveSections = async (sectionData: SectionState) => {
    if (!caseStudyId) {
      return;
    }

    try {
      setError(null);

      // First check if there's an existing record
      const { data, error: checkError } = await supabase
        .from('case_study_sections')
        .select('id')
        .eq('case_study_id', caseStudyId)
        .maybeSingle();

      if (checkError) {
        throw new Error(`Failed to check for existing sections: ${checkError.message}`);
      }

      let result;
      
      if (data) {
        // Update existing record
        result = await supabase
          .from('case_study_sections')
          .update({
            section_data: sectionData,
            updated_at: new Date().toISOString()
          })
          .eq('case_study_id', caseStudyId);
      } else {
        // Insert new record
        result = await supabase
          .from('case_study_sections')
          .insert({
            case_study_id: caseStudyId,
            section_data: sectionData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
      }

      if (result.error) {
        throw new Error(`Failed to save sections: ${result.error.message}`);
      }

      setSectionsState(sectionData);
    } catch (err: any) {
      console.error('Error saving sections:', err);
      setError(err.message);
    }
  };

  // Load sections on initial render and when caseStudyId changes
  useEffect(() => {
    loadSections();
  }, [caseStudyId]);

  return {
    sectionsState,
    setSectionsState: (newState: SectionState) => {
      setSectionsState(newState);
      saveSections(newState);
    },
    isLoading,
    error,
    refresh: loadSections
  };
};
