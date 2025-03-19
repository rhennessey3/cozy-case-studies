
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudyBySlug } from '@/services';
import { toast } from 'sonner';
import { CaseStudyForm } from '@/types/caseStudy';

export const useFetchCaseStudy = (slug?: string) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CaseStudyForm | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await getCaseStudyBySlug(slug);
        if (data) {
          setCaseStudy(data);
          
          // Get section images if they exist
          const { data: sectionsData, error: sectionsError } = await supabase
            .from('case_study_sections')
            .select('*')
            .eq('case_study_id', data.id);
            
          let sectionImages = {
            introImage: '',
            challengeImage: '',
            approachImage: '',
            solutionImage: '',
            resultsImage: '',
            conclusionImage: ''
          };
          
          if (!sectionsError && sectionsData) {
            sectionsData.forEach(section => {
              if (section.component === 'intro' && section.image_url) {
                sectionImages.introImage = section.image_url;
              } else if (section.component === 'challenge' && section.image_url) {
                sectionImages.challengeImage = section.image_url;
              } else if (section.component === 'approach' && section.image_url) {
                sectionImages.approachImage = section.image_url;
              } else if (section.component === 'solution' && section.image_url) {
                sectionImages.solutionImage = section.image_url;
              } else if (section.component === 'results' && section.image_url) {
                sectionImages.resultsImage = section.image_url;
              } else if (section.component === 'conclusion' && section.image_url) {
                sectionImages.conclusionImage = section.image_url;
              }
            });
          }
          
          setForm({
            title: data.title,
            slug: data.slug,
            summary: data.summary,
            description: data.description || '',
            coverImage: data.coverImage,
            category: data.category,
            height: data.height || '',
            intro: data.content.intro,
            challenge: data.content.challenge,
            approach: data.content.approach,
            solution: data.content.solution,
            results: data.content.results,
            conclusion: data.content.conclusion,
            alignment: 'left',
            subhead: '',
            introductionParagraph: '',
            alignmentImage: '',
            ...sectionImages
          });
        }
      } catch (error) {
        console.error('Failed to fetch case study:', error);
        toast.error('Failed to fetch case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  return { caseStudy, loading, form };
};
