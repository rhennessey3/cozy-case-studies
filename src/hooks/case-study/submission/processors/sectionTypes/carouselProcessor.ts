
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processCarouselSection = async (
  form: CaseStudyForm, 
  caseStudyId: string, 
  existingSectionIds: Set<string>,
  sortOrder: number
) => {
  // Handle carousel section
  const carouselData = {
    case_study_id: caseStudyId,
    component: 'carousel',
    title: form.carouselTitle || '3 Column Slider',
    content: '', // We'll store the carousel items in metadata
    sort_order: sortOrder,
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
  
  // Check if carousel section exists
  const { data: existingCarouselSection, error: carouselSectionQueryError } = await supabase
    .from('case_study_sections')
    .select('id')
    .eq('case_study_id', caseStudyId)
    .eq('component', 'carousel')
    .single();
    
  if (carouselSectionQueryError && !carouselSectionQueryError.message.includes('No rows found')) {
    console.error('Error checking for carousel section:', carouselSectionQueryError);
  } else if (existingCarouselSection) {
    // Update existing carousel section
    existingSectionIds.delete(existingCarouselSection.id);
    
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
};
