
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { showLoadingToast, showSuccessToast, showErrorToast } from '../utils/sectionOperationHelpers';
import { SectionResponse } from '../types/sectionTypes';

export const useRemoveSection = (
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return useCallback(async (sectionId: string) => {
    console.log(`Removing section with ID: ${sectionId}`);
    
    const toastId = showLoadingToast('Removing section...');
    
    try {
      // Get the section details before deleting
      const { data: sectionData, error: fetchError } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('id', sectionId)
        .single();
      
      if (fetchError) {
        showErrorToast(toastId, 'Failed to fetch section details', fetchError);
        return;
      }
      
      // Delete the section
      const { error } = await supabase
        .from('case_study_sections')
        .delete()
        .eq('id', sectionId);
      
      if (error) {
        showErrorToast(toastId, 'Failed to remove section', error);
        return;
      }
      
      // Remove the section from local state
      setSections(prev => prev.filter(section => section.id !== sectionId));
      
      // Remove from open sections state
      setOpenSections(prev => {
        const updated = { ...prev };
        delete updated[sectionId];
        return updated;
      });
      
      showSuccessToast(toastId, 'Section removed');
    } catch (err) {
      showErrorToast(toastId, 'Failed to remove section', err);
    }
  }, [setSections, setOpenSections]);
};
