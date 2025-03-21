
import React, { useEffect, useState } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import CaseStudyIntro from './CaseStudyIntro';
import UserResearchSection from './UserResearchSection';
import UserNeedsSection from './UserNeedsSection';
import UserFlowSection from './UserFlowSection';
import IterationSection from './IterationSection';
import PrototypingSection from './PrototypingSection';
import ContactSection from '@/components/sections/ContactSection';
import CaseStudyHero from './CaseStudyHero';
import { toast } from 'sonner';
import AlignmentSection from './sections/AlignmentSection';
import CarouselSection from './sections/CarouselSection';
import FourParagraphsSection from './sections/FourParagraphsSection';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy }) => {
  const [orderedSections, setOrderedSections] = useState<React.ReactNode[]>([]);

  // Dismiss any lingering toasts when viewing a case study
  useEffect(() => {
    // Dismiss any lingering toasts when the component mounts
    toast.dismiss();
  }, []);

  useEffect(() => {
    const sections: React.ReactNode[] = [];
    
    // Check for custom sections in the case study data
    console.log("Case study for rendering:", caseStudy);
    
    let customSectionsData: any[] = [];
    
    // Try to parse custom sections if they exist
    try {
      if (caseStudy.customSections) {
        console.log("Custom sections found:", caseStudy.customSections);
        customSectionsData = JSON.parse(caseStudy.customSections as string);
        console.log("Parsed custom sections:", customSectionsData);
      }
    } catch (error) {
      console.error("Failed to parse custom sections:", error);
    }
    
    // If we have custom sections, use them
    if (customSectionsData && customSectionsData.length > 0) {
      console.log("Rendering custom sections:", customSectionsData);
      // Sort sections by order
      const sortedSections = [...customSectionsData].sort((a, b) => a.order - b.order);
      
      // Filter out unpublished sections
      const publishedSections = sortedSections.filter(section => section.published !== false);
      
      console.log("Published sections for display:", publishedSections);
      
      // Map each section to its corresponding component
      publishedSections.forEach(section => {
        const componentType = section.type;
        
        switch (componentType) {
          case 'introduction':
            sections.push(<CaseStudyIntro key={section.id} caseStudy={caseStudy} />);
            break;
          case 'alignment':
            sections.push(
              <AlignmentSection 
                key={section.id}
                title={caseStudy.subhead || ''}
                content={caseStudy.introductionParagraph || ''}
                imageUrl={caseStudy.alignmentImage || ''}
                alignment={caseStudy.alignment || 'left'}
              />
            );
            break;
          case 'carousel':
            if (caseStudy.carouselItem1Title) {
              sections.push(
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
            break;
          case 'fourParagraphs':
            if (caseStudy.fourPara1Title) {
              sections.push(
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
            break;
          case 'research':
            sections.push(<UserResearchSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'needs':
            sections.push(<UserNeedsSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'flow':
            sections.push(<UserFlowSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'iteration':
            sections.push(<IterationSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'prototype':
            sections.push(<PrototypingSection key={section.id} caseStudy={caseStudy} />);
            break;
          default:
            console.log(`Custom section type not recognized: ${componentType}`);
            break;
        }
      });
      
      console.log(`Prepared ${sections.length} sections for rendering from custom sections`);
    } else {
      console.log("No custom sections found, NOT using fallback sections");
    }
    
    console.log("Final sections to render:", sections.length);
    setOrderedSections(sections);
  }, [caseStudy]);

  return (
    <>
      <CaseStudyHero 
        title={caseStudy.title}
        coverImage={caseStudy.coverImage}
        category={caseStudy.category}
        objective={caseStudy.content.challenge}
        approach={caseStudy.content.approach}
        results={caseStudy.content.results}
      />
      {orderedSections}
      <ContactSection />
    </>
  );
};

export default CaseStudyContent;
