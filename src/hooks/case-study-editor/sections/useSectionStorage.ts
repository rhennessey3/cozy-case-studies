
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
      setSections([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .neq('component', 'editor_state')
        .order('sort_order', { ascending: true });
      
      if (error) throw new Error(error.message);
      
      setSections(data || []);
    } catch (err: any) {
      console.error('Error loading sections:', err);
      setError(err.message);
      toast.error(`Failed to load sections: ${err.message}`);
      setSections([]);
    } finally {
      setIsLoading(false);
    }
  }, [caseStudyId]);

  // Save sections to Supabase
  const saveSections = useCallback(async (updatedSections: SectionResponse[]) => {
    if (!caseStudyId || updatedSections.length === 0) return;

    try {
      for (const section of updatedSections) {
        const { data: existingData } = await supabase
          .from('case_study_sections')
          .select('id')
          .eq('id', section.id)
          .maybeSingle();

        const sectionData = {
          case_study_id: caseStudyId,
          component: section.component,
          title: section.title,
          content: section.content || '',
          sort_order: 0, // Fixed value since ordering was removed
          published: section.published,
          image_url: section.image_url,
          metadata: section.metadata
        };

        const operation = existingData 
          ? supabase.from('case_study_sections').update(sectionData).eq('id', section.id)
          : supabase.from('case_study_sections').insert({ ...sectionData, id: section.id });
          
        const { error } = await operation;
        
        if (error) throw new Error(`Error saving section ${section.id}: ${error.message}`);
      }
    } catch (err: any) {
      console.error('Error saving sections:', err);
      setError(err.message);
      toast.error(`Failed to save section data: ${err.message}`);
    }
  }, [caseStudyId]);

  // Load sections on initial render
  useEffect(() => {
    loadSections();
  }, [caseStudyId, loadSections]);

  return {
    sections,
    setSections: saveSections,
    isLoading,
    error,
    refresh: loadSections
  };
};
