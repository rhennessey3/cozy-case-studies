
import { useNavigate } from 'react-router-dom';
import { useFormSubmitHandling, type SubmissionResult } from './submission';
import { CaseStudyForm } from '@/types/caseStudy';

export const useCaseStudySubmit = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  const { saving, handleSubmit: submitHandler } = useFormSubmitHandling(form, navigate, slug);
  
  const handleSubmit = async (e: React.FormEvent): Promise<SubmissionResult> => {
    e.preventDefault();
    const result = await submitHandler(e);
    
    if (result && result.success) {
      // Use result.slug if available, otherwise fall back to form.slug
      const eventSlug = result.slug || form.slug;
      
      // Dispatch a custom event to notify that the case study was saved
      const savedEvent = new CustomEvent('case-study-saved', { 
        detail: { slug: eventSlug } 
      });
      window.dispatchEvent(savedEvent);
    }
    
    return result;
  };
  
  return { saving, handleSubmit };
};
