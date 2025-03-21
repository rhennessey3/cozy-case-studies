
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
    ? Math.max(...sections.map(s => s.sort_order)) + 1 
    : 1;
    
  const newSection = createSection(type, newOrder);
  
  setSections(prev => [...prev, newSection]);
  
  // Auto open the new section
  setOpenSections(prev => ({
    ...prev,
    [newSection.id]: true
  }));
  
  // Show success toast when section is added
  toast.success(`${newSection.title} section added`);

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
    const sectionName = sectionToRemove.title;
    
    const filteredSections = prev.filter(section => section.id !== id);
    
    // Clear the loading toast and show success message
    toast.dismiss(toastId);
    toast.success(`${sectionName} section removed`, { id: `success-remove-${id}`, duration: 2000 });
    
    return filteredSections;
  });
  
  // Remove from open sections
  setOpenSections(prev => {
    const updated = { ...prev };
    delete updated[id];
    return updated;
  });
};
