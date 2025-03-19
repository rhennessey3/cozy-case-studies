
import { useState } from 'react';
import { CaseStudyForm, initialFormState } from '@/types/caseStudy';

export const useCaseStudyForm = (initialForm: CaseStudyForm | null) => {
  const [form, setForm] = useState<CaseStudyForm>(initialForm || initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (field: string, imageUrl: string) => {
    setForm(prev => ({ ...prev, [field]: imageUrl }));
  };

  return {
    form,
    setForm,
    handleChange,
    handleContentChange,
    handleImageUploaded
  };
};
