
import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { processBasicInfo } from './processors/basicInfoProcessor';
import { processContentData } from './processors/contentDataProcessor';
import { processCustomSections as processCustomSectionsFromProcessor } from './processors/customSectionsProcessor';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';

const processSectionImages = async (form: CaseStudyForm, caseStudyId: string) => {
  const sections = [
    { component: 'intro', image_url: form.introImage },
    { component: 'challenge', image_url: form.challengeImage },
    { component: 'approach', image_url: form.approachImage },
    { component: 'solution', image_url: form.solutionImage },
    { component: 'results', image_url: form.resultsImage },
    { component: 'conclusion', image_url: form.conclusionImage }
  ];
  
  for (const section of sections) {
    const { component, image_url } = section;
    
    if (image_url) {
      const { error } = await supabase
        .from('case_study_sections')
        .upsert(
          {
            case_study_id: caseStudyId,
            component: component,
            image_url: image_url
          },
          { onConflict: 'case_study_id,component' }
        );
        
      if (error) {
        console.error(`Error saving ${component} image:`, error);
        throw new Error(`Failed to save ${component} image: ${error.message}`);
      }
    } else {
      const { error } = await supabase
        .from('case_study_sections')
        .delete()
        .eq('case_study_id', caseStudyId)
        .eq('component', component);
        
      if (error) {
        console.error(`Error deleting ${component} image:`, error);
        throw new Error(`Failed to delete ${component} image: ${error.message}`);
      }
    }
  }
};

// Special function to handle database operations in local auth mode
const processLocalDatabase = async (form: CaseStudyForm, isNew: boolean, slug?: string) => {
  // In local auth mode, we'll mock a successful operation
  // We'll just return a fixed ID for the case study
  const caseStudyId = "local-mode-case-study-id-" + Date.now();
  
  console.log(`Local auth mode: Simulating ${isNew ? 'creation' : 'update'} of case study with slug "${form.slug}"`);
  console.log('Form data:', form);
  
  return {
    success: true,
    slug: form.slug,
    caseStudyId
  };
};

export const useFormSubmitHandling = (form: CaseStudyForm, navigate: NavigateFunction, slug?: string) => {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    
    try {
      // Check if in local auth mode
      const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
      
      // Get current authentication state from localStorage
      const localAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
      console.log('Local auth state:', localAuthState);
      
      // Validate required fields
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
      
      // Determine if we're creating or editing
      const isNew = !slug || slug === 'new' || slug === '';
      console.log('Mode determined:', isNew ? 'Creating new case study' : 'Editing existing case study', 'Slug:', slug);
      
      // Handle local auth mode
      if ((isLocalAuthOnly || localAuthState === 'true')) {
        console.log('Processing in local auth mode');
        
        // Use simulated database operations for local auth mode
        const result = await processLocalDatabase(form, isNew, slug);
        
        toast.success(`Case study ${isNew ? 'created' : 'updated'} successfully (Local Mode)`);
        
        if (isNew) {
          navigate(`/admin/case-studies/${form.slug}`);
        }
        
        setSaving(false);
        return { success: true, slug: form.slug };
      }
      
      // For non-local auth mode, check authentication with Supabase
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('Current session data:', sessionData);
      
      if (!sessionData.session && localAuthState !== 'true') {
        toast.error('You must be logged in to save a case study');
        localStorage.removeItem(AUTH_STORAGE_KEY);
        navigate('/admin/login');
        setSaving(false);
        return { success: false };
      }
      
      // Process the database operations
      try {
        const editSlug = isNew ? null : slug;
        console.log('Using slug to process:', editSlug);
        
        const { caseStudyId } = await processBasicInfo(form, editSlug);
        
        if (!caseStudyId) {
          throw new Error('Failed to process case study basic info');
        }
        
        console.log('Case study ID retrieved:', caseStudyId);
        
        await processContentData(form, caseStudyId, editSlug);
        
        await processSectionImages(form, caseStudyId);
        
        await processCustomSectionsFromProcessor(form, caseStudyId);
        
        toast.success(`Case study ${isNew ? 'created' : 'updated'} successfully`);
        
        if (isNew) {
          navigate(`/admin/case-studies/${form.slug}`);
        }
        
        return { success: true, slug: form.slug };
      } catch (dbError: any) {
        console.error('Database operation error:', dbError);
        
        if (dbError.message.includes('duplicate key')) {
          toast.error(`A case study with slug "${form.slug}" already exists. Please choose a different slug.`);
        } else if (dbError.message.includes('permission denied') || dbError.message.includes('row-level security')) {
          toast.error('Permission denied by database security. Please try logging out and back in.');
          
          // Force a logout and redirect to login page to refresh authentication
          localStorage.removeItem(AUTH_STORAGE_KEY);
          navigate('/admin/login');
        } else {
          toast.error(`Database error: ${dbError.message}`);
        }
        
        return { success: false };
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      
      // Provide more specific error messages based on error types
      if ((error as Error).message.includes('Row Level Security')) {
        toast.error('Permission denied by database security policies. Please try logging out and back in.');
        
        // Force a logout and redirect to login page
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
