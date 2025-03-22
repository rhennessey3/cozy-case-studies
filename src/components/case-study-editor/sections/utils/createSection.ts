
import { SectionWithOrder } from '../types';
import { v4 as uuidv4 } from '@/lib/utils';
import { getSectionDisplayName } from '@/hooks/case-study-editor/sections/utils/sectionTypeMapping';

/**
 * Creates a new section with default values
 * @param type The type of section to create
 * @returns A new section with generated ID and default values
 */
export const createSection = (type: SectionWithOrder['type']): SectionWithOrder => {
  // Get the display name for this section type
  const displayName = getSectionDisplayName(type);
  
  return {
    id: uuidv4(),
    type,
    component: type, // Using type as component
    title: displayName,
    content: '',
    sort_order: 0, // Fixed value - no longer used for ordering
    published: true, // Default to published
  };
};
