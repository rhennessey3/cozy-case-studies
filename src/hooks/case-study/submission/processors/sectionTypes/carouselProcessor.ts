
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processCarouselSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number,
  published = true
) => {
  // Check if the carousel section already exists
  const { data: existingSection, error: sectionQueryError } = await supabase
    .from('case_study_sections')
    .select('id')
    .eq('case_study_id', caseStudyId)
    .eq('component', 'carousel')
    .maybeSingle();
  
  if (sectionQueryError && !sectionQueryError.message.includes('No rows found')) {
    console.error('Error checking for carousel section:', sectionQueryError);
    throw new Error(`Failed to check for carousel section: ${sectionQueryError.message}`);
  }
  
  // Prepare carousel items metadata
  const metadata = {
    items: [
      {
        title: form.carouselItem1Title || '',
        content: form.carouselItem1Content || '',
        image: form.carouselItem1Image || ''
      },
      {
        title: form.carouselItem2Title || '',
        content: form.carouselItem2Content || '',
        image: form.carouselItem2Image || ''
      },
      {
        title: form.carouselItem3Title || '',
        content: form.carouselItem3Content || '',
        image: form.carouselItem3Image || ''
      }
    ]
  };
  
  if (existingSection) {
    // Remove from the set of sections to delete
    existingSectionIds.delete(existingSection.id);
    
    // Update existing section
    const { error: updateError } = await supabase
      .from('case_study_sections')
      .update({
        title: form.carouselTitle || '3 Column Slider',
        content: '', // No main content for carousel
        metadata,
        sort_order: sortOrder,
        published
      })
      .eq('id', existingSection.id);
    
    if (updateError) {
      console.error('Error updating carousel section:', updateError);
      throw new Error(`Failed to update carousel section: ${updateError.message}`);
    }
  } else {
    // Create new section
    const { error: insertError } = await supabase
      .from('case_study_sections')
      .insert({
        case_study_id: caseStudyId,
        component: 'carousel',
        title: form.carouselTitle || '3 Column Slider',
        content: '', // No main content for carousel
        metadata,
        sort_order: sortOrder,
        published
      });
    
    if (insertError) {
      console.error('Error creating carousel section:', insertError);
      throw new Error(`Failed to create carousel section: ${insertError.message}`);
    }
  }
};
