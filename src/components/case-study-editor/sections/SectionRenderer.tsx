
import React from 'react';
import SectionContainer from './SectionContainer';
import IntroductionSection from './IntroductionSection';
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';

interface SectionRendererProps {
  section: SectionResponse;
  isOpen: boolean;
  onToggle: () => void;
  form: any; // Using any since the form structure varies
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  onAlignmentChange: (value: string) => void;
  handleReorderCarouselItems: (fromIndex: number, toIndex: number) => void;
  carouselItems: any[];
  paragraphItems: any[];
  onPublishedChange?: (id: string, value: boolean) => void; 
  onRemoveSection?: (id: string) => void;
}

/**
 * Renders a specific section type
 */
const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  isOpen,
  onToggle,
  form,
  handleContentChange,
  handleImageUploaded,
  onAlignmentChange,
  handleReorderCarouselItems,
  carouselItems,
  paragraphItems,
  onPublishedChange,
  onRemoveSection
}) => {
  const getSectionContent = () => {
    switch (section.component) {
      case 'introduction':
        return (
          <IntroductionSection 
            formData={form}
            onContentChange={handleContentChange}
          />
        );
      case 'alignment':
        return (
          <AlignmentSection 
            formData={form}
            onContentChange={handleContentChange}
            onImageUpload={handleImageUploaded}
            onAlignmentChange={onAlignmentChange}
          />
        );
      case 'carousel':
        return (
          <CarouselSection 
            formData={form}
            onContentChange={handleContentChange}
            onImageUpload={handleImageUploaded}
            onReorderItems={handleReorderCarouselItems}
            carouselItems={carouselItems}
          />
        );
      case 'fourParagraphs':
        return (
          <FourParagraphsSection 
            formData={form}
            onContentChange={handleContentChange}
            onImageUpload={handleImageUploaded}
            paragraphItems={paragraphItems}
          />
        );
      default:
        return <div>Unknown section type: {section.component}</div>;
    }
  };

  return (
    <SectionContainer
      section={section}
      isOpen={isOpen}
      onToggle={onToggle}
      onPublishedChange={onPublishedChange}
      onRemoveSection={onRemoveSection}
    >
      {isOpen && getSectionContent()}
    </SectionContainer>
  );
};

export default React.memo(SectionRenderer);
