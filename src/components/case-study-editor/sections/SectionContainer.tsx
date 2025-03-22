
import React from 'react';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
        <div className="flex items-center space-x-3">
          {onPublishedChange && (
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={(e) => e.stopPropagation()}
            >
              <Switch 
                id={`publish-${section.id}`}
                checked={section.published} 
                onCheckedChange={(checked) => onPublishedChange(section.id, checked)}
              />
              <Label htmlFor={`publish-${section.id}`} className="text-sm cursor-pointer">
                {section.published ? 'Published' : 'Unpublished'}
              </Label>
            </div>
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
          <span className="text-gray-500 ml-2">{isOpen ? '▲' : '▼'}</span>
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
