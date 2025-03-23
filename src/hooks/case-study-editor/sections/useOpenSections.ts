
import { useState, useCallback, useRef, useEffect } from 'react';

export const useOpenSections = () => {
  console.log('useOpenSections hook initialized');
  
  // State for tracking which sections are open (expanded)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    // Try to load from session storage
    try {
      const storageKey = `case-study-sections-open-state`;
      const storedValue = sessionStorage.getItem(storageKey);
      if (storedValue) {
        const parsed = JSON.parse(storedValue);
        console.log('useOpenSections: Loaded initial state from session storage:', parsed);
        return parsed;
      }
    } catch (e) {
      console.error('useOpenSections: Error loading from session storage:', e);
    }
    console.log('useOpenSections: Using default empty state');
    return {};
  });
  
  // Ref to track if this is the first toggle for performance optimization
  const initializedRef = useRef(false);

  // Save to session storage when state changes
  useEffect(() => {
    if (Object.keys(openSections).length > 0) {
      try {
        const storageKey = `case-study-sections-open-state`;
        sessionStorage.setItem(storageKey, JSON.stringify(openSections));
        console.log('useOpenSections: Saved state to session storage:', openSections);
      } catch (e) {
        console.error('useOpenSections: Error saving to session storage:', e);
      }
    }
  }, [openSections]);

  // Toggle a section's open/closed state with stable function reference
  const toggleSection = useCallback((id: string) => {
    console.log('useOpenSections: Toggle section called for ID:', id);
    if (!id) {
      console.log('useOpenSections: Empty ID provided to toggleSection, skipping');
      return;
    }
    
    setOpenSections(prev => {
      initializedRef.current = true;
      const newState = {
        ...prev,
        [id]: !prev[id]
      };
      console.log('useOpenSections: New open sections state after toggle:', newState);
      return newState;
    });
  }, []);

  // Remove orphaned sections from the openSections state with stable function reference
  const cleanupOrphanedSections = useCallback((validSectionIds: Set<string>) => {
    console.log('useOpenSections: Cleanup orphaned sections called with valid IDs:', Array.from(validSectionIds));
    
    // Skip cleanup if no real toggles have been made yet
    if (!initializedRef.current) {
      console.log('useOpenSections: Skipping cleanup as no toggles have been made yet');
      return;
    }
    
    setOpenSections(prev => {
      const newOpenSections = { ...prev };
      let changed = false;
      
      // Remove any section IDs that aren't in the valid set
      Object.keys(newOpenSections).forEach(id => {
        if (!validSectionIds.has(id)) {
          console.log('useOpenSections: Removing orphaned section ID from state:', id);
          delete newOpenSections[id];
          changed = true;
        }
      });
      
      if (changed) {
        console.log('useOpenSections: State changed after cleanup:', newOpenSections);
      } else {
        console.log('useOpenSections: No orphaned sections found');
      }
      
      return changed ? newOpenSections : prev;
    });
  }, []);

  return {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  };
};
