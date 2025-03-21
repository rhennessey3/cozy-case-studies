
import React from 'react';
import EditorSectionManager from '@/components/case-study-editor/sections/EditorSectionManager';
import { useSectionState } from '@/hooks/case-study-editor/sections/useSectionState';
import { useCarouselItems } from '@/hooks/case-study-editor/sections/useCarouselItems';
import { useParagraphItems } from './sections/useParagraphItems';
import { useFormKey } from '@/hooks/case-study-editor/sections/useFormKey';
import { CaseStudyForm } from '@/types/caseStudy';

interface CaseStudyContentTabProps {
  form: Partial<CaseStudyForm>;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded?: (field: string, url: string) => void;
  caseStudyId?: string | null; // Add this prop to accept caseStudyId
}

const CaseStudyContentTab: React.FC<CaseStudyContentTabProps> = React.memo(({ 
  form, 
  handleContentChange,
  handleImageUploaded = () => {},
  caseStudyId // Include the new prop
}) => {
  // Generate form key for stable rendering
  const formKey = useFormKey(form);
  
  // Initialize section management
  const { 
    sections, 
    openSections, 
    toggleSection, 
    addSection, 
    removeSection,
    moveSection,
    toggleSectionPublished
  } = useSectionState(form, handleContentChange, caseStudyId); // Pass caseStudyId here
  
  // Initialize carousel and paragraph items
  const { carouselItems, handleReorderCarouselItems } = useCarouselItems(
    form, 
    handleContentChange, 
    handleImageUploaded
  );
  
  const { paragraphItems } = useParagraphItems(form);

  const handleAlignmentChange = (value: string) => {
    const event = {
      target: {
        name: 'alignment',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleContentChange(event);
  };

  // Add debug logging to help diagnose issues
  React.useEffect(() => {
    console.log('CaseStudyContentTab rendering with form:', form);
    console.log('Sections:', sections);
    console.log('Case Study ID:', caseStudyId);
  }, [form, sections, caseStudyId]);

  return (
    <EditorSectionManager 
      sections={sections}
      openSections={openSections}
      toggleSection={toggleSection}
      addSection={addSection}
      removeSection={removeSection}
      moveSection={moveSection}
      toggleSectionPublished={toggleSectionPublished}
      formKey={formKey}
      form={form}
      handleContentChange={handleContentChange}
      handleImageUploaded={handleImageUploaded}
      handleAlignmentChange={handleAlignmentChange}
      handleReorderCarouselItems={handleReorderCarouselItems}
      carouselItems={carouselItems}
      paragraphItems={paragraphItems}
    />
  );
});

// Add display name for debugging
CaseStudyContentTab.displayName = 'CaseStudyContentTab';

export default CaseStudyContentTab;
