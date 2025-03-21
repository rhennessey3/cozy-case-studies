
import React, { useEffect } from 'react';
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';
import IntroductionSection from './IntroductionSection';
import { getComponentDisplayName } from '@/hooks/case-study-editor/sections/utils/sectionTypeMapping';

interface DatabaseSectionsProps {
  sections: any[];
  isAdminView?: boolean;
}

const DatabaseSections: React.FC<DatabaseSectionsProps> = ({ sections, isAdminView = false }) => {
  useEffect(() => {
    console.log("DatabaseSections - All sections received:", sections);
    
    // Filter out any editor_state sections which are for internal use only
    const filteredSections = sections.filter(s => s.component !== 'editor_state');
    
    // Show sections that will be rendered (published or in admin view)
    const visibleSections = isAdminView ? filteredSections : filteredSections.filter(s => s.published !== false);
    console.log(`DatabaseSections - ${isAdminView ? 'Admin view' : 'Public view'} sections:`, visibleSections);
  }, [sections, isAdminView]);

  if (!sections || sections.length === 0) {
    return null;
  }
  
  // Filter out editor_state sections which are for internal use only
  const filteredSections = sections.filter(s => s.component !== 'editor_state');
  
  // Filter sections to only include published ones, unless in admin view
  const visibleSections = isAdminView ? filteredSections : filteredSections.filter(s => s.published !== false);
  
  if (visibleSections.length === 0) {
    return (
      <div className="max-w-5xl mx-auto my-12 p-6 text-center">
        <p className="text-gray-500">
          {isAdminView ? 
            "No sections found for this case study." : 
            "No published sections available for this case study yet."}
        </p>
      </div>
    );
  }
  
  console.log(`Rendering ${visibleSections.length} sections`);
  
  return (
    <>
      {visibleSections.map(section => {
        const componentType = section.component;
        // Get proper display name for logging
        const displayName = getComponentDisplayName(componentType);
        console.log(`Rendering section: ${displayName} (${componentType})`);
        
        switch (componentType) {
          case 'introduction':
            return (
              <IntroductionSection 
                key={section.id}
                title={section.title || 'Case Study Introduction'}
                content={section.content || ''}
                challengeContent={section.metadata?.challenge || ''}
                approachContent={section.metadata?.approach || ''}
              />
            );
          case 'alignment':
            return (
              <AlignmentSection 
                key={section.id}
                title={section.title || 'Left or Right Aligned Section'}
                content={section.content || ''}
                imageUrl={section.image_url || ''}
                alignment={(section.metadata && section.metadata.alignment) || 'left'}
              />
            );
          case 'carousel':
            if (section.metadata && section.metadata.items) {
              return (
                <CarouselSection 
                  key={section.id}
                  title={section.title || '3 Column Slider'}
                  items={section.metadata.items}
                />
              );
            }
            return null;
          case 'fourParagraphs':
            if (section.metadata && section.metadata.paragraphs) {
              return (
                <FourParagraphsSection 
                  key={section.id}
                  title={section.title || 'Four Small Paragraphs'}
                  subtitle={section.metadata.subtitle || ''}
                  imageUrl={section.image_url || ''}
                  paragraphs={section.metadata.paragraphs}
                />
              );
            }
            return null;
          default:
            console.log(`Database section type not recognized: ${componentType}`);
            return null;
        }
      })}
    </>
  );
};

export default DatabaseSections;
