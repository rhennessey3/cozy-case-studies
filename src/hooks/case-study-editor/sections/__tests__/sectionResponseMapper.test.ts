
import { describe, test, expect } from 'vitest';
import { 
  mapSectionResponseToSectionWithOrder,
  mapSectionResponsesToSectionWithOrders
} from '../utils/sectionResponseMapper';
import { SectionResponse } from '../types/sectionTypes';

describe('sectionResponseMapper', () => {
  test('should map a single section response to SectionWithOrder', () => {
    const sectionResponse: SectionResponse = {
      id: 'test-id',
      case_study_id: 'case-study-1',
      component: 'carousel',
      title: 'Test Section',
      content: 'Test content',
      sort_order: 1,
      published: true
    };
    
    const result = mapSectionResponseToSectionWithOrder(sectionResponse);
    
    expect(result).toEqual({
      id: 'test-id',
      type: 'carousel',
      name: 'Test Section',
      order: 1,
      published: true
    });
  });
  
  test('should provide default name if title is missing', () => {
    const sectionResponse: SectionResponse = {
      id: 'test-id',
      case_study_id: 'case-study-1',
      component: 'alignment',
      title: '', // Empty title
      content: 'Test content',
      sort_order: 1,
      published: true
    };
    
    const result = mapSectionResponseToSectionWithOrder(sectionResponse);
    
    expect(result.name).toBe('Untitled Section');
  });
  
  test('should map an array of section responses', () => {
    const sectionResponses: SectionResponse[] = [
      {
        id: 'section-1',
        case_study_id: 'case-study-1',
        component: 'carousel',
        title: 'Carousel Section',
        content: 'Carousel content',
        sort_order: 1,
        published: true
      },
      {
        id: 'section-2',
        case_study_id: 'case-study-1',
        component: 'alignment',
        title: 'Alignment Section',
        content: 'Alignment content',
        sort_order: 2,
        published: false
      }
    ];
    
    const results = mapSectionResponsesToSectionWithOrders(sectionResponses);
    
    expect(results.length).toBe(2);
    expect(results[0].type).toBe('carousel');
    expect(results[1].type).toBe('alignment');
    expect(results[0].name).toBe('Carousel Section');
    expect(results[1].name).toBe('Alignment Section');
  });
});
