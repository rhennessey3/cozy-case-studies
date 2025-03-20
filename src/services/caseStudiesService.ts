
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';

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
    const caseStudies: CaseStudy[] = data.map(study => ({
      id: study.id,
      title: study.title,
      slug: study.slug,
      summary: study.summary,
      description: study.description || '',
      coverImage: study.cover_image,
      category: study.category,
      height: study.height || '',
      content: study.case_study_content?.[0] ? {
        intro: study.case_study_content[0].intro || '',
        challenge: study.case_study_content[0].challenge || '',
        approach: study.case_study_content[0].approach || '',
        solution: study.case_study_content[0].solution || '',
        results: study.case_study_content[0].results || '',
        conclusion: study.case_study_content[0].conclusion || ''
      } : {
        intro: '',
        challenge: '',
        approach: '',
        solution: '',
        results: '',
        conclusion: ''
      }
    }));
    
    return caseStudies;
  } catch (error) {
    console.error('Error in getCaseStudies:', error);
    // Return empty array on error instead of throwing
    return [];
  }
};

/**
 * Get a specific case study by slug
 * @param slug The slug of the case study to retrieve
 * @returns Promise that resolves to a case study or undefined if not found
 */
export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  // When in admin mode and creating a new case study, we don't want to throw an error
  if (window.location.pathname.includes('/admin/case-studies/') && !slug.includes('/')) {
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
        }
        throw error;
      }
      
      // Transform the data to match our CaseStudy type
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        description: data.description || '',
        coverImage: data.cover_image,
        category: data.category,
        height: data.height || '',
        content: data.case_study_content?.[0] ? {
          intro: data.case_study_content[0].intro || '',
          challenge: data.case_study_content[0].challenge || '',
          approach: data.case_study_content[0].approach || '',
          solution: data.case_study_content[0].solution || '',
          results: data.case_study_content[0].results || '',
          conclusion: data.case_study_content[0].conclusion || ''
        } : {
          intro: '',
          challenge: '',
          approach: '',
          solution: '',
          results: '',
          conclusion: ''
        }
      };
    } catch (error) {
      console.error('Error fetching case study by slug:', error);
      // If in admin mode, return a default case study
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
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      description: data.description || '',
      coverImage: data.cover_image,
      category: data.category,
      height: data.height || '',
      content: data.case_study_content?.[0] ? {
        intro: data.case_study_content[0].intro || '',
        challenge: data.case_study_content[0].challenge || '',
        approach: data.case_study_content[0].approach || '',
        solution: data.case_study_content[0].solution || '',
        results: data.case_study_content[0].results || '',
        conclusion: data.case_study_content[0].conclusion || ''
      } : {
        intro: '',
        challenge: '',
        approach: '',
        solution: '',
        results: '',
        conclusion: ''
      }
    };
  } catch (error) {
    console.error('Error fetching case study by slug:', error);
    throw new Error(`Case study with slug "${slug}" not found`);
  }
};
