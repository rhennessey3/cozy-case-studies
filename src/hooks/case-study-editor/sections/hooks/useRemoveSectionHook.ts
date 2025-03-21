
import { useCallback } from 'react';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook to handle removing a section
 */
export const useRemoveSectionHook = (
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return useCallback((id: string) => {
    console.log(`Removing section with ID: ${id}`);
    
    // Clear any existing toast notifications
    toast.dismiss();
    
    // Create a unique toast ID for this specific section removal
    const toastId = `remove-section-${id}`;
    
    // Show a temporary removing message
    toast.loading("Removing section...", { id: toastId, duration: 2000 });
    
    setSections(prev => {
      const sectionToRemove = prev.find(section => section.id === id);
      if (!sectionToRemove) {
        console.warn(`Section with ID ${id} not found for removal`);
        toast.dismiss(toastId);
        toast.error("Section not found");
        return prev;
      }
      
      console.log(`Found section to remove:`, sectionToRemove);
      const removedOrder = sectionToRemove.sort_order;
      const sectionName = sectionToRemove.title;
      
      const filteredSections = prev.filter(section => section.id !== id);
      
      // Adjust order for sections after the removed one
      const adjustedSections = filteredSections.map(section => ({
        ...section,
        sort_order: section.sort_order > removedOrder ? section.sort_order - 1 : section.sort_order
      }));
      
      console.log(`Updated sections after removal:`, adjustedSections);
      
      // Clear the loading toast and show success message
      toast.dismiss(toastId);
      toast.success(`${sectionName} section removed`, { id: `success-remove-${id}`, duration: 2000 });
      
      return adjustedSections;
    });
    
    // Remove from open sections
    setOpenSections(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, [setSections, setOpenSections]);
};
