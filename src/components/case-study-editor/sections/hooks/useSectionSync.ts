
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
  
  // Use a ref to track if we're currently updating to avoid loops
  const isUpdatingRef = useRef(false);

  // Sync sections when form.customSections changes, but only if it's actually different
  useEffect(() => {
    if (form.customSections && 
        form.customSections !== prevCustomSectionsRef.current && 
        !isUpdatingRef.current) {
      
      try {
        const parsedSections = JSON.parse(form.customSections);
        
        // Check if we actually have new sections that are different
        if (Array.isArray(parsedSections)) {
          // Only update if the JSON is different or we don't have sections yet
          const currentJson = JSON.stringify(sections);
          const newJson = JSON.stringify(parsedSections);
          
          if (currentJson !== newJson || sections.length === 0) {
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
            
            // Save to session storage immediately
            sessionStorage.setItem(sessionStorageKey, JSON.stringify(newSections));
            
            // After updating, allow future updates
            setTimeout(() => {
              isUpdatingRef.current = false;
            }, 100);
          }
        }
      } catch (e) {
        console.error("Failed to parse updated custom sections", e);
      }
      
      // Update the ref to the current value
      prevCustomSectionsRef.current = form.customSections;
    }
  }, [form.customSections, sections, setSections, sessionStorageKey, lastValidSectionsRef]);

  return {
    isUpdatingRef
  };
};
