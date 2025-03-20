
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
      
      // Reset state when slug changes to avoid showing previous data during loading
      setCaseStudy(null);
      setForm(null);
      setLoading(true);
      
      try {
        const data = await getCaseStudyBySlug(slug);
        if (data) {
          setCaseStudy(data);
          
          // Check if we're in admin mode
          const isAdminMode = window.location.pathname.includes('/admin/');
          
          // Skip fetching section images for new case studies in admin mode
          if (data.id === "new" && isAdminMode) {
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
              introImage: '',
              challengeImage: '',
              approachImage: '',
              solutionImage: '',
              resultsImage: '',
              conclusionImage: ''
            });
            setLoading(false);
            return;
          }
          
          // For existing case studies, get section images if they exist
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
      } catch (error: any) {
        console.error('Failed to fetch case study:', error);
        
        // Only show toast error if not in admin mode with a new case study
        if (!window.location.pathname.includes('/admin/case-studies/')) {
          toast.error('Failed to fetch case study');
        } else {
          // For admin mode with a new case study that doesn't exist yet
          // Return empty form to start with
          setForm({
            title: '',
            slug: slug,
            summary: '',
            description: '',
            coverImage: '',
            category: '',
            height: '',
            intro: '',
            challenge: '',
            approach: '',
            solution: '',
            results: '',
            conclusion: '',
            alignment: 'left',
            subhead: '',
            introductionParagraph: '',
            alignmentImage: '',
            introImage: '',
            challengeImage: '',
            approachImage: '',
            solutionImage: '',
            resultsImage: '',
            conclusionImage: ''
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]); // This ensures the effect runs when the slug changes

  return { caseStudy, loading, form };
};
