
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
  alignmentImage: ''
};
