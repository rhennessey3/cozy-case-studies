
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import AlignmentSection from './AlignmentSection';
import CarouselSection from './CarouselSection';
import FourParagraphsSection from './FourParagraphsSection';

interface LegacyCustomSectionsProps {
  caseStudy: CaseStudy;
}

const LegacyCustomSections: React.FC<LegacyCustomSectionsProps> = ({ caseStudy }) => {
  const [customSections, setCustomSections] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    try {
      if (caseStudy.customSections && caseStudy.customSections !== '[]') {
        console.log("Custom sections found:", caseStudy.customSections);
        const customSectionsData = JSON.parse(caseStudy.customSections as string);
        console.log("Parsed custom sections:", customSectionsData);
        
        if (customSectionsData && customSectionsData.length > 0) {
          // Filter out unpublished sections
          const publishedSections = customSectionsData.filter(
            (section: any) => section.published !== false
          );
          
          console.log("Published sections from JSON:", publishedSections);
          setCustomSections(publishedSections);
        } else {
          console.log("No custom sections found in JSON data");
        }
      } else {
        console.log("No custom sections JSON found, or it was empty");
      }
    } catch (error) {
      console.error("Failed to parse custom sections JSON:", error);
    }
  }, [caseStudy.customSections]);
  
  if (!customSections.length) {
    return null;
  }
  
  return (
    <>
      {customSections.map((section) => {
        const componentType = section.type;
        
        switch (componentType) {
          case 'alignment':
            return (
              <AlignmentSection 
                key={section.id}
                title={caseStudy.subhead || ''}
                content={caseStudy.introductionParagraph || ''}
                imageUrl={caseStudy.alignmentImage || ''}
                alignment={caseStudy.alignment || 'left'}
              />
            );
          case 'carousel':
            if (caseStudy.carouselItem1Title) {
              return (
                <CarouselSection 
                  key={section.id}
                  title={caseStudy.carouselTitle || '3 Column Slider'}
                  items={[
                    {
                      title: caseStudy.carouselItem1Title || '',
                      content: caseStudy.carouselItem1Content || '',
                      image: caseStudy.carouselItem1Image || ''
                    },
                    {
                      title: caseStudy.carouselItem2Title || '',
                      content: caseStudy.carouselItem2Content || '',
                      image: caseStudy.carouselItem2Image || ''
                    },
                    {
                      title: caseStudy.carouselItem3Title || '',
                      content: caseStudy.carouselItem3Content || '',
                      image: caseStudy.carouselItem3Image || ''
                    }
                  ]}
                />
              );
            }
            return null;
          case 'fourParagraphs':
            if (caseStudy.fourPara1Title) {
              return (
                <FourParagraphsSection 
                  key={section.id}
                  title={caseStudy.fourParaTitle || '4 Small Paragraphs'}
                  subtitle={caseStudy.fourParaSubtitle || 'With Photo'}
                  imageUrl={caseStudy.fourParaImage || ''}
                  paragraphs={[
                    {
                      title: caseStudy.fourPara1Title || '',
                      content: caseStudy.fourPara1Content || ''
                    },
                    {
                      title: caseStudy.fourPara2Title || '',
                      content: caseStudy.fourPara2Content || ''
                    },
                    {
                      title: caseStudy.fourPara3Title || '',
                      content: caseStudy.fourPara3Content || ''
                    },
                    {
                      title: caseStudy.fourPara4Title || '',
                      content: caseStudy.fourPara4Content || ''
                    }
                  ]}
                />
              );
            }
            return null;
          default:
            console.log(`Custom section type not recognized: ${componentType}`);
            return null;
        }
      })}
    </>
  );
};

export default LegacyCustomSections;
