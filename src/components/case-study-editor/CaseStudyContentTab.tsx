
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
  
  // Initialize section management with refactored hooks
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

  // Refresh sections when caseStudyId changes or component mounts
  useEffect(() => {
    if (caseStudyId) {
      console.log('CaseStudyContentTab: caseStudyId changed or component mounted, refreshing sections');
      refreshSections();
    }
  }, [caseStudyId, refreshSections]);

  // Also refresh when no sections are available
  useEffect(() => {
    if (caseStudyId && (!sections || sections.length === 0)) {
      console.log('CaseStudyContentTab: No sections loaded, refreshing from database');
      refreshSections();
    }
  }, [caseStudyId, sections, refreshSections]);

  // Listen for save events
  useEffect(() => {
    const handleSave = () => {
      if (caseStudyId) {
        console.log('CaseStudyContentTab: Case study saved event detected, refreshing sections');
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
