
import React, { useEffect } from 'react';
import AlignmentSection from '@/components/case-study-editor/sections/AlignmentSection';
import CarouselSection from '@/components/case-study-editor/sections/CarouselSection';
import FourParagraphsSection from '@/components/case-study-editor/sections/FourParagraphsSection';
import SectionManager from '@/components/case-study-editor/sections/SectionManager';
import { useSectionState } from './sections/useSectionState';
import { useCarouselItems } from './sections/useCarouselItems';
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

const CaseStudyContentTab: React.FC<CaseStudyContentTabProps> = ({ 
  form, 
  handleContentChange,
  handleImageUploaded = () => {} 
}) => {
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

  // Debug output to help troubleshoot missing sections
  useEffect(() => {
    console.log('Current sections:', sections);
    console.log('Open sections:', openSections);
  }, [sections, openSections]);

  // Sort sections by order for display
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <SectionManager 
        sections={sortedSections}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onMoveSection={moveSection}
      />
      
      {sortedSections.map(section => {
        const isOpen = openSections[section.id] || false;
        
        if (section.type === 'alignment') {
          return (
            <AlignmentSection
              key={section.id}
              isOpen={isOpen}
              onToggle={() => toggleSection(section.id)}
              subhead={form.subhead || ''}
              alignment={form.alignment || 'left'}
              introductionParagraph={form.introductionParagraph || ''}
              alignmentImage={form.alignmentImage}
              onChange={handleContentChange}
              onAlignmentChange={handleAlignmentChange}
              onImageUpload={(url) => handleImageUploaded('alignmentImage', url)}
            />
          );
        }
        
        if (section.type === 'carousel') {
          return (
            <CarouselSection
              key={section.id}
              isOpen={isOpen}
              onToggle={() => toggleSection(section.id)}
              carouselTitle={form.carouselTitle || '3 Column Slider'}
              items={carouselItems}
              onChange={handleContentChange}
              onImageUpload={handleImageUploaded}
              onReorderItems={handleReorderCarouselItems}
            />
          );
        }
        
        if (section.type === 'fourParagraphs') {
          return (
            <FourParagraphsSection
              key={section.id}
              isOpen={isOpen}
              onToggle={() => toggleSection(section.id)}
              sectionTitle={form.fourParaTitle || '4 Small Paragraphs'}
              sectionSubtitle={form.fourParaSubtitle || 'With Photo'}
              paragraphs={paragraphItems}
              sectionImage={form.fourParaImage}
              onChange={handleContentChange}
              onImageUpload={(url) => handleImageUploaded('fourParaImage', url)}
            />
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default CaseStudyContentTab;
