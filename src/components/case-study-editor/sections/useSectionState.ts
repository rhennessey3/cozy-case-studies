
import { useState, useEffect, useRef } from 'react';
import { SectionWithOrder } from './types';
import { SectionFormState, initializeDefaultSections, getInitialOpenSectionsState } from './utils/defaultSections';
import { addSection, removeSection, moveSection } from './utils/sectionOperations';

export const useSectionState = (form: SectionFormState, handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) => {
  // Reference to track if we've initialized from custom sections
  const initializedFromCustomSections = useRef(false);
  
  // Parse custom sections from form if available
  const [sections, setSections] = useState<SectionWithOrder[]>(() => {
    try {
      if (form.customSections) {
        const parsedSections = JSON.parse(form.customSections);
        if (Array.isArray(parsedSections) && parsedSections.length > 0) {
          initializedFromCustomSections.current = true;
          console.log("Initializing sections from customSections:", parsedSections.length);
          // Ensure all sections have order property
          return parsedSections.map((section: any, index: number) => ({
            ...section,
            order: section.order !== undefined ? section.order : index + 1
          }));
        }
      }
    } catch (e) {
      console.error("Failed to parse custom sections", e);
    }
    return [];
  });

  // State to keep track of which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Track if sections have been initialized
  const [initialized, setInitialized] = useState(initializedFromCustomSections.current);
  
  // Reference to the previous customSections value
  const prevCustomSectionsRef = useRef(form.customSections);
  
  // Use a ref to track if we're currently updating to avoid loops
  const isUpdatingRef = useRef(false);
  
  // Store the last valid sections to prevent reverting to default
  const lastValidSectionsRef = useRef<SectionWithOrder[]>(sections);

  // Initialize the default sections if none are saved
  useEffect(() => {
    if (sections.length === 0 && !initialized) {
      // Only create default sections if we didn't initialize from custom sections
      const defaultSections = initializeDefaultSections(form);
      setSections(defaultSections);
      lastValidSectionsRef.current = defaultSections;
      
      // Auto-open all sections by default for better UX
      const newOpenSections = getInitialOpenSectionsState(defaultSections);
      setOpenSections(newOpenSections);
      setInitialized(true);
    } else if (sections.length > 0 && !initialized) {
      // If we have sections but aren't initialized, update the last valid ref
      lastValidSectionsRef.current = sections;
      setInitialized(true);
    }
  }, [sections.length, initialized, form]);

  // Sync sections when form.customSections changes, but only if it's actually different
  useEffect(() => {
    if (form.customSections && 
        form.customSections !== prevCustomSectionsRef.current && 
        !isUpdatingRef.current) {
      
      try {
        const parsedSections = JSON.parse(form.customSections);
        
        // Check if we actually have new sections that are different
        if (Array.isArray(parsedSections)) {
          // Only update if the JSON is different or we don't have sections yet
          const currentJson = JSON.stringify(sections);
          const newJson = JSON.stringify(parsedSections);
          
          if (currentJson !== newJson || sections.length === 0) {
            console.log("Updating sections from form data - significant change detected");
            
            // Mark that we're updating to prevent loops
            isUpdatingRef.current = true;
            
            // Update sections with proper ordering
            const newSections = parsedSections.map((section: any, index: number) => ({
              ...section,
              order: section.order !== undefined ? section.order : index + 1
            }));
            
            setSections(newSections);
            lastValidSectionsRef.current = newSections;
            
            // After updating, allow future updates
            setTimeout(() => {
              isUpdatingRef.current = false;
            }, 100);
          }
        }
      } catch (e) {
        console.error("Failed to parse updated custom sections", e);
      }
      
      // Update the ref to the current value
      prevCustomSectionsRef.current = form.customSections;
    }
  }, [form.customSections, sections]);

  // Utility function to clean up any orphaned openSection entries
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
    const newSection = addSection(sections, type, setSections, setOpenSections);
    lastValidSectionsRef.current = [...lastValidSectionsRef.current, newSection];
  };

  const handleRemoveSection = (id: string) => {
    removeSection(id, setSections, setOpenSections);
    // Update lastValidSections after removal
    lastValidSectionsRef.current = lastValidSectionsRef.current.filter(
      section => section.id !== id
    );
  };

  const handleMoveSection = (id: string, direction: 'up' | 'down') => {
    moveSection(id, direction, setSections);
    // Update lastValidSections after moving - reordering happens in moveSection
    const updatedSections = [...sections];
    updatedSections.sort((a, b) => a.order - b.order);
    lastValidSectionsRef.current = updatedSections;
  };
  
  // Debounced update to form whenever sections change
  useEffect(() => {
    if (initialized && sections.length >= 0 && !isUpdatingRef.current) {
      const timer = setTimeout(() => {
        isUpdatingRef.current = true;
        
        // Store sections in a structured format
        const sectionsToStore = JSON.stringify(sections);
        
        // Only update if the value actually changed
        if (sectionsToStore !== form.customSections) {
          console.log(`Updating form.customSections with ${sections.length} sections`);
          
          const event = {
            target: {
              name: 'customSections',
              value: sectionsToStore
            }
          } as React.ChangeEvent<HTMLInputElement>;
          
          handleContentChange(event);
        }
        
        // Reset the updating flag after a delay
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
      }, 300); // 300ms debounce
      
      return () => clearTimeout(timer);
    }
  }, [sections, handleContentChange, initialized, form.customSections]);

  return {
    sections,
    openSections,
    toggleSection,
    addSection: handleAddSection,
    removeSection: handleRemoveSection,
    moveSection: handleMoveSection
  };
};
