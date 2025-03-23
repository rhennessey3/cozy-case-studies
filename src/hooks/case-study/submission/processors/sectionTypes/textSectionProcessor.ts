
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';

/**
 * Process a text section for form submission
 * @param section The section data
 * @param formData The form data
 * @returns Processed section data
 */
export const processTextSection = (
  section: SectionResponse,
  formData: any
): SectionResponse => {
  return {
    ...section,
    content: formData.textContent || section.content || '',
  };
};
