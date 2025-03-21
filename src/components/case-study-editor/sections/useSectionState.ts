import { useState, useEffect, useRef } from 'react';
import { SectionWithOrder } from './types';
import { SectionFormState, initializeDefaultSections, getInitialOpenSectionsState } from './utils/defaultSections';
import { addSection, removeSection, moveSection } from './utils/sectionOperations';

export const useSectionState = (form: SectionFormState, handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) => {
  // Reference to track if we've initialized from custom sections
  const initializedFromCustomSections = useRef(false);
  
  // Get case study slug to use for session storage key
  const getSlugFromForm = (): string => {
    return form.slug || 'new-case-study';
  };
  
  // Session storage key for persisting sections state
  const sessionStorageKey = `case-study-sections-${getSlugFromForm()}`;
  
  // Parse custom sections from form if available
  const [sections, setSections] = useState<SectionWithOrder[]>(() => {
    // First try to get from session storage (for tab switching persistence)
    try {
      const sessionData = sessionStorage.getItem(sessionStorageKey);
      if (sessionData) {
        const parsedSessionData = JSON.parse(sessionData);
        console.log("Restored sections from session storage:", parsedSessionData.length);
        initializedFromCustomSections.current = true;
        return parsedSessionData;
      }
    } catch (e) {
      console.error("Failed to parse session storage sections", e);
    }
    
    // If not in session storage, try from form.customSections
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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    // Try to load open sections state from session storage
    try {
      const openSectionsData = sessionStorage.getItem(`${sessionStorageKey}-open`);
      if (openSectionsData) {
        return JSON.parse(openSectionsData);
      }
    } catch (e) {
      console.error("Failed to parse open sections from session storage", e);
    }
    return {};
  });
  
  // Track if sections have been initialized
  const [initialized, setInitialized] = useState(initializedFromCustomSections.current);
  
  // Reference to the previous customSections value
  const prevCustomSectionsRef = useRef(form.customSections);
  
  // Use a ref to track if we're currently updating to avoid loops
  const isUpdatingRef = useRef(false);
  
  // Store the last valid sections to prevent reverting to default
  const lastValidSectionsRef = useRef<SectionWithOrder[]>(sections);

  // Save sections to session storage whenever they change
  useEffect(() => {
    if (sections.length > 0) {
      try {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(sections));
        console.log(`Saved ${sections.length} sections to session storage`);
      } catch (e) {
        console.error("Failed to save sections to session storage", e);
      }
    }
  }, [sections, sessionStorageKey]);
  
  // Save open sections state to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(`${sessionStorageKey}-open`, JSON.stringify(openSections));
    } catch (e) {
      console.error("Failed to save open sections to session storage", e);
    }
  }, [openSections, sessionStorageKey]);

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
            
            // Save to session storage immediately
            sessionStorage.setItem(sessionStorageKey, JSON.stringify(newSections));
            
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
  }, [form.customSections, sections, sessionStorageKey]);

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
    
    // Remove from session storage immediately to prevent reappearing on tab switch
    try {
      const updatedSections = sections.filter(section => section.id !== id);
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(updatedSections));
      console.log(`Section ${id} removed from session storage`);
    } catch (e) {
      console.error("Failed to remove section from session storage", e);
    }
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
