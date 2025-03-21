
import { useState, useRef, useEffect } from 'react';
import { SectionWithOrder } from './types';
import { SectionFormState } from './utils/defaultSections';
import { useOpenSections } from './hooks/useOpenSections';
import { useSectionInitialization } from './hooks/useSectionInitialization';
import { useSectionSync } from './hooks/useSectionSync';
import { useFormUpdate } from './hooks/useFormUpdate';
import { addSection, removeSection, moveSection } from './utils/sectionOperations';
import { toast } from 'sonner';
import { useSectionStorage } from '@/hooks/case-study-editor/sections/useSectionStorage';

export const useSectionState = (
  form: SectionFormState & { slug?: string }, 
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  caseStudyId: string | null = null
) => {
  // Get case study slug to use for session storage key (UI state only)
  const getSlugFromForm = (): string => {
    return form.slug || 'new-case-study';
  };
  
  // Session storage key for UI state only (open/closed sections)
  const sessionStorageKey = `case-study-ui-state-${getSlugFromForm()}`;
  // Ref to prevent recalculation of the session storage key on every render
  const sessionStorageKeyRef = useRef(sessionStorageKey);
  
  // Use Supabase for section data persistence
  const { 
    sections: supabaseSections, 
    setSections: saveToSupabase,
    isLoading: supabaseLoading
  } = useSectionStorage(caseStudyId);
  
  // Initialize sections state
  const {
    sections,
    setSections,
    initialized,
    setInitialized,
    lastValidSectionsRef
  } = useSectionInitialization(form, sessionStorageKeyRef.current, supabaseSections, supabaseLoading);
  
  // Manage open/closed state for sections (UI state only)
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
  
  // Add debugging to track section changes
  useEffect(() => {
    console.log('useSectionState: Sections updated', sections);
    
    // Save to Supabase when sections change, but only if we have a caseStudyId
    if (caseStudyId && sections.length > 0 && initialized && !isUpdatingRef.current) {
      saveToSupabase(sections);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);
  
  // Clean up orphaned openSection entries when sections change
  useEffect(() => {
    if (sections.length > 0) {
      const validSectionIds = new Set(sections.map(section => section.id));
      cleanupOrphanedSections(validSectionIds);
    }
  }, [sections, cleanupOrphanedSections]);
  
  // Use refs for handler functions to ensure they don't change between renders
  const handlersRef = useRef({
    addSection: (type: SectionWithOrder['type']) => {
      console.log('Adding section of type:', type);
      const newSection = addSection(sections, type, setSections, setOpenSections);
      lastValidSectionsRef.current = [...lastValidSectionsRef.current, newSection];
    },
    
    removeSection: (id: string) => {
      console.log('Removing section:', id);
      removeSection(id, setSections, setOpenSections);
      // Update lastValidSections after removal
      lastValidSectionsRef.current = lastValidSectionsRef.current.filter(
        section => section.id !== id
      );
    },
    
    moveSection: (id: string, direction: 'up' | 'down') => {
      console.log('Moving section:', id, direction);
      moveSection(id, direction, setSections);
      // Update lastValidSections after moving - reordering happens in moveSection
      const updatedSections = [...sections];
      updatedSections.sort((a, b) => a.order - b.order);
      lastValidSectionsRef.current = updatedSections;
    },
    
    toggleSectionPublished: (id: string, published: boolean) => {
      console.log(`Toggling published state for section ${id} to ${published}`);
      
      setSections(prevSections => {
        const updatedSections = prevSections.map(section => {
          if (section.id === id) {
            return { ...section, published };
          }
          return section;
        });
        
        // Update lastValidSections
        lastValidSectionsRef.current = updatedSections;
        
        // Show toast notification
        toast.success(`Section ${published ? 'published' : 'unpublished'}`);
        
        return updatedSections;
      });
    }
  });

  return {
    sections,
    openSections,
    toggleSection,
    addSection: handlersRef.current.addSection,
    removeSection: handlersRef.current.removeSection,
    moveSection: handlersRef.current.moveSection,
    toggleSectionPublished: handlersRef.current.toggleSectionPublished
  };
};
