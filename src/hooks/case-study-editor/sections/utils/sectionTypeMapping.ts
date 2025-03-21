
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

/**
 * Helper to convert between database component types and our application types
 */
export const mapComponentTypeToSectionType = (componentType: string): SectionWithOrder['type'] => {
  switch (componentType) {
    case 'alignment':
      return 'alignment';
    case 'carousel':
      return 'carousel';
    case 'fourParagraphs':
      return 'fourParagraphs';
    case 'introduction':
      return 'introduction';
    case 'editor_state':
      return 'alignment'; // This shouldn't happen due to filtering, but as a fallback
    default:
      console.warn(`Unknown component type: ${componentType}, defaulting to 'alignment'`);
      return 'alignment';
  }
};

/**
 * Get a display name for a section type
 */
export const getSectionDisplayName = (sectionType: SectionWithOrder['type']): string => {
  switch (sectionType) {
    case 'introduction':
      return 'Case Study Introduction';
    case 'alignment':
      return 'Left or Right Aligned Section';
    case 'carousel':
      return '3 Column Slider';
    case 'fourParagraphs':
      return 'Four Small Paragraphs';
    default:
      return 'Unknown Section Type';
  }
};

/**
 * Get a display name for a component type
 */
export const getComponentDisplayName = (componentType: string): string => {
  const sectionType = mapComponentTypeToSectionType(componentType);
  return getSectionDisplayName(sectionType);
};
