
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to handle toggling a section's published state
 */
export const useTogglePublishedHook = (
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>
) => {
  return useCallback(async (id: string, published: boolean) => {
    console.log(`Toggling published state for section ${id} to ${published}`);
    
    // First update the local state immediately for UI feedback
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === id) {
          return { ...section, published };
        }
        return section;
      });
      
      return updatedSections;
    });
    
    // Then persist to the database
    try {
      const { error } = await supabase
        .from('case_study_sections')
        .update({ published })
        .eq('id', id);
      
      if (error) {
        console.error(`Failed to update section published state: ${error.message}`);
        toast.error(`Failed to update section: ${error.message}`);
        
        // Revert the local state change on error
        setSections(prevSections => {
          return prevSections.map(section => {
            if (section.id === id) {
              return { ...section, published: !published };
            }
            return section;
          });
        });
        
        return;
      }
      
      // Show success toast notification
      toast.success(`Section ${published ? 'published' : 'unpublished'}`);
    } catch (err: any) {
      console.error('Error toggling published state:', err);
      toast.error(`Failed to update section: ${err.message}`);
      
      // Revert the local state change on error
      setSections(prevSections => {
        return prevSections.map(section => {
          if (section.id === id) {
            return { ...section, published: !published };
          }
          return section;
        });
      });
    }
  }, [setSections]);
};
