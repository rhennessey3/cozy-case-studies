
import { useState, useEffect, useRef } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from '../types/sectionTypes';
import { mapSectionResponsesToSectionWithOrders } from '../utils/sectionResponseMapper';

/**
 * Hook to manage section initialization from Supabase
 */
export const useSectionInitialization = (
  caseStudyId: string | null,
  supabaseSections: SectionResponse[],
  supabaseLoading: boolean
) => {
  const [sections, setSections] = useState<SectionWithOrder[]>([]);
  const [initialized, setInitialized] = useState(false);
  const isInitializingRef = useRef(true);
  const lastValidSectionsRef = useRef<SectionWithOrder[]>([]);
  
  // Log for debugging
  console.log('useSectionInitialization - caseStudyId:', caseStudyId);
  console.log('useSectionInitialization - supabaseSections:', supabaseSections?.length || 0);
  console.log('useSectionInitialization - loading:', supabaseLoading);
  
  // Load initial sections from Supabase
  useEffect(() => {
    console.log('useEffect - Initialization check, initialized:', initialized, 'isInitializing:', isInitializingRef.current);
    
    if (!initialized && isInitializingRef.current) {
      if (supabaseSections && supabaseSections.length > 0) {
        console.log('Initial sections from Supabase:', supabaseSections);
        // Convert SectionResponse[] to SectionWithOrder[]
        const sectionsWithOrder = mapSectionResponsesToSectionWithOrders(supabaseSections);
        console.log('Mapped to SectionWithOrder[]:', sectionsWithOrder);
        setSections(sectionsWithOrder);
        lastValidSectionsRef.current = sectionsWithOrder;
      } else {
        console.log('No initial sections found in Supabase');
      }
      
      isInitializingRef.current = false;
      setInitialized(true);
      console.log('Initialization complete, state set to initialized');
    }
  }, [supabaseSections, supabaseLoading, initialized]);
  
  return {
    sections,
    setSections,
    initialized,
    isInitializingRef,
    lastValidSectionsRef
  };
};
