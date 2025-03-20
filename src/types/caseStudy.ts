
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
  // Carousel fields
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
  // Four paragraphs section
  fourParaTitle?: string;
  fourParaSubtitle?: string;
  fourPara1Title?: string;
  fourPara1Content?: string;
  fourPara2Title?: string;
  fourPara2Content?: string;
  fourPara3Title?: string;
  fourPara3Content?: string;
  fourPara4Title?: string;
  fourPara4Content?: string;
  fourParaImage?: string;
  // Custom sections
  customSections?: string;
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
  // Carousel fields with defaults
  carouselTitle: '3 Column Slider',
  carouselItem1Title: 'Planning',
  carouselItem1Content: '',
  carouselItem1Image: '',
  carouselItem2Title: 'Development',
  carouselItem2Content: '',
  carouselItem2Image: '',
  carouselItem3Title: 'Results',
  carouselItem3Content: '',
  carouselItem3Image: '',
  // Four paragraphs section with defaults
  fourParaTitle: '4 Small Paragraphs',
  fourParaSubtitle: 'With Photo',
  fourPara1Title: 'Paragraph 1',
  fourPara1Content: '',
  fourPara2Title: 'Paragraph 2',
  fourPara2Content: '',
  fourPara3Title: 'Paragraph 3',
  fourPara3Content: '',
  fourPara4Title: 'Paragraph 4',
  fourPara4Content: '',
  fourParaImage: '',
  // Custom sections
  customSections: ''
};
