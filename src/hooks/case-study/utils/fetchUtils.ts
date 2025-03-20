
import { CaseStudy } from '@/data/caseStudies';
import { CaseStudyForm } from '@/types/caseStudy';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Maps a case study to form data
 */
export const mapCaseStudyToForm = (data: CaseStudy, sectionImages?: Record<string, string>): CaseStudyForm => {
  return {
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    description: data.description || '',
    coverImage: data.coverImage,
    category: data.category,
    height: data.height || '',
    intro: data.content.intro,
    challenge: data.content.challenge,
    approach: data.content.approach,
    solution: data.content.solution,
    results: data.content.results,
    conclusion: data.content.conclusion,
    alignment: 'left',
    subhead: '',
    introductionParagraph: '',
    alignmentImage: '',
    // Section images if provided
    introImage: sectionImages?.introImage || '',
    challengeImage: sectionImages?.challengeImage || '',
    approachImage: sectionImages?.approachImage || '',
    solutionImage: sectionImages?.solutionImage || '',
    resultsImage: sectionImages?.resultsImage || '',
    conclusionImage: sectionImages?.conclusionImage || '',
    // Set defaults for other fields
    carouselTitle: '',
    carouselItem1Title: '',
    carouselItem1Content: '',
    carouselItem1Image: '',
    carouselItem2Title: '',
    carouselItem2Content: '',
    carouselItem2Image: '',
    carouselItem3Title: '',
    carouselItem3Content: '',
    carouselItem3Image: '',
    fourParaTitle: '',
    fourParaSubtitle: '',
    fourPara1Title: '',
    fourPara1Content: '',
    fourPara2Title: '',
    fourPara2Content: '',
    fourPara3Title: '',
    fourPara3Content: '',
    fourPara4Title: '',
    fourPara4Content: '',
    fourParaImage: '',
    customSections: ''
  };
};

/**
 * Create a new form for a new case study
 */
export const createNewCaseStudyForm = (): CaseStudyForm => {
  return {
    title: '',
    slug: '',
    summary: '',
    description: '',
    coverImage: '',
    category: '',
    height: '',
    intro: '',
    challenge: '',
    approach: '',
    solution: '',
    results: '',
    conclusion: '',
    alignment: 'left',
    subhead: '',
    introductionParagraph: '',
    alignmentImage: '',
    introImage: '',
    challengeImage: '',
    approachImage: '',
    solutionImage: '',
    resultsImage: '',
    conclusionImage: '',
    customSections: ''
  };
};

/**
 * Fetch section images from Supabase
 */
export const fetchSectionImages = async (caseStudyId: string): Promise<Record<string, string>> => {
  const sectionImages: Record<string, string> = {
    introImage: '',
    challengeImage: '',
    approachImage: '',
    solutionImage: '',
    resultsImage: '',
    conclusionImage: ''
  };
  
  try {
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('case_study_sections')
      .select('*')
      .eq('case_study_id', caseStudyId);
      
    if (!sectionsError && sectionsData) {
      sectionsData.forEach(section => {
        if (section.component === 'intro' && section.image_url) {
          sectionImages.introImage = section.image_url;
        } else if (section.component === 'challenge' && section.image_url) {
          sectionImages.challengeImage = section.image_url;
        } else if (section.component === 'approach' && section.image_url) {
          sectionImages.approachImage = section.image_url;
        } else if (section.component === 'solution' && section.image_url) {
          sectionImages.solutionImage = section.image_url;
        } else if (section.component === 'results' && section.image_url) {
          sectionImages.resultsImage = section.image_url;
        } else if (section.component === 'conclusion' && section.image_url) {
          sectionImages.conclusionImage = section.image_url;
        }
      });
    }
  } catch (error) {
    console.error('Error fetching section images:', error);
  }
  
  return sectionImages;
};

/**
 * Utility function to determine if we're in admin section
 */
export const isAdminMode = (): boolean => {
  return window.location.pathname.includes('/admin/');
};
