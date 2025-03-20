
import { CaseStudy } from '@/data/caseStudies';
import { CaseStudyForm } from '@/types/caseStudy';
import { getLocalCaseStudyBySlug } from '../utils/localStorageUtils';
import { createNewCaseStudyForm } from '../utils/fetchUtils';

/**
 * Fetch a case study from local storage
 */
export const fetchLocalCaseStudy = (slug: string): {
  caseStudy: CaseStudy | null;
  form: CaseStudyForm | null;
} => {
  console.log('Checking local storage for case study with slug:', slug);
  
  // For new case studies, return empty form
  if (slug === 'new') {
    return { 
      caseStudy: null, 
      form: createNewCaseStudyForm()
    };
  }
  
  // Try to get existing case study from local storage
  const localCaseStudy = getLocalCaseStudyBySlug(slug);
  
  if (!localCaseStudy) {
    return { caseStudy: null, form: null };
  }
  
  console.log('Found case study in local storage:', localCaseStudy);
  
  // Map the local case study data to form fields
  const form: CaseStudyForm = {
    title: localCaseStudy.title,
    slug: localCaseStudy.slug,
    summary: localCaseStudy.summary,
    description: localCaseStudy.description || '',
    coverImage: localCaseStudy.coverImage,
    category: localCaseStudy.category,
    height: localCaseStudy.height || '',
    intro: localCaseStudy.content.intro,
    challenge: localCaseStudy.content.challenge,
    approach: localCaseStudy.content.approach,
    solution: localCaseStudy.content.solution,
    results: localCaseStudy.content.results,
    conclusion: localCaseStudy.content.conclusion,
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
  
  return { caseStudy: localCaseStudy, form };
};
