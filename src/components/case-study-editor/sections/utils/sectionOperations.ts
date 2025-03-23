
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
  
  // Log the current sections before adding new one
  console.log('addSection: Current sections before adding:', sections);
  
  // Add to local state for immediate feedback
  setSections(prev => {
    const updatedSections = [...prev, newSection];
    console.log('addSection: Updated sections length:', updatedSections.length);
    console.log('addSection: Updated sections content:', updatedSections);
    return updatedSections;
  });
  
  // Auto open the new section
  setOpenSections(prev => {
    const updatedOpenSections = {
      ...prev,
      [newSection.id]: true
    };
    console.log('addSection: Updated open sections state:', updatedOpenSections);
    return updatedOpenSections;
  });
  
  // Show toast notification
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
    console.log('removeSection: Current sections before removal:', prev);
    
    const sectionToRemove = prev.find(section => section.id === id);
    if (!sectionToRemove) {
      console.warn(`Section with ID ${id} not found for removal`);
      toast.dismiss(toastId);
      toast.error("Section not found");
      return prev;
    }
    
    const sectionName = sectionToRemove.title;
    const filteredSections = prev.filter(section => section.id !== id);
    
    console.log('removeSection: Sections after filtering:', filteredSections);
    
    toast.dismiss(toastId);
    toast.success(`${sectionName} section removed`);
    
    return filteredSections;
  });
  
  // Remove from open sections
  setOpenSections(prev => {
    console.log('removeSection: Current open sections before removal:', prev);
    const updated = { ...prev };
    delete updated[id];
    console.log('removeSection: Updated open sections after removal:', updated);
    return updated;
  });
};
