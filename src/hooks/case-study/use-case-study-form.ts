
import { useState } from 'react';
import { CaseStudyForm, initialFormState } from '@/types/caseStudy';

export const useCaseStudyForm = (initialForm: CaseStudyForm | null) => {
  const [form, setForm] = useState<CaseStudyForm>(initialForm || initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Create a new form state
    const updatedForm = { ...form, [name]: value };
    
    // If the title is being updated, also update the slug
    if (name === 'title') {
      // Convert title to slug: lowercase, remove special chars, replace spaces with hyphens
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
        .trim();                   // Trim leading/trailing spaces
      
      updatedForm.slug = slug;
    }
    
    setForm(updatedForm);
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
