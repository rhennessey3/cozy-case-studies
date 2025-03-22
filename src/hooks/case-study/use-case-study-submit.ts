
import { useNavigate } from 'react-router-dom';
import { useFormSubmitHandling } from './submission/useFormSubmitHandling';
import { CaseStudyForm } from '@/types/caseStudy';

export const useCaseStudySubmit = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  const { saving, handleSubmit: submitHandler } = useFormSubmitHandling(form, navigate, slug);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitHandler(e);
    
    if (result && result.success) {
      // Dispatch a custom event to notify that the case study was saved
      const savedEvent = new CustomEvent('case-study-saved', { 
        detail: { slug: result.slug } 
      });
      window.dispatchEvent(savedEvent);
    }
    
    return result;
  };
  
  return { saving, handleSubmit };
};
