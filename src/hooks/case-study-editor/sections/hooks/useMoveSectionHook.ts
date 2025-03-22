
import { useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to handle moving a section up or down in the order
 */
export const useMoveSectionHook = (
  sections: SectionWithOrder[],
  setSections: (sections: SectionWithOrder[]) => void
) => {
  return useCallback(async (id: string, direction: 'up' | 'down') => {
    if (sections.length <= 1) {
      toast.info('Cannot move section when there is only one section');
      return;
    }

    // Find the current section
    const currentSection = sections.find(s => s.id === id);
    if (!currentSection) {
      console.error(`Section with id ${id} not found`);
      return;
    }

    // Sort sections by sort_order to ensure correct positioning
    const sortedSections = [...sections].sort((a, b) => a.sort_order - b.sort_order);
    const currentIndex = sortedSections.findIndex(s => s.id === id);
    
    if (currentIndex === -1) {
      console.error(`Section with id ${id} not found in sorted sections`);
      return;
    }

    // Check boundary conditions
    if (direction === 'up' && currentIndex === 0) {
      toast.info('Section is already at the top');
      return;
    }
    
    if (direction === 'down' && currentIndex === sortedSections.length - 1) {
      toast.info('Section is already at the bottom');
      return;
    }

    // Determine target index
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetSection = sortedSections[targetIndex];
    
    // Show loading toast
    const toastId = `move-section-${id}-${direction}`;
    toast.loading(`Moving section ${direction}...`, { id: toastId });

    try {
      // Swap the sort_order values
      const tempOrder = currentSection.sort_order;
      
      // Update in Supabase if a case study ID is available
      if (currentSection.case_study_id) {
        // Update the current section
        const { error: error1 } = await supabase
          .from('case_study_sections')
          .update({ sort_order: targetSection.sort_order })
          .eq('id', currentSection.id);
        
        if (error1) {
          console.error('Failed to update section order:', error1);
          toast.error('Failed to update section order', { id: toastId });
          return;
        }
        
        // Update the target section
        const { error: error2 } = await supabase
          .from('case_study_sections')
          .update({ sort_order: tempOrder })
          .eq('id', targetSection.id);
        
        if (error2) {
          console.error('Failed to update target section order:', error2);
          toast.error('Failed to update target section order', { id: toastId });
          return;
        }
      }
      
      // Update locally
      currentSection.sort_order = targetSection.sort_order;
      targetSection.sort_order = tempOrder;
      
      // Update the original sections array with new sort orders
      const updatedSections = sections.map(section => {
        if (section.id === currentSection.id) {
          return {
            ...section,
            sort_order: currentSection.sort_order
          };
        }
        if (section.id === targetSection.id) {
          return {
            ...section,
            sort_order: targetSection.sort_order
          };
        }
        return section;
      });

      // Sort the updated sections by sort_order
      updatedSections.sort((a, b) => a.sort_order - b.sort_order);
      
      // Set the updated sections
      setSections(updatedSections);
      
      // Show success message
      toast.success(`Section moved ${direction}`, { id: toastId });
    } catch (err) {
      console.error('Failed to move section:', err);
      toast.error(`Failed to move section: ${err instanceof Error ? err.message : 'Unknown error'}`, { id: toastId });
    }
  }, [sections, setSections]);
};
