
import { CaseStudy } from '@/data/caseStudies';
import { CaseStudyForm } from '@/types/caseStudy';

export const LOCAL_CASE_STUDIES_KEY = 'local_case_studies';

/**
 * Get all case studies from local storage
 */
export const getLocalCaseStudies = (): CaseStudy[] => {
  const localCaseStudiesString = localStorage.getItem(LOCAL_CASE_STUDIES_KEY);
  
  if (!localCaseStudiesString) {
    return [];
  }
  
  try {
    const localCaseStudies = JSON.parse(localCaseStudiesString);
    
    // Format the local case studies to match the expected CaseStudy structure
    return localCaseStudies.map((cs: any) => ({
      id: cs.id,
      title: cs.title,
      slug: cs.slug,
      category: cs.category || 'Uncategorized',
      summary: cs.summary || '',
      description: cs.description || '',
      coverImage: cs.coverImage || '',
      height: cs.height || '',
      content: cs.content || {
        intro: '',
        challenge: '',
        approach: '',
        solution: '',
        results: '',
        conclusion: ''
      },
      customSections: cs.customSections || '[]', // Ensure customSections is available
      created_at: cs.created_at || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error parsing local case studies:', error);
    return [];
  }
};

/**
 * Get a single case study from local storage by slug
 */
export const getLocalCaseStudyBySlug = (slug: string): CaseStudy | null => {
  const localCaseStudies = getLocalCaseStudies();
  const localCaseStudy = localCaseStudies.find(cs => cs.slug === slug);
  
  return localCaseStudy || null;
};

/**
 * Save a case study to local storage
 */
export const saveLocalCaseStudy = (form: CaseStudyForm, isNew: boolean, slug?: string): { success: boolean; slug: string; caseStudyId: string } => {
  const caseStudyId = isNew 
    ? "local-" + Date.now() 
    : `local-${slug}`;
  
  console.log(`Local auth mode: ${isNew ? 'Creating' : 'Updating'} case study with slug "${form.slug}"`);
  console.log("Custom sections to save:", form.customSections);
  
  const existingData = getLocalCaseStudies();
  const existingIndex = existingData.findIndex((cs) => cs.slug === form.slug);
  
  const caseStudyData = {
    id: caseStudyId,
    title: form.title,
    slug: form.slug,
    summary: form.summary,
    description: form.description,
    coverImage: form.coverImage,
    category: form.category,
    height: form.height,
    content: {
      intro: form.intro,
      challenge: form.challenge,
      approach: form.approach,
      solution: form.solution,
      results: form.results,
      conclusion: form.conclusion
    },
    alignment: form.alignment,
    subhead: form.subhead,
    introductionParagraph: form.introductionParagraph,
    alignmentImage: form.alignmentImage,
    introImage: form.introImage,
    challengeImage: form.challengeImage,
    approachImage: form.approachImage,
    solutionImage: form.solutionImage,
    resultsImage: form.resultsImage,
    conclusionImage: form.conclusionImage,
    customSections: form.customSections, // Make sure to save the custom sections
    carouselTitle: form.carouselTitle,
    carouselItem1Title: form.carouselItem1Title,
    carouselItem1Content: form.carouselItem1Content,
    carouselItem1Image: form.carouselItem1Image,
    carouselItem2Title: form.carouselItem2Title,
    carouselItem2Content: form.carouselItem2Content,
    carouselItem2Image: form.carouselItem2Image,
    carouselItem3Title: form.carouselItem3Title,
    carouselItem3Content: form.carouselItem3Content,
    carouselItem3Image: form.carouselItem3Image,
    fourParaTitle: form.fourParaTitle,
    fourParaSubtitle: form.fourParaSubtitle,
    fourPara1Title: form.fourPara1Title,
    fourPara1Content: form.fourPara1Content,
    fourPara2Title: form.fourPara2Title,
    fourPara2Content: form.fourPara2Content,
    fourPara3Title: form.fourPara3Title,
    fourPara3Content: form.fourPara3Content,
    fourPara4Title: form.fourPara4Title,
    fourPara4Content: form.fourPara4Content,
    fourParaImage: form.fourParaImage,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  if (existingIndex >= 0) {
    existingData[existingIndex] = caseStudyData;
  } else {
    existingData.push(caseStudyData);
  }
  
  localStorage.setItem(LOCAL_CASE_STUDIES_KEY, JSON.stringify(existingData));
  console.log('Case study saved to local storage:', caseStudyData);
  
  return {
    success: true,
    slug: form.slug,
    caseStudyId
  };
};
