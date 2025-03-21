
import { useMemo, useRef } from 'react';
import { CaseStudyForm } from '@/types/caseStudy';

export const useFormKey = (form: Partial<CaseStudyForm>) => {
  // Create a stable timestamp reference
  const timestampRef = useRef(`time-${Date.now()}`);
  
  return useMemo(() => {
    const slugPart = form.slug ? `-${form.slug}` : '-new';
    
    try {
      if (form.customSections) {
        // Extract sections IDs to create a stable key
        const sections = JSON.parse(form.customSections || '[]');
        return `sections-${sections.map((s: any) => s.id).join('-')}${slugPart}`;
      }
    } catch (e) {
      console.error("Error parsing customSections for key", e);
    }
    // Use the stable timestamp reference from the useRef instead of calling Date.now() each time
    return `${timestampRef.current}${slugPart}`;
  }, [form.customSections, form.slug]);
};
