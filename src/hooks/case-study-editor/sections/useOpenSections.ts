
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
  
  return {
    openSections,
    setOpenSections,
    toggleSection
  };
};
