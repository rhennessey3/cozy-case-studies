
import { useEffect } from 'react';
import { useSectionFetch } from './useSectionFetch';
import { useOpenSections } from './useOpenSections';
import { useSectionOperations } from './useSectionOperations';
import { UseSectionStateReturn } from './types/sectionTypes';

export const useSectionState = (caseStudyId: string | null): UseSectionStateReturn => {
  // Use our new hooks
  const { sections, setSections, loading, error, fetchSections } = useSectionFetch(caseStudyId);
  const { openSections, setOpenSections, toggleSection } = useOpenSections();
  const { addSection, togglePublished, removeSection, moveSection } = useSectionOperations(
    caseStudyId,
    sections,
    setSections,
    setOpenSections
  );
  
  // Load sections on initial render and when caseStudyId changes
  useEffect(() => {
    fetchSections();
  }, [fetchSections, caseStudyId]);
  
  // Alias for togglePublished to match legacy interface
  const toggleSectionPublished = togglePublished;
  
  return {
    sections,
    openSections,
    toggleSection,
    loading,
    error,
    fetchSections,
    addSection,
    togglePublished,
    removeSection,
    moveSection,
    toggleSectionPublished
  };
};
