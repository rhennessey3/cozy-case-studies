
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CaseStudyForm } from '@/types/caseStudy';

export const useCaseStudySubmit = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

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
      
      // Handle alignment section if it exists
      if (form.subhead || form.introductionParagraph || form.alignmentImage) {
        // Check if alignment section exists
        const { data: existingAlignmentSection, error: alignmentSectionQueryError } = await supabase
          .from('case_study_sections')
          .select('id')
          .eq('case_study_id', caseStudyId)
          .eq('component', 'alignment')
          .single();
          
        const alignmentData = {
          case_study_id: caseStudyId,
          component: 'alignment',
          content: form.introductionParagraph || '',
          subhead: form.subhead || '',
          alignment: form.alignment || 'left',
          image_url: form.alignmentImage || null,
          sort_order: 7 // After the 6 standard sections
        };
        
        if (alignmentSectionQueryError && !alignmentSectionQueryError.message.includes('No rows found')) {
          console.error('Error checking for alignment section:', alignmentSectionQueryError);
        } else if (existingAlignmentSection) {
          // Update existing alignment section
          const { error: updateAlignmentError } = await supabase
            .from('case_study_sections')
            .update(alignmentData)
            .eq('id', existingAlignmentSection.id);
            
          if (updateAlignmentError) {
            console.error('Error updating alignment section:', updateAlignmentError);
          }
        } else {
          // Create new alignment section
          const { error: createAlignmentError } = await supabase
            .from('case_study_sections')
            .insert(alignmentData);
            
          if (createAlignmentError) {
            console.error('Error creating alignment section:', createAlignmentError);
          }
        }
      }
      
      // Handle carousel section if it exists
      if (form.carouselTitle || form.carouselItem1Title || form.carouselItem2Title || form.carouselItem3Title) {
        // Check if carousel section exists
        const { data: existingCarouselSection, error: carouselSectionQueryError } = await supabase
          .from('case_study_sections')
          .select('id')
          .eq('case_study_id', caseStudyId)
          .eq('component', 'carousel')
          .single();
          
        const carouselData = {
          case_study_id: caseStudyId,
          component: 'carousel',
          title: form.carouselTitle || '3 Column Slider',
          content: '', // We'll store the carousel items in metadata
          sort_order: 8, // After alignment section
          metadata: {
            items: [
              {
                title: form.carouselItem1Title || 'Planning',
                content: form.carouselItem1Content || '',
                image: form.carouselItem1Image || null
              },
              {
                title: form.carouselItem2Title || 'Development',
                content: form.carouselItem2Content || '',
                image: form.carouselItem2Image || null
              },
              {
                title: form.carouselItem3Title || 'Results',
                content: form.carouselItem3Content || '',
                image: form.carouselItem3Image || null
              }
            ]
          }
        };
        
        if (carouselSectionQueryError && !carouselSectionQueryError.message.includes('No rows found')) {
          console.error('Error checking for carousel section:', carouselSectionQueryError);
        } else if (existingCarouselSection) {
          // Update existing carousel section
          const { error: updateCarouselError } = await supabase
            .from('case_study_sections')
            .update(carouselData)
            .eq('id', existingCarouselSection.id);
            
          if (updateCarouselError) {
            console.error('Error updating carousel section:', updateCarouselError);
          }
        } else {
          // Create new carousel section
          const { error: createCarouselError } = await supabase
            .from('case_study_sections')
            .insert(carouselData);
            
          if (createCarouselError) {
            console.error('Error creating carousel section:', createCarouselError);
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

  return { saving, handleSubmit };
};
