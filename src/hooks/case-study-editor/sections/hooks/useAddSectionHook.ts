import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to handle adding a new section
 */
export const useAddSectionHook = (
  caseStudyId: string | null,
  sections: SectionResponse[],
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return useCallback(async (type: SectionWithOrder['type']) => {
    console.log('Adding section of type:', type);
    
    if (!caseStudyId) {
      toast.error('Cannot add section without a case study');
      return null;
    }
    
    // Create a temporary section
    const tempSection = createSection(type);
    
    // Convert to a SectionResponse compatible object
    const newSection: SectionResponse = {
      id: tempSection.id,
      case_study_id: caseStudyId,
      component: type,
      title: tempSection.title,
      content: tempSection.content || '',
      sort_order: 0, // Fixed default value
      published: tempSection.published !== undefined ? tempSection.published : true,
      image_url: tempSection.image_url,
      metadata: tempSection.metadata
    };
    
    // Update local state first for immediate feedback
    setSections(prev => [...prev, newSection]);
    
    // Auto open the new section
    setOpenSections(prev => ({
      ...prev,
      [newSection.id]: true
    }));
    
    // Persist to database
    try {
      console.log(`Persisting section to database:`, newSection);
      const { error } = await supabase
        .from('case_study_sections')
        .insert({
          id: newSection.id,
          case_study_id: caseStudyId,
          component: type,
          title: newSection.title,
          sort_order: 0,
          published: newSection.published,
          content: newSection.content || '',
          metadata: newSection.metadata
        });
        
      if (error) {
        console.error('Error saving section to database:', error);
        toast.error('Error saving section to database');
        // Don't revert UI state - we'll keep the optimistic update
      } else {
        console.log('Section saved successfully to database');
      }
    } catch (err) {
      console.error('Exception saving section to database:', err);
    }
    
    // Show success toast when section is added
    toast.success(`${newSection.title} section added`);
    
    return newSection;
  }, [caseStudyId, setSections, setOpenSections]);
};
