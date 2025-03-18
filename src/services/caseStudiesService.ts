
import { supabase } from '@/integrations/supabase/client';
import { caseStudies as mockCaseStudies, CaseStudy } from '@/data/caseStudies';

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    // First, try to get data from Supabase
    const { data: caseStudiesData, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('title');

    if (error) {
      console.error('Error fetching from Supabase:', error);
      // Fall back to mock data
      return mockCaseStudies;
    }

    // If successful, get the content for each case study
    const caseStudiesWithContent = await Promise.all(
      caseStudiesData.map(async (study) => {
        const { data: contentData, error: contentError } = await supabase
          .from('case_study_content')
          .select('*')
          .eq('case_study_id', study.id)
          .single();

        if (contentError) {
          console.error(`Error fetching content for case study ${study.id}:`, contentError);
          // Find the matching mock data as fallback
          const mockData = mockCaseStudies.find(mock => mock.slug === study.slug);
          return {
            id: study.id,
            title: study.title,
            slug: study.slug,
            summary: study.summary,
            description: study.description,
            coverImage: study.cover_image,
            category: study.category,
            height: study.height,
            content: mockData ? mockData.content : {
              intro: '',
              challenge: '',
              approach: '',
              solution: '',
              results: '',
              conclusion: ''
            }
          };
        }

        return {
          id: study.id,
          title: study.title,
          slug: study.slug,
          summary: study.summary,
          description: study.description,
          coverImage: study.cover_image,
          category: study.category,
          height: study.height,
          content: {
            intro: contentData.intro,
            challenge: contentData.challenge,
            approach: contentData.approach,
            solution: contentData.solution,
            results: contentData.results,
            conclusion: contentData.conclusion
          }
        };
      })
    );

    return caseStudiesWithContent;
  } catch (error) {
    console.error('Error in getCaseStudies:', error);
    // Fallback to mock data
    return mockCaseStudies;
  }
};

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | null> => {
  try {
    // Try to get from Supabase first
    const { data: caseStudyData, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching case study from Supabase:', error);
      // Fall back to mock data
      const mockStudy = mockCaseStudies.find(study => study.slug === slug);
      return mockStudy || null;
    }

    // Get the content for this case study
    const { data: contentData, error: contentError } = await supabase
      .from('case_study_content')
      .select('*')
      .eq('case_study_id', caseStudyData.id)
      .single();

    if (contentError) {
      console.error(`Error fetching content for case study ${caseStudyData.id}:`, contentError);
      const mockStudy = mockCaseStudies.find(study => study.slug === slug);
      return {
        id: caseStudyData.id,
        title: caseStudyData.title,
        slug: caseStudyData.slug,
        summary: caseStudyData.summary,
        description: caseStudyData.description,
        coverImage: caseStudyData.cover_image,
        category: caseStudyData.category,
        height: caseStudyData.height,
        content: mockStudy ? mockStudy.content : {
          intro: '',
          challenge: '',
          approach: '',
          solution: '',
          results: '',
          conclusion: ''
        }
      };
    }

    return {
      id: caseStudyData.id,
      title: caseStudyData.title,
      slug: caseStudyData.slug,
      summary: caseStudyData.summary,
      description: caseStudyData.description,
      coverImage: caseStudyData.cover_image,
      category: caseStudyData.category,
      height: caseStudyData.height,
      content: {
        intro: contentData.intro,
        challenge: contentData.challenge,
        approach: contentData.approach,
        solution: contentData.solution,
        results: contentData.results,
        conclusion: contentData.conclusion
      }
    };
  } catch (error) {
    console.error('Error in getCaseStudyBySlug:', error);
    // Fallback to mock data
    const mockStudy = mockCaseStudies.find(study => study.slug === slug);
    return mockStudy || null;
  }
};

export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('case_studies').select('id').limit(1);
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Database connection test failed with exception:', error);
    return false;
  }
};
