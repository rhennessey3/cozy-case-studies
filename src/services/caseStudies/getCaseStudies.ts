
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { transformCaseStudyData } from './transformers';

/**
 * Get all case studies
 * @returns Promise that resolves to an array of case studies
 */
export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    // Fetch case studies from Supabase database
    const { data, error } = await supabase
      .from('case_studies')
      .select(`
        id, 
        title, 
        slug, 
        summary, 
        description, 
        cover_image, 
        category,
        height,
        case_study_content (
          intro, 
          challenge, 
          approach, 
          solution, 
          results, 
          conclusion
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching case studies:', error);
      throw error;
    }
    
    // Transform the data to match our CaseStudy type
    const caseStudies: CaseStudy[] = data.map(study => transformCaseStudyData(study));
    
    return caseStudies;
  } catch (error) {
    console.error('Error in getCaseStudies:', error);
    // Return empty array on error instead of throwing
    return [];
  }
};
