
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionResponse } from './types/sectionTypes';

/**
 * Hook for handling section storage in Supabase
 * @param caseStudyId The ID of the case study
 * @returns Object containing sections and functions for manipulating them
 */
export const useSectionStorage = (caseStudyId: string | null) => {
  const [sections, setSections] = useState<SectionResponse[]>([]);
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

      const { data, error } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .neq('component', 'editor_state');

      if (error) {
        throw new Error(`Failed to load sections: ${error.message}`);
      }

      // Normalize the sections
      const normalizedSections = data.map((section: any) => ({
        id: section.id,
        case_study_id: section.case_study_id || caseStudyId,
        component: section.component || section.type || 'alignment',
        title: section.title || section.name || '',
        content: section.content || '',
        sort_order: 0, // Default fixed value
        published: section.published !== undefined ? section.published : true,
        image_url: section.image_url,
        metadata: section.metadata
      }));
      
      setSections(normalizedSections);
    } catch (err: any) {
      console.error('Error loading sections:', err);
      setError(err.message);
      setSections([]);
    } finally {
      setIsLoading(false);
    }
  }, [caseStudyId]);

  // Save sections to Supabase
  const saveSections = useCallback(async (updatedSections: SectionResponse[]) => {
    if (!caseStudyId) {
      console.log('No case study ID, skipping save');
      return;
    }

    try {
      console.log(`Saving ${updatedSections.length} sections for case study ID: ${caseStudyId}`);
      
      for (const section of updatedSections) {
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

        // Prepare the section data
        const sectionData = {
          case_study_id: caseStudyId,
          component: section.component,
          title: section.title,
          content: section.content || '',
          sort_order: 0, // Fixed value
          published: section.published,
          image_url: section.image_url,
          metadata: section.metadata
        };

        // Update or insert section
        const result = existingData 
          ? await supabase.from('case_study_sections').update(sectionData).eq('id', section.id)
          : await supabase.from('case_study_sections').insert({ ...sectionData, id: section.id });

        if (result.error) {
          console.error(`Error saving section ${section.id}: ${result.error.message}`);
        }
      }

      console.log('Sections saved successfully');
      setSections(updatedSections);
    } catch (err: any) {
      console.error('Error saving sections:', err);
      setError(err.message);
      toast.error(`Failed to save section data: ${err.message}`);
    }
  }, [caseStudyId]);

  // Load sections on initial render
  useEffect(() => {
    if (caseStudyId) {
      loadSections();
    } else {
      setIsLoading(false);
      setSections([]);
    }
  }, [caseStudyId, loadSections]);

  return {
    sections,
    setSections: saveSections,
    isLoading,
    error,
    refresh: loadSections
  };
};
