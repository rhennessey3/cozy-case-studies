
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
  
  // Initialize section management with Supabase integration
  const { 
    sections, 
    openSections, 
    toggleSection, 
    addSection, 
    removeSection,
    toggleSectionPublished,
    refresh: refreshSections
  } = useSectionState(caseStudyId);
  
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
  useEffect(() => {
    console.log('CaseStudyContentTab rendering with form:', form);
    console.log('Sections:', sections);
    console.log('Case Study ID:', caseStudyId);
    
    if (caseStudyId && sections.length === 0) {
      console.log('No sections loaded, refreshing from database');
      refreshSections();
    }
  }, [form, sections, caseStudyId, refreshSections]);

  // Refresh sections after Save is clicked
  useEffect(() => {
    const handleSave = () => {
      if (caseStudyId) {
        console.log('Save button clicked, refreshing sections');
        setTimeout(() => {
          refreshSections();
        }, 500); // Small delay to allow database to update
      }
    };
    
    window.addEventListener('case-study-saved', handleSave);
    
    return () => {
      window.removeEventListener('case-study-saved', handleSave);
    };
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

// Add display name for debugging
CaseStudyContentTab.displayName = 'CaseStudyContentTab';

export default CaseStudyContentTab;
