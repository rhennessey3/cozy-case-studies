
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

/**
 * Hook to handle adding a new section
 */
export const useAddSectionHook = (
  caseStudyId: string | null,
  sections: SectionResponse[],
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return useCallback((type: SectionWithOrder['type']) => {
    console.log('Adding section of type:', type);
    
    if (!caseStudyId) {
      toast.error('Cannot add section without a case study');
      return null;
    }
    
    // Create a temporary section - no longer using sort_order
    const tempSection = createSection(type);
    
    // Convert to a SectionResponse compatible object
    const newSection: SectionResponse = {
      id: tempSection.id,
      case_study_id: caseStudyId,
      component: type,
      title: tempSection.title,
      content: tempSection.content || '',
      sort_order: 0, // Fixed default value - no longer meaningful for ordering
      published: tempSection.published !== undefined ? tempSection.published : true,
      image_url: tempSection.image_url,
      metadata: tempSection.metadata
    };
    
    setSections(prev => [...prev, newSection]);
    
    // Auto open the new section
    setOpenSections(prev => ({
      ...prev,
      [newSection.id]: true
    }));
    
    // Show success toast when section is added
    toast.success(`${newSection.title} section added`);
    
    return newSection;
  }, [caseStudyId, sections, setSections, setOpenSections]);
};
