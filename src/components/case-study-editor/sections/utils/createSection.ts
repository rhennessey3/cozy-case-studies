
import { SectionWithOrder } from '../types';
import { v4 as uuidv4 } from '@/lib/utils';

/**
 * Helper function to create a new section
 */
export const createSection = (type: SectionWithOrder['type'], order: number): SectionWithOrder => {
  let name;
  
  switch(type) {
    case 'alignment':
      name = 'Left or Right Aligned Section';
      break;
    case 'carousel':
      name = '3 Column Slider';
      break;
    case 'fourParagraphs':
      name = 'Four Small Paragraphs';
      break;
    case 'introduction':
      name = 'Case Study Introduction';
      break;
    default:
      name = 'Section';
  }
  
  return {
    id: uuidv4(),
    type,
    name,
    order,
    published: true // Default to published
  };
};
