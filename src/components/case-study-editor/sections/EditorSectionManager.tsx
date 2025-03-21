
import React from 'react';
import SectionManager from './SectionManager';
import SectionList from './SectionList';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';

interface EditorSectionManagerProps {
  sections: SectionResponse[];
  openSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  addSection: (type: string) => void;
  removeSection: (id: string) => void;
  toggleSectionPublished: (id: string, published: boolean) => void;
  formKey: string;
  form: any;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  handleAlignmentChange: (value: string) => void;
  handleReorderCarouselItems: (fromIndex: number, toIndex: number) => void;
  carouselItems: any[];
  paragraphItems: any[];
}

/**
 * Component that renders the section manager and section list
 */
const EditorSectionManager: React.FC<EditorSectionManagerProps> = ({
  sections,
  openSections,
  toggleSection,
  addSection,
  removeSection,
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
    <div className="space-y-6">
      <SectionManager 
        sections={sections}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onTogglePublished={toggleSectionPublished}
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
        onRemoveSection={removeSection}
      />
    </div>
  );
};

export default EditorSectionManager;
