
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCaseStudies } from './case-study/use-fetch-case-studies';
import { useFetchCaseStudy } from './case-study/use-fetch-case-study';
import { useCaseStudyForm } from './case-study/use-case-study-form';
import { useCaseStudySubmit } from './case-study/use-case-study-submit';
import { initialFormState } from '@/types/caseStudy';

export const useCaseStudyEditor = (slug?: string) => {
  const navigate = useNavigate();
  const { caseStudies, loading: caseStudiesLoading, refetchCaseStudies } = useFetchCaseStudies();
  
  // Only fetch case study if we have a valid slug (not undefined, empty, or "new")
  const shouldFetchCaseStudy = slug && slug !== '' && slug !== 'new';
  const { caseStudy, loading, form: fetchedForm } = useFetchCaseStudy(shouldFetchCaseStudy ? slug : undefined);
  
  // Initialize with empty form if no slug or slug is "new"
  const defaultForm = shouldFetchCaseStudy ? fetchedForm : initialFormState;
  const { form, handleChange, handleContentChange, handleImageUploaded, setForm } = useCaseStudyForm(defaultForm);
  
  const { saving, handleSubmit: submitCaseStudy } = useCaseStudySubmit(form, shouldFetchCaseStudy ? slug : undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitCaseStudy(e);
    
    // If submission was successful, refetch the case studies list
    if (result?.success) {
      // Immediately refetch the case studies to update the sidebar
      await refetchCaseStudies();
      
      // Navigate to the newly created/updated case study
      if ((!slug || slug === 'new' || slug === '') && result.slug) {
        navigate(`/admin/case-studies/${result.slug}`);
      }
    }
    
    return result;
  };

  const createNewCaseStudy = () => {
    setForm(initialFormState);
    navigate('/admin/case-studies/new');
  };

  return {
    loading: shouldFetchCaseStudy ? loading : false,
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
