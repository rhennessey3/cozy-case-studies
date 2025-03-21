
import { describe, test, expect } from 'vitest';
import { mapComponentTypeToSectionType } from '../utils/sectionTypeMapping';

describe('sectionTypeMapping', () => {
  test('should map alignment component type correctly', () => {
    expect(mapComponentTypeToSectionType('alignment')).toBe('alignment');
  });
  
  test('should map carousel component type correctly', () => {
    expect(mapComponentTypeToSectionType('carousel')).toBe('carousel');
  });
  
  test('should map fourParagraphs component type correctly', () => {
    expect(mapComponentTypeToSectionType('fourParagraphs')).toBe('fourParagraphs');
  });
  
  test('should map introduction component type correctly', () => {
    expect(mapComponentTypeToSectionType('introduction')).toBe('introduction');
  });
  
  test('should default to alignment for unknown component types', () => {
    expect(mapComponentTypeToSectionType('unknown-type')).toBe('alignment');
  });
});
