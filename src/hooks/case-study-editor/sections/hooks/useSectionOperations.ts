
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

/**
 * Hook for section CRUD operations
 */
export const useSectionOperations = (
  caseStudyId: string | null,
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  saveToSupabase: (sections: SectionResponse[]) => Promise<void>
) => {
  // Add section operation
  const addSection = useCallback(async (type: SectionWithOrder['type']) => {
    console.log('Adding section of type:', type);
    
    if (!caseStudyId) {
      toast.error('Cannot add section without a case study');
      return null;
    }
    
    // Create a new section with a guaranteed unique ID
    const newSection = createSection(type);
    
    // Convert to SectionResponse
    const sectionResponse: SectionResponse = {
      id: newSection.id,
      case_study_id: caseStudyId,
      component: type,
      title: newSection.title,
      content: newSection.content || '',
      sort_order: newSection.sort_order,
      published: newSection.published,
      image_url: '',
      metadata: {}
    };
    
    // Update local state first for immediate feedback
    setSections(prev => {
      const updatedSections = [...prev, sectionResponse];
      return updatedSections;
    });
    
    // Auto open the new section
    setOpenSections(prev => ({
      ...prev,
      [newSection.id]: true
    }));
    
    // Notification of success
    toast.success(`${type} section added`);
    
    return sectionResponse;
  }, [caseStudyId, setSections, setOpenSections]);
  
  // Remove section operation
  const removeSection = useCallback((id: string) => {
    console.log('Removing section:', id);
    
    // First update local state to show immediate feedback
    setSections(prev => {
      const sectionToRemove = prev.find(section => section.id === id);
      if (!sectionToRemove) {
        console.warn(`Section with ID ${id} not found for removal`);
        return prev;
      }
      
      toast.success(`${sectionToRemove.title} section removed`);
      
      const updatedSections = prev.filter(section => section.id !== id);
      return updatedSections;
    });
    
    // Remove from open sections
    setOpenSections(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, [setSections, setOpenSections]);
  
  // Toggle section published state
  const toggleSectionPublished = useCallback((id: string, published: boolean) => {
    console.log(`Toggling published state for section ${id} to ${published}`);
    
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === id) {
          return { ...section, published };
        }
        return section;
      });
      
      toast.success(`Section ${published ? 'published' : 'unpublished'}`);
      
      return updatedSections;
    });
  }, [setSections]);
  
  // Refresh sections from database
  const refresh = useCallback(() => {
    console.log('Explicitly refreshing sections from database');
  }, []);
  
  return {
    addSection,
    removeSection,
    toggleSectionPublished,
    refresh
  };
};
