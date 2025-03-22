
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from './test-utils';
import { useSectionOperations } from '../useSectionOperations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionResponse } from '../types/sectionTypes';

// Mock supabase
const mockedSupabase = supabase as any;

describe('useSectionOperations', () => {
  const mockSetSections = vi.fn();
  const mockSetOpenSections = vi.fn();
  const mockSections: SectionResponse[] = [
    { id: 'section-1', case_study_id: 'case-1', component: 'carousel', title: 'Section 1', sort_order: 1, content: '', published: true },
    { id: 'section-2', case_study_id: 'case-1', component: 'alignment', title: 'Section 2', sort_order: 2, content: '', published: false }
  ];
  
  beforeEach(() => {
    vi.resetAllMocks();
    mockSetSections.mockClear();
    mockSetOpenSections.mockClear();
    
    // Default mock implementations
    mockedSupabase.from.mockReturnThis();
    mockedSupabase.insert.mockReturnThis();
    mockedSupabase.update.mockReturnThis();
    mockedSupabase.delete.mockReturnThis();
    mockedSupabase.select.mockReturnThis();
    mockedSupabase.eq.mockReturnThis();
    mockedSupabase.single.mockResolvedValue({ data: null, error: null });
  });
  
  test('should add a new section successfully', async () => {
    // Mock successful section insertion
    const newSection: SectionResponse = {
      id: 'new-section',
      case_study_id: 'case-1',
      component: 'carousel',
      title: '3 Column Slider',
      sort_order: 3,
      published: true,
      content: ''
    };
    
    mockedSupabase.single.mockResolvedValue({ data: newSection, error: null });
    
    const { result } = renderHook(() => 
      useSectionOperations('case-1', mockSections, mockSetSections, mockSetOpenSections)
    );
    
    // Add a new carousel section
    const addedSection = await result.current.addSection('carousel');
    
    // Verify the result
    expect(addedSection).toEqual(newSection);
    
    // Check that sections were updated
    expect(mockSetSections).toHaveBeenCalledWith(expect.arrayContaining([...mockSections, newSection]));
    
    // Check that the new section was auto-opened
    expect(mockSetOpenSections).toHaveBeenCalledWith(expect.objectContaining({
      'new-section': true
    }));
    
    // Verify toast was called
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Carousel section added'));
  });
  
  test('should handle add section failure', async () => {
    // Mock error response
    mockedSupabase.single.mockResolvedValue({ 
      data: null, 
      error: { message: 'Failed to add section' } 
    });
    
    const { result } = renderHook(() => 
      useSectionOperations('case-1', mockSections, mockSetSections, mockSetOpenSections)
    );
    
    // Try to add a new section
    const addedSection = await result.current.addSection('alignment');
    
    // Verify the result is null
    expect(addedSection).toBeNull();
    
    // Check that sections were not updated
    expect(mockSetSections).not.toHaveBeenCalled();
    
    // Verify error toast was called
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Error adding section'));
  });
  
  test('should toggle published state successfully', async () => {
    // Mock successful update
    mockedSupabase.single.mockResolvedValue({ 
      data: { id: 'section-1', published: true }, 
      error: null 
    });
    
    const { result } = renderHook(() => 
      useSectionOperations('case-1', mockSections, mockSetSections, mockSetOpenSections)
    );
    
    // Toggle a section to published
    const success = await result.current.togglePublished('section-1', true);
    
    // Verify the result
    expect(success).toBe(true);
    
    // Check that sections were updated
    expect(mockSetSections).toHaveBeenCalled();
    
    // Verify toast was called
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Section published'));
  });
  
  test('should remove section successfully', async () => {
    // Mock successful fetch before delete
    mockedSupabase.single.mockResolvedValue({ 
      data: mockSections[0], 
      error: null 
    });
    
    // Mock successful delete
    mockedSupabase.eq.mockResolvedValue({ error: null });
    
    const { result } = renderHook(() => 
      useSectionOperations('case-1', mockSections, mockSetSections, mockSetOpenSections)
    );
    
    // Remove a section
    await result.current.removeSection('section-1');
    
    // Check that sections were updated
    expect(mockSetSections).toHaveBeenCalledWith(
      expect.arrayContaining([mockSections[1]])
    );
    
    // Check that the section was removed from open sections
    expect(mockSetOpenSections).toHaveBeenCalled();
    
    // Verify toast was called
    expect(toast.success).toHaveBeenCalledWith('Section removed');
  });
  
  test('should move section successfully', async () => {
    // Mock successful updates
    mockedSupabase.eq.mockResolvedValue({ error: null });
    
    const { result } = renderHook(() => 
      useSectionOperations('case-1', mockSections, mockSetSections, mockSetOpenSections)
    );
    
    // Test the move section operation - now should be a no-op
    await result.current.moveSection();
    
    // Since we removed the functionality, we don't expect any state updates
    expect(mockSetSections).not.toHaveBeenCalled();
  });
});
