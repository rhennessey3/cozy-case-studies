
import { useState, useEffect } from 'react';
import { SectionWithOrder } from './types';
import { SectionFormState, initializeDefaultSections, getInitialOpenSectionsState } from './utils/defaultSections';
import { addSection, removeSection, moveSection } from './utils/sectionOperations';

export const useSectionState = (form: SectionFormState, handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) => {
  // Parse custom sections from form if available
  const [sections, setSections] = useState<SectionWithOrder[]>(() => {
    try {
      if (form.customSections) {
        const parsedSections = JSON.parse(form.customSections);
        // Ensure all sections have order property
        return parsedSections.map((section: any, index: number) => ({
          ...section,
          order: section.order !== undefined ? section.order : index + 1
        }));
      }
    } catch (e) {
      console.error("Failed to parse custom sections", e);
    }
    return [];
  });

  // State to keep track of which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Track if sections have been initialized
  const [initialized, setInitialized] = useState(false);

  // Initialize the default sections if none are saved
  useEffect(() => {
    if (sections.length === 0 && !initialized) {
      const defaultSections = initializeDefaultSections(form);
      setSections(defaultSections);
      
      // Auto-open all sections by default for better UX
      const newOpenSections = getInitialOpenSectionsState(defaultSections);
      setOpenSections(newOpenSections);
      setInitialized(true);
    }
  }, [sections.length, initialized, form]);

  // Sync sections when form.customSections changes, but only if it's not empty
  // and different from current sections to prevent infinite loops
  useEffect(() => {
    if (form.customSections && initialized) {
      try {
        const parsedSections = JSON.parse(form.customSections);
        
        // Only update if something actually changed and we have sections
        if (parsedSections.length > 0 && 
            JSON.stringify(parsedSections) !== JSON.stringify(sections)) {
          console.log("Updating sections from form data:", parsedSections);
          setSections(parsedSections.map((section: any, index: number) => ({
            ...section,
            order: section.order !== undefined ? section.order : index + 1
          })));
        }
      } catch (e) {
        console.error("Failed to parse updated custom sections", e);
      }
    }
  }, [form.customSections, initialized]);

  // Utility function to clean up any orphaned openSection entries
  // This ensures we don't have stale references to removed sections
  useEffect(() => {
    if (sections.length > 0) {
      // Get all valid section IDs
      const validSectionIds = new Set(sections.map(section => section.id));
      
      // Clean up the openSections state
      setOpenSections(prev => {
        const newOpenSections = { ...prev };
        let hasChanges = false;
        
        // Remove entries for sections that no longer exist
        Object.keys(newOpenSections).forEach(id => {
          if (!validSectionIds.has(id)) {
            delete newOpenSections[id];
            hasChanges = true;
          }
        });
        
        return hasChanges ? newOpenSections : prev;
      });
    }
  }, [sections]);

  const toggleSection = (id: string) => {
    if (!id) return; // Skip empty id (used as a no-op in some cases)
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddSection = (type: SectionWithOrder['type']) => {
    addSection(sections, type, setSections, setOpenSections);
  };

  const handleRemoveSection = (id: string) => {
    removeSection(id, setSections, setOpenSections);
  };

  const handleMoveSection = (id: string, direction: 'up' | 'down') => {
    moveSection(id, direction, setSections);
  };
  
  // Update form whenever sections change, but only after initialization
  // and only if sections actually exist to prevent infinite loops
  useEffect(() => {
    if (initialized && sections.length > 0) {
      console.log("Sections updated, saving to form:", sections);
      
      // Debounce the update to form state
      const timer = setTimeout(() => {
        const event = {
          target: {
            name: 'customSections',
            value: JSON.stringify(sections)
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleContentChange(event);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [sections, handleContentChange, initialized]);

  return {
    sections,
    openSections,
    toggleSection,
    addSection: handleAddSection,
    removeSection: handleRemoveSection,
    moveSection: handleMoveSection
  };
};
