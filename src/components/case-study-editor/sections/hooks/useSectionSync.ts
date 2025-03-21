
import { useEffect, useRef } from 'react';
import { SectionWithOrder } from '../types';

/**
 * Hook to handle syncing sections with form.customSections
 */
export const useSectionSync = (
  sections: SectionWithOrder[],
  form: { customSections?: string },
  setSections: React.Dispatch<React.SetStateAction<SectionWithOrder[]>>,
  lastValidSectionsRef: React.MutableRefObject<SectionWithOrder[]>,
  sessionStorageKey: string
) => {
  // Reference to the previous customSections value
  const prevCustomSectionsRef = useRef(form.customSections);
  // Ref to store the current sections JSON for comparison
  const currentSectionsJsonRef = useRef<string>(JSON.stringify(sections));
  
  // Use a ref to track if we're currently updating to avoid loops
  const isUpdatingRef = useRef(false);

  // Sync sections when form.customSections changes, but only if it's actually different
  useEffect(() => {
    // Skip synchronization if we're already updating sections (prevents loops)
    if (isUpdatingRef.current) {
      return;
    }
    
    if (form.customSections && 
        form.customSections !== prevCustomSectionsRef.current) {
      
      try {
        const parsedSections = JSON.parse(form.customSections);
        
        // Skip if parsed sections isn't an array
        if (!Array.isArray(parsedSections)) {
          console.warn("Parsed customSections is not an array, skipping update");
          return;
        }
        
        // Only update if the JSON is different from current sections
        const newSectionsJson = JSON.stringify(parsedSections);
        
        if (newSectionsJson !== currentSectionsJsonRef.current) {
          console.log("Updating sections from form data - significant change detected");
          
          // Mark that we're updating to prevent loops
          isUpdatingRef.current = true;
          
          // Update sections with proper ordering
          const newSections = parsedSections.map((section: any, index: number) => ({
            ...section,
            order: section.order !== undefined ? section.order : index + 1
          }));
          
          setSections(newSections);
          lastValidSectionsRef.current = newSections;
          currentSectionsJsonRef.current = newSectionsJson;
          
          // Save to session storage immediately
          try {
            sessionStorage.setItem(sessionStorageKey, newSectionsJson);
          } catch (e) {
            console.error("Failed to save sections to session storage", e);
          }
        }
      } catch (e) {
        console.error("Failed to parse updated custom sections", e);
      }
      
      // Update the ref to the current value
      prevCustomSectionsRef.current = form.customSections;
      
      // After all operations, reset the updating flag with a delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 200);
    }
  }, [form.customSections, sessionStorageKey, setSections, lastValidSectionsRef]);

  return {
    isUpdatingRef
  };
};
