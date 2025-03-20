
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudyBySlug } from '@/services';
import { toast } from 'sonner';
import { CaseStudyForm } from '@/types/caseStudy';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';

const LOCAL_CASE_STUDIES_KEY = 'local_case_studies';

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
      
      // Check if we're in local auth mode
      const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
      const localAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
      
      // Try to get case study from local storage first if in local auth mode
      if (isLocalAuthOnly || localAuthState === 'true') {
        console.log('Checking local storage for case study with slug:', slug);
        const localCaseStudiesString = localStorage.getItem(LOCAL_CASE_STUDIES_KEY);
        
        if (localCaseStudiesString) {
          try {
            const localCaseStudies = JSON.parse(localCaseStudiesString);
            const localCaseStudy = localCaseStudies.find((cs: any) => cs.slug === slug);
            
            if (localCaseStudy) {
              console.log('Found case study in local storage:', localCaseStudy);
              
              // Format the case study to match the expected CaseStudy type
              const formattedCaseStudy: CaseStudy = {
                id: localCaseStudy.id,
                title: localCaseStudy.title,
                slug: localCaseStudy.slug,
                summary: localCaseStudy.summary,
                description: localCaseStudy.description,
                coverImage: localCaseStudy.coverImage,
                category: localCaseStudy.category,
                height: localCaseStudy.height,
                content: localCaseStudy.content
              };
              
              setCaseStudy(formattedCaseStudy);
              
              // Set the form with all the case study data
              setForm({
                title: localCaseStudy.title,
                slug: localCaseStudy.slug,
                summary: localCaseStudy.summary,
                description: localCaseStudy.description || '',
                coverImage: localCaseStudy.coverImage,
                category: localCaseStudy.category,
                height: localCaseStudy.height || '',
                intro: localCaseStudy.content.intro,
                challenge: localCaseStudy.content.challenge,
                approach: localCaseStudy.content.approach,
                solution: localCaseStudy.content.solution,
                results: localCaseStudy.content.results,
                conclusion: localCaseStudy.content.conclusion,
                alignment: localCaseStudy.alignment || 'left',
                subhead: localCaseStudy.subhead || '',
                introductionParagraph: localCaseStudy.introductionParagraph || '',
                alignmentImage: localCaseStudy.alignmentImage || '',
                introImage: localCaseStudy.introImage || '',
                challengeImage: localCaseStudy.challengeImage || '',
                approachImage: localCaseStudy.approachImage || '',
                solutionImage: localCaseStudy.solutionImage || '',
                resultsImage: localCaseStudy.resultsImage || '',
                conclusionImage: localCaseStudy.conclusionImage || '',
                customSections: localCaseStudy.customSections || '',
                carouselTitle: localCaseStudy.carouselTitle || '',
                carouselItem1Title: localCaseStudy.carouselItem1Title || '',
                carouselItem1Content: localCaseStudy.carouselItem1Content || '',
                carouselItem1Image: localCaseStudy.carouselItem1Image || '',
                carouselItem2Title: localCaseStudy.carouselItem2Title || '',
                carouselItem2Content: localCaseStudy.carouselItem2Content || '',
                carouselItem2Image: localCaseStudy.carouselItem2Image || '',
                carouselItem3Title: localCaseStudy.carouselItem3Title || '',
                carouselItem3Content: localCaseStudy.carouselItem3Content || '',
                carouselItem3Image: localCaseStudy.carouselItem3Image || '',
                fourParaTitle: localCaseStudy.fourParaTitle || '',
                fourParaSubtitle: localCaseStudy.fourParaSubtitle || '',
                fourPara1Title: localCaseStudy.fourPara1Title || '',
                fourPara1Content: localCaseStudy.fourPara1Content || '',
                fourPara2Title: localCaseStudy.fourPara2Title || '',
                fourPara2Content: localCaseStudy.fourPara2Content || '',
                fourPara3Title: localCaseStudy.fourPara3Title || '',
                fourPara3Content: localCaseStudy.fourPara3Content || '',
                fourPara4Title: localCaseStudy.fourPara4Title || '',
                fourPara4Content: localCaseStudy.fourPara4Content || '',
                fourParaImage: localCaseStudy.fourParaImage || ''
              });
              
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error('Error parsing local case studies:', error);
          }
        }
        
        // If we're creating a new case study or the requested slug wasn't found
        if (slug === 'new') {
          // For new case studies, return empty form
          setForm({
            title: '',
            slug: '',
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
            conclusionImage: '',
            customSections: ''
          });
          setLoading(false);
          return;
        }
      }
      
      // If not found in local storage or not in local auth mode, proceed with normal fetching
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
  }, [slug]);

  return { caseStudy, loading, form };
};
