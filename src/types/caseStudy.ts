
import { CaseStudy } from '@/data/caseStudies';

export interface CaseStudyForm {
  title: string;
  slug: string;
  summary: string;
  description: string;
  coverImage: string;
  category: string;
  height: string;
  intro: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string;
  conclusion: string;
  introImage: string;
  challengeImage: string;
  approachImage: string;
  solutionImage: string;
  resultsImage: string;
  conclusionImage: string;
  alignment?: string;
  subhead?: string;
  introductionParagraph?: string;
  alignmentImage?: string;
  // New carousel fields
  carouselTitle?: string;
  carouselItem1Title?: string;
  carouselItem1Content?: string;
  carouselItem1Image?: string;
  carouselItem2Title?: string;
  carouselItem2Content?: string;
  carouselItem2Image?: string;
  carouselItem3Title?: string;
  carouselItem3Content?: string;
  carouselItem3Image?: string;
}

export const initialFormState: CaseStudyForm = {
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
  introImage: '',
  challengeImage: '',
  approachImage: '',
  solutionImage: '',
  resultsImage: '',
  conclusionImage: '',
  alignment: 'left',
  subhead: '',
  introductionParagraph: '',
  alignmentImage: '',
  // Initialize new carousel fields
  carouselTitle: '3 Column Slider',
  carouselItem1Title: 'Planning',
  carouselItem1Content: '',
  carouselItem1Image: '',
  carouselItem2Title: 'Development',
  carouselItem2Content: '',
  carouselItem2Image: '',
  carouselItem3Title: 'Results',
  carouselItem3Content: '',
  carouselItem3Image: ''
};
