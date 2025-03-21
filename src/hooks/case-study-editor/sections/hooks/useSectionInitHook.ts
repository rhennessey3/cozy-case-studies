
import { useState, useEffect } from 'react';
import { SectionResponse } from '../types/sectionTypes';

/**
 * Hook to handle section initialization
 */
export const useSectionInitHook = (
  caseStudyId: string | null,
  supabaseSections: SectionResponse[],
  supabaseLoading: boolean
) => {
  // Initialize sections state
  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  // Load initial sections from Supabase
  useEffect(() => {
    if (supabaseSections && supabaseSections.length > 0 && !initialized) {
      console.log('Loading initial sections from Supabase:', supabaseSections.length);
      setSections(supabaseSections);
      setInitialized(true);
    } else if (!supabaseLoading && !initialized) {
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading, initialized]);
  
  // Save to Supabase when sections change
  useEffect(() => {
    console.log('Sections updated:', sections);
  }, [sections]);
  
  return {
    sections,
    setSections,
    initialized
  };
};
