
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionResponse } from '../types/sectionTypes';
import { showLoadingToast, showSuccessToast, showErrorToast } from '../utils/sectionOperationHelpers';

export const useMoveSection = (
  sections: SectionResponse[],
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>
) => {
  return useCallback(async (sectionId: string, direction: 'up' | 'down') => {
    const sectionsList = [...sections];
    const sectionIndex = sectionsList.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) {
      toast.error('Section not found');
      return;
    }
    
    // Cannot move up if already at the top
    if (direction === 'up' && sectionIndex === 0) return;
    
    // Cannot move down if already at the bottom
    if (direction === 'down' && sectionIndex === sectionsList.length - 1) return;
    
    const toastId = showLoadingToast(`Moving section ${direction}...`);
    
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    const section = sectionsList[sectionIndex];
    const targetSection = sectionsList[targetIndex];
    
    // Swap sort orders
    const tempOrder = section.sort_order;
    
    try {
      // Update the current section
      const { error: error1 } = await supabase
        .from('case_study_sections')
        .update({ sort_order: targetSection.sort_order })
        .eq('id', section.id);
      
      if (error1) {
        showErrorToast(toastId, 'Failed to update section order', error1);
        return;
      }
      
      // Update the target section
      const { error: error2 } = await supabase
        .from('case_study_sections')
        .update({ sort_order: tempOrder })
        .eq('id', targetSection.id);
      
      if (error2) {
        showErrorToast(toastId, 'Failed to update target section order', error2);
        return;
      }
      
      // Update the local state
      section.sort_order = targetSection.sort_order;
      targetSection.sort_order = tempOrder;
      sectionsList.sort((a, b) => a.sort_order - b.sort_order);
      setSections(sectionsList);
      
      showSuccessToast(toastId, `Section moved ${direction}`);
    } catch (err) {
      showErrorToast(toastId, 'Failed to move section', err);
    }
  }, [sections, setSections]);
};
