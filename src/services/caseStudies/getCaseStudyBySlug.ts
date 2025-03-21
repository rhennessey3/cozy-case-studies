
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
  if (!slug) {
    console.error('No slug provided to getCaseStudyBySlug');
    throw new Error('No slug provided to getCaseStudyBySlug');
  }
  
  console.log(`[getCaseStudyBySlug] Fetching case study with slug: "${slug}"`);
  
  // When in admin mode and creating a new case study, we don't want to throw an error
  if (isAdminRoute() && slug === 'new') {
    console.log(`[getCaseStudyBySlug] Creating new case study in admin mode`);
    return createNewCaseStudy(slug);
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
      .maybeSingle();
    
    if (error) {
      console.error(`[getCaseStudyBySlug] Supabase error: ${error.message}`);
      
      // If in admin mode, return a blank case study
      if (isAdminRoute()) {
        return createNewCaseStudy(slug);
      }
      
      throw new Error(`Failed to fetch case study: ${error.message}`);
    }
    
    if (!data) {
      console.log(`[getCaseStudyBySlug] No data returned from Supabase`);
      
      // If in admin mode, return a blank case study
      if (isAdminRoute()) {
        return createNewCaseStudy(slug);
      }
      
      throw new Error(`Case study with slug "${slug}" not found`);
    }
    
    // Transform the data to match our CaseStudy type
    console.log(`[getCaseStudyBySlug] Found case study in Supabase: "${data.title}"`);
    return transformCaseStudyData(data);
  } catch (error) {
    console.error(`[getCaseStudyBySlug] Error fetching case study: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    // If in admin mode, return a default case study
    if (isAdminRoute()) {
      return createNewCaseStudy(slug);
    }
    
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
    },
    customSections: "[]" // Initialize with empty array
  };
};

// Alias for getCaseStudyBySlug to maintain compatibility
export const fetchCaseStudyBySlug = async (slug: string) => {
  return getCaseStudyBySlug(slug);
};
