
import { useRef, useCallback } from 'react';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { addSection, removeSection } from '@/components/case-study-editor/sections/utils/sectionOperations';
import { toast } from 'sonner';

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

  return {
    addSection: addSectionHandler,
    removeSection: removeSectionHandler,
    toggleSectionPublished: toggleSectionPublishedHandler
  };
};
