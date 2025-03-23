
import { useState, useRef, useEffect, useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from './types/sectionTypes';
import { useOpenSections } from './useOpenSections';
import { addSection, removeSection } from '@/components/case-study-editor/sections/utils/sectionOperations';
import { toast } from 'sonner';
import { useSectionStorage } from './useSectionStorage';
import { 
  mapSectionWithOrdersToSectionResponses, 
  mapSectionResponsesToSectionWithOrders 
} from './utils/sectionResponseMapper';
import { isAdminRoute } from '@/hooks/isAdminRoute';

export const useSectionState = (
  caseStudyId: string | null = null
) => {
  console.log('useSectionState INIT with caseStudyId:', caseStudyId);
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
    isLoading: supabaseLoading,
    refresh: refreshFromSupabase
  } = useSectionStorage(caseStudyId);
  
  console.log('Supabase sections loaded:', supabaseSections?.length || 0, 'loading state:', supabaseLoading);
  
  // Initialize with empty sections array
  const [sections, setSections] = useState<SectionWithOrder[]>([]);
  const [initialized, setInitialized] = useState(false);
  const lastValidSectionsRef = useRef<SectionWithOrder[]>([]);
  
  // Track whether we're in an admin route for additional logging
  const isAdmin = isAdminRoute();
  console.log('Route context:', isAdmin ? 'ADMIN' : 'PUBLIC');
  
  // Load initial sections from Supabase
  useEffect(() => {
    console.log('useEffect - Loading sections from Supabase, initialized:', initialized, 'isInitializing:', isInitializingRef.current);
    
    if (!initialized && isInitializingRef.current) {
      if (supabaseSections && supabaseSections.length > 0) {
        console.log('Initial sections from Supabase:', supabaseSections);
        // Convert SectionResponse[] to SectionWithOrder[]
        const sectionsWithOrder = mapSectionResponsesToSectionWithOrders(supabaseSections);
        console.log('Mapped to SectionWithOrder[]:', sectionsWithOrder);
        setSections(sectionsWithOrder);
        lastValidSectionsRef.current = sectionsWithOrder;
      } else {
        console.log('No initial sections found in Supabase');
      }
      
      isInitializingRef.current = false;
      setInitialized(true);
      console.log('Initialization complete, state set to initialized');
    }
  }, [supabaseSections, supabaseLoading, initialized]);
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections();
  
  // Debug log for open sections
  useEffect(() => {
    console.log('Current openSections state:', openSections);
  }, [openSections]);
  
  // Sync sections with open sections state
  useEffect(() => {
    console.log('useEffect - Syncing sections with openSections state. Current sections length:', sections.length);
    if (sections.length > 0) {
      // Create a set of valid section IDs
      const validSectionIds = new Set(sections.map(section => section.id));
      console.log('Valid section IDs:', Array.from(validSectionIds));
      
      // Clean up orphaned entries in openSections
      cleanupOrphanedSections(validSectionIds);
    }
  }, [sections, cleanupOrphanedSections]);
  
  // Use refs for handler functions to ensure they don't change between renders
  const isUpdatingRef = useRef(false);
  
  // Add explicit refresh function
  const refresh = useCallback(() => {
    console.log('Explicitly refreshing sections from database');
    if (caseStudyId) {
      refreshFromSupabase();
    }
  }, [caseStudyId, refreshFromSupabase]);
  
  // Use refs for handler functions to ensure they don't change between renders
  const handlersRef = useRef({
    addSection: (type: SectionWithOrder['type']) => {
      console.log('Adding section of type:', type);
      
      if (!caseStudyId) {
        console.error('Cannot add section without a case study');
        toast.error('Cannot add section without a case study');
        return null;
      }
      
      // Add the section to UI state
      console.log('Before adding section, current sections:', sections);
      const newSection = addSection(sections, type, setSections, setOpenSections);
      console.log('New section created:', newSection);
      
      lastValidSectionsRef.current = [...sections, newSection];
      console.log('Updated lastValidSectionsRef:', lastValidSectionsRef.current);
      
      // No need to save to database here as the hook now handles that
      return newSection;
    },
    
    removeSection: (id: string) => {
      console.log('Removing section:', id);
      removeSection(id, setSections, setOpenSections);
      // Update lastValidSections after removal
      lastValidSectionsRef.current = lastValidSectionsRef.current.filter(
        section => section.id !== id
      );
      console.log('After removal, lastValidSectionsRef:', lastValidSectionsRef.current);
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
        console.log('After toggling published, lastValidSectionsRef:', lastValidSectionsRef.current);
        
        // Show toast notification
        toast.success(`Section ${published ? 'published' : 'unpublished'}`);
        
        return updatedSections;
      });
    }
  });

  // Save to Supabase when sections change
  useEffect(() => {
    console.log('useEffect - Section state changed, current sections:', sections.length);
    if (caseStudyId && sections.length > 0 && initialized && !isUpdatingRef.current) {
      console.log('Conditions met for saving sections to Supabase');
      isUpdatingRef.current = true;
      
      // Convert sections from SectionWithOrder to SectionResponse before saving
      const sectionResponses = mapSectionWithOrdersToSectionResponses(sections, caseStudyId);
      console.log('Mapped sections to SectionResponses for saving:', sectionResponses);
      
      saveToSupabase(sectionResponses);
      console.log('Sections saved to Supabase');
      
      setTimeout(() => {
        isUpdatingRef.current = false;
        console.log('Reset isUpdatingRef to false');
      }, 100);
    } else {
      console.log(
        'Skip saving to Supabase - conditions not met:', 
        { haveCaseStudyId: !!caseStudyId, sectionsCount: sections.length, initialized, isUpdating: isUpdatingRef.current }
      );
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);

  // Memoized handlers that don't change on re-renders
  const addSectionHandler = useCallback((type: SectionWithOrder['type']) => {
    console.log('addSectionHandler called with type:', type);
    return handlersRef.current.addSection(type);
  }, []);

  const removeSectionHandler = useCallback((id: string) => {
    console.log('removeSectionHandler called with id:', id);
    handlersRef.current.removeSection(id);
  }, []);

  const toggleSectionPublishedHandler = useCallback((id: string, published: boolean) => {
    console.log('toggleSectionPublishedHandler called with id:', id, 'published:', published);
    handlersRef.current.toggleSectionPublished(id, published);
  }, []);

  // Return stable function references to prevent infinite re-renders
  return {
    sections: sections as unknown as SectionResponse[], // Cast to satisfy TypeScript
    openSections,
    toggleSection,
    addSection: addSectionHandler,
    removeSection: removeSectionHandler,
    toggleSectionPublished: toggleSectionPublishedHandler,
    refresh
  };
};
