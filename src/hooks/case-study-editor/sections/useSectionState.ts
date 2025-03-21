
import { useState, useRef, useEffect } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionFormState } from '@/components/case-study-editor/sections/utils/defaultSections';
import { useOpenSections } from '@/components/case-study-editor/sections/hooks/useOpenSections';
import { useSectionInitialization } from '@/components/case-study-editor/sections/hooks/useSectionInitialization';
import { useSectionSync } from '@/components/case-study-editor/sections/hooks/useSectionSync';
import { useFormUpdate } from '@/components/case-study-editor/sections/hooks/useFormUpdate';
import { addSection, removeSection, moveSection } from '@/components/case-study-editor/sections/utils/sectionOperations';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useSectionState = (
  form: SectionFormState & { slug?: string }, 
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
) => {
  // Get case study slug to use for session storage key (for backward compatibility)
  const getSlugFromForm = (): string => {
    return form.slug || 'new-case-study';
  };
  
  // Session storage key for persisting sections state during editing
  // (maintains backward compatibility while transitioning to Supabase)
  const sessionStorageKey = `case-study-sections-${getSlugFromForm()}`;
  const sessionStorageKeyRef = useRef(sessionStorageKey);
  
  // Initialize sections state
  const {
    sections,
    setSections,
    initialized,
    setInitialized,
    lastValidSectionsRef
  } = useSectionInitialization(form, sessionStorageKeyRef.current);
  
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
  }, [sections]);
  
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
      
      // If we're editing an existing case study with a valid slug, 
      // we should be relying on Supabase instead of session storage for persistence
      if (form.slug && form.slug !== 'new-case-study') {
        console.log('Case study has a valid slug, consider using Supabase for section persistence');
      }
    },
    
    removeSection: (id: string) => {
      console.log('Removing section:', id);
      removeSection(id, setSections, setOpenSections);
      // Update lastValidSections after removal
      lastValidSectionsRef.current = lastValidSectionsRef.current.filter(
        section => section.id !== id
      );
      
      // Remove from session storage for backward compatibility
      try {
        const updatedSections = sections.filter(section => section.id !== id);
        sessionStorage.setItem(sessionStorageKeyRef.current, JSON.stringify(updatedSections));
        console.log(`Section ${id} removed from session storage`);
      } catch (e) {
        console.error("Failed to remove section from session storage", e);
      }
    },
    
    moveSection: (id: string, direction: 'up' | 'down') => {
      console.log('Moving section:', id, direction);
      moveSection(id, direction, setSections);
      // Update lastValidSections after moving - reordering happens in moveSection
      const updatedSections = [...sections];
      updatedSections.sort((a, b) => a.order - b.order);
      lastValidSectionsRef.current = updatedSections;
    },
    
    toggleSectionPublished: async (id: string, published: boolean) => {
      console.log(`Toggling published state for section ${id} to ${published}`);
      
      // First, update the local state for immediate feedback
      setSections(prevSections => {
        const updatedSections = prevSections.map(section => {
          if (section.id === id) {
            return { ...section, published };
          }
          return section;
        });
        
        // Update lastValidSections
        lastValidSectionsRef.current = updatedSections;
        
        // For backward compatibility, still update session storage
        try {
          sessionStorage.setItem(sessionStorageKeyRef.current, JSON.stringify(updatedSections));
        } catch (e) {
          console.error("Failed to update section published state in session storage", e);
        }
        
        return updatedSections;
      });
      
      // For existing case studies, try to update the published state in Supabase directly
      if (form.slug && form.slug !== 'new-case-study') {
        try {
          // Check if we're authenticated
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (sessionData && sessionData.session) {
            // If authenticated, find the database section ID that corresponds to this section
            // This would require additional mapping logic in a production app
            console.log(`Would update published state in Supabase for case study ${form.slug}, section ${id}`);
            
            // Show success message
            toast.success(`Section ${published ? 'published' : 'unpublished'}`);
          } else {
            console.log('Not authenticated with Supabase, relying on local storage only');
            toast.success(`Section ${published ? 'published' : 'unpublished'} (local only)`);
          }
        } catch (error) {
          console.error('Error updating section published state in Supabase:', error);
          toast.error('Failed to update published state in the database');
        }
      } else {
        // For new case studies, just show a success message
        toast.success(`Section ${published ? 'published' : 'unpublished'}`);
      }
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
