import { useState, useEffect } from 'react';
import { SectionWithOrder } from './types';
import { SectionFormState, initializeDefaultSections, getInitialOpenSectionsState } from './utils/defaultSections';
import { addSection, removeSection, moveSection } from './utils/sectionOperations';

export const useSectionState = (form: SectionFormState, handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) => {
  // Parse custom sections from form if available
  const [sections, setSections] = useState<SectionWithOrder[]>(() => {
    try {
      if (form.customSections) {
        const parsedSections = JSON.parse(form.customSections);
        // Ensure all sections have order property
        return parsedSections.map((section: any, index: number) => ({
          ...section,
          order: section.order !== undefined ? section.order : index + 1
        }));
      }
    } catch (e) {
      console.error("Failed to parse custom sections", e);
    }
    return [];
  });

  // State to keep track of which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Initialize the default sections if none are saved
  useEffect(() => {
    if (sections.length === 0) {
      const defaultSections = initializeDefaultSections(form);
      setSections(defaultSections);
      
      // Auto-open all sections by default for better UX
      const newOpenSections = getInitialOpenSectionsState(defaultSections);
      setOpenSections(newOpenSections);
    }
  }, []);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddSection = (type: SectionWithOrder['type']) => {
    addSection(sections, type, setSections, setOpenSections);
  };

  const handleRemoveSection = (id: string) => {
    removeSection(id, setSections, setOpenSections);
  };

  const handleMoveSection = (id: string, direction: 'up' | 'down') => {
    moveSection(id, direction, setSections);
  };
  
  // Update form whenever sections change
  useEffect(() => {
    const event = {
      target: {
        name: 'customSections',
        value: JSON.stringify(sections)
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleContentChange(event);
  }, [sections]);

  return {
    sections,
    openSections,
    toggleSection,
    addSection: handleAddSection,
    removeSection: handleRemoveSection,
    moveSection: handleMoveSection
  };
};
