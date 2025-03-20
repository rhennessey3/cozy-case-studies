
import { useNavigate } from 'react-router-dom';
import { useFormSubmitHandling } from './submission/useFormSubmitHandling';
import { CaseStudyForm } from '@/types/caseStudy';

export const useCaseStudySubmit = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  return useFormSubmitHandling(form, navigate, slug);
};
