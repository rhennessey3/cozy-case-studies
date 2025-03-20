
import { SectionWithOrder } from '../types';
import { createSection } from './createSection';
import { toast } from 'sonner';

export const addSection = (
  sections: SectionWithOrder[],
  type: SectionWithOrder['type'],
  setSections: React.Dispatch<React.SetStateAction<SectionWithOrder[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const newOrder = sections.length > 0 
    ? Math.max(...sections.map(s => s.order)) + 1 
    : 1;
    
  const newSection = createSection(type, newOrder);
  
  setSections(prev => [...prev, newSection]);
  
  // Auto open the new section
  setOpenSections(prev => ({
    ...prev,
    [newSection.id]: true
  }));
  
  // Show success toast when section is added
  toast.success(`${newSection.name} section added`);

  return newSection;
};

export const removeSection = (
  id: string,
  setSections: React.Dispatch<React.SetStateAction<SectionWithOrder[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  console.log(`Removing section with ID: ${id}`);
  
  // Clear any existing toast notifications to prevent stuck "deleting" messages
  toast.dismiss();
  
  // Create a unique toast ID for this specific section removal
  const toastId = `remove-section-${id}`;
  
  // Show a temporary removing message with a unique message to distinguish from full case study deletion
  toast.loading("Removing section...", { id: toastId, duration: 5000 });
  
  setSections(prev => {
    const sectionToRemove = prev.find(section => section.id === id);
    if (!sectionToRemove) {
      console.warn(`Section with ID ${id} not found for removal`);
      toast.dismiss(toastId);
      toast.error("Section not found");
      return prev;
    }
    
    console.log(`Found section to remove:`, sectionToRemove);
    const removedOrder = sectionToRemove.order;
    const sectionName = sectionToRemove.name;
    
    const filteredSections = prev.filter(section => section.id !== id);
    
    // Adjust order for sections after the removed one
    const adjustedSections = filteredSections.map(section => ({
      ...section,
      // Adjust order for sections after the removed one
      order: section.order > removedOrder ? section.order - 1 : section.order
    }));
    
    console.log(`Updated sections after removal:`, adjustedSections);
    
    // Clear the loading toast and show success message
    toast.dismiss(toastId);
    toast.success(`${sectionName} section removed`, { id: `success-remove-${id}`, duration: 3000 });
    
    return adjustedSections;
  });
  
  // Remove from open sections
  setOpenSections(prev => {
    const updated = { ...prev };
    delete updated[id];
    return updated;
  });
};

export const moveSection = (
  id: string,
  direction: 'up' | 'down',
  setSections: React.Dispatch<React.SetStateAction<SectionWithOrder[]>>
) => {
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
    const tempOrder = section.order;
    section.order = targetSection.order;
    targetSection.order = tempOrder;
    
    // Show success toast
    toast.success(`Section moved ${direction}`, { id: `move-section-${id}`, duration: 2000 });
    
    // Sort by order
    return newSections.sort((a, b) => a.order - b.order);
  });
};
