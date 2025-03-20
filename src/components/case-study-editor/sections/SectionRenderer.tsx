
import React from 'react';
import { SectionWithOrder } from './types';
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';
import IntroductionSection from './IntroductionSection';

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
 * Component that renders a specific section based on its type
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
  // Debug output to help troubleshoot sections
  React.useEffect(() => {
    console.log(`Rendering section ${section.id} of type ${section.type}`);
  }, [section]);

  switch (section.type) {
    case 'introduction':
      return (
        <IntroductionSection
          isOpen={isOpen}
          onToggle={onToggle}
          introValue={form.intro || ''}
          challengeValue={form.challenge || ''}
          approachValue={form.approach || ''}
          onChange={handleContentChange}
        />
      );
    case 'alignment':
      return (
        <AlignmentSection
          isOpen={isOpen}
          onToggle={onToggle}
          alignment={form.alignment || 'left'}
          subheadValue={form.subhead || ''}
          paragraphValue={form.introductionParagraph || ''}
          imageUrl={form.alignmentImage || ''}
          onSubheadChange={handleContentChange}
          onParagraphChange={handleContentChange}
          onAlignmentChange={onAlignmentChange}
          onImageUploaded={(url) => handleImageUploaded('alignmentImage', url)}
        />
      );
    case 'carousel':
      return (
        <CarouselSection
          isOpen={isOpen}
          onToggle={onToggle}
          titleValue={form.carouselTitle || ''}
          onChange={handleContentChange}
          onImageUploaded={handleImageUploaded}
          items={carouselItems}
          onReorderItems={handleReorderCarouselItems}
        />
      );
    case 'fourParagraphs':
      return (
        <FourParagraphsSection
          isOpen={isOpen}
          onToggle={onToggle}
          titleValue={form.fourParaTitle || ''}
          subtitleValue={form.fourParaSubtitle || ''}
          paragraphs={paragraphItems}
          imageUrl={form.fourParaImage || ''}
          onChange={handleContentChange}
          onImageUploaded={(url) => handleImageUploaded('fourParaImage', url)}
        />
      );
    default:
      return <div>Unknown section type: {section.type}</div>;
  }
};

export default SectionRenderer;
