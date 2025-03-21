
import React from 'react';
import { Button } from '@/components/ui/button';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';

interface SectionManagerProps {
  sections: SectionResponse[];
  onAddSection: (type: string) => void;
  onRemoveSection: (id: string) => void;
  onTogglePublished: (id: string, published: boolean) => void;
}

/**
 * Component for managing adding new sections
 */
const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onAddSection,
  onRemoveSection,
  onTogglePublished
}) => {
  const handleAddIntroduction = () => {
    onAddSection('introduction');
  };

  const handleAddAlignment = () => {
    onAddSection('alignment');
  };

  const handleAddCarousel = () => {
    onAddSection('carousel');
  };

  const handleAddFourParagraphs = () => {
    onAddSection('fourParagraphs');
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Content Sections</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Button
          variant="secondary"
          onClick={handleAddIntroduction}
          className="w-full text-xs"
        >
          Add Introduction
        </Button>
        <Button
          variant="secondary"
          onClick={handleAddAlignment}
          className="w-full text-xs"
        >
          Add Alignment
        </Button>
        <Button
          variant="secondary"
          onClick={handleAddCarousel}
          className="w-full text-xs"
        >
          Add Carousel
        </Button>
        <Button
          variant="secondary"
          onClick={handleAddFourParagraphs}
          className="w-full text-xs"
        >
          Add 4 Paragraphs
        </Button>
      </div>
    </div>
  );
};

export default SectionManager;
