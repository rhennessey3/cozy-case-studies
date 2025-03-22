
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from './types/sectionTypes';

// Define the interface for storing section state
interface SectionState {
  sections: SectionResponse[];
  lastUpdated: string;
}

export const useSectionStorage = (caseStudyId: string | null) => {
  const [sectionsState, setSectionsState] = useState<SectionState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load sections from Supabase
  const loadSections = useCallback(async () => {
    if (!caseStudyId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log(`Loading sections for case study ID: ${caseStudyId}`);

      // Query all sections for this case study
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .neq('component', 'editor_state')
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error(`Failed to load sections: ${error.message}`);
      }

      console.log('Loaded raw sections from Supabase:', data);
      
      // Normalize the sections to ensure they have all required fields
      const normalizedSections = data.map((section: any) => {
        // Convert legacy format to current format if needed
        return {
          id: section.id,
          case_study_id: section.case_study_id || caseStudyId,
          component: section.component || section.type || 'alignment',
          title: section.title || section.name || '',
          content: section.content || '',
          sort_order: section.sort_order !== undefined ? section.sort_order : 
                    (section.order !== undefined ? section.order : 0),
          published: section.published !== undefined ? section.published : true,
          image_url: section.image_url,
          metadata: section.metadata
        };
      });
      
      setSectionsState({
        sections: normalizedSections,
        lastUpdated: new Date().toISOString()
      });
      
      console.log('Normalized sections:', normalizedSections);
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
  }, [caseStudyId]);

  // Save sections to Supabase
  const saveSections = useCallback(async (sections: SectionResponse[]) => {
    if (!caseStudyId) {
      console.log('No case study ID, skipping save');
      return;
    }

    try {
      console.log(`Saving ${sections.length} sections for case study ID: ${caseStudyId}`);
      
      // Direct insert/update of individual sections
      for (const section of sections) {
        // Check if section already exists
        const { data: existingData, error: checkError } = await supabase
          .from('case_study_sections')
          .select('id')
          .eq('id', section.id)
          .maybeSingle();

        if (checkError) {
          console.error(`Error checking if section exists: ${checkError.message}`);
          continue;
        }

        // Prepare the section data - removed updated_at field that was causing errors
        const sectionData = {
          case_study_id: caseStudyId,
          component: section.component,
          title: section.title,
          content: section.content || '',
          sort_order: section.sort_order,
          published: section.published,
          image_url: section.image_url,
          metadata: section.metadata
        };

        let result;
        if (existingData) {
          // Update existing section
          result = await supabase
            .from('case_study_sections')
            .update(sectionData)
            .eq('id', section.id);
        } else {
          // Insert new section
          result = await supabase
            .from('case_study_sections')
            .insert({
              ...sectionData,
              id: section.id // Make sure to include the ID for new sections
            });
        }

        if (result.error) {
          console.error(`Error saving section ${section.id}: ${result.error.message}`);
        }
      }

      console.log('Sections saved successfully to Supabase');
      
      // Update local state
      setSectionsState({
        sections,
        lastUpdated: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Error saving sections:', err);
      setError(err.message);
      toast.error(`Failed to save section data: ${err.message}`);
    }
  }, [caseStudyId]);

  // Load sections on initial render and when caseStudyId changes
  useEffect(() => {
    if (caseStudyId) {
      loadSections();
    } else {
      setIsLoading(false);
      setSectionsState({
        sections: [],
        lastUpdated: new Date().toISOString()
      });
    }
  }, [caseStudyId, loadSections]);

  return {
    sections: sectionsState?.sections || [],
    setSections: saveSections,
    isLoading,
    error,
    refresh: loadSections
  };
};
