
import React, { useEffect, useMemo } from 'react';
import { SectionWithOrder } from './types';
import SectionRenderer from './SectionRenderer';

interface SectionListProps {
  sections: SectionWithOrder[];
  openSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  form: any; // Using any since the form structure varies
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  handleAlignmentChange: (value: string) => void;
  handleReorderCarouselItems: (fromIndex: number, toIndex: number) => void;
  carouselItems: any[];
  paragraphItems: any[];
  onPublishedChange?: (id: string, value: boolean) => void;
  onRemoveSection?: (id: string) => void;
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
  paragraphItems,
  onPublishedChange,
  onRemoveSection
}) => {
  // Debug output to help troubleshoot missing sections
  useEffect(() => {
    console.log('Admin Panel - Sections Fetched:', sections);
    console.log('Open sections:', openSections);
    console.log('Form:', form);
  }, [sections, openSections, form]);

  // Sort sections by order for display - memoized to prevent unnecessary re-renders
  const sortedSections = useMemo(() => {
    if (!sections || sections.length === 0) {
      return [];
    }
    return [...sections].sort((a, b) => a.order - b.order);
  }, [sections]);

  // Check if there are actual sections to render
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">No sections added yet. Add a section using the controls above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedSections.map(section => {
        const isOpen = openSections[section.id] || false;
        
        return (
          <SectionRenderer
            key={`section-${section.id}`}
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
            onPublishedChange={onPublishedChange}
            onRemoveSection={onRemoveSection}
          />
        );
      })}
    </div>
  );
};

export default React.memo(SectionList);
