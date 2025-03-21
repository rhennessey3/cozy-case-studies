
import { useState, useEffect } from 'react';

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
        return JSON.parse(openSectionsData);
      }
    } catch (e) {
      console.error("Failed to parse open sections from session storage", e);
    }
    return {};
  });

  // Save open sections state to session storage (UI state only)
  useEffect(() => {
    try {
      sessionStorage.setItem(`${sessionStorageKey}-open`, JSON.stringify(openSections));
    } catch (e) {
      console.error("Failed to save open sections to session storage", e);
    }
  }, [openSections, sessionStorageKey]);

  const toggleSection = (id: string) => {
    if (!id) return; // Skip empty id (used as a no-op in some cases)
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Utility function to clean up any orphaned openSection entries
  const cleanupOrphanedSections = (validSectionIds: Set<string>) => {
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
  };

  return {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  };
};
