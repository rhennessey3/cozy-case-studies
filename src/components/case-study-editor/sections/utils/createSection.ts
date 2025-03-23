
import { SectionWithOrder } from '../types';
import { v4 as uuidv4 } from 'uuid';
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
    id: uuidv4(), // Always use UUID for guaranteed uniqueness
    type,
    component: type, // Using type as component
    title: displayName,
    content: '',
    sort_order: 0, // Default value
    published: true, // Default to published
  };
};
