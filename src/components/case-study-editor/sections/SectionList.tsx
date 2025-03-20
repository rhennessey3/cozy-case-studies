
import React, { useEffect } from 'react';
import { SectionWithOrder } from './types';
import SectionRenderer from './SectionRenderer';

interface SectionListProps {
  sections: SectionWithOrder[];
  openSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  form: any;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  handleAlignmentChange: (value: string) => void;
  handleReorderCarouselItems: (fromIndex: number, toIndex: number) => void;
  carouselItems: any[];
  paragraphItems: any[];
}

/**
 * Component that renders the list of all sections
 */
const SectionList: React.FC<SectionListProps> = ({
  sections,
  openSections,
  toggleSection,
  form,
  handleContentChange,
  handleImageUploaded,
  handleAlignmentChange,
  handleReorderCarouselItems,
  carouselItems,
  paragraphItems
}) => {
  // Debug output to help troubleshoot missing sections
  useEffect(() => {
    console.log('Current sections in SectionList:', sections);
    console.log('Open sections in SectionList:', openSections);
  }, [sections, openSections]);

  // Sort sections by order for display
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {sortedSections.map(section => {
        const isOpen = openSections[section.id] || false;
        
        return (
          <SectionRenderer
            key={section.id}
            section={section}
            isOpen={isOpen}
            onToggle={() => toggleSection(section.id)}
            form={form}
            handleContentChange={handleContentChange}
            handleImageUploaded={handleImageUploaded}
            onAlignmentChange={handleAlignmentChange}
            handleReorderCarouselItems={handleReorderCarouselItems}
            carouselItems={carouselItems}
            paragraphItems={paragraphItems}
          />
        );
      })}
    </div>
  );
};

export default SectionList;
