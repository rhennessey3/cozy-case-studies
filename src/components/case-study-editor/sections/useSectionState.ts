
import { useState, useRef, useEffect } from 'react';
import { SectionWithOrder } from './types';
import { SectionFormState } from './utils/defaultSections';
import { useOpenSections } from './hooks/useOpenSections';
import { useSectionInitialization } from './hooks/useSectionInitialization';
import { useSectionSync } from './hooks/useSectionSync';
import { useFormUpdate } from './hooks/useFormUpdate';
import { addSection, removeSection } from './utils/sectionOperations';
import { toast } from 'sonner';
import { useSectionStorage } from '@/hooks/case-study-editor/sections/useSectionStorage';
import { 
  mapSectionWithOrdersToSectionResponses, 
  mapSectionResponsesToSectionWithOrders 
} from '@/hooks/case-study-editor/sections/utils/sectionResponseMapper';

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
  
  // Use refs for handler functions to ensure they don't change between renders
  const isUpdatingRef = useRef(false);
  
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
  
  // Sync sections with open sections state
  useSyncWithOpenSections(sections, cleanupOrphanedSections);
  
  // Sync sections with form.customSections
  useSectionSync(
    sections,
    form,
    (updatedSections) => {
      // Ensure case_study_id is properly set when updating sections
      if (Array.isArray(updatedSections)) {
        const processedSections = updatedSections.map(section => {
          if (caseStudyId && (!section.case_study_id || section.case_study_id === '')) {
            return { ...section, case_study_id: caseStudyId };
          }
          return section;
        });
        setSections(processedSections);
      } else {
        // Handle the case where it might be a function
        setSections(updatedSections);
      }
    },
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
      // Convert sections from SectionWithOrder to SectionResponse before saving
      const sectionResponses = mapSectionWithOrdersToSectionResponses(sections, caseStudyId);
      saveToSupabase(sectionResponses);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);
  
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
      const sectionsArray = [...sections];
      let currentIndex = sectionsArray.findIndex(s => s.id === id);
      if (currentIndex === -1) return;
      
      let targetIndex;
      if (direction === 'up' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      } else if (direction === 'down' && currentIndex < sectionsArray.length - 1) {
        targetIndex = currentIndex + 1;
      } else {
        // Can't move in this direction
        toast.info(`Cannot move section ${direction}`);
        return;
      }
      
      // Swap order values
      const tempOrder = sectionsArray[currentIndex].sort_order;
      sectionsArray[currentIndex].sort_order = sectionsArray[targetIndex].sort_order;
      sectionsArray[targetIndex].sort_order = tempOrder;
      
      // Update legacy order field as well if it exists
      if ('order' in sectionsArray[currentIndex]) {
        sectionsArray[currentIndex].order = sectionsArray[currentIndex].sort_order;
      }
      if ('order' in sectionsArray[targetIndex]) {
        sectionsArray[targetIndex].order = sectionsArray[targetIndex].sort_order;
      }
      
      // Update state
      setSections([...sectionsArray]);
      
      // Update lastValidSections after moving
      lastValidSectionsRef.current = [...sectionsArray];
      
      toast.success(`Section moved ${direction}`);
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
