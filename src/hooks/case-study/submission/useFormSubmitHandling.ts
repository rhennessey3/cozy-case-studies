import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

const processBasicInfo = async (form: CaseStudyForm, slug?: string) => {
  const isNew = !slug;
  let caseStudyId: string | undefined;
  
  if (isNew) {
    const { data, error } = await supabase
      .from('case_studies')
      .insert({
        title: form.title,
        slug: form.slug,
        summary: form.summary,
        description: form.description,
        cover_image: form.coverImage,
        category: form.category,
        height: form.height
      })
      .select('id')
      .single();
      
    if (error) {
      console.error('Error creating case study:', error);
      throw new Error('Failed to create case study');
    }
    
    caseStudyId = data.id;
  } else {
    const { error } = await supabase
      .from('case_studies')
      .update({
        title: form.title,
        slug: form.slug,
        summary: form.summary,
        description: form.description,
        cover_image: form.coverImage,
        category: form.category,
        height: form.height
      })
      .eq('slug', slug);
      
    if (error) {
      console.error('Error updating case study:', error);
      throw new Error('Failed to update case study');
    }
    
    const { data, error: fetchError } = await supabase
      .from('case_studies')
      .select('id')
      .eq('slug', form.slug)
      .single();
      
    if (fetchError) {
      console.error('Error fetching case study ID:', fetchError);
      throw new Error('Failed to fetch case study ID');
    }
    
    caseStudyId = data.id;
  }
  
  return { caseStudyId, isNew };
};

const processContentData = async (form: CaseStudyForm, caseStudyId: string, isNew: boolean) => {
  const { data: contentData, error: contentError } = await supabase
    .from('case_study_content')
    .upsert(
      {
        case_study_id: caseStudyId,
        intro: form.intro,
        challenge: form.challenge,
        approach: form.approach,
        solution: form.solution,
        results: form.results,
        conclusion: form.conclusion
      },
      { onConflict: 'case_study_id' }
    )
    .select()
    .single();
    
  if (contentError) {
    console.error('Error saving content data:', contentError);
    throw new Error('Failed to save content data');
  }
};

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
      
      const { caseStudyId, isNew } = await processBasicInfo(form, slug);
      
      if (!caseStudyId) {
        throw new Error('Failed to process case study basic info');
      }
      
      await processContentData(form, caseStudyId, isNew);
      
      await processSectionImages(form, caseStudyId);
      
      await processCustomSections(form, caseStudyId);
      
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
