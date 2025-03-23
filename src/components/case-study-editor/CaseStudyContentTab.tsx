
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
    console.log('Alignment changed to:', value);
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
      // Add a small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        refreshSections();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [caseStudyId, refreshSections]);

  // Listen for save events
  useEffect(() => {
    const handleSave = (event: Event) => {
      const customEvent = event as CustomEvent;
      
      if (caseStudyId) {
        console.log('CaseStudyContentTab: Case study saved event detected, refreshing sections');
        console.log('Event details:', customEvent.detail);
        
        // Add a small delay to ensure database operations are complete
        setTimeout(() => refreshSections(), 300);
      }
    };
    
    window.addEventListener('case-study-saved', handleSave);
    return () => window.removeEventListener('case-study-saved', handleSave);
  }, [caseStudyId, refreshSections]);

  console.log('CaseStudyContentTab rendering with sections:', sections?.length || 0);

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
