
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { transformCaseStudyData } from './transformers';
import { getLocalCaseStudies } from '@/hooks/case-study/utils/localStorageUtils';
import { isLocalAuthMode } from '@/hooks/case-study/utils/authUtils';

/**
 * Get all case studies
 * @returns Promise that resolves to an array of case studies
 */
export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    console.log('Fetching case studies from Supabase...');
    
    // Check if we're in local auth mode first
    if (isLocalAuthMode()) {
      console.log('Using local storage for case studies in local auth mode');
      const localCaseStudies = getLocalCaseStudies();
      console.log(`Found ${localCaseStudies.length} case studies in local storage`);
      return localCaseStudies;
    }
    
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
      console.error('Error fetching case studies from Supabase:', error);
      throw error;
    }
    
    console.log(`Successfully fetched ${data.length} case studies from Supabase`);
    
    // Transform the data to match our CaseStudy type
    const supabaseCaseStudies: CaseStudy[] = data.map(study => transformCaseStudyData(study));
    
    // Also get local case studies and merge them with Supabase case studies
    const localCaseStudies = getLocalCaseStudies();
    console.log(`Found ${localCaseStudies.length} additional case studies in local storage`);
    
    // Combine both sources, avoiding duplicates by slug
    const allSlugs = new Set();
    const combinedCaseStudies: CaseStudy[] = [];
    
    // Add Supabase case studies first
    for (const study of supabaseCaseStudies) {
      allSlugs.add(study.slug);
      combinedCaseStudies.push(study);
    }
    
    // Then add local case studies that don't have the same slug
    for (const study of localCaseStudies) {
      if (!allSlugs.has(study.slug)) {
        combinedCaseStudies.push(study);
      }
    }
    
    console.log(`Returning total of ${combinedCaseStudies.length} case studies`);
    return combinedCaseStudies;
  } catch (error) {
    console.error('Error in getCaseStudies:', error);
    
    // On error, try to return at least local case studies
    try {
      const localCaseStudies = getLocalCaseStudies();
      console.log(`Falling back to ${localCaseStudies.length} local case studies due to error`);
      return localCaseStudies;
    } catch (localError) {
      console.error('Error getting local case studies as fallback:', localError);
      return [];
    }
  }
};
