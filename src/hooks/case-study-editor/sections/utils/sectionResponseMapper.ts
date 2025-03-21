
import { SectionResponse } from '../types/sectionTypes';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { 
  mapComponentTypeToSectionType, 
  getSectionDisplayName 
} from './sectionTypeMapping';

/**
 * Maps a section response from the database to a SectionWithOrder object
 * for use in the UI components
 */
export const mapSectionResponseToSectionWithOrder = (
  sectionResponse: SectionResponse
): SectionWithOrder => {
  const sectionType = mapComponentTypeToSectionType(sectionResponse.component);
  return {
    id: sectionResponse.id,
    type: sectionType,
    component: sectionResponse.component,
    title: sectionResponse.title || getSectionDisplayName(sectionType),
    content: sectionResponse.content,
    sort_order: sectionResponse.sort_order,
    order: sectionResponse.sort_order, // For backward compatibility
    published: sectionResponse.published,
    case_study_id: sectionResponse.case_study_id,
    image_url: sectionResponse.image_url,
    metadata: sectionResponse.metadata,
    name: sectionResponse.title || getSectionDisplayName(sectionType) // For backward compatibility
  };
};

/**
 * Maps an array of section responses to SectionWithOrder objects
 */
export const mapSectionResponsesToSectionWithOrders = (
  sections: SectionResponse[]
): SectionWithOrder[] => {
  return sections.map(mapSectionResponseToSectionWithOrder);
};
