
import { useState, useRef, useEffect, useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from './types/sectionTypes';
import { useOpenSections } from '@/components/case-study-editor/sections/hooks/useOpenSections';
import { isAdminRoute } from '@/hooks/isAdminRoute';
import { useSectionStorage } from './useSectionStorage';
import { 
  mapSectionWithOrdersToSectionResponses, 
  mapSectionResponsesToSectionWithOrders 
} from './utils/sectionResponseMapper';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useSectionState = (
  caseStudyId: string | null = null
) => {
  console.log('useSectionState INIT with caseStudyId:', caseStudyId);
  
  // Use Supabase for section data persistence
  const { 
    sections: supabaseSections, 
    setSections: saveToSupabase,
    isLoading: supabaseLoading,
    refresh: refreshFromSupabase
  } = useSectionStorage(caseStudyId);
  
  console.log('Supabase sections loaded:', supabaseSections?.length || 0, 'loading state:', supabaseLoading);
  
  // Track initialization state with a ref to prevent render loops
  const isInitializedRef = useRef(false);
  
  // Initialize with empty sections array
  const [sections, setSections] = useState<SectionWithOrder[]>([]);
  const [initialized, setInitialized] = useState(false);
  const lastValidSectionsRef = useRef<SectionWithOrder[]>([]);
  
  // Track whether we're in an admin route for additional logging
  const isAdmin = isAdminRoute();
  console.log('Route context:', isAdmin ? 'ADMIN' : 'PUBLIC');
  
  // Session storage key for UI state
  const sessionStorageKey = `case-study-sections-${caseStudyId || 'new'}`;
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections(sessionStorageKey);
  
  // Load initial sections from Supabase
  useEffect(() => {
    if (!supabaseLoading && !isInitializedRef.current) {
      console.log('Initializing sections from Supabase:', supabaseSections?.length || 0);
      
      if (supabaseSections && supabaseSections.length > 0) {
        // Convert SectionResponse[] to SectionWithOrder[]
        const sectionsWithOrder = mapSectionResponsesToSectionWithOrders(supabaseSections);
        setSections(sectionsWithOrder);
        lastValidSectionsRef.current = sectionsWithOrder;
        console.log('Set initial sections from Supabase:', sectionsWithOrder.length);
      }
      
      isInitializedRef.current = true;
      setInitialized(true);
    }
  }, [supabaseSections, supabaseLoading]);
  
  // Sync sections with open sections state
  useEffect(() => {
    if (sections.length > 0) {
      // Create a set of valid section IDs
      const validSectionIds = new Set(sections.map(section => section.id));
      
      // Clean up orphaned entries in openSections
      cleanupOrphanedSections(validSectionIds);
    }
  }, [sections, cleanupOrphanedSections]);
  
  // Save to Supabase when sections change
  const isUpdatingRef = useRef(false);
  
  useEffect(() => {
    if (caseStudyId && sections.length > 0 && initialized && !isUpdatingRef.current) {
      console.log('Saving sections to Supabase:', sections.length);
      isUpdatingRef.current = true;
      
      // Convert sections from SectionWithOrder to SectionResponse before saving
      const sectionResponses = mapSectionWithOrdersToSectionResponses(sections, caseStudyId);
      saveToSupabase(sectionResponses);
      
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 300);
    }
  }, [sections, caseStudyId, initialized, saveToSupabase]);
  
  // Add section handler with immediate Supabase persistence
  const addSection = useCallback(async (type: SectionWithOrder['type']) => {
    console.log('Adding section of type:', type);
    
    if (!caseStudyId) {
      toast.error('Cannot add section without a case study');
      return null;
    }
    
    // Create a new section with a guaranteed unique ID
    const newSection: SectionWithOrder = {
      id: uuidv4(),
      type,
      component: type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: '',
      sort_order: 0,
      published: true
    };
    
    // Update local state first for immediate feedback
    setSections(prev => {
      const updatedSections = [...prev, newSection];
      console.log('Local state updated with new section:', newSection.id);
      lastValidSectionsRef.current = updatedSections;
      return updatedSections;
    });
    
    // Auto open the new section
    setOpenSections(prev => ({
      ...prev,
      [newSection.id]: true
    }));
    
    // Immediately persist to Supabase
    if (caseStudyId) {
      try {
        const sectionResponse: SectionResponse = {
          id: newSection.id,
          case_study_id: caseStudyId,
          component: type,
          title: newSection.title,
          content: newSection.content || '',
          sort_order: sections.length, // Use current length as sort order
          published: newSection.published,
          image_url: '',
          metadata: {}
        };
        
        console.log('Immediately persisting new section to Supabase:', sectionResponse.id);
        
        // Force immediate save to Supabase
        await saveToSupabase([...mapSectionWithOrdersToSectionResponses(sections, caseStudyId), sectionResponse]);
        
        toast.success(`${type} section added`);
      } catch (err) {
        console.error('Error saving section to Supabase:', err);
        toast.error('Error saving section');
      }
    }
    
    return newSection;
  }, [caseStudyId, sections, setSections, setOpenSections, saveToSupabase]);
  
  // Remove section handler
  const removeSection = useCallback((id: string) => {
    console.log('Removing section:', id);
    
    setSections(prev => {
      const sectionToRemove = prev.find(section => section.id === id);
      if (!sectionToRemove) {
        console.warn(`Section with ID ${id} not found for removal`);
        return prev;
      }
      
      toast.success(`${sectionToRemove.title} section removed`);
      
      const updatedSections = prev.filter(section => section.id !== id);
      lastValidSectionsRef.current = updatedSections;
      return updatedSections;
    });
    
    // Remove from open sections
    setOpenSections(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, [setSections, setOpenSections]);
  
  // Toggle section published state
  const toggleSectionPublished = useCallback((id: string, published: boolean) => {
    console.log(`Toggling published state for section ${id} to ${published}`);
    
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === id) {
          return { ...section, published };
        }
        return section;
      });
      
      lastValidSectionsRef.current = updatedSections;
      toast.success(`Section ${published ? 'published' : 'unpublished'}`);
      
      return updatedSections;
    });
  }, [setSections]);
  
  // Add a refresh function that pulls the latest data from Supabase
  const refresh = useCallback(() => {
    console.log('Explicitly refreshing sections from database');
    isInitializedRef.current = false; // Reset initialization state
    refreshFromSupabase(); // Trigger a refresh from Supabase
  }, [refreshFromSupabase]);

  // Return stable function references to prevent infinite re-renders
  return {
    sections: sections as unknown as SectionResponse[], // Cast to satisfy TypeScript
    openSections,
    toggleSection,
    addSection,
    removeSection,
    toggleSectionPublished,
    refresh
  };
};
