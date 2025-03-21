
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
    name: sectionResponse.title || getSectionDisplayName(sectionType),
    order: sectionResponse.sort_order,
    published: sectionResponse.published
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
