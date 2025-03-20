import { useState, useEffect } from 'react';
import { SectionType } from './SectionManager';
import { v4 as uuidv4 } from '@/lib/utils';

interface SectionFormState {
  subhead?: string;
  introductionParagraph?: string;
  alignmentImage?: string;
  alignment?: string;
  carouselTitle?: string;
  carouselItem1Title?: string;
  carouselItem1Content?: string;
  carouselItem1Image?: string;
  carouselItem2Title?: string;
  carouselItem2Content?: string;
  carouselItem2Image?: string;
  carouselItem3Title?: string;
  carouselItem3Content?: string;
  carouselItem3Image?: string;
  fourParaTitle?: string;
  fourParaSubtitle?: string;
  fourPara1Title?: string;
  fourPara1Content?: string;
  fourPara2Title?: string;
  fourPara2Content?: string;
  fourPara3Title?: string;
  fourPara3Content?: string;
  fourPara4Title?: string;
  fourPara4Content?: string;
  fourParaImage?: string;
  customSections?: string;
}

export const useSectionState = (form: SectionFormState, handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) => {
  // Parse custom sections from form if available
  const [sections, setSections] = useState<SectionType[]>(() => {
    try {
      if (form.customSections) {
        return JSON.parse(form.customSections);
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
      // If there's subhead or introductionParagraph, add alignment section
      if (form.subhead || form.introductionParagraph || form.alignmentImage) {
        addSection('alignment');
      }
      
      // If there's carousel content, add carousel section
      if (form.carouselTitle || form.carouselItem1Title || form.carouselItem1Content) {
        addSection('carousel');
      }
      
      // If there's four paragraphs content, add that section
      if (form.fourParaTitle || form.fourPara1Title || form.fourPara1Content) {
        addSection('fourParagraphs');
      }
    }
  }, []);
  
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

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const addSection = (type: SectionType['type']) => {
    const newSection = {
      id: uuidv4(),
      type,
      name: type === 'alignment' 
        ? 'Left or Right Aligned Section' 
        : type === 'carousel' 
          ? '3 Column Slider' 
          : 'Four Small Paragraphs'
    };
    
    setSections(prev => [...prev, newSection]);
    
    // Auto open the new section
    setOpenSections(prev => ({
      ...prev,
      [newSection.id]: true
    }));
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
    
    // Remove from open sections
    setOpenSections(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return {
    sections,
    openSections,
    toggleSection,
    addSection,
    removeSection
  };
};
