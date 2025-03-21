
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook to handle toggling a section's published state
 */
export const useTogglePublishedHook = (
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>
) => {
  return useCallback((id: string, published: boolean) => {
    console.log(`Toggling published state for section ${id} to ${published}`);
    
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === id) {
          return { ...section, published };
        }
        return section;
      });
      
      // Show toast notification
      toast.success(`Section ${published ? 'published' : 'unpublished'}`);
      
      return updatedSections;
    });
  }, [setSections]);
};
