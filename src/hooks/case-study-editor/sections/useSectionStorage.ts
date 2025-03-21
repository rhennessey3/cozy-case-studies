
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

// Define the interface for storing section state
interface SectionState {
  sections: SectionWithOrder[];
  lastUpdated: string;
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
      console.log(`Loading sections for case study ID: ${caseStudyId}`);

      // Get the case study sections container from the database
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('metadata, id')
        .eq('case_study_id', caseStudyId)
        .eq('component', 'editor_state')
        .maybeSingle();

      if (error) {
        throw new Error(`Failed to load sections: ${error.message}`);
      }

      if (data && data.metadata) {
        console.log('Loaded sections from Supabase:', data.metadata);
        setSectionsState(data.metadata as SectionState);
      } else {
        setSectionsState({
          sections: [],
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (err: any) {
      console.error('Error loading sections:', err);
      setError(err.message);
      setSectionsState({
        sections: [],
        lastUpdated: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save sections to Supabase
  const saveSections = async (sections: SectionWithOrder[]) => {
    if (!caseStudyId) {
      console.log('No case study ID, skipping save');
      return;
    }

    try {
      setError(null);
      console.log(`Saving ${sections.length} sections for case study ID: ${caseStudyId}`);

      const sectionState: SectionState = {
        sections,
        lastUpdated: new Date().toISOString()
      };

      // First check if there's an existing record
      const { data, error: checkError } = await supabase
        .from('case_study_sections')
        .select('id')
        .eq('case_study_id', caseStudyId)
        .eq('component', 'editor_state')
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
            metadata: sectionState,
            content: 'Editor state storage',
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id);
      } else {
        // Insert new record
        result = await supabase
          .from('case_study_sections')
          .insert({
            case_study_id: caseStudyId,
            component: 'editor_state',
            title: 'Editor State',
            content: 'Editor state storage',
            metadata: sectionState,
            sort_order: 0,
            published: false // This is just internal state, should not be published
          });
      }

      if (result.error) {
        throw new Error(`Failed to save sections: ${result.error.message}`);
      }

      console.log('Sections saved successfully to Supabase');
      setSectionsState(sectionState);
    } catch (err: any) {
      console.error('Error saving sections:', err);
      setError(err.message);
      toast.error(`Failed to save section data: ${err.message}`);
    }
  };

  // Load sections on initial render and when caseStudyId changes
  useEffect(() => {
    loadSections();
  }, [caseStudyId]);

  return {
    sections: sectionsState?.sections || [],
    setSections: (newSections: SectionWithOrder[]) => {
      saveSections(newSections);
    },
    isLoading,
    error,
    refresh: loadSections
  };
};
