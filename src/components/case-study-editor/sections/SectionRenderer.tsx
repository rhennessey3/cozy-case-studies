
import React from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff, Trash2 } from 'lucide-react';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';
import { mapComponentTypeToSectionType } from '@/hooks/case-study-editor/sections/utils/sectionTypeMapping';

// Import section components
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';
import IntroductionSection from './IntroductionSection';

// Define prop interfaces for section components to make TypeScript happy
interface SectionComponentBaseProps {
  form: any;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded?: (field: string, url: string) => void;
}

interface SectionRendererProps {
  section: SectionResponse;
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
  // Determine which section component to render based on section type
  const renderSectionContent = () => {
    // Map component type from database to section type for the UI
    const sectionType = mapComponentTypeToSectionType(section.component);
    
    switch (sectionType) {
      case 'introduction':
        return (
          <IntroductionSection
            form={form as any}
            handleContentChange={handleContentChange}
          />
        );
      case 'alignment':
        return (
          <AlignmentSection
            form={form as any}
            handleContentChange={handleContentChange}
            handleImageUploaded={handleImageUploaded}
            onAlignmentChange={onAlignmentChange}
          />
        );
      case 'carousel':
        return (
          <CarouselSection
            form={form as any}
            handleContentChange={handleContentChange}
            handleImageUploaded={handleImageUploaded}
            handleReorderCarouselItems={handleReorderCarouselItems}
            carouselItems={carouselItems}
          />
        );
      case 'fourParagraphs':
        return (
          <FourParagraphsSection
            form={form as any}
            handleContentChange={handleContentChange}
            handleImageUploaded={handleImageUploaded}
            paragraphItems={paragraphItems}
          />
        );
      default:
        return <div>Unknown section type: {section.component}</div>;
    }
  };

  // Toggle published status
  const handleTogglePublished = () => {
    if (onPublishedChange) {
      onPublishedChange(section.id, !section.published);
    }
  };

  // Handle section removal
  const handleRemoveSection = () => {
    if (onRemoveSection) {
      if (window.confirm(`Are you sure you want to remove this ${section.component} section?`)) {
        onRemoveSection(section.id);
      }
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <button
          onClick={onToggle}
          className="flex items-center text-gray-700 font-medium"
        >
          {isOpen ? <ChevronUp className="mr-2 h-5 w-5" /> : <ChevronDown className="mr-2 h-5 w-5" />}
          <span>{section.title || section.component}</span>
        </button>
        
        <div className="flex items-center space-x-2">
          {/* Toggle published status */}
          {onPublishedChange && (
            <button
              onClick={handleTogglePublished}
              className="p-1 rounded hover:bg-gray-200"
              title={section.published ? 'Unpublish section' : 'Publish section'}
            >
              {section.published ? (
                <Eye className="h-5 w-5 text-green-600" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}
          
          {/* Remove section button */}
          {onRemoveSection && (
            <button
              onClick={handleRemoveSection}
              className="p-1 rounded hover:bg-gray-200 text-red-500"
              title="Remove section"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 bg-white">
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

export default SectionRenderer;
