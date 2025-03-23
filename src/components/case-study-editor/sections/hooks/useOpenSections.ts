
import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook to manage the open/closed state of sections (UI state only)
 */
export const useOpenSections = (sessionStorageKey: string) => {
  // State to keep track of which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    // Try to load open sections state from session storage
    try {
      const openSectionsData = sessionStorage.getItem(`${sessionStorageKey}-open`);
      if (openSectionsData) {
        console.log(`useOpenSections: Loaded state from session storage for key ${sessionStorageKey}:`, JSON.parse(openSectionsData));
        return JSON.parse(openSectionsData);
      }
    } catch (e) {
      console.error("Failed to parse open sections from session storage", e);
    }
    console.log('useOpenSections: Using default empty state');
    return {};
  });

  // Ref to track if this is the first toggle for performance optimization
  const initializedRef = useRef(false);

  // Save open sections state to session storage (UI state only)
  useEffect(() => {
    if (Object.keys(openSections).length > 0) {
      try {
        sessionStorage.setItem(`${sessionStorageKey}-open`, JSON.stringify(openSections));
        console.log(`useOpenSections: Saved state to session storage for key ${sessionStorageKey}:`, openSections);
      } catch (e) {
        console.error("Failed to save open sections to session storage", e);
      }
    }
  }, [openSections, sessionStorageKey]);

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

  // Utility function to clean up any orphaned openSection entries
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
