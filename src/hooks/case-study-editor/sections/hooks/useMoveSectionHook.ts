
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook to handle moving a section up or down
 */
export const useMoveSectionHook = (
  sections: SectionResponse[],
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>
) => {
  return useCallback((id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const sectionIndex = prev.findIndex(section => section.id === id);
      if (sectionIndex === -1) return prev;
      
      // Cannot move up if already at the top
      if (direction === 'up' && sectionIndex === 0) return prev;
      
      // Cannot move down if already at the bottom
      if (direction === 'down' && sectionIndex === prev.length - 1) return prev;
      
      const newSections = [...prev];
      const section = newSections[sectionIndex];
      const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
      const targetSection = newSections[targetIndex];
      
      // Swap orders
      const tempOrder = section.sort_order;
      section.sort_order = targetSection.sort_order;
      targetSection.sort_order = tempOrder;
      
      // Show success toast
      toast.success(`Section moved ${direction}`, { id: `move-section-${id}`, duration: 2000 });
      
      // Sort by order
      return newSections.sort((a, b) => a.sort_order - b.sort_order);
    });
  }, [sections, setSections]);
};
