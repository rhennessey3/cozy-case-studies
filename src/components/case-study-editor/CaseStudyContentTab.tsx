
import React, { useEffect } from 'react';
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
  caseStudyId?: string | null;
}

const CaseStudyContentTab: React.FC<CaseStudyContentTabProps> = React.memo(({ 
  form, 
  handleContentChange,
  handleImageUploaded = () => {},
  caseStudyId
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
    toggleSectionPublished,
    refresh: refreshSections
  } = useSectionState(caseStudyId);
  
  // Initialize items for specific section types
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

  // Refresh sections when needed
  useEffect(() => {
    if (caseStudyId && sections.length === 0) {
      console.log('No sections loaded, refreshing from database');
      refreshSections();
    }
  }, [caseStudyId, sections.length, refreshSections]);

  // Listen for save events
  useEffect(() => {
    const handleSave = () => {
      if (caseStudyId) {
        setTimeout(() => refreshSections(), 500);
      }
    };
    
    window.addEventListener('case-study-saved', handleSave);
    return () => window.removeEventListener('case-study-saved', handleSave);
  }, [caseStudyId, refreshSections]);

  return (
    <EditorSectionManager 
      sections={sections}
      openSections={openSections}
      toggleSection={toggleSection}
      addSection={addSection}
      removeSection={removeSection}
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

CaseStudyContentTab.displayName = 'CaseStudyContentTab';

export default CaseStudyContentTab;
