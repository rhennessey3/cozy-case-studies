
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from './test-utils';
import { useSectionFetch } from '../useSectionFetch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Get the mocked supabase
const mockedSupabase = supabase as any;

describe('useSectionFetch', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });
  
  test('should initialize with empty sections and loading state', () => {
    const { result } = renderHook(() => useSectionFetch(null));
    
    expect(result.current.sections).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });
  
  test('should set loading to false when caseStudyId is null', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSectionFetch(null));
    
    // Wait for the hook to finish
    await waitForNextUpdate();
    
    expect(result.current.loading).toBe(false);
  });
  
  test('should fetch sections successfully', async () => {
    // Mock successful response
    const mockData = [
      { id: 'section-1', case_study_id: 'case-1', title: 'Section 1', component: 'carousel', sort_order: 1 },
      { id: 'section-2', case_study_id: 'case-1', title: 'Section 2', component: 'alignment', sort_order: 2 }
    ];
    
    mockedSupabase.from.mockReturnThis();
    mockedSupabase.select.mockReturnThis();
    mockedSupabase.eq.mockReturnThis();
    mockedSupabase.order.mockReturnThis();
    mockedSupabase.maybeSingle.mockResolvedValue({ data: mockData, error: null });
    
    const { result, waitForNextUpdate } = renderHook(() => useSectionFetch('case-1'));
    
    // Initial state
    expect(result.current.loading).toBe(true);
    
    // Wait for the fetch to complete
    await waitForNextUpdate();
    
    // Check the updated state
    expect(result.current.sections).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
  
  test('should handle fetch error', async () => {
    // Mock error response
    const mockError = { message: 'Failed to fetch' };
    
    mockedSupabase.from.mockReturnThis();
    mockedSupabase.select.mockReturnThis();
    mockedSupabase.eq.mockReturnThis();
    mockedSupabase.order.mockReturnThis();
    mockedSupabase.maybeSingle.mockResolvedValue({ data: null, error: mockError });
    
    // Spy on toast.error
    const toastErrorSpy = vi.spyOn(toast, 'error');
    
    const { result, waitForNextUpdate } = renderHook(() => useSectionFetch('case-1'));
    
    // Wait for the fetch to complete
    await waitForNextUpdate();
    
    // Check error state
    expect(result.current.sections).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError.message);
    expect(toastErrorSpy).toHaveBeenCalled();
  });
  
  test('should allow manual fetching with fetchSections', async () => {
    // Mock successful response
    const mockData = [{ id: 'section-1', case_study_id: 'case-1', title: 'Section 1' }];
    
    mockedSupabase.from.mockReturnThis();
    mockedSupabase.select.mockReturnThis();
    mockedSupabase.eq.mockReturnThis();
    mockedSupabase.order.mockReturnThis();
    mockedSupabase.maybeSingle.mockResolvedValue({ data: mockData, error: null });
    
    const { result, waitForNextUpdate } = renderHook(() => useSectionFetch('case-1'));
    
    // Wait for initial fetch
    await waitForNextUpdate();
    
    // Reset the mock data
    const newMockData = [
      { id: 'section-1', case_study_id: 'case-1', title: 'Updated Section 1' },
      { id: 'section-2', case_study_id: 'case-1', title: 'New Section' }
    ];
    
    mockedSupabase.maybeSingle.mockResolvedValue({ data: newMockData, error: null });
    
    // Manually fetch sections
    act(() => {
      result.current.fetchSections();
    });
    
    // Wait for the manual fetch to complete
    await waitForNextUpdate();
    
    // Check updated state
    expect(result.current.sections).toEqual(newMockData);
  });
});
