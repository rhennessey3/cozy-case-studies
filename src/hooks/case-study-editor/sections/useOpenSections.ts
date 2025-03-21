
import { useState, useCallback } from 'react';

export const useOpenSections = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Toggle section open/closed state (UI only)
  const toggleSection = useCallback((id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);
  
  // Clean up orphaned open sections
  const cleanupOrphanedSections = useCallback((validSectionIds: Set<string>) => {
    setOpenSections(prev => {
      const updated = { ...prev };
      let hasChanges = false;
      
      Object.keys(updated).forEach(id => {
        if (!validSectionIds.has(id)) {
          delete updated[id];
          hasChanges = true;
        }
      });
      
      return hasChanges ? updated : prev;
    });
  }, []);
  
  return {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  };
};
