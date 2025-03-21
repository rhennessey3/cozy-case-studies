
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
    default:
      console.warn(`Unknown component type: ${componentType}, defaulting to 'alignment'`);
      return 'alignment';
  }
};
