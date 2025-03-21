
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from './test-utils';
import { useSectionState } from '../useSectionState';
import { supabase } from '@/integrations/supabase/client';
import { SectionResponse } from '../types/sectionTypes';

// Mock the component hooks that useSectionState depends on
vi.mock('../useSectionFetch', () => ({
  useSectionFetch: vi.fn().mockReturnValue({
    sections: [
      { id: 'section-1', case_study_id: 'case-1', component: 'carousel', title: 'Carousel', sort_order: 1, published: true, content: '' },
      { id: 'section-2', case_study_id: 'case-1', component: 'alignment', title: 'Alignment', sort_order: 2, published: false, content: '' }
    ],
    loading: false,
    error: null,
    fetchSections: vi.fn().mockResolvedValue(undefined),
    setSections: vi.fn()
  })
}));

vi.mock('../useOpenSections', () => ({
  useOpenSections: vi.fn().mockReturnValue({
    openSections: { 'section-1': true, 'section-2': false },
    setOpenSections: vi.fn(),
    toggleSection: vi.fn(id => id)
  })
}));

vi.mock('../useSectionOperations', () => ({
  useSectionOperations: vi.fn().mockReturnValue({
    addSection: vi.fn().mockImplementation(type => Promise.resolve({ id: 'new-section', component: type, content: '', published: true })),
    togglePublished: vi.fn().mockImplementation((id, published) => Promise.resolve(published)),
    removeSection: vi.fn().mockResolvedValue(undefined),
    moveSection: vi.fn().mockResolvedValue(undefined)
  })
}));

describe('useSectionState', () => {
  test('should combine hooks and return unified interface', () => {
    const { result } = renderHook(() => useSectionState('case-1'));
    
    // Check that the combined interface has all expected properties
    expect(result.current).toHaveProperty('sections');
    expect(result.current).toHaveProperty('openSections');
    expect(result.current).toHaveProperty('toggleSection');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('fetchSections');
    expect(result.current).toHaveProperty('addSection');
    expect(result.current).toHaveProperty('togglePublished');
    expect(result.current).toHaveProperty('removeSection');
    expect(result.current).toHaveProperty('moveSection');
    expect(result.current).toHaveProperty('toggleSectionPublished');
    
    // Verify that sections are populated
    expect(result.current.sections.length).toBe(2);
    expect(result.current.sections[0].id).toBe('section-1');
  });
  
  test('should have correct section data', () => {
    const { result } = renderHook(() => useSectionState('case-1'));
    
    expect(result.current.sections[0].component).toBe('carousel');
    expect(result.current.sections[1].component).toBe('alignment');
    expect(result.current.openSections['section-1']).toBe(true);
    expect(result.current.openSections['section-2']).toBe(false);
  });
  
  test('toggleSectionPublished should be an alias for togglePublished', () => {
    const { result } = renderHook(() => useSectionState('case-1'));
    
    // Verify they are the same function
    expect(result.current.toggleSectionPublished).toBe(result.current.togglePublished);
  });
});
