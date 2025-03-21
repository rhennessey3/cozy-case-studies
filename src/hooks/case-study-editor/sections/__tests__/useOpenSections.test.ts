
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from './test-utils';
import { useOpenSections } from '../useOpenSections';

describe('useOpenSections', () => {
  // Mock sessionStorage
  let mockStorage: Record<string, string> = {};
  
  beforeEach(() => {
    // Reset mock storage before each test
    mockStorage = {};
    
    // Mock sessionStorage
    vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => ({
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => { mockStorage[key] = value; },
      removeItem: (key: string) => { delete mockStorage[key]; },
      clear: () => { mockStorage = {}; },
      key: vi.fn(),
      length: Object.keys(mockStorage).length,
    }));
  });

  test('should initialize with empty openSections', () => {
    const { result } = renderHook(() => useOpenSections());
    
    expect(result.current.openSections).toEqual({});
  });

  test('should toggle section state', () => {
    const { result } = renderHook(() => useOpenSections());
    
    // Toggle section open
    act(() => {
      result.current.toggleSection('section-1');
    });
    
    expect(result.current.openSections).toEqual({ 'section-1': true });
    
    // Toggle section closed
    act(() => {
      result.current.toggleSection('section-1');
    });
    
    expect(result.current.openSections).toEqual({ 'section-1': false });
  });
  
  test('should clean up orphaned sections', () => {
    const { result } = renderHook(() => useOpenSections());
    
    // Add some sections
    act(() => {
      result.current.toggleSection('section-1');
      result.current.toggleSection('section-2');
      result.current.toggleSection('section-3');
    });
    
    // Verify all sections are added
    expect(Object.keys(result.current.openSections).length).toBe(3);
    
    // Clean up orphaned sections
    act(() => {
      result.current.cleanupOrphanedSections(new Set(['section-1', 'section-2']));
    });
    
    // Verify section-3 was removed
    expect(Object.keys(result.current.openSections).length).toBe(2);
    expect(result.current.openSections).not.toHaveProperty('section-3');
    expect(result.current.openSections).toHaveProperty('section-1');
    expect(result.current.openSections).toHaveProperty('section-2');
  });
  
  test('should restore state from session storage', () => {
    // Set up session storage with existing state
    mockStorage['test-key'] = JSON.stringify({ 'section-1': true, 'section-2': false });
    
    // Initialize hook with the storage key
    const { result } = renderHook(() => useOpenSections('test-key'));
    
    // Verify state was loaded from storage
    expect(result.current.openSections).toEqual({ 'section-1': true, 'section-2': false });
  });
});
