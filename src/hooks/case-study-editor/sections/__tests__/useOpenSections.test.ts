
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from './test-utils';
import { useOpenSections } from '../useOpenSections';

describe('useOpenSections', () => {
  // Mock sessionStorage
  let mockStorage: Record<string, string> = {};
  
  beforeEach(() => {
    // Clear mock storage before each test
    mockStorage = {};
    
    // Mock sessionStorage getItem and setItem
    global.sessionStorage = {
      getItem: vi.fn((key) => mockStorage[key] || null),
      setItem: vi.fn((key, value) => {
        mockStorage[key] = value;
      }),
      removeItem: vi.fn((key) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
      key: vi.fn((index) => Object.keys(mockStorage)[index] || null),
      length: Object.keys(mockStorage).length
    };
  });
  
  test('should initialize with empty state', () => {
    const { result } = renderHook(() => useOpenSections());
    
    expect(result.current.openSections).toEqual({});
  });
  
  test('should toggle a section open/closed state', () => {
    const { result } = renderHook(() => useOpenSections());
    
    act(() => {
      result.current.toggleSection('section-1');
    });
    
    expect(result.current.openSections['section-1']).toBe(true);
    
    act(() => {
      result.current.toggleSection('section-1');
    });
    
    expect(result.current.openSections['section-1']).toBe(false);
  });
  
  test('should set open sections', () => {
    const { result } = renderHook(() => useOpenSections());
    
    const newOpenSections = { 'section-1': true, 'section-2': false };
    
    act(() => {
      result.current.setOpenSections(newOpenSections);
    });
    
    expect(result.current.openSections).toEqual(newOpenSections);
  });
});
