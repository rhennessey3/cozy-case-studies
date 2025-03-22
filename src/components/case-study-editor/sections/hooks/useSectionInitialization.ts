
import { useState, useRef, useEffect } from 'react';
import { SectionWithOrder } from '../types';
import { SectionFormState, initializeDefaultSections } from '../utils/defaultSections';

/**
 * Hook to handle section initialization logic
 */
export const useSectionInitialization = (
  form: SectionFormState & { slug?: string },
  sessionStorageKey: string,
  supabaseSections: SectionWithOrder[] = [],
  supabaseLoading: boolean = false
) => {
  // Reference to track initialization state
  const initializedFromSupabase = useRef(false);
  const lastValidSectionsRef = useRef<SectionWithOrder[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Initialize sections state
  const [sections, setSections] = useState<SectionWithOrder[]>(() => {
    // First try to use Supabase sections if available
    if (supabaseSections && supabaseSections.length > 0) {
      initializedFromSupabase.current = true;
      return supabaseSections;
    }
    
    // Then try to parse from form.customSections
    try {
      if (form.customSections) {
        const parsedSections = JSON.parse(form.customSections);
        if (Array.isArray(parsedSections) && parsedSections.length > 0) {
          return parsedSections;
        }
      }
    } catch (e) {
      console.error("Failed to parse custom sections", e);
    }
    
    return [];
  });

  // Update sections when Supabase data changes
  useEffect(() => {
    if (!supabaseLoading && supabaseSections.length > 0 && !initializedFromSupabase.current) {
      setSections(supabaseSections);
      lastValidSectionsRef.current = supabaseSections;
      initializedFromSupabase.current = true;
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading]);

  // Initialize default sections if none are saved
  useEffect(() => {
    if (sections.length === 0 && !initialized && !supabaseLoading) {
      const defaultSections = initializeDefaultSections(form);
      setSections(defaultSections);
      lastValidSectionsRef.current = defaultSections;
      setInitialized(true);
    } else if (sections.length > 0 && !initialized) {
      lastValidSectionsRef.current = sections;
      setInitialized(true);
    }
  }, [sections.length, initialized, form, supabaseLoading]);

  return {
    sections,
    setSections,
    initialized,
    setInitialized,
    lastValidSectionsRef
  };
};
