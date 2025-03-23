
import { SectionWithOrder } from '../types';
import { createSection } from './createSection';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Adds a new section to the list of sections
 */
export const addSection = (
  sections: SectionWithOrder[],
  type: SectionWithOrder['type'],
  setSections: React.Dispatch<React.SetStateAction<SectionWithOrder[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  console.log('addSection: Creating section of type:', type);
  const newSection = createSection(type);
  console.log('addSection: New section created:', newSection);
  
  // Add to local state for immediate feedback
  setSections(prev => {
    console.log('addSection: Adding section to local state. Current sections:', prev.length);
    const updatedSections = [...prev, newSection];
    console.log('addSection: Updated sections length:', updatedSections.length);
    return updatedSections;
  });
  
  // Auto open the new section
  setOpenSections(prev => {
    console.log('addSection: Setting section to open state:', newSection.id);
    const updatedOpenSections = {
      ...prev,
      [newSection.id]: true
    };
    console.log('addSection: Updated open sections state:', updatedOpenSections);
    return updatedOpenSections;
  });
  
  toast.success(`${newSection.title} section added`);
  return newSection;
};

/**
 * Removes a section from the list of sections by ID
 */
export const removeSection = (
  id: string,
  setSections: React.Dispatch<React.SetStateAction<SectionWithOrder[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  console.log(`Removing section with ID: ${id}`);
  
  // Clear any existing toast notifications
  toast.dismiss();
  
  // Create a unique toast ID for this specific section removal
  const toastId = `remove-section-${id}`;
  
  toast.loading("Removing section...", { id: toastId, duration: 2000 });
  
  setSections(prev => {
    const sectionToRemove = prev.find(section => section.id === id);
    if (!sectionToRemove) {
      console.warn(`Section with ID ${id} not found for removal`);
      toast.dismiss(toastId);
      toast.error("Section not found");
      return prev;
    }
    
    const sectionName = sectionToRemove.title;
    const filteredSections = prev.filter(section => section.id !== id);
    
    toast.dismiss(toastId);
    toast.success(`${sectionName} section removed`);
    
    return filteredSections;
  });
  
  // Remove from open sections
  setOpenSections(prev => {
    const updated = { ...prev };
    delete updated[id];
    return updated;
  });
};
