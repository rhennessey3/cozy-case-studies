import { useMemo, useRef } from 'react';
import { CaseStudyForm } from '@/types/caseStudy';

export const useFormKey = (form: Partial<CaseStudyForm>) => {
  // Create a stable timestamp reference that doesn't change between renders
  const timestampRef = useRef(`time-${Date.now()}`);
  // Also keep track of the last valid key to prevent changing keys unnecessarily
  const lastValidKeyRef = useRef<string>('');
  
  return useMemo(() => {
    const slugPart = form.slug ? `-${form.slug}` : '-new';
    
    try {
      if (form.customSections) {
        // Extract sections IDs to create a stable key
        const sections = JSON.parse(form.customSections || '[]');
        if (Array.isArray(sections) && sections.length > 0) {
          const newKey = `sections-${sections.map((s: any) => s.id).join('-')}${slugPart}`;
          lastValidKeyRef.current = newKey;
          return newKey;
        }
      }
    } catch (e) {
      console.error("Error parsing customSections for key", e);
      // If we've generated a valid key before, use that instead of generating a new one
      if (lastValidKeyRef.current) {
        return lastValidKeyRef.current;
      }
    }
    
    // Use the stable timestamp reference from the useRef instead of calling Date.now() each time
    const fallbackKey = `${timestampRef.current}${slugPart}`;
    if (!lastValidKeyRef.current) {
      lastValidKeyRef.current = fallbackKey;
    }
    return lastValidKeyRef.current;
  }, [form.customSections, form.slug]);
};
