
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
      // Dispatch a custom event to notify that the case study was saved
      // We now use the slug from the result or fall back to the form slug if it doesn't exist
      const savedEvent = new CustomEvent('case-study-saved', { 
        detail: { slug: result.slug || form.slug } 
      });
      window.dispatchEvent(savedEvent);
    }
    
    return result;
  };
  
  return { saving, handleSubmit };
};
