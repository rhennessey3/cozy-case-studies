
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
  // Reference to track if we've initialized from custom sections
  const initializedFromCustomSections = useRef(false);
  // Reference to track if we've initialized from Supabase
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
    
    // For backward compatibility, try to get from session storage (for tab switching persistence)
    try {
      const sessionData = sessionStorage.getItem(sessionStorageKey);
      if (sessionData) {
        const parsedSessionData = JSON.parse(sessionData);
        console.log("For backward compatibility: Restored sections from session storage:", parsedSessionData.length);
        initializedFromCustomSections.current = true;
        return parsedSessionData;
      }
    } catch (e) {
      console.error("Failed to parse session storage sections", e);
    }
    
    // If not in Supabase or session storage, try from form.customSections
    try {
      if (form.customSections) {
        const parsedSections = JSON.parse(form.customSections);
        if (Array.isArray(parsedSections) && parsedSections.length > 0) {
          initializedFromCustomSections.current = true;
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
      // Only create default sections if we didn't initialize from custom sections or Supabase
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

  // For backward compatibility only: Save sections to session storage whenever they change
  useEffect(() => {
    if (sections.length > 0) {
      try {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(sections));
        console.log(`Backward compatibility: Saved ${sections.length} sections to session storage`);
      } catch (e) {
        console.error("Failed to save sections to session storage", e);
      }
    }
  }, [sections, sessionStorageKey]);

  return {
    sections,
    setSections,
    initialized,
    setInitialized,
    lastValidSectionsRef
  };
};
