
import { SectionWithOrder } from '../types';
import { createSection } from './createSection';

export interface SectionFormState {
  subhead?: string;
  introductionParagraph?: string;
  alignmentImage?: string;
  alignment?: string;
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
  customSections?: string;
}

export const initializeDefaultSections = (form: SectionFormState): SectionWithOrder[] => {
  const defaultSections: SectionWithOrder[] = [];

  // If there's subhead or introductionParagraph, add alignment section
  if (form.subhead || form.introductionParagraph || form.alignmentImage) {
    defaultSections.push(createSection('alignment', 1));
  }
  
  // If there's carousel content, add carousel section
  if (form.carouselTitle || form.carouselItem1Title || form.carouselItem1Content) {
    defaultSections.push(createSection('carousel', defaultSections.length + 1));
  }
  
  // If there's four paragraphs content, add that section
  if (form.fourParaTitle || form.fourPara1Title || form.fourPara1Content) {
    defaultSections.push(createSection('fourParagraphs', defaultSections.length + 1));
  }

  // If we have empty form and no existing sections, add one of each by default
  if (defaultSections.length === 0) {
    defaultSections.push(createSection('alignment', 1));
    defaultSections.push(createSection('carousel', 2));
    defaultSections.push(createSection('fourParagraphs', 3));
  }

  return defaultSections;
};

export const getInitialOpenSectionsState = (sections: SectionWithOrder[]): Record<string, boolean> => {
  const openSections: Record<string, boolean> = {};
  sections.forEach(section => {
    openSections[section.id] = true;
  });
  return openSections;
};
