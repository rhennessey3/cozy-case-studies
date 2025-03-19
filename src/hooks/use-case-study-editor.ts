
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCaseStudies } from './case-study/use-fetch-case-studies';
import { useFetchCaseStudy } from './case-study/use-fetch-case-study';
import { useCaseStudyForm } from './case-study/use-case-study-form';
import { useCaseStudySubmit } from './case-study/use-case-study-submit';
import { initialFormState } from '@/types/caseStudy';

export const useCaseStudyEditor = (slug?: string) => {
  const navigate = useNavigate();
  const { caseStudies } = useFetchCaseStudies();
  const { caseStudy, loading, form: fetchedForm } = useFetchCaseStudy(slug);
  const { form, handleChange, handleContentChange, handleImageUploaded, setForm } = useCaseStudyForm(fetchedForm);
  const { saving, handleSubmit } = useCaseStudySubmit(form, slug);

  const createNewCaseStudy = () => {
    setForm(initialFormState);
    navigate('/admin/case-studies');
  };

  return {
    loading,
    saving,
    caseStudy,
    caseStudies,
    form,
    handleChange,
    handleContentChange,
    handleImageUploaded,
    handleSubmit,
    createNewCaseStudy
  };
};
