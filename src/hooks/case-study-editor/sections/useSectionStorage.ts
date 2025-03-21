
import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { toast } from 'sonner';

/**
 * Hook to handle section storage in Supabase
 */
export const useSectionStorage = (
  sections: SectionWithOrder[],
  sessionStorageKey: string,
  caseStudyId?: string
) => {
  // Save sections to Supabase custom_sections metadata 
  const saveSections = useCallback(async () => {
    if (!caseStudyId || caseStudyId === 'new' || sections.length === 0) {
      return;
    }

    try {
      // Update the case_study record with the sections in the metadata
      const { error } = await supabase
        .from('case_studies')
        .update({
          custom_sections: sections
        })
        .eq('id', caseStudyId);

      if (error) {
        console.error("Failed to save sections to Supabase:", error);
      } else {
        console.log(`Saved ${sections.length} sections to Supabase for case study ${caseStudyId}`);
      }
    } catch (e) {
      console.error("Exception saving sections to Supabase:", e);
    }
  }, [sections, caseStudyId]);

  // Save sections whenever they change
  useEffect(() => {
    if (sections.length > 0 && caseStudyId && caseStudyId !== 'new') {
      // Use a debounce to avoid too many API calls
      const timer = setTimeout(() => {
        saveSections();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [sections, caseStudyId, saveSections]);

  // Load sections from Supabase
  const loadSections = useCallback(async (): Promise<SectionWithOrder[] | null> => {
    if (!caseStudyId || caseStudyId === 'new') {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('custom_sections')
        .eq('id', caseStudyId)
        .maybeSingle();

      if (error) {
        console.error("Failed to load sections from Supabase:", error);
        return null;
      }

      if (data && data.custom_sections) {
        console.log(`Loaded sections from Supabase for case study ${caseStudyId}`);
        return data.custom_sections;
      }
    } catch (e) {
      console.error("Exception loading sections from Supabase:", e);
    }

    return null;
  }, [caseStudyId]);

  return {
    saveSections,
    loadSections
  };
};
