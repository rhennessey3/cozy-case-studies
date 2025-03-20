import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { processBasicInfo } from './processors/basicInfoProcessor';
import { processContentData } from './processors/contentDataProcessor';

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
        throw new Error(`Failed to save ${component} image`);
      }
    } else {
      const { error } = await supabase
        .from('case_study_sections')
        .delete()
        .eq('case_study_id', caseStudyId)
        .eq('component', component);
        
      if (error) {
        console.error(`Error deleting ${component} image:`, error);
        throw new Error(`Failed to delete ${component} image`);
      }
    }
  }
};

const processCustomSections = async (form: CaseStudyForm, caseStudyId: string) => {
  // Placeholder for processing custom sections
  // Add your logic here to handle custom sections
};

export const useFormSubmitHandling = (form: CaseStudyForm, navigate: NavigateFunction, slug?: string) => {
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
      
      const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
      
      if (isLocalAuthOnly) {
        toast.success('Case study saved successfully in local mode');
        setSaving(false);
        return { success: true, slug: form.slug };
      }
      
      // Use the improved processors to handle database operations
      console.log('Using slug to process:', slug);
      const { caseStudyId } = await processBasicInfo(form, slug);
      
      if (!caseStudyId) {
        throw new Error('Failed to process case study basic info');
      }
      
      console.log('Case study ID retrieved:', caseStudyId);
      
      await processContentData(form, caseStudyId, slug);
      
      await processSectionImages(form, caseStudyId);
      
      await processCustomSections(form, caseStudyId);
      
      const isNew = !slug;
      toast.success(`Case study ${isNew ? 'created' : 'updated'} successfully`);
      
      if (isNew) {
        navigate(`/admin/case-studies/${form.slug}`);
      }
      
      return { success: true, slug: form.slug };
    } catch (error) {
      console.error('Error saving case study:', error);
      toast.error(`Failed to ${slug ? 'update' : 'create'} case study: ${(error as Error).message}`);
      return { success: false };
    } finally {
      setSaving(false);
    }
  };
  
  return { saving, handleSubmit };
};
