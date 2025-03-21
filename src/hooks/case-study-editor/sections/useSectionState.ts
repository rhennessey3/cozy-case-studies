
import { useState, useRef, useEffect } from 'react';
import { SectionResponse } from './types/sectionTypes';
import { useOpenSections } from './useOpenSections';
import { toast } from 'sonner';
import { useSectionStorage } from './useSectionStorage';

export const useSectionState = (caseStudyId: string | null = null) => {
  // Use Supabase for section data persistence
  const { 
    sections: supabaseSections, 
    setSections: saveToSupabase,
    isLoading: supabaseLoading
  } = useSectionStorage(caseStudyId);
  
  // Initialize sections state
  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [initialized, setInitialized] = useState(false);
  const lastValidSectionsRef = useRef<SectionResponse[]>([]);
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections();
  
  // Load initial sections from Supabase
  useEffect(() => {
    if (supabaseSections && supabaseSections.length > 0 && !initialized) {
      setSections(supabaseSections);
      lastValidSectionsRef.current = supabaseSections;
      setInitialized(true);
    } else if (!supabaseLoading && !initialized) {
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading, initialized]);
  
  // Update state when sections change
  const isUpdatingRef = useRef(false);
  
  // Add debugging to track section changes
  useEffect(() => {
    console.log('useSectionState: Sections updated', sections);
    
    // Save to Supabase when sections change, but only if we have a caseStudyId
    if (caseStudyId && sections.length > 0 && initialized && !isUpdatingRef.current) {
      saveToSupabase(sections);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);
  
  // Clean up orphaned openSection entries when sections change
  useEffect(() => {
    if (sections.length > 0) {
      const validSectionIds = new Set(sections.map(section => section.id));
      cleanupOrphanedSections(validSectionIds);
    }
  }, [sections, cleanupOrphanedSections]);

  // Add a new section
  const addSection = (type: string) => {
    console.log('Adding section of type:', type);
    const newOrder = sections.length > 0 
      ? Math.max(...sections.map(s => s.sort_order)) + 1 
      : 1;
      
    if (!caseStudyId) {
      toast.error('Cannot add section without a case study');
      return;
    }
      
    const newSection: SectionResponse = {
      id: crypto.randomUUID(),
      case_study_id: caseStudyId,
      component: type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: '',
      sort_order: newOrder,
      published: true
    };
    
    setSections(prev => [...prev, newSection]);
    
    // Auto open the new section
    setOpenSections(prev => ({
      ...prev,
      [newSection.id]: true
    }));
    
    // Show success toast when section is added
    toast.success(`${newSection.title} section added`);
    
    lastValidSectionsRef.current = [...lastValidSectionsRef.current, newSection];
    return newSection;
  };
  
  // Remove a section
  const removeSection = (id: string) => {
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
      
      // Update lastValidSections
      lastValidSectionsRef.current = adjustedSections;
      
      return adjustedSections;
    });
    
    // Remove from open sections
    setOpenSections(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };
  
  // Move a section up or down
  const moveSection = (id: string, direction: 'up' | 'down') => {
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
      
      // Update lastValidSections
      const sortedSections = [...newSections].sort((a, b) => a.sort_order - b.sort_order);
      lastValidSectionsRef.current = sortedSections;
      
      // Sort by order
      return sortedSections;
    });
  };
  
  // Toggle section published state
  const toggleSectionPublished = (id: string, published: boolean) => {
    console.log(`Toggling published state for section ${id} to ${published}`);
    
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === id) {
          return { ...section, published };
        }
        return section;
      });
      
      // Update lastValidSections
      lastValidSectionsRef.current = updatedSections;
      
      // Show toast notification
      toast.success(`Section ${published ? 'published' : 'unpublished'}`);
      
      return updatedSections;
    });
  };

  return {
    sections,
    openSections,
    toggleSection,
    addSection,
    removeSection,
    moveSection,
    toggleSectionPublished
  };
};
