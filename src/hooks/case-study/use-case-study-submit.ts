
import { useNavigate } from 'react-router-dom';
import { useFormSubmitHandling, type SubmissionResult } from './submission';
import { CaseStudyForm } from '@/types/caseStudy';

export const useCaseStudySubmit = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  const { saving, handleSubmit: submitHandler } = useFormSubmitHandling(form, navigate, slug);
  
  const handleSubmit = async (e: React.FormEvent): Promise<SubmissionResult> => {
    e.preventDefault();
    
    console.log('Submitting form with alignment data:', {
      subhead: form.subhead,
      introductionParagraph: form.introductionParagraph,
      alignmentImage: form.alignmentImage,
      alignment: form.alignment
    });
    
    const result = await submitHandler(e);
    
    if (result && result.success) {
      // Use result.slug if available, otherwise fall back to form.slug
      const eventSlug = result.slug || form.slug;
      
      // Dispatch a custom event to notify that the case study was saved
      const savedEvent = new CustomEvent('case-study-saved', { 
        detail: { 
          slug: eventSlug,
          caseStudyId: result.caseStudyId,
          // Add alignment data to the event for debugging
          alignmentData: {
            subhead: form.subhead,
            introductionParagraph: form.introductionParagraph,
            alignmentImage: form.alignmentImage,
            alignment: form.alignment
          }
        } 
      });
      window.dispatchEvent(savedEvent);
      
      console.log('Case study saved event dispatched with ID:', result.caseStudyId);
    } else {
      console.error('Form submission failed:', result?.message || 'Unknown error');
    }
    
    return result;
  };
  
  return { saving, handleSubmit };
};
