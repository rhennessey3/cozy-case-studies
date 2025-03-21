
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionResponse } from '../types/sectionTypes';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';
import { mapComponentTypeToSectionType } from '../utils/sectionTypeMapping';
import { getMaxSortOrder, normalizeSectionName } from '../utils/sectionOperationHelpers';

export const useAddSection = (
  caseStudyId: string | null, 
  sections: SectionResponse[], 
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return useCallback(async (componentType: string) => {
    if (!caseStudyId) {
      toast.error('Cannot add section: No case study selected');
      return null;
    }
    
    // Get max sort order
    const maxSortOrder = getMaxSortOrder(sections);
    
    // Convert the string componentType to a valid section type
    const sectionType = mapComponentTypeToSectionType(componentType);
    
    // Create section with next sort order
    const tempSection = createSection(sectionType, maxSortOrder + 1);
    
    // Convert SectionWithOrder to the database format
    const dbSection = {
      case_study_id: caseStudyId,
      component: componentType,
      title: tempSection.title,
      sort_order: tempSection.sort_order,
      published: tempSection.published,
      content: '',
    };
    
    try {
      const { data, error } = await supabase
        .from('case_study_sections')
        .insert(dbSection)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding section:', error);
        toast.error('Error adding section: ' + error.message);
        return null;
      }
      
      // Add the new section to the local state
      setSections(prev => [...prev, data]);
      
      // Auto-open the new section
      setOpenSections(prev => ({
        ...prev,
        [data.id]: true
      }));
      
      const displayName = normalizeSectionName(componentType);
      toast.success(`${displayName} section added`);
      
      // Return the new section
      return data;
    } catch (err) {
      console.error('Failed to add section:', err);
      toast.error('Failed to add section');
      return null;
    }
  }, [caseStudyId, sections, setSections, setOpenSections]);
};
