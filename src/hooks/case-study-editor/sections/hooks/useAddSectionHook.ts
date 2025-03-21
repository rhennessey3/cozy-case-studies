
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';
import { mapComponentTypeToSectionType } from '../utils/sectionTypeMapping';

/**
 * Hook to handle adding a new section
 */
export const useAddSectionHook = (
  caseStudyId: string | null,
  sections: SectionResponse[],
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return useCallback((type: string) => {
    console.log('Adding section of type:', type);
    
    if (!caseStudyId) {
      toast.error('Cannot add section without a case study');
      return;
    }
    
    const newOrder = sections.length > 0 
      ? Math.max(...sections.map(s => s.sort_order)) + 1 
      : 1;
    
    // Map the component type to a valid section type
    const sectionType = mapComponentTypeToSectionType(type);
    
    // Create a temporary section with the proper structure
    const tempSection = createSection(sectionType, newOrder);
    
    const newSection: SectionResponse = {
      id: crypto.randomUUID(),
      case_study_id: caseStudyId,
      component: type,
      title: tempSection.title,
      content: '',
      sort_order: newOrder,
      published: true
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
