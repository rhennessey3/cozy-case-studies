
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { transformCaseStudyData } from './transformers';
import { isAdminRoute } from './utils';

/**
 * Get a specific case study by slug
 * @param slug The slug of the case study to retrieve
 * @returns Promise that resolves to a case study or undefined if not found
 */
export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  // When in admin mode and creating a new case study, we don't want to throw an error
  if (isAdminRoute() && !slug.includes('/')) {
    try {
      // Fetch the case study from Supabase
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
        .eq('slug', slug)
        .single();
      
      if (error) {
        // If not found and in admin mode, return a blank case study
        if (error.code === 'PGRST116' || error.message.includes('No rows found')) {
          return createNewCaseStudy(slug);
        }
        throw error;
      }
      
      // Transform the data to match our CaseStudy type
      return transformCaseStudyData(data);
    } catch (error) {
      console.error('Error fetching case study by slug:', error);
      // If in admin mode, return a default case study
      return createNewCaseStudy(slug);
    }
  }
  
  try {
    // Fetch the case study from Supabase
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
      .eq('slug', slug)
      .single();
    
    if (error) {
      throw new Error(`Case study with slug "${slug}" not found`);
    }
    
    // Transform the data to match our CaseStudy type
    return transformCaseStudyData(data);
  } catch (error) {
    console.error('Error fetching case study by slug:', error);
    throw new Error(`Case study with slug "${slug}" not found`);
  }
};

// Function to create a blank case study for new entries
const createNewCaseStudy = (slug: string): CaseStudy => {
  return {
    id: "new",
    title: "",
    slug: slug,
    summary: "",
    description: "",
    coverImage: "",
    category: "",
    content: {
      intro: "",
      challenge: "",
      approach: "",
      solution: "",
      results: "",
      conclusion: ""
    }
  };
};

// Alias for getCaseStudyBySlug to maintain compatibility
export const fetchCaseStudyBySlug = async (slug: string) => {
  return getCaseStudyBySlug(slug);
};
