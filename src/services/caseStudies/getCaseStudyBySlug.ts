
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { transformCaseStudyData } from './transformers';
import { isAdminRoute } from './utils';
import { getLocalCaseStudyBySlug } from '@/hooks/case-study/utils/localStorageUtils';
import { isLocalAuthMode } from '@/hooks/case-study/utils/authUtils';
import { toast } from 'sonner';

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
  
  // Check for local auth mode first - this is more direct than the admin route check
  if (isLocalAuthMode()) {
    console.log(`[getCaseStudyBySlug] Using local storage in local auth mode for slug: "${slug}"`);
    const localCaseStudy = getLocalCaseStudyBySlug(slug);
    
    if (localCaseStudy) {
      console.log(`[getCaseStudyBySlug] Found case study in local storage:`, localCaseStudy);
      // Make sure customSections property is available for consumption by the frontend
      if (localCaseStudy.customSections) {
        console.log(`[getCaseStudyBySlug] Custom sections found in local storage:`, localCaseStudy.customSections);
      }
      return localCaseStudy;
    } else if (isAdminRoute()) {
      // In admin mode with local auth, create a new case study if it doesn't exist
      console.log(`[getCaseStudyBySlug] Creating new case study in admin mode for slug: "${slug}"`);
      return createNewCaseStudy(slug);
    } else {
      console.error(`[getCaseStudyBySlug] Case study not found in local storage: "${slug}"`);
      throw new Error(`Case study with slug "${slug}" not found in local storage`);
    }
  }
  
  // When in admin mode and creating a new case study, we don't want to throw an error
  if (isAdminRoute() && !slug.includes('/')) {
    try {
      console.log(`[getCaseStudyBySlug] Fetching from Supabase in admin mode: "${slug}"`);
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
        console.error(`[getCaseStudyBySlug] Supabase error in admin mode: ${error.message}`);
        // If in admin mode, return a blank case study
        return createNewCaseStudy(slug);
      }
      
      if (!data) {
        console.log(`[getCaseStudyBySlug] No data returned from Supabase, creating new case study`);
        return createNewCaseStudy(slug);
      }
      
      // Transform the data to match our CaseStudy type
      console.log(`[getCaseStudyBySlug] Found case study in Supabase: "${data.title}"`);
      return transformCaseStudyData(data);
    } catch (error) {
      console.error(`[getCaseStudyBySlug] Error in admin mode: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // If in admin mode, return a default case study
      return createNewCaseStudy(slug);
    }
  }
  
  try {
    console.log(`[getCaseStudyBySlug] Fetching from Supabase in public mode: "${slug}"`);
    // First, try to get from local storage as fallback
    const localCaseStudy = getLocalCaseStudyBySlug(slug);
    if (localCaseStudy) {
      console.log(`[getCaseStudyBySlug] Found case study in local storage: "${localCaseStudy.title}"`);
      return localCaseStudy;
    }
    
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
      console.error(`[getCaseStudyBySlug] Supabase error in public mode: ${error.message}`);
      throw new Error(`Failed to fetch case study: ${error.message}`);
    }
    
    if (!data) {
      console.error(`[getCaseStudyBySlug] Case study not found in Supabase: "${slug}"`);
      throw new Error(`Case study with slug "${slug}" not found`);
    }
    
    // Transform the data to match our CaseStudy type
    console.log(`[getCaseStudyBySlug] Found case study in Supabase: "${data.title}"`);
    return transformCaseStudyData(data);
  } catch (error) {
    console.error(`[getCaseStudyBySlug] Error fetching case study: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    // If we have a local copy, return that instead as a fallback
    const localCaseStudy = getLocalCaseStudyBySlug(slug);
    if (localCaseStudy) {
      console.log(`[getCaseStudyBySlug] Falling back to local storage copy: "${localCaseStudy.title}"`);
      return localCaseStudy;
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
