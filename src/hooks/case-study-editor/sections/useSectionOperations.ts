
import { useAddSection } from './operations/useAddSection';
import { useTogglePublished } from './operations/useTogglePublished';
import { useRemoveSection } from './operations/useRemoveSection';
import { useMoveSection } from './operations/useMoveSection';
import { SectionResponse } from './types/sectionTypes';

/**
 * Hook that provides all CRUD operations for sections
 */
export const useSectionOperations = (
  caseStudyId: string | null, 
  sections: SectionResponse[], 
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const addSection = useAddSection(caseStudyId, sections, setSections, setOpenSections);
  const togglePublished = useTogglePublished(setSections);
  const removeSection = useRemoveSection(setSections, setOpenSections);
  const moveSection = useMoveSection();
  
  return {
    addSection,
    togglePublished,
    removeSection,
    moveSection
  };
};
