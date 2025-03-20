
import { SectionWithOrder } from '../types';
import { v4 as uuidv4 } from '@/lib/utils';

/**
 * Helper function to create a new section
 */
export const createSection = (type: SectionWithOrder['type'], order: number): SectionWithOrder => {
  return {
    id: uuidv4(),
    type,
    name: type === 'alignment' 
      ? 'Left or Right Aligned Section' 
      : type === 'carousel' 
        ? '3 Column Slider' 
        : 'Four Small Paragraphs',
    order
  };
};
