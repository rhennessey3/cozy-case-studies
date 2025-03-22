
import { useState, useEffect, useRef } from 'react';
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
  
  // Use a ref to prevent multiple initializations
  const hasInitializedRef = useRef(false);
  
  // Log for debugging
  useEffect(() => {
    console.log("useSectionInitHook - supabaseSections:", supabaseSections);
    console.log("useSectionInitHook - loading:", supabaseLoading);
    console.log("useSectionInitHook - initialized:", initialized);
  }, [supabaseSections, supabaseLoading, initialized]);
  
  // Load initial sections from Supabase
  useEffect(() => {
    if (!supabaseLoading && !hasInitializedRef.current) {
      console.log('Loading initial sections from Supabase:', supabaseSections);
      
      if (supabaseSections && supabaseSections.length > 0) {
        console.log('Setting sections from Supabase:', supabaseSections.length);
        setSections(supabaseSections);
      }
      
      hasInitializedRef.current = true;
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading]);
  
  return {
    sections,
    setSections,
    initialized
  };
};
