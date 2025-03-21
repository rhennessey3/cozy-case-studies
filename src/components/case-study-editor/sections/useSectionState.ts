
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
    // Access slug from the extended form type
    return form.slug || 'new-case-study';
  };
  
  // Session storage key for persisting sections state
  const sessionStorageKey = `case-study-sections-${getSlugFromForm()}`;
  
  // Initialize sections state
  const {
    sections,
    setSections,
    initialized,
    setInitialized,
    lastValidSectionsRef
  } = useSectionInitialization(form, sessionStorageKey);
  
  // Manage open/closed state for sections
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections(sessionStorageKey);
  
  // Sync sections with form.customSections
  const { isUpdatingRef } = useSectionSync(
    sections,
    form,
    setSections,
    lastValidSectionsRef,
    sessionStorageKey
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
  
  // Section operation handlers
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

  return {
    sections,
    openSections,
    toggleSection,
    addSection: handleAddSection,
    removeSection: handleRemoveSection,
    moveSection: handleMoveSection
  };
};
