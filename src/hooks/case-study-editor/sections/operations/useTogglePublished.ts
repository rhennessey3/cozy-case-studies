
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionResponse } from '../types/sectionTypes';
import { showLoadingToast, showSuccessToast, showErrorToast } from '../utils/sectionOperationHelpers';

export const useTogglePublished = (
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>
) => {
  return useCallback(async (sectionId: string, isPublished: boolean) => {
    console.log(`Toggling Section ID: ${sectionId}, New Published State: ${isPublished}`);
    
    const toastId = showLoadingToast(`${isPublished ? 'Publishing' : 'Unpublishing'} section...`);
    
    try {
      // Update the published state in the database
      const { error: updateError } = await supabase
        .from('case_study_sections')
        .update({ published: isPublished })
        .eq('id', sectionId);
      
      if (updateError) {
        showErrorToast(toastId, 'Failed to update section', updateError);
        return false;
      }
      
      // Fetch the updated data to verify the change
      const { data, error: selectError } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('id', sectionId)
        .single();
      
      if (selectError) {
        showErrorToast(toastId, 'Failed to verify section update', selectError);
        return false;
      }
      
      console.log("Updated Section Data:", data);
      
      // Update the local state
      setSections(prev => 
        prev.map(section => 
          section.id === sectionId 
            ? { ...section, published: isPublished } 
            : section
        )
      );
      
      showSuccessToast(toastId, `Section ${isPublished ? 'published' : 'unpublished'}`);
      return true;
    } catch (err) {
      showErrorToast(toastId, 'Failed to toggle published state', err);
      return false;
    }
  }, [setSections]);
};
