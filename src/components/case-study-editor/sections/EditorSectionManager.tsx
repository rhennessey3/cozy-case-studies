
import React from 'react';
import SectionManager from '@/components/case-study-editor/sections/SectionManager';
import SectionList from '@/components/case-study-editor/sections/SectionList';
import { SectionWithOrder } from './types';
import { CaseStudyForm } from '@/types/caseStudy';

interface Editor {
  sections: SectionWithOrder[];
  openSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  addSection: (type: SectionWithOrder['type']) => void;
  removeSection: (id: string) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  toggleSectionPublished?: (id: string, published: boolean) => void;
  formKey: string;
  form: Partial<CaseStudyForm>;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  handleAlignmentChange: (value: string) => void;
  handleReorderCarouselItems: (fromIndex: number, toIndex: number) => void;
  carouselItems: any[];
  paragraphItems: any[];
}

const EditorSectionManager: React.FC<Editor> = ({
  sections,
  openSections,
  toggleSection,
  addSection,
  removeSection,
  moveSection,
  toggleSectionPublished,
  formKey,
  form,
  handleContentChange,
  handleImageUploaded,
  handleAlignmentChange,
  handleReorderCarouselItems,
  carouselItems,
  paragraphItems
}) => {
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
        onPublishedChange={toggleSectionPublished}
      />
    </div>
  );
};

export default EditorSectionManager;
