
import { useState, useCallback, useRef } from 'react';

export const useOpenSections = () => {
  // State for tracking which sections are open (expanded)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Ref to track if this is the first toggle for performance optimization
  const initializedRef = useRef(false);

  // Toggle a section's open/closed state with stable function reference
  const toggleSection = useCallback((id: string) => {
    if (!id) return; // Skip empty id
    
    setOpenSections(prev => {
      initializedRef.current = true;
      return {
        ...prev,
        [id]: !prev[id]
      };
    });
  }, []);

  // Remove orphaned sections from the openSections state with stable function reference
  const cleanupOrphanedSections = useCallback((validSectionIds: Set<string>) => {
    // Skip cleanup if no real toggles have been made yet
    if (!initializedRef.current) return;
    
    setOpenSections(prev => {
      const newOpenSections = { ...prev };
      let changed = false;
      
      // Remove any section IDs that aren't in the valid set
      Object.keys(newOpenSections).forEach(id => {
        if (!validSectionIds.has(id)) {
          delete newOpenSections[id];
          changed = true;
        }
      });
      
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
