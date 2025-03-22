
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionResponse } from '../types/sectionTypes';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';
import { normalizeSectionName } from '../utils/sectionOperationHelpers';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

/**
 * Hook for adding a new section to a case study
 */
export const useAddSection = (
  caseStudyId: string | null, 
  sections: SectionResponse[], 
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return useCallback(async (componentType: SectionWithOrder['type']) => {
    if (!caseStudyId) {
      toast.error('Cannot add section: No case study selected');
      return null;
    }
    
    console.log(`Adding section of type: ${componentType} to case study ${caseStudyId}`);
    
    // Create a temporary section
    const tempSection = createSection(componentType);
    
    // Convert to a SectionResponse compatible object
    const newSection: SectionResponse = {
      id: tempSection.id,
      case_study_id: caseStudyId,
      component: componentType,
      title: tempSection.title,
      sort_order: 0, // Fixed value
      published: tempSection.published !== undefined ? tempSection.published : true,
      content: '',
      image_url: tempSection.image_url,
      metadata: tempSection.metadata
    };
    
    try {
      // First update local state to show immediate feedback
      setSections(prev => [...prev, newSection]);
      
      // Auto-open the new section
      setOpenSections(prev => ({
        ...prev,
        [newSection.id]: true
      }));
      
      // Then persist to database
      const { error } = await supabase
        .from('case_study_sections')
        .insert({
          id: newSection.id,
          case_study_id: caseStudyId,
          component: componentType,
          title: newSection.title,
          sort_order: 0,
          published: newSection.published,
          content: newSection.content || '',
          metadata: newSection.metadata
        });
      
      if (error) {
        console.error('Error adding section to database:', error);
        toast.error('Error saving section: ' + error.message);
        // Remove from state if save failed
        setSections(prev => prev.filter(s => s.id !== newSection.id));
        return null;
      }
      
      const displayName = normalizeSectionName(componentType);
      toast.success(`${displayName} section added`);
      
      return newSection;
    } catch (err) {
      console.error('Failed to add section:', err);
      toast.error('Failed to add section');
      // Remove from state if save failed
      setSections(prev => prev.filter(s => s.id !== newSection.id));
      return null;
    }
  }, [caseStudyId, setSections, setOpenSections]);
};
