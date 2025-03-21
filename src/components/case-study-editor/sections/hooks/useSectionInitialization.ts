
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
  
  // Store the last valid sections to prevent reverting to default
  const lastValidSectionsRef = useRef<SectionWithOrder[]>([]);
  
  // Track if sections have been initialized
  const [initialized, setInitialized] = useState(false);

  // Parse custom sections from form if available
  const [sections, setSections] = useState<SectionWithOrder[]>(() => {
    // First try to use the Supabase sections if they're available
    if (supabaseSections && supabaseSections.length > 0) {
      console.log("Initializing sections from Supabase:", supabaseSections.length);
      initializedFromSupabase.current = true;
      return supabaseSections;
    }
    
    // If not in Supabase, try from form.customSections
    try {
      if (form.customSections) {
        const parsedSections = JSON.parse(form.customSections);
        if (Array.isArray(parsedSections) && parsedSections.length > 0) {
          console.log("Initializing sections from customSections:", parsedSections.length);
          // Ensure all sections have order property
          return parsedSections.map((section: any, index: number) => ({
            ...section,
            order: section.order !== undefined ? section.order : index + 1
          }));
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
      console.log("Updating sections from Supabase:", supabaseSections.length);
      setSections(supabaseSections);
      lastValidSectionsRef.current = supabaseSections;
      initializedFromSupabase.current = true;
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading]);

  // Initialize the default sections if none are saved
  useEffect(() => {
    if (sections.length === 0 && !initialized && !supabaseLoading) {
      console.log("No sections found, creating default sections");
      const defaultSections = initializeDefaultSections(form);
      setSections(defaultSections);
      lastValidSectionsRef.current = defaultSections;
      setInitialized(true);
    } else if (sections.length > 0 && !initialized) {
      // If we have sections but aren't initialized, update the last valid ref
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
