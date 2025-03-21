
import React from 'react';
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';

interface DatabaseSectionsProps {
  sections: any[];
}

const DatabaseSections: React.FC<DatabaseSectionsProps> = ({ sections }) => {
  if (!sections || sections.length === 0) {
    return null;
  }
  
  console.log(`Rendering ${sections.length} sections`);
  
  return (
    <>
      {sections.map(section => {
        const componentType = section.component;
        
        switch (componentType) {
          case 'alignment':
            return (
              <AlignmentSection 
                key={section.id}
                title={section.title || 'Alignment Section'}
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
                  title={section.title || 'Carousel'}
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
                  title={section.title || '4 Small Paragraphs'}
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
