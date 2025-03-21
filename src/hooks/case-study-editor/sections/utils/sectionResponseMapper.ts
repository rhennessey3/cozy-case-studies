
import { SectionResponse } from '../types/sectionTypes';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { mapComponentTypeToSectionType } from './sectionTypeMapping';

/**
 * Maps a section response from the database to a SectionWithOrder object
 * for use in the UI components
 */
export const mapSectionResponseToSectionWithOrder = (
  sectionResponse: SectionResponse
): SectionWithOrder => {
  return {
    id: sectionResponse.id,
    type: mapComponentTypeToSectionType(sectionResponse.component),
    name: sectionResponse.title || 'Untitled Section',
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
