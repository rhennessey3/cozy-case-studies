
import { SectionWithOrder } from '../types';
import { v4 as uuidv4 } from '@/lib/utils';
import { getSectionDisplayName } from '@/hooks/case-study-editor/sections/utils/sectionTypeMapping';

/**
 * Helper function to create a new section
 */
export const createSection = (type: SectionWithOrder['type'], order: number): SectionWithOrder => {
  // Get the display name for this section type
  const name = getSectionDisplayName(type);
  
  return {
    id: uuidv4(),
    type,
    name,
    order,
    published: true // Default to published
  };
};
