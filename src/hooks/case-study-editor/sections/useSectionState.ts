
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
import { useSectionStorage } from '@/hooks/case-study-editor/sections/useSectionStorage';

export const useSectionState = (
  form: SectionFormState & { slug?: string }, 
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
) => {
  // Get case study ID from form slug (if available)
  const caseStudyId = useRef<string | null>(null);
  
  // Use session storage key for UI state only (not for section data)
  const sessionStorageKey = `case-study-ui-state-${form.slug || 'new-case-study'}`;
  const sessionStorageKeyRef = useRef(sessionStorageKey);
  
  // Supabase integration for section data persistence
  const { 
    sections: storageStateSections, 
    setSections: saveToStorage,
    isLoading: storageLoading 
  } = useSectionStorage(caseStudyId.current);
  
  // Manage open/closed state for sections (UI state only)
  const {
    openSections,
    setOpenSections,
    toggleSection,
    cleanupOrphanedSections
  } = useOpenSections(sessionStorageKeyRef.current);
  
  // Initialize sections state (now considers Supabase data)
  const {
    sections,
    setSections,
    initialized,
    setInitialized,
    lastValidSectionsRef
  } = useSectionInitialization(form, sessionStorageKeyRef.current, storageStateSections, storageLoading);
  
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
  
  // Effect to update caseStudyId ref when form.slug changes
  useEffect(() => {
    // Only attempt to get caseStudyId if we have a valid slug (not new or empty)
    if (form.slug && form.slug !== 'new-case-study' && form.slug !== 'new') {
      const fetchCaseStudyId = async () => {
        try {
          const { data, error } = await supabase
            .from('case_studies')
            .select('id')
            .eq('slug', form.slug)
            .maybeSingle();
            
          if (error) {
            console.error('Error fetching case study ID:', error);
            return;
          }
          
          if (data) {
            console.log(`Found case study ID for slug ${form.slug}:`, data.id);
            caseStudyId.current = data.id;
          }
        } catch (e) {
          console.error('Failed to fetch case study ID:', e);
        }
      };
      
      fetchCaseStudyId();
    }
  }, [form.slug]);
  
  // Add debugging to track section changes
  useEffect(() => {
    console.log('useSectionState: Sections updated', sections);
    
    // Save to Supabase if we have sections and a case study ID
    if (sections.length > 0 && caseStudyId.current && initialized) {
      saveToStorage(sections);
    }
  }, [sections, initialized, saveToStorage]);
  
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
      
      // If we have a valid case study ID, log that we're adding to Supabase
      if (caseStudyId.current) {
        console.log(`Adding section for case study ID: ${caseStudyId.current}`);
      }
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
        return updatedSections;
      });
      
      // For existing case studies, try to update the published state in Supabase directly
      if (caseStudyId.current) {
        try {
          // First find the corresponding database section
          const { data: sectionData, error: sectionError } = await supabase
            .from('case_study_sections')
            .select('id')
            .eq('case_study_id', caseStudyId.current)
            .eq('component', sections.find(s => s.id === id)?.type || '')
            .maybeSingle();
            
          if (sectionError) {
            console.error('Error finding section in database:', sectionError);
            toast.error('Could not find section in database');
            return;
          }
          
          if (sectionData) {
            // Update the published state in Supabase
            const { error: updateError } = await supabase
              .from('case_study_sections')
              .update({ published })
              .eq('id', sectionData.id);
              
            if (updateError) {
              console.error('Error updating section published state:', updateError);
              toast.error('Failed to update section published state in database');
              return;
            }
            
            console.log(`Updated published state for section ${id} to ${published} in database`);
            toast.success(`Section ${published ? 'published' : 'unpublished'}`);
          } else {
            console.log(`No existing section found in database for ${id}, skipping update`);
            toast.success(`Section ${published ? 'published' : 'unpublished'} (will be saved with case study)`);
          }
        } catch (error) {
          console.error('Error updating section published state:', error);
          toast.error('Failed to update published state');
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
