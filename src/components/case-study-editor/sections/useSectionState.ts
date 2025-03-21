
import { useState, useRef } from 'react';
import { SectionWithOrder } from './types';
import { SectionFormState } from './utils/defaultSections';
import { useOpenSections } from './hooks/useOpenSections';
import { useSectionInitialization } from './hooks/useSectionInitialization';
import { useSectionSync } from './hooks/useSectionSync';
import { useFormUpdate } from './hooks/useFormUpdate';
import { addSection, removeSection, moveSection } from './utils/sectionOperations';

export const useSectionState = (
  form: SectionFormState & { slug?: string }, 
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
) => {
  // Get case study slug to use for session storage key
  const getSlugFromForm = (): string => {
    return form.slug || 'new-case-study';
  };
  
  // Session storage key for persisting sections state
  const sessionStorageKey = `case-study-sections-${getSlugFromForm()}`;
  // Ref to prevent recalculation of the session storage key on every render
  const sessionStorageKeyRef = useRef(sessionStorageKey);
  
  // Initialize sections state
  const {
    sections,
    setSections,
    initialized,
    setInitialized,
    lastValidSectionsRef
  } = useSectionInitialization(form, sessionStorageKeyRef.current);
  
  // Manage open/closed state for sections
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections(sessionStorageKeyRef.current);
  
  // Sync sections with form.customSections
  const { isUpdatingRef } = useSectionSync(
    sections,
    form,
    setSections,
    lastValidSectionsRef,
    sessionStorageKeyRef.current
  );
  
  // Update form with sections changes
  useFormUpdate(
    sections,
    initialized,
    isUpdatingRef,
    form,
    handleContentChange
  );
  
  // Clean up orphaned openSection entries when sections change
  if (sections.length > 0) {
    const validSectionIds = new Set(sections.map(section => section.id));
    cleanupOrphanedSections(validSectionIds);
  }
  
  // Use refs for handler functions to ensure they don't change between renders
  const handlersRef = useRef({
    addSection: (type: SectionWithOrder['type']) => {
      const newSection = addSection(sections, type, setSections, setOpenSections);
      lastValidSectionsRef.current = [...lastValidSectionsRef.current, newSection];
    },
    
    removeSection: (id: string) => {
      removeSection(id, setSections, setOpenSections);
      // Update lastValidSections after removal
      lastValidSectionsRef.current = lastValidSectionsRef.current.filter(
        section => section.id !== id
      );
      
      // Remove from session storage immediately to prevent reappearing on tab switch
      try {
        const updatedSections = sections.filter(section => section.id !== id);
        sessionStorage.setItem(sessionStorageKeyRef.current, JSON.stringify(updatedSections));
        console.log(`Section ${id} removed from session storage`);
      } catch (e) {
        console.error("Failed to remove section from session storage", e);
      }
    },
    
    moveSection: (id: string, direction: 'up' | 'down') => {
      moveSection(id, direction, setSections);
      // Update lastValidSections after moving - reordering happens in moveSection
      const updatedSections = [...sections];
      updatedSections.sort((a, b) => a.order - b.order);
      lastValidSectionsRef.current = updatedSections;
    }
  });

  return {
    sections,
    openSections,
    toggleSection,
    addSection: handlersRef.current.addSection,
    removeSection: handlersRef.current.removeSection,
    moveSection: handlersRef.current.moveSection
  };
};
