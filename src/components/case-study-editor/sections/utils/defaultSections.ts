
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
  intro?: string;
  challenge?: string;
  approach?: string;
  // Note: slug is not part of this interface, it's added by the parent component
}

export const initializeDefaultSections = (form: SectionFormState): SectionWithOrder[] => {
  const defaultSections: SectionWithOrder[] = [];

  // Always add the introduction section first
  defaultSections.push(createSection('introduction'));
  
  // If there's subhead or introductionParagraph, add alignment section
  if (form.subhead || form.introductionParagraph || form.alignmentImage) {
    defaultSections.push(createSection('alignment'));
  }
  
  // If there's carousel content, add carousel section
  if (form.carouselTitle || form.carouselItem1Title || form.carouselItem1Content) {
    defaultSections.push(createSection('carousel'));
  }
  
  // If there's four paragraphs content, add that section
  if (form.fourParaTitle || form.fourPara1Title || form.fourPara1Content) {
    defaultSections.push(createSection('fourParagraphs'));
  }

  // If we have no sections other than introduction, add default ones
  if (defaultSections.length === 1) {
    defaultSections.push(createSection('alignment'));
    defaultSections.push(createSection('carousel'));
    defaultSections.push(createSection('fourParagraphs'));
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
