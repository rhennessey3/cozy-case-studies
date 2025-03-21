
import React, { useMemo } from 'react';
import SectionManager from '@/components/case-study-editor/sections/SectionManager';
import SectionList from '@/components/case-study-editor/sections/SectionList';
import { useSectionState } from './sections/useSectionState';
import { useCarouselItems } from '@/hooks/case-study-editor/sections/useCarouselItems';
import { useParagraphItems } from './sections/useParagraphItems';

interface CaseStudyContentTabProps {
  form: {
    intro: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string;
    conclusion: string;
    alignment?: string;
    subhead?: string;
    introductionParagraph?: string;
    alignmentImage?: string;
    carouselTitle?: string;
    carouselItem1Title?: string;
    carouselItem1Content?: string;
    carouselItem1Image?: string;
    carouselItem2Title?: string;
    carouselItem2Content?: string;
    carouselItem2Image?: string;
    carouselItem3Title?: string;
    carouselItem3Content?: string;
    carouselItem3Image?: string;
    fourParaTitle?: string;
    fourParaSubtitle?: string;
    fourPara1Title?: string;
    fourPara1Content?: string;
    fourPara2Title?: string;
    fourPara2Content?: string;
    fourPara3Title?: string;
    fourPara3Content?: string;
    fourPara4Title?: string;
    fourPara4Content?: string;
    fourParaImage?: string;
    customSections?: string;
  };
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded?: (field: string, url: string) => void;
}

const CaseStudyContentTab: React.FC<CaseStudyContentTabProps> = React.memo(({ 
  form, 
  handleContentChange,
  handleImageUploaded = () => {} 
}) => {
  // Generate a unique form key based on form content to help with re-rendering
  // Use only customSections for the key to avoid unnecessary re-renders
  const formKey = useMemo(() => {
    try {
      if (form.customSections) {
        // Extract sections IDs to create a stable key
        const sections = JSON.parse(form.customSections || '[]');
        return `sections-${sections.map((s: any) => s.id).join('-')}`;
      }
    } catch (e) {
      console.error("Error parsing customSections for key", e);
    }
    // Fallback to timestamp if parsing fails
    return `form-${Date.now()}`;
  }, [form.customSections]);
  
  const { 
    sections, 
    openSections, 
    toggleSection, 
    addSection, 
    removeSection,
    moveSection
  } = useSectionState(form, handleContentChange);
  
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

  return (
    <div className="space-y-8">
      <SectionManager 
        sections={sections}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onMoveSection={moveSection}
      />
      
      <SectionList 
        key={formKey}
        sections={sections}
        openSections={openSections}
        toggleSection={toggleSection}
        form={form}
        handleContentChange={handleContentChange}
        handleImageUploaded={handleImageUploaded}
        handleAlignmentChange={handleAlignmentChange}
        handleReorderCarouselItems={handleReorderCarouselItems}
        carouselItems={carouselItems}
        paragraphItems={paragraphItems}
      />
    </div>
  );
});

// Add display name for debugging
CaseStudyContentTab.displayName = 'CaseStudyContentTab';

export default CaseStudyContentTab;
