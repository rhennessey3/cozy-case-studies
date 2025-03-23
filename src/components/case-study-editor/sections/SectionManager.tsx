
import React from 'react';
import { Button } from '@/components/ui/button';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';
import { SectionWithOrder } from './types';
import { Plus } from 'lucide-react';

interface SectionManagerProps {
  sections: SectionResponse[];
  onAddSection: (type: SectionWithOrder['type']) => void;
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
  const handleAddSection = (type: SectionWithOrder['type']) => {
    console.log(`Adding section of type: ${type}`);
    onAddSection(type);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Content Sections</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Button
          variant="secondary"
          onClick={() => handleAddSection('introduction')}
          className="w-full text-xs flex items-center justify-center gap-1"
        >
          <Plus className="h-3 w-3" /> Introduction
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleAddSection('alignment')}
          className="w-full text-xs flex items-center justify-center gap-1"
        >
          <Plus className="h-3 w-3" /> Alignment
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleAddSection('carousel')}
          className="w-full text-xs flex items-center justify-center gap-1"
        >
          <Plus className="h-3 w-3" /> Carousel
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleAddSection('fourParagraphs')}
          className="w-full text-xs flex items-center justify-center gap-1"
        >
          <Plus className="h-3 w-3" /> 4 Paragraphs
        </Button>
      </div>
    </div>
  );
};

export default SectionManager;
