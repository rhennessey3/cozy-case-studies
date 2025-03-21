
import { useState, useRef, useEffect, useCallback } from 'react';
import { SectionWithOrder } from './types';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';
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
  caseStudyId: string | null = null
) => {
  // Use a ref to prevent infinite loops
  const isInitializingRef = useRef(true);
  
  // Session storage key for UI state only (open/closed sections)
  const sessionStorageKey = `case-study-ui-state-${caseStudyId || 'new-case-study'}`;
  // Ref to prevent recalculation of the session storage key on every render
  const sessionStorageKeyRef = useRef(sessionStorageKey);
  
  // Use Supabase for section data persistence
  const { 
    sections: supabaseSections, 
    setSections: saveToSupabase,
    isLoading: supabaseLoading
  } = useSectionStorage(caseStudyId);
  
  // Initialize with empty sections array
  const [sections, setSections] = useState<SectionWithOrder[]>([]);
  const [initialized, setInitialized] = useState(false);
  const lastValidSectionsRef = useRef<SectionWithOrder[]>([]);
  
  // Load initial sections from Supabase
  useEffect(() => {
    if (supabaseSections && supabaseSections.length > 0 && !initialized && isInitializingRef.current) {
      isInitializingRef.current = false;
      
      // Convert SectionResponse[] to SectionWithOrder[]
      const sectionsWithOrder = mapSectionResponsesToSectionWithOrders(supabaseSections);
      setSections(sectionsWithOrder);
      lastValidSectionsRef.current = sectionsWithOrder;
      setInitialized(true);
    } else if (!supabaseLoading && !initialized && isInitializingRef.current) {
      isInitializingRef.current = false;
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading, initialized]);
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections(sessionStorageKeyRef.current);
  
  // Sync sections with open sections state
  useEffect(() => {
    if (sections.length > 0) {
      // Create a set of valid section IDs
      const validSectionIds = new Set(sections.map(section => section.id));
      
      // Clean up orphaned entries in openSections
      cleanupOrphanedSections(validSectionIds);
    }
  }, [sections, cleanupOrphanedSections]);
  
  // Use refs for handler functions to ensure they don't change between renders
  const isUpdatingRef = useRef(false);
  
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
      return newSection;
    },
    
    removeSection: (id: string) => {
      console.log('Removing section:', id);
      removeSection(id, setSections, setOpenSections);
      // Update lastValidSections after removal
      lastValidSectionsRef.current = lastValidSectionsRef.current.filter(
        section => section.id !== id
      );
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
    sections: sections as SectionResponse[], // Cast to satisfy TypeScript
    openSections,
    toggleSection,
    addSection: handlersRef.current.addSection,
    removeSection: handlersRef.current.removeSection,
    toggleSectionPublished: handlersRef.current.toggleSectionPublished
  };
};
