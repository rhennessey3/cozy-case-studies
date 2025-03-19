import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudies, getCaseStudyBySlug } from '@/services';
import { toast } from 'sonner';

interface CaseStudyForm {
  title: string;
  slug: string;
  summary: string;
  description: string;
  coverImage: string;
  category: string;
  height: string;
  intro: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string;
  conclusion: string;
  introImage: string;
  challengeImage: string;
  approachImage: string;
  solutionImage: string;
  resultsImage: string;
  conclusionImage: string;
}

const initialFormState: CaseStudyForm = {
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
  introImage: '',
  challengeImage: '',
  approachImage: '',
  solutionImage: '',
  resultsImage: '',
  conclusionImage: ''
};

export const useCaseStudyEditor = (slug?: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [form, setForm] = useState<CaseStudyForm>(initialFormState);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
        toast.error('Failed to fetch case studies');
      }
    };

    fetchCaseStudies();
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (field: string, imageUrl: string) => {
    setForm(prev => ({ ...prev, [field]: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Prepare case study data
      const caseStudyData = {
        title: form.title,
        slug: form.slug,
        summary: form.summary,
        description: form.description || null,
        cover_image: form.coverImage,
        category: form.category,
        height: form.height || null
      };
      
      // Prepare content data
      const contentData = {
        intro: form.intro,
        challenge: form.challenge,
        approach: form.approach,
        solution: form.solution,
        results: form.results,
        conclusion: form.conclusion
      };

      let caseStudyId;

      if (slug) {
        // Update existing case study
        const { error: caseStudyError } = await supabase
          .from('case_studies')
          .update(caseStudyData)
          .eq('slug', slug);
          
        if (caseStudyError) throw caseStudyError;
        
        // Get case study ID
        const { data: caseStudyIdData, error: caseStudyIdError } = await supabase
          .from('case_studies')
          .select('id')
          .eq('slug', slug)
          .single();
          
        if (caseStudyIdError) throw caseStudyIdError;
        
        caseStudyId = caseStudyIdData.id;
        
        // Update content
        const { error: contentError } = await supabase
          .from('case_study_content')
          .update(contentData)
          .eq('case_study_id', caseStudyId);
          
        if (contentError) throw contentError;
      } else {
        // Create new case study
        const { data: newCaseStudy, error: caseStudyError } = await supabase
          .from('case_studies')
          .insert(caseStudyData)
          .select('id')
          .single();
          
        if (caseStudyError) throw caseStudyError;
        
        caseStudyId = newCaseStudy.id;
        
        // Create content
        const { error: contentError } = await supabase
          .from('case_study_content')
          .insert({
            ...contentData,
            case_study_id: caseStudyId
          });
          
        if (contentError) throw contentError;
      }
      
      // Handle section images
      const sectionImageFields = [
        { name: 'introImage', component: 'intro' },
        { name: 'challengeImage', component: 'challenge' },
        { name: 'approachImage', component: 'approach' },
        { name: 'solutionImage', component: 'solution' },
        { name: 'resultsImage', component: 'results' },
        { name: 'conclusionImage', component: 'conclusion' }
      ];
      
      for (const field of sectionImageFields) {
        const imageUrl = form[field.name as keyof typeof form] as string;
        
        // Check if section exists
        const { data: existingSection, error: sectionQueryError } = await supabase
          .from('case_study_sections')
          .select('id')
          .eq('case_study_id', caseStudyId)
          .eq('component', field.component)
          .single();
          
        if (sectionQueryError && !sectionQueryError.message.includes('No rows found')) {
          console.error(`Error checking for section ${field.component}:`, sectionQueryError);
          continue;
        }
        
        if (existingSection) {
          // Update existing section
          const { error: updateSectionError } = await supabase
            .from('case_study_sections')
            .update({
              image_url: imageUrl || null
            })
            .eq('id', existingSection.id);
            
          if (updateSectionError) {
            console.error(`Error updating section ${field.component}:`, updateSectionError);
          }
        } else if (imageUrl) {
          // Create new section
          const { error: createSectionError } = await supabase
            .from('case_study_sections')
            .insert({
              case_study_id: caseStudyId,
              component: field.component,
              image_url: imageUrl,
              content: form[field.component as keyof typeof form] as string,
              sort_order: sectionImageFields.indexOf(field) + 1
            });
            
          if (createSectionError) {
            console.error(`Error creating section ${field.component}:`, createSectionError);
          }
        }
      }
      
      toast.success(slug ? 'Case study updated successfully' : 'Case study created successfully');
      
      if (!slug) {
        navigate(`/admin/case-studies/${form.slug}`);
      }
    } catch (error: any) {
      console.error('Error saving case study:', error);
      toast.error(`Failed to save case study: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const createNewCaseStudy = () => {
    setCaseStudy(null);
    setForm(initialFormState);
    navigate('/admin/case-studies');
  };

  return {
    loading,
    saving,
    caseStudy,
    caseStudies,
    form,
    handleChange,
    handleContentChange,
    handleImageUploaded,
    handleSubmit,
    createNewCaseStudy
  };
};
