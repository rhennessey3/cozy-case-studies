
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';
import { CaseStudyForm } from '@/types/caseStudy';
import { processSupabaseDatabase, checkSupabaseSession } from './services/databaseService';

// Define a consistent return type for the submission result
export type SubmissionResult = { 
  success: boolean; 
  slug?: string; 
  caseStudyId?: string;
};

export const useFormSubmitHandling = (
  form: CaseStudyForm, 
  navigate: NavigateFunction, 
  slug?: string
) => {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<SubmissionResult> => {
    e.preventDefault();
    
    setSaving(true);
    
    try {
      if (!form.title) {
        toast.error('Title is required');
        setSaving(false);
        return { success: false };
      }
      
      if (!form.slug) {
        toast.error('Slug is required');
        setSaving(false);
        return { success: false };
      }
      
      console.log("Submitting form with custom sections:", form.customSections);
      
      const isNew = !slug || slug === 'new' || slug === '';
      console.log('Mode determined:', isNew ? 'Creating new case study' : 'Editing existing case study', 'Slug:', slug);
      
      // Check Supabase authentication
      const isAuthenticated = await checkSupabaseSession();
      
      if (!isAuthenticated) {
        toast.error('You must be logged in to save a case study');
        navigate('/admin/login');
        setSaving(false);
        return { success: false };
      }
      
      try {
        // Process Supabase database
        const result = await processSupabaseDatabase(form, isNew, slug);
        
        toast.success(`Case study ${isNew ? 'created' : 'updated'} successfully`);
        
        if (isNew) {
          // First navigate to the case study editor for the new case study
          navigate(`/admin/case-studies/${form.slug}`);
          
          // Then show a toast with the option to view the case study on the public site
          toast('Case study published! View it on the site?', {
            action: {
              label: 'View',
              onClick: () => window.open(`/case-studies/${form.slug}`, '_blank')
            },
            duration: 5000
          });
        }
        
        // Make sure we always return an object with success property and slug
        return {
          success: true,
          slug: result.slug || form.slug,
          caseStudyId: result.caseStudyId
        };
      } catch (dbError: any) {
        console.error('Database operation error:', dbError);
        
        if (dbError.message.includes('duplicate key')) {
          toast.error(`A case study with slug "${form.slug}" already exists. Please choose a different slug.`);
        } else if (dbError.message.includes('permission denied') || dbError.message.includes('row-level security')) {
          toast.error('Permission denied by database security. Please try logging out and back in.');
          navigate('/admin/login');
        } else {
          toast.error(`Database error: ${dbError.message}`);
        }
        
        return { success: false };
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      
      if ((error as Error).message.includes('Row Level Security')) {
        toast.error('Permission denied by database security policies. Please try logging out and back in.');
        navigate('/admin/login');
      } else {
        toast.error(`Failed to ${slug ? 'update' : 'create'} case study: ${(error as Error).message}`);
      }
      
      return { success: false };
    } finally {
      setSaving(false);
    }
  };
  
  return { saving, handleSubmit };
};
