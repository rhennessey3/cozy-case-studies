
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
  const { caseStudy, loading, form: fetchedForm } = useFetchCaseStudy(slug);
  const { form, handleChange, handleContentChange, handleImageUploaded, setForm } = useCaseStudyForm(fetchedForm);
  const { saving, handleSubmit: submitCaseStudy } = useCaseStudySubmit(form, slug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitCaseStudy(e);
    
    // If submission was successful, refetch the case studies list
    if (result?.success) {
      refetchCaseStudies();
      
      // Navigate to the newly created/updated case study
      if (!slug && result.slug) {
        navigate(`/admin/case-studies/${result.slug}`);
      }
    }
    
    return result;
  };

  const createNewCaseStudy = () => {
    setForm(initialFormState);
    navigate('/admin/case-studies');
  };

  return {
    loading,
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
