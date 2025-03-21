
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
  
  // Create a properly typed SectionWithOrder object
  const result: SectionWithOrder = {
    id: sectionResponse.id,
    type: sectionType,
    component: sectionResponse.component,
    title: sectionResponse.title || getSectionDisplayName(sectionType),
    content: sectionResponse.content,
    sort_order: sectionResponse.sort_order,
    published: sectionResponse.published,
    case_study_id: sectionResponse.case_study_id,
    image_url: sectionResponse.image_url,
    metadata: sectionResponse.metadata,
    
    // For backward compatibility
    order: sectionResponse.sort_order,
    name: sectionResponse.title || getSectionDisplayName(sectionType)
  };
  
  return result;
};

/**
 * Maps an array of section responses to SectionWithOrder objects
 */
export const mapSectionResponsesToSectionWithOrders = (
  sections: SectionResponse[]
): SectionWithOrder[] => {
  return sections.map(mapSectionResponseToSectionWithOrder);
};

/**
 * Maps a SectionWithOrder to a SectionResponse
 * This is useful when we need to convert from our UI model to the database model
 */
export const mapSectionWithOrderToSectionResponse = (
  section: SectionWithOrder,
  caseStudyId: string
): SectionResponse => {
  return {
    id: section.id,
    case_study_id: section.case_study_id || caseStudyId,
    component: section.component,
    title: section.title,
    content: section.content,
    sort_order: section.sort_order,
    published: section.published !== undefined ? section.published : true,
    image_url: section.image_url,
    metadata: section.metadata
  };
};

/**
 * Maps an array of SectionWithOrder objects to SectionResponse objects
 */
export const mapSectionWithOrdersToSectionResponses = (
  sections: SectionWithOrder[],
  caseStudyId: string
): SectionResponse[] => {
  return sections.map(section => mapSectionWithOrderToSectionResponse(section, caseStudyId));
};
