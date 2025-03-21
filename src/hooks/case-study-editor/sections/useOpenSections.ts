
import { useState, useCallback } from 'react';

export const useOpenSections = () => {
  // State for tracking which sections are open (expanded)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Toggle a section's open/closed state
  const toggleSection = useCallback((id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Remove orphaned sections from the openSections state
  const cleanupOrphanedSections = useCallback((validSectionIds: Set<string>) => {
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
