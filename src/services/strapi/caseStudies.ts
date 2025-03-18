
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { getImageUrl, generateContentFromSections } from './utils';
import { DEBUG, FRONTEND_URL } from './config';
import { toast } from '@/components/ui/use-toast';
import { StrapiCaseStudySection } from '@/types/strapi';

/**
 * Fetches all case studies from Supabase
 * @returns A promise that resolves to an array of case studies
 */
export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    if (DEBUG) console.log('Fetching case studies from Supabase');
    
    // Fetch case studies from Supabase
    const { data: caseStudiesData, error: caseStudiesError } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (caseStudiesError) {
      throw caseStudiesError;
    }
    
    if (!caseStudiesData || caseStudiesData.length === 0) {
      console.log('No case studies found in Supabase');
      return [];
    }
    
    if (DEBUG) console.log(`Retrieved ${caseStudiesData.length} case studies from Supabase`);
    
    // Fetch case study content for all case studies
    const { data: contentData, error: contentError } = await supabase
      .from('case_study_content')
      .select('*');
    
    if (contentError) {
      throw contentError;
    }
    
    // Transform Supabase data to our app's format
    const caseStudies = await Promise.all(caseStudiesData.map(async (study) => {
      // Find matching content
      const content = contentData?.find(c => c.case_study_id === study.id);
      
      // Fetch sections if they exist
      const { data: sectionsData } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', study.id)
        .order('sort_order', { ascending: true });
      
      // Map sections to the expected format
      const sections = sectionsData?.map(section => {
        const metadata = section.metadata as Record<string, string> || {};
        
        return {
          id: Number(section.id), // Convert string ID to number
          __component: section.component,
          casestudytitle: section.title,
          content: section.content,
          image: section.image_url ? { data: { attributes: { url: section.image_url } } } : null,
          objectiveheading: metadata.objectiveheading,
          objectiveparagraph: metadata.objectiveparagraph,
          approachheading: metadata.approachheading,
          approachparagraph: metadata.approachparagraph,
          resultsheading: metadata.resultsheading,
          resultsparagraph: metadata.resultsparagraph
        } as StrapiCaseStudySection;
      }) || [];
      
      return {
        id: study.id,
        title: study.title,
        slug: study.slug,
        summary: study.summary,
        description: study.description || '',
        coverImage: study.cover_image,
        category: study.category,
        height: study.height || undefined,
        content: content ? {
          intro: content.intro || '',
          challenge: content.challenge || '',
          approach: content.approach || '',
          solution: content.solution || '',
          results: content.results || '',
          conclusion: content.conclusion || ''
        } : {
          intro: '',
          challenge: '',
          approach: '',
          solution: '',
          results: '',
          conclusion: ''
        },
        sections
      } as CaseStudy;
    }));
    
    return caseStudies;
  } catch (error) {
    console.error('Error fetching case studies from Supabase:', error);
    
    if (error instanceof Error) {
      toast({
        title: "Database Error",
        description: `Failed to fetch data from Supabase: ${error.message}`,
        variant: "destructive"
      });
    }
    
    // Import local case studies as a fallback
    const { caseStudies: localCaseStudies } = await import('@/data/caseStudies');
    console.log('Falling back to local case studies data');
    return localCaseStudies;
  }
};

/**
 * Fetches a single case study by slug from Supabase
 * @param slug The slug of the case study to fetch
 * @returns A promise that resolves to a case study or undefined if not found
 */
export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  try {
    if (DEBUG) console.log(`Fetching case study with slug "${slug}" from Supabase`);
    
    // Fetch the case study by slug
    const { data: caseStudiesData, error: caseStudiesError } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (caseStudiesError) {
      throw caseStudiesError;
    }
    
    if (!caseStudiesData) {
      console.log(`No case study found with slug "${slug}" in Supabase`);
      return undefined;
    }
    
    // Fetch the case study content
    const { data: contentData, error: contentError } = await supabase
      .from('case_study_content')
      .select('*')
      .eq('case_study_id', caseStudiesData.id)
      .single();
    
    if (contentError && contentError.code !== 'PGRST116') { // PGRST116 is "row not found" error
      throw contentError;
    }
    
    // Fetch sections if they exist
    const { data: sectionsData } = await supabase
      .from('case_study_sections')
      .select('*')
      .eq('case_study_id', caseStudiesData.id)
      .order('sort_order', { ascending: true });
    
    // Map sections to the expected format
    const sections = sectionsData?.map(section => {
      const metadata = section.metadata as Record<string, string> || {};
      
      return {
        id: Number(section.id), // Convert string ID to number
        __component: section.component,
        casestudytitle: section.title,
        content: section.content,
        image: section.image_url ? { data: { attributes: { url: section.image_url } } } : null,
        objectiveheading: metadata.objectiveheading,
        objectiveparagraph: metadata.objectiveparagraph,
        approachheading: metadata.approachheading,
        approachparagraph: metadata.approachparagraph,
        resultsheading: metadata.resultsheading,
        resultsparagraph: metadata.resultsparagraph
      } as StrapiCaseStudySection;
    }) || [];
    
    // Create the case study object
    const caseStudy: CaseStudy = {
      id: caseStudiesData.id,
      title: caseStudiesData.title,
      slug: caseStudiesData.slug,
      summary: caseStudiesData.summary,
      description: caseStudiesData.description || '',
      coverImage: caseStudiesData.cover_image,
      category: caseStudiesData.category,
      height: caseStudiesData.height || undefined,
      content: contentData ? {
        intro: contentData.intro || '',
        challenge: contentData.challenge || '',
        approach: contentData.approach || '',
        solution: contentData.solution || '',
        results: contentData.results || '',
        conclusion: contentData.conclusion || ''
      } : {
        intro: '',
        challenge: '',
        approach: '',
        solution: '',
        results: '',
        conclusion: ''
      },
      sections
    };
    
    return caseStudy;
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug} from Supabase:`, error);
    
    if (error instanceof Error) {
      toast({
        title: "Database Error",
        description: `Failed to fetch case study: ${error.message}`,
        variant: "destructive"
      });
    }
    
    // Import local case studies as a fallback
    const { caseStudies: localCaseStudies } = await import('@/data/caseStudies');
    console.log(`Falling back to local case study with slug ${slug}`);
    return localCaseStudies.find(study => study.slug === slug);
  }
};
