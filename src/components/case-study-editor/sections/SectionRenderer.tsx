
import React from 'react';
import { SectionWithOrder } from './types';
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';
import SectionContainer from './SectionContainer';

interface SectionRendererProps {
  section: SectionWithOrder;
  isOpen: boolean;
  onToggle: () => void;
  form: any;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  onAlignmentChange: (value: string) => void;
  handleReorderCarouselItems: (fromIndex: number, toIndex: number) => void;
  carouselItems: any[];
  paragraphItems: any[];
}

/**
 * Component that renders the appropriate section based on type
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
  paragraphItems
}) => {
  if (section.type === 'alignment') {
    return (
      <SectionContainer section={section} isOpen={isOpen} onToggle={onToggle}>
        <AlignmentSection
          isOpen={isOpen}
          onToggle={onToggle}
          subhead={form.subhead || ''}
          alignment={form.alignment || 'left'}
          introductionParagraph={form.introductionParagraph || ''}
          alignmentImage={form.alignmentImage}
          onChange={handleContentChange}
          onAlignmentChange={onAlignmentChange}
          onImageUpload={(url) => handleImageUploaded('alignmentImage', url)}
        />
      </SectionContainer>
    );
  }
  
  if (section.type === 'carousel') {
    return (
      <SectionContainer section={section} isOpen={isOpen} onToggle={onToggle}>
        <CarouselSection
          isOpen={isOpen}
          onToggle={onToggle}
          carouselTitle={form.carouselTitle || '3 Column Slider'}
          items={carouselItems}
          onChange={handleContentChange}
          onImageUpload={handleImageUploaded}
          onReorderItems={handleReorderCarouselItems}
        />
      </SectionContainer>
    );
  }
  
  if (section.type === 'fourParagraphs') {
    return (
      <SectionContainer section={section} isOpen={isOpen} onToggle={onToggle}>
        <FourParagraphsSection
          isOpen={isOpen}
          onToggle={onToggle}
          sectionTitle={form.fourParaTitle || '4 Small Paragraphs'}
          sectionSubtitle={form.fourParaSubtitle || 'With Photo'}
          paragraphs={paragraphItems}
          sectionImage={form.fourParaImage}
          onChange={handleContentChange}
          onImageUpload={(url) => handleImageUploaded('fourParaImage', url)}
        />
      </SectionContainer>
    );
  }
  
  return null;
};

export default SectionRenderer;
