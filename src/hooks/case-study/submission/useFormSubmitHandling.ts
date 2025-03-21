
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';
import { CaseStudyForm } from '@/types/caseStudy';
import { saveLocalCaseStudy } from '../utils/localStorageUtils';
import { processSupabaseDatabase, checkSupabaseSession } from './services/databaseService';
import { isLocalAuthMode } from '../utils/authUtils';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';

export const useFormSubmitHandling = (
  form: CaseStudyForm, 
  navigate: NavigateFunction, 
  slug?: string, 
  isDraft: boolean = true
) => {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      
      // Log the form data to debug custom sections
      console.log("Submitting form with custom sections:", form.customSections);
      console.log(`Submitting in ${isDraft ? 'DRAFT' : 'LIVE'} mode`);
      
      const isNew = !slug || slug === 'new' || slug === '';
      console.log('Mode determined:', isNew ? 'Creating new case study' : 'Editing existing case study', 'Slug:', slug);
      
      // Check if we're in local auth mode
      if (isLocalAuthMode()) {
        console.log(`Processing in local auth mode with localStorage persistence (${isDraft ? 'DRAFT' : 'LIVE'} mode)`);
        
        // Parse sections to ensure they're valid before saving
        if (form.customSections) {
          try {
            const parsedSections = JSON.parse(form.customSections);
            console.log("Saving custom sections:", parsedSections);
          } catch (e) {
            console.error("Error parsing custom sections before save:", e);
            toast.error("Error with custom sections format");
            setSaving(false);
            return { success: false };
          }
        }
        
        const result = saveLocalCaseStudy(form, isNew, slug, isDraft);
        
        toast.success(`Case study ${isNew ? 'created' : 'updated'} successfully (${isDraft ? 'Draft' : 'Live'} Mode)`);
        
        if (isNew) {
          // First navigate to the case study editor for the new case study
          navigate(`/admin/case-studies/${form.slug}`);
          
          // Then show a toast with the option to view the case study on the public site
          if (!isDraft) {
            toast('Case study published! View it on the site?', {
              action: {
                label: 'View',
                onClick: () => window.open(`/case-studies/${form.slug}`, '_blank')
              },
              duration: 5000
            });
          }
        }
        
        setSaving(false);
        return { success: true, slug: form.slug };
      }
      
      // Check Supabase authentication
      const isAuthenticated = await checkSupabaseSession();
      
      if (!isAuthenticated) {
        toast.error('You must be logged in to save a case study');
        localStorage.removeItem(AUTH_STORAGE_KEY);
        navigate('/admin/login');
        setSaving(false);
        return { success: false };
      }
      
      // Process database operations
      try {
        const result = await processSupabaseDatabase(form, isNew, slug, isDraft);
        
        toast.success(`Case study ${isNew ? 'created' : 'updated'} successfully (${isDraft ? 'Draft' : 'Live'} Mode)`);
        
        if (isNew) {
          // First navigate to the case study editor for the new case study
          navigate(`/admin/case-studies/${form.slug}`);
          
          // Then show a toast with the option to view the case study on the public site
          if (!isDraft) {
            toast('Case study published! View it on the site?', {
              action: {
                label: 'View',
                onClick: () => window.open(`/case-studies/${form.slug}`, '_blank')
              },
              duration: 5000
            });
          }
        }
        
        return result;
      } catch (dbError: any) {
        console.error('Database operation error:', dbError);
        
        if (dbError.message.includes('duplicate key')) {
          toast.error(`A case study with slug "${form.slug}" already exists. Please choose a different slug.`);
        } else if (dbError.message.includes('permission denied') || dbError.message.includes('row-level security')) {
          toast.error('Permission denied by database security. Please try logging out and back in.');
          
          localStorage.removeItem(AUTH_STORAGE_KEY);
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
        
        localStorage.removeItem(AUTH_STORAGE_KEY);
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
