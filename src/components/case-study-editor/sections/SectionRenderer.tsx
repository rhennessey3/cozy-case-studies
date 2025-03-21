
import React from 'react';
import { SectionWithOrder } from './types';
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';
import IntroductionSection from './IntroductionSection';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

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
  onPublishedChange?: (id: string, value: boolean) => void;
  onRemoveSection?: (id: string) => void;
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
  paragraphItems,
  onPublishedChange,
  onRemoveSection
}) => {
  // Debug output to help troubleshoot sections (only in development)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Rendering section ${section.id} of type ${section.type}`);
    }
  }, [section]);

  const SectionContent = () => {
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
            subhead={form.subhead || ''}
            alignment={form.alignment || 'left'}
            introductionParagraph={form.introductionParagraph || ''}
            alignmentImage={form.alignmentImage || ''}
            onChange={handleContentChange}
            onAlignmentChange={onAlignmentChange}
            onImageUpload={(url) => handleImageUploaded('alignmentImage', url)}
          />
        );
      case 'carousel':
        return (
          <CarouselSection
            isOpen={isOpen}
            onToggle={onToggle}
            carouselTitle={form.carouselTitle || ''}
            onChange={handleContentChange}
            onImageUpload={handleImageUploaded}
            items={carouselItems}
            onReorderItems={handleReorderCarouselItems}
          />
        );
      case 'fourParagraphs':
        return (
          <FourParagraphsSection
            isOpen={isOpen}
            onToggle={onToggle}
            sectionTitle={form.fourParaTitle || ''}
            sectionSubtitle={form.fourParaSubtitle || ''}
            paragraphs={paragraphItems}
            sectionImage={form.fourParaImage || ''}
            onChange={handleContentChange}
            onImageUpload={(url) => handleImageUploaded('fourParaImage', url)}
          />
        );
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  // Add a wrapper that includes the publish toggle and delete button
  return (
    <div className="relative">
      {/* Publication toggle and delete button */}
      <div className="absolute right-4 top-4 flex items-center space-x-3 z-10">
        {/* Delete button */}
        {onRemoveSection && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onRemoveSection(section.id)}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        
        {/* Publication toggle */}
        {onPublishedChange && (
          <div className="flex items-center space-x-2">
            <Switch 
              id={`publish-${section.id}`}
              checked={section.published !== false}
              onCheckedChange={(checked) => onPublishedChange(section.id, checked)}
              className="data-[state=checked]:bg-green-500"
            />
            <Label htmlFor={`publish-${section.id}`} className="text-sm font-medium">
              {section.published !== false ? "Published" : "Draft"}
            </Label>
          </div>
        )}
      </div>
      
      {/* Render the actual section content */}
      <SectionContent />
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(SectionRenderer);
