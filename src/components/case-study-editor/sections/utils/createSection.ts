
import { SectionWithOrder } from '../types';
import { v4 as uuidv4 } from '@/lib/utils';
import { getSectionDisplayName } from '@/hooks/case-study-editor/sections/utils/sectionTypeMapping';

/**
 * Helper function to create a new section
 */
export const createSection = (type: SectionWithOrder['type'], order: number): SectionWithOrder => {
  // Get the display name for this section type
  const displayName = getSectionDisplayName(type);
  
  return {
    id: uuidv4(),
    type,
    component: type, // Using type as component
    title: displayName,
    content: '',
    sort_order: order,
    published: true, // Default to published
    
    // For backward compatibility
    name: displayName,
    order: order
  };
};
