
import { useRef, useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { addSection, removeSection } from '@/components/case-study-editor/sections/utils/sectionOperations';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to manage section operation handlers
 */
export const useSectionHandlers = (
  sections: SectionWithOrder[],
  setSections: React.Dispatch<React.SetStateAction<SectionWithOrder[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  lastValidSectionsRef: React.MutableRefObject<SectionWithOrder[]>,
  caseStudyId: string | null
) => {
  // Use refs for handler functions to ensure they don't change between renders
  const handlersRef = useRef({
    addSection: async (type: SectionWithOrder['type']) => {
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
      
      // Track the new section in our valid sections reference
      lastValidSectionsRef.current = [...sections, newSection];
      console.log('Updated lastValidSectionsRef:', lastValidSectionsRef.current);
      
      // Persist to database immediately to ensure consistency
      try {
        console.log(`Persisting section to database:`, newSection);
        const { error } = await supabase
          .from('case_study_sections')
          .insert({
            id: newSection.id,
            case_study_id: caseStudyId,
            component: type,
            title: newSection.title,
            sort_order: sections.length, // Use current length for proper ordering
            published: newSection.published,
            content: newSection.content || '',
            metadata: newSection.metadata
          });
          
        if (error) {
          console.error('Error saving section to database:', error);
          toast.error('Error saving section to database');
        } else {
          console.log('Section saved successfully to database');
        }
      } catch (err) {
        console.error('Exception saving section to database:', err);
      }
      
      return newSection;
    },
    
    removeSection: (id: string) => {
      console.log('Removing section:', id);
      
      // Remove from database first
      if (caseStudyId) {
        supabase
          .from('case_study_sections')
          .delete()
          .eq('id', id)
          .then(({ error }) => {
            if (error) {
              console.error('Error removing section from database:', error);
              toast.error('Error removing section from database');
            } else {
              console.log('Section removed from database successfully');
            }
          });
      }
      
      // Then update UI state
      removeSection(id, setSections, setOpenSections);
      
      // Update lastValidSections after removal
      lastValidSectionsRef.current = lastValidSectionsRef.current.filter(
        section => section.id !== id
      );
      console.log('After removal, lastValidSectionsRef:', lastValidSectionsRef.current);
    },
    
    toggleSectionPublished: (id: string, published: boolean) => {
      console.log(`Toggling published state for section ${id} to ${published}`);
      
      // Update UI state
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
        
        // Update database
        if (caseStudyId) {
          supabase
            .from('case_study_sections')
            .update({ published })
            .eq('id', id)
            .then(({ error }) => {
              if (error) {
                console.error('Error updating section published state in database:', error);
                toast.error('Error updating section published state');
              }
            });
        }
        
        // Show toast notification
        toast.success(`Section ${published ? 'published' : 'unpublished'}`);
        
        return updatedSections;
      });
    }
  });

  // Memoized handlers that don't change on re-renders
  const addSectionHandler = useCallback(async (type: SectionWithOrder['type']) => {
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

  return {
    addSection: addSectionHandler,
    removeSection: removeSectionHandler,
    toggleSectionPublished: toggleSectionPublishedHandler
  };
};
