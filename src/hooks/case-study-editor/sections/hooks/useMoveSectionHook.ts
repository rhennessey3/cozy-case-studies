
import { useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { toast } from 'sonner';

export const useMoveSectionHook = (
  sections: SectionWithOrder[],
  setSections: (sections: SectionWithOrder[]) => void
) => {
  return useCallback((id: string, direction: 'up' | 'down') => {
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

    // Find the current index based on sort_order
    const sortedSections = [...sections].sort((a, b) => a.sort_order - b.sort_order);
    const currentIndex = sortedSections.findIndex(s => s.id === id);
    
    if (currentIndex === -1) {
      console.error(`Section with id ${id} not found in sortedSections`);
      return;
    }

    // Determine target index
    let targetIndex;
    if (direction === 'up') {
      if (currentIndex === 0) {
        toast.info('Section is already at the top');
        return;
      }
      targetIndex = currentIndex - 1;
    } else {
      if (currentIndex === sortedSections.length - 1) {
        toast.info('Section is already at the bottom');
        return;
      }
      targetIndex = currentIndex + 1;
    }

    // Swap the sort_order values
    const targetSection = sortedSections[targetIndex];
    const tempOrder = currentSection.sort_order;
    currentSection.sort_order = targetSection.sort_order;
    targetSection.sort_order = tempOrder;

    // Update the original sections array with new sort orders
    const updatedSections = sections.map(section => {
      if (section.id === currentSection.id) {
        return {
          ...section,
          sort_order: currentSection.sort_order,
          order: currentSection.sort_order // Update legacy order field too
        };
      }
      if (section.id === targetSection.id) {
        return {
          ...section,
          sort_order: targetSection.sort_order,
          order: targetSection.sort_order // Update legacy order field too
        };
      }
      return section;
    });

    // Set the updated sections
    setSections(updatedSections);
    
    // Show success message
    toast.success(`Section moved ${direction}`);
  }, [sections, setSections]);
};
