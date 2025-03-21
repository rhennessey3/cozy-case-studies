
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useFetchCaseStudies, 
  useFetchCaseStudy, 
  useCaseStudyForm,
  useCaseStudySubmit
} from './case-study';
import { initialFormState } from '@/types/caseStudy';
import { toast } from 'sonner';

export const useCaseStudyEditor = (slug?: string) => {
  const navigate = useNavigate();
  // Always use draft mode by default
  const [draftMode] = useState(true);
  const { caseStudies, loading: caseStudiesLoading, refetchCaseStudies } = useFetchCaseStudies();
  
  // Only fetch case study if we have a valid slug (not undefined, empty, or "new")
  const shouldFetchCaseStudy = slug && slug !== '' && slug !== 'new';
  const { 
    caseStudy, 
    loading: fetchLoading, 
    form: fetchedForm, 
    refetch, 
    isDraft
  } = useFetchCaseStudy(shouldFetchCaseStudy ? slug : undefined, draftMode);
  
  // Initialize with empty form
  const [formInitialized, setFormInitialized] = useState(false);
  
  // Initialize the form state
  const initialForm = shouldFetchCaseStudy && fetchedForm ? fetchedForm : initialFormState;
  
  // Now we can use useCaseStudyForm with the proper initial state
  const formState = useCaseStudyForm(initialForm);
  const { form, handleChange, handleContentChange, handleImageUploaded, setForm } = formState;
  
  // Update form when fetchedForm changes
  useEffect(() => {
    if (fetchedForm) {
      console.log("Received updated form from fetch:", fetchedForm);
      setForm(fetchedForm);
      setFormInitialized(true);
    } else if (!shouldFetchCaseStudy) {
      setForm(initialFormState);
      setFormInitialized(true);
    }
  }, [fetchedForm, shouldFetchCaseStudy, setForm]);
  
  const { saving, handleSubmit: submitCaseStudy } = useCaseStudySubmit(form, shouldFetchCaseStudy ? slug : undefined, isDraft);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.title.trim()) {
      toast.error('Title is required');
      return { success: false };
    }
    
    if (!form.slug.trim()) {
      toast.error('Slug is required');
      return { success: false };
    }
    
    if (!form.coverImage) {
      toast.error('Cover image is required');
      return { success: false };
    }
    
    if (!form.challenge.trim() || !form.approach.trim() || !form.results.trim()) {
      toast.error('Challenge, Approach, and Results are all required');
      return { success: false };
    }
    
    const result = await submitCaseStudy(e);
    
    // If submission was successful, refetch the case studies list
    if (result?.success) {
      // Immediately refetch the case studies to update the sidebar
      await refetchCaseStudies();
      
      // Also refetch the current case study to get latest data
      if (shouldFetchCaseStudy) {
        await refetch();
      }
      
      // Fix: Only access result.slug when it exists
      // Navigate to the newly created/updated case study
      if ((!slug || slug === 'new' || slug === '') && result && 'slug' in result && result.slug) {
        navigate(`/admin/case-studies/${result.slug}`);
        toast.success('Case study created! You can now publish it to make it visible on the site.');
      } else {
        toast.success(`Case study ${isDraft ? 'draft' : 'live version'} updated!`);
      }
    }
    
    return result;
  };

  // Simplified publish function that just saves to the live version
  const publishDraft = async () => {
    if (!shouldFetchCaseStudy) {
      toast.error('Cannot publish a new case study. Save it first.');
      return { success: false };
    }
    
    // This is a simplified version - we're just saving the current form to live mode
    const event = { preventDefault: () => {} } as React.FormEvent;
    const result = await submitCaseStudy(event);
    
    if (result?.success) {
      toast.success('Case study published successfully! It is now visible on the site.');
      await refetchCaseStudies();
      await refetch();
    } else {
      toast.error('Failed to publish case study');
    }
    
    return result;
  };

  const createNewCaseStudy = () => {
    setForm(initialFormState);
    navigate('/admin/case-studies/new');
  };

  return {
    loading: fetchLoading || !formInitialized,
    saving,
    caseStudy,
    caseStudies,
    caseStudiesLoading,
    form,
    handleChange,
    handleContentChange,
    handleImageUploaded,
    handleSubmit,
    createNewCaseStudy,
    refetch,
    isDraft,
    publishDraft
  };
};
