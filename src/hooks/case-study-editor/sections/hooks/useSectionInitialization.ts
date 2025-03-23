
import { useState, useRef, useEffect } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { mapSectionResponsesToSectionWithOrders } from '../utils/sectionResponseMapper';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

/**
 * Hook to handle section initialization from Supabase
 */
export const useSectionInitialization = (
  supabaseSections: SectionResponse[],
  supabaseLoading: boolean
) => {
  const [sections, setSections] = useState<SectionWithOrder[]>([]);
  const [initialized, setInitialized] = useState(false);
  const isInitializingRef = useRef(true);
  const lastValidSectionsRef = useRef<SectionWithOrder[]>([]);
  
  // Load initial sections from Supabase
  useEffect(() => {
    if (!supabaseLoading && isInitializingRef.current) {
      console.log('useSectionInitialization: Loading sections from Supabase:', 
        supabaseSections?.length || 0);
      
      if (supabaseSections && supabaseSections.length > 0) {
        // Convert SectionResponse[] to SectionWithOrder[]
        const sectionsWithOrder = mapSectionResponsesToSectionWithOrders(supabaseSections);
        setSections(sectionsWithOrder);
        lastValidSectionsRef.current = sectionsWithOrder;
      }
      
      isInitializingRef.current = false;
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading]);
  
  return {
    sections,
    setSections,
    initialized,
    lastValidSectionsRef
  };
};
