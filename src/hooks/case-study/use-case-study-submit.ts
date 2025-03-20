
import { useFormSubmitHandling } from './submission/useFormSubmitHandling';
import { CaseStudyForm } from '@/types/caseStudy';

export const useCaseStudySubmit = (form: CaseStudyForm, slug?: string) => {
  return useFormSubmitHandling(form, slug);
};
