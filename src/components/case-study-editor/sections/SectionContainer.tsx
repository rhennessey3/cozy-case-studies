
import React from 'react';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';

interface SectionContainerProps {
  children: React.ReactNode;
  section: SectionResponse;
  isOpen: boolean;
  onToggle: () => void;
  onPublishedChange?: (id: string, value: boolean) => void;
  onRemoveSection?: (id: string) => void;
}

/**
 * Container component for individual section types
 * Handles common section rendering logic like expansion/collapse
 */
const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children,
  section,
  isOpen,
  onToggle,
  onPublishedChange,
  onRemoveSection
}) => {
  return (
    <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="font-medium">{section.title}</h3>
        <div className="flex items-center space-x-2">
          {onPublishedChange && (
            <label className="flex items-center space-x-2 cursor-pointer mr-4" onClick={(e) => e.stopPropagation()}>
              <input 
                type="checkbox" 
                checked={section.published} 
                onChange={(e) => onPublishedChange(section.id, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Published</span>
            </label>
          )}
          {onRemoveSection && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to remove this ${section.component} section?`)) {
                  onRemoveSection(section.id);
                }
              }}
              className="text-red-500 text-sm hover:text-red-700"
            >
              Remove
            </button>
          )}
          <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionContainer;
