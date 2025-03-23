
import { useNavigate } from 'react-router-dom';
import { useFormSubmitHandling, type SubmissionResult } from './submission';
import { CaseStudyForm } from '@/types/caseStudy';
import { toast } from 'sonner';

export const useCaseStudySubmit = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  const { saving, handleSubmit: submitHandler } = useFormSubmitHandling(form, navigate, slug);
  
  const handleSubmit = async (e: React.FormEvent): Promise<SubmissionResult> => {
    e.preventDefault();
    
    // Log alignment data before form submission
    console.log('Submitting form with alignment data:', {
      subhead: form.subhead || '[empty]',
      introductionParagraph: form.introductionParagraph || '[empty]',
      introductionParagraphLength: form.introductionParagraph?.length || 0,
      introductionParagraphPreview: form.introductionParagraph?.substring(0, 50) + (form.introductionParagraph?.length > 50 ? '...' : '') || '',
      alignmentImage: form.alignmentImage ? '[image present]' : '[no image]',
      alignment: form.alignment || 'left'
    });
    
    // Ensure alignment field is set
    if (!form.alignment) {
      console.log('Setting default alignment to left');
      form.alignment = 'left';
    }
    
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
            subhead: form.subhead || '[empty]',
            introductionParagraph: form.introductionParagraph ? 'Content present' : 'No content',
            introductionParagraphLength: form.introductionParagraph?.length || 0,
            introductionParagraphPreview: form.introductionParagraph?.substring(0, 50) + (form.introductionParagraph?.length > 50 ? '...' : '') || '',
            alignmentImage: form.alignmentImage ? 'Image present' : 'No image',
            alignment: form.alignment || 'left'
          }
        } 
      });
      window.dispatchEvent(savedEvent);
      
      console.log('Case study saved event dispatched with ID:', result.caseStudyId);
      
      // Show success toast with alignment data summary
      toast.success(`Case study saved successfully!`);
      
      if (form.subhead || form.introductionParagraph || form.alignmentImage) {
        const contentPreview = form.introductionParagraph 
          ? `${form.introductionParagraph.substring(0, 20)}${form.introductionParagraph.length > 20 ? '...' : ''}`
          : 'No content';
        
        toast.info(`Alignment data saved: ${form.subhead ? 'Title ✓' : 'No title'}, Content: "${contentPreview}", ${form.alignmentImage ? 'Image ✓' : 'No image'}`);
      }
    } else {
      console.error('Form submission failed:', result?.message || 'Unknown error');
    }
    
    return result;
  };
  
  return { saving, handleSubmit };
};
