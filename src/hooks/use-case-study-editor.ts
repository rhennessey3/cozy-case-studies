
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCaseStudies } from './case-study/use-fetch-case-studies';
import { useFetchCaseStudy } from './case-study/use-fetch-case-study';
import { useCaseStudyForm } from './case-study/use-case-study-form';
import { useCaseStudySubmit } from './case-study/use-case-study-submit';
import { initialFormState } from '@/types/caseStudy';
import { toast } from 'sonner';

export const useCaseStudyEditor = (slug?: string) => {
  const navigate = useNavigate();
  const { caseStudies, loading: caseStudiesLoading, refetchCaseStudies } = useFetchCaseStudies();
  
  // Only fetch case study if we have a valid slug (not undefined, empty, or "new")
  const shouldFetchCaseStudy = slug && slug !== '' && slug !== 'new';
  const { caseStudy, loading: fetchLoading, form: fetchedForm } = useFetchCaseStudy(shouldFetchCaseStudy ? slug : undefined);
  
  // Initialize with empty form
  const [formInitialized, setFormInitialized] = useState(false);
  
  // Initialize the form state - this is where the error was happening
  // We need to declare the initial form state first
  const initialForm = shouldFetchCaseStudy && fetchedForm ? fetchedForm : initialFormState;
  
  // Now we can use useCaseStudyForm with the proper initial state - but we need to avoid the circular reference
  const formState = useCaseStudyForm(initialForm);
  const { form, handleChange, handleContentChange, handleImageUploaded, setForm } = formState;
  
  // Update form when fetchedForm changes
  useEffect(() => {
    if (fetchedForm) {
      setForm(fetchedForm);
      setFormInitialized(true);
    } else if (!shouldFetchCaseStudy) {
      setForm(initialFormState);
      setFormInitialized(true);
    }
  }, [fetchedForm, shouldFetchCaseStudy, setForm]);
  
  const { saving, handleSubmit: submitCaseStudy } = useCaseStudySubmit(form, shouldFetchCaseStudy ? slug : undefined);

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
      
      // Navigate to the newly created/updated case study
      if ((!slug || slug === 'new' || slug === '') && result.slug) {
        navigate(`/admin/case-studies/${result.slug}`);
      } else {
        toast.success(slug === 'new' ? 'Case study created!' : 'Case study updated!');
      }
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
    createNewCaseStudy
  };
};
