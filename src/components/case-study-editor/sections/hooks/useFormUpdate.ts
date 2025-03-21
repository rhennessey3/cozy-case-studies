
import { useEffect } from 'react';
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
  // Debounced update to form whenever sections change
  useEffect(() => {
    if (initialized && sections.length >= 0 && !isUpdatingRef.current) {
      const timer = setTimeout(() => {
        isUpdatingRef.current = true;
        
        // Store sections in a structured format
        const sectionsToStore = JSON.stringify(sections);
        
        // Only update if the value actually changed
        if (sectionsToStore !== form.customSections) {
          console.log(`Updating form.customSections with ${sections.length} sections`);
          
          const event = {
            target: {
              name: 'customSections',
              value: sectionsToStore
            }
          } as React.ChangeEvent<HTMLInputElement>;
          
          handleContentChange(event);
        }
        
        // Reset the updating flag after a delay
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
      }, 300); // 300ms debounce
      
      return () => clearTimeout(timer);
    }
  }, [sections, handleContentChange, initialized, form.customSections, isUpdatingRef]);
};
