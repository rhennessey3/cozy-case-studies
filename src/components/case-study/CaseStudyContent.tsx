
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  const [dbSections, setDbSections] = useState<any[]>([]);

  // Dismiss any lingering toasts when viewing a case study
  useEffect(() => {
    // Dismiss any lingering toasts when the component mounts
    toast.dismiss();
  }, []);

  // Fetch sections directly from database
  useEffect(() => {
    const fetchSectionsFromDb = async () => {
      if (!caseStudy || !caseStudy.id) {
        console.log("No case study ID available to fetch sections");
        return;
      }

      try {
        console.log(`Fetching sections for case study ID: ${caseStudy.id}`);
        
        const { data: sections, error } = await supabase
          .from('case_study_sections')
          .select('*')
          .eq('case_study_id', caseStudy.id)
          .eq('published', true)
          .order('sort_order', { ascending: true });
        
        if (error) {
          console.error("Error fetching case study sections:", error);
          return;
        }
        
        console.log("Sections fetched from database:", sections);
        setDbSections(sections || []);
      } catch (err) {
        console.error("Failed to fetch sections:", err);
      }
    };

    fetchSectionsFromDb();
  }, [caseStudy]);

  // Process and render sections from both sources
  useEffect(() => {
    const sections: React.ReactNode[] = [];
    
    // Log data for debugging
    console.log("Case study for rendering:", caseStudy);
    
    let customSectionsData: any[] = [];
    
    // Try to parse custom sections if they exist
    try {
      if (caseStudy.customSections && caseStudy.customSections !== '[]') {
        console.log("Custom sections found:", caseStudy.customSections);
        customSectionsData = JSON.parse(caseStudy.customSections as string);
        console.log("Parsed custom sections:", customSectionsData);
      }
    } catch (error) {
      console.error("Failed to parse custom sections:", error);
    }
    
    // Check if we have DB sections
    if (dbSections && dbSections.length > 0) {
      console.log("Using database sections:", dbSections);
      
      // Map each section to its corresponding component
      dbSections.forEach(section => {
        const componentType = section.component;
        
        switch (componentType) {
          case 'alignment':
            sections.push(
              <AlignmentSection 
                key={section.id}
                title={section.title || caseStudy.subhead || ''}
                content={section.content || caseStudy.introductionParagraph || ''}
                imageUrl={section.image_url || caseStudy.alignmentImage || ''}
                alignment={(section.metadata && section.metadata.alignment) || 'left'}
              />
            );
            break;
          case 'carousel':
            if (section.metadata && section.metadata.items) {
              sections.push(
                <CarouselSection 
                  key={section.id}
                  title={section.title || 'Carousel'}
                  items={section.metadata.items}
                />
              );
            }
            break;
          case 'fourParagraphs':
            if (section.metadata && section.metadata.paragraphs) {
              sections.push(
                <FourParagraphsSection 
                  key={section.id}
                  title={section.title || '4 Small Paragraphs'}
                  subtitle={section.metadata.subtitle || ''}
                  imageUrl={section.image_url || ''}
                  paragraphs={section.metadata.paragraphs}
                />
              );
            }
            break;
          default:
            console.log(`Database section type not recognized: ${componentType}`);
            break;
        }
      });
      
      console.log(`Prepared ${sections.length} sections for rendering from database sections`);
    } 
    // If no DB sections but we have custom sections data
    else if (customSectionsData && customSectionsData.length > 0) {
      console.log("Using custom sections from JSON:", customSectionsData);
      
      // Filter out unpublished sections
      const publishedSections = customSectionsData.filter(section => section.published !== false);
      
      // Debug: Log published sections after filtering
      console.log("Published sections for display:", publishedSections);
      
      // Map each section to its corresponding component
      publishedSections.forEach(section => {
        const componentType = section.type;
        
        switch (componentType) {
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
          default:
            console.log(`Custom section type not recognized: ${componentType}`);
            break;
        }
      });
      
      console.log(`Prepared ${sections.length} sections for rendering from custom sections`);
    } else {
      console.log("No sections found (neither in database nor in custom sections)");
    }
    
    console.log("Final sections to render:", sections.length);
    setOrderedSections(sections);
  }, [caseStudy, dbSections]);

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
      {orderedSections.length > 0 ? (
        orderedSections
      ) : (
        <div className="max-w-5xl mx-auto my-12 p-6 text-center">
          <p className="text-gray-500">No sections available for this case study.</p>
        </div>
      )}
      <ContactSection />
    </>
  );
};

export default CaseStudyContent;
