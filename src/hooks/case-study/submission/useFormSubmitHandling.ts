import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { processBasicInfo } from './processors/basicInfoProcessor';
import { processContentData } from './processors/contentDataProcessor';
import { processCustomSectionsFromProcessor } from './processors/customSectionsProcessor';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';

const LOCAL_CASE_STUDIES_KEY = 'local_case_studies';

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
  const caseStudyId = isNew 
    ? "local-" + Date.now() 
    : `local-${slug}`;
  
  console.log(`Local auth mode: ${isNew ? 'Creating' : 'Updating'} case study with slug "${form.slug}"`);
  
  const existingDataString = localStorage.getItem(LOCAL_CASE_STUDIES_KEY);
  const existingData = existingDataString ? JSON.parse(existingDataString) : [];
  
  const existingIndex = existingData.findIndex((cs: any) => cs.slug === form.slug);
  
  const caseStudyData = {
    id: caseStudyId,
    title: form.title,
    slug: form.slug,
    summary: form.summary,
    description: form.description,
    coverImage: form.coverImage,
    category: form.category,
    height: form.height,
    content: {
      intro: form.intro,
      challenge: form.challenge,
      approach: form.approach,
      solution: form.solution,
      results: form.results,
      conclusion: form.conclusion
    },
    alignment: form.alignment,
    subhead: form.subhead,
    introductionParagraph: form.introductionParagraph,
    alignmentImage: form.alignmentImage,
    introImage: form.introImage,
    challengeImage: form.challengeImage,
    approachImage: form.approachImage,
    solutionImage: form.solutionImage,
    resultsImage: form.resultsImage,
    conclusionImage: form.conclusionImage,
    customSections: form.customSections,
    carouselTitle: form.carouselTitle,
    carouselItem1Title: form.carouselItem1Title,
    carouselItem1Content: form.carouselItem1Content,
    carouselItem1Image: form.carouselItem1Image,
    carouselItem2Title: form.carouselItem2Title,
    carouselItem2Content: form.carouselItem2Content,
    carouselItem2Image: form.carouselItem2Image,
    carouselItem3Title: form.carouselItem3Title,
    carouselItem3Content: form.carouselItem3Content,
    carouselItem3Image: form.carouselItem3Image,
    fourParaTitle: form.fourParaTitle,
    fourParaSubtitle: form.fourParaSubtitle,
    fourPara1Title: form.fourPara1Title,
    fourPara1Content: form.fourPara1Content,
    fourPara2Title: form.fourPara2Title,
    fourPara2Content: form.fourPara2Content,
    fourPara3Title: form.fourPara3Title,
    fourPara3Content: form.fourPara3Content,
    fourPara4Title: form.fourPara4Title,
    fourPara4Content: form.fourPara4Content,
    fourParaImage: form.fourParaImage,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  if (existingIndex >= 0) {
    existingData[existingIndex] = caseStudyData;
  } else {
    existingData.push(caseStudyData);
  }
  
  localStorage.setItem(LOCAL_CASE_STUDIES_KEY, JSON.stringify(existingData));
  console.log('Case study saved to local storage:', caseStudyData);
  
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
      const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
      
      const localAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
      console.log('Local auth state:', localAuthState);
      
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
      
      const isNew = !slug || slug === 'new' || slug === '';
      console.log('Mode determined:', isNew ? 'Creating new case study' : 'Editing existing case study', 'Slug:', slug);
      
      if ((isLocalAuthOnly || localAuthState === 'true')) {
        console.log('Processing in local auth mode with localStorage persistence');
        
        const result = await processLocalDatabase(form, isNew, slug);
        
        toast.success(`Case study ${isNew ? 'created' : 'updated'} successfully (Local Mode)`);
        
        if (isNew) {
          navigate(`/admin/case-studies/${form.slug}`);
        }
        
        setSaving(false);
        return { success: true, slug: form.slug };
      }
      
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('Current session data:', sessionData);
      
      if (!sessionData.session && localAuthState !== 'true') {
        toast.error('You must be logged in to save a case study');
        localStorage.removeItem(AUTH_STORAGE_KEY);
        navigate('/admin/login');
        setSaving(false);
        return { success: false };
      }
      
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
