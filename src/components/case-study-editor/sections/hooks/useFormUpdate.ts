
import { useEffect, useRef } from 'react';
import { SectionWithOrder } from '../types';

/**
 * Hook to handle updating the form with the current sections state
 */
export const useFormUpdate = (
  sections: SectionWithOrder[],
  initialized: boolean,
  isUpdatingRef: React.MutableRefObject<boolean>,
  form: { customSections?: string },
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
) => {
  // Ref to store the previous sections JSON string for comparison
  const prevSectionsJsonRef = useRef<string>('');
  // Ref to store the timer IDs for cleanup
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Debounced update to form whenever sections change
  useEffect(() => {
    // Only update if initialized and not currently updating from elsewhere
    if (initialized && !isUpdatingRef.current) {
      // Convert sections to JSON for comparison
      const sectionsJson = JSON.stringify(sections);
      
      // Only update if the value actually changed
      if (sectionsJson !== prevSectionsJsonRef.current && sectionsJson !== form.customSections) {
        console.log(`Scheduling update of form.customSections with ${sections.length} sections`);
        
        // Clear any existing timers to prevent multiple updates
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        
        // Schedule a new update
        const timer = setTimeout(() => {
          // Set updating flag to prevent loops
          isUpdatingRef.current = true;
          
          console.log(`Actually updating form.customSections with ${sections.length} sections`);
          
          const event = {
            target: {
              name: 'customSections',
              value: sectionsJson
            }
          } as React.ChangeEvent<HTMLInputElement>;
          
          handleContentChange(event);
          
          // Update the previous sections ref
          prevSectionsJsonRef.current = sectionsJson;
          
          // Reset the updating flag after a delay
          const resetTimer = setTimeout(() => {
            isUpdatingRef.current = false;
          }, 200);
          
          timersRef.current.push(resetTimer);
        }, 500); // Increased debounce to 500ms for more stability
        
        timersRef.current.push(timer);
      }
    }
    
    // Cleanup timers on unmount
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [sections, handleContentChange, initialized, form.customSections, isUpdatingRef]);
};
