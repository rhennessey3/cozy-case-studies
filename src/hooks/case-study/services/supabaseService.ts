
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { toast } from 'sonner';

/**
 * Fetch all case studies from Supabase
 */
export const fetchCaseStudiesFromSupabase = async (): Promise<CaseStudy[]> => {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('id, title, slug, category, summary, description, cover_image, height, created_at')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching case studies:', error);
      toast.error('Failed to fetch case studies');
      return [];
    }
    
    if (data) {
      // Format Supabase response to match CaseStudy type
      return data.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category || 'Uncategorized',
        summary: item.summary || '',
        description: item.description || '',
        coverImage: item.cover_image || '',
        height: item.height || '',
        content: {
          intro: '',
          challenge: '',
          approach: '',
          solution: '',
          results: '',
          conclusion: ''
        }
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Exception fetching case studies:', error);
    toast.error('Failed to fetch case studies');
    return [];
  }
};

/**
 * Process section images for a case study
 */
export const processSectionImages = async (
  form: any, 
  caseStudyId: string
): Promise<void> => {
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
