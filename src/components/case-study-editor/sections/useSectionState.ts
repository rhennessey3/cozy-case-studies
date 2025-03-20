
import { useState, useEffect } from 'react';
import { SectionWithOrder } from './types';
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

  const addSection = (type: SectionWithOrder['type']) => {
    const newOrder = sections.length > 0 
      ? Math.max(...sections.map(s => s.order)) + 1 
      : 1;
      
    const newSection = {
      id: uuidv4(),
      type,
      name: type === 'alignment' 
        ? 'Left or Right Aligned Section' 
        : type === 'carousel' 
          ? '3 Column Slider' 
          : 'Four Small Paragraphs',
      order: newOrder
    };
    
    setSections(prev => [...prev, newSection]);
    
    // Auto open the new section
    setOpenSections(prev => ({
      ...prev,
      [newSection.id]: true
    }));
  };

  const removeSection = (id: string) => {
    setSections(prev => {
      const sectionToRemove = prev.find(section => section.id === id);
      if (!sectionToRemove) return prev;
      
      const removedOrder = sectionToRemove.order;
      
      return prev
        .filter(section => section.id !== id)
        .map(section => ({
          ...section,
          // Adjust order for sections after the removed one
          order: section.order > removedOrder ? section.order - 1 : section.order
        }));
    });
    
    // Remove from open sections
    setOpenSections(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const sectionIndex = prev.findIndex(section => section.id === id);
      if (sectionIndex === -1) return prev;
      
      // Cannot move up if already at the top
      if (direction === 'up' && sectionIndex === 0) return prev;
      
      // Cannot move down if already at the bottom
      if (direction === 'down' && sectionIndex === prev.length - 1) return prev;
      
      const newSections = [...prev];
      const section = newSections[sectionIndex];
      const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
      const targetSection = newSections[targetIndex];
      
      // Swap orders
      const tempOrder = section.order;
      section.order = targetSection.order;
      targetSection.order = tempOrder;
      
      // Sort by order
      return newSections.sort((a, b) => a.order - b.order);
    });
  };

  return {
    sections,
    openSections,
    toggleSection,
    addSection,
    removeSection,
    moveSection
  };
};
