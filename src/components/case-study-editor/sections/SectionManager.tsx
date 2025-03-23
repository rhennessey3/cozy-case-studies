
import React from 'react';
import { Plus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';

interface SectionManagerProps {
  sections: SectionResponse[];
  onAddSection: (type: string) => void;
  onRemoveSection: (id: string) => void;
  onTogglePublished: (id: string, published: boolean) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onAddSection,
  onRemoveSection,
  onTogglePublished
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Sections</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={() => onAddSection('introduction')}
            className="flex gap-1 items-center"
          >
            <Plus className="h-4 w-4" />
            Introduction
          </Button>
          <Button 
            size="sm" 
            onClick={() => onAddSection('four-paragraphs')}
            className="flex gap-1 items-center"
          >
            <Plus className="h-4 w-4" />
            Paragraphs
          </Button>
          <Button 
            size="sm" 
            onClick={() => onAddSection('alignment')}
            className="flex gap-1 items-center"
          >
            <Plus className="h-4 w-4" />
            Alignment
          </Button>
          <Button 
            size="sm" 
            onClick={() => onAddSection('carousel')}
            className="flex gap-1 items-center"
          >
            <Plus className="h-4 w-4" />
            Carousel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionManager;
