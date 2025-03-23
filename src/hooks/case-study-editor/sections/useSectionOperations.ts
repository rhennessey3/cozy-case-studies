
import { useAddSection } from './operations/useAddSection';
import { useTogglePublished } from './operations/useTogglePublished';
import { useRemoveSection } from './operations/useRemoveSection';
import { useMoveSection } from './operations/useMoveSection';
import { SectionResponse } from './types/sectionTypes';
import { useSectionOperations as useRefactoredSectionOperations } from './hooks/useSectionOperations';

/**
 * Hook that provides CRUD operations for sections
 * @param caseStudyId The ID of the case study
 * @param sections The current sections
 * @param setSections Function to update sections
 * @param setOpenSections Function to update open sections state
 * @returns Object containing section operation functions
 * 
 * @deprecated Use ./hooks/useSectionOperations.ts instead
 */
export const useSectionOperations = (
  caseStudyId: string | null, 
  sections: SectionResponse[], 
  setSections: React.Dispatch<React.SetStateAction<SectionResponse[]>>,
  setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  // Instead of calling individual hooks, just use the refactored hook
  const operations = useRefactoredSectionOperations(
    caseStudyId,
    setSections,
    setOpenSections,
    async () => { /* This is a stub - the actual saving is handled in useSectionState */ }
  );
  
  // This function is maintained for backwards compatibility but is now a no-op
  const moveSection = useMoveSection();
  
  return {
    ...operations,
    moveSection
  };
};
