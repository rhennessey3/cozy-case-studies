
import { useMemo } from 'react';
import { CaseStudyForm } from '@/types/caseStudy';

export const useFormKey = (form: Partial<CaseStudyForm>) => {
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
    // Fallback to timestamp + slug if parsing fails
    return `form-${Date.now()}${slugPart}`;
  }, [form.customSections, form.slug]);
};
