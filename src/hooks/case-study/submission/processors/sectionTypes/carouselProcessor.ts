
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processCarouselSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number = 2,
  published: boolean = true // Default to published if not specified
) => {
  // Make validation less strict - only log a warning but still proceed
  if (!form.carouselItem1Title && !form.carouselItem1Content && !form.carouselItem1Image) {
    console.log('Carousel section has minimal data, but proceeding anyway');
  }
  
  // Generate a stable ID based on section type and case study
  const sectionId = `carousel-${caseStudyId}`;
  
  try {
    console.log(`Processing carousel section with published=${published}`);
    
    // Check if this section already exists
    const { data: existingSection, error: fetchError } = await supabase
      .from('case_study_sections')
      .select('id')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'carousel')
      .maybeSingle();
      
    if (fetchError) {
      console.error('Error checking for existing carousel section:', fetchError);
      throw new Error(`Failed to check for existing carousel section: ${fetchError.message}`);
    }
    
    // Prepare the metadata for carousel items
    const metadata = {
      title: form.carouselTitle || 'Carousel',
      items: [
        {
          title: form.carouselItem1Title || '',
          content: form.carouselItem1Content || '',
          image: form.carouselItem1Image || null
        },
        {
          title: form.carouselItem2Title || '',
          content: form.carouselItem2Content || '',
          image: form.carouselItem2Image || null
        },
        {
          title: form.carouselItem3Title || '',
          content: form.carouselItem3Content || '',
          image: form.carouselItem3Image || null
        }
      ]
    };
    
    // Prepare the section data
    const sectionData = {
      case_study_id: caseStudyId,
      component: 'carousel',
      title: form.carouselTitle || 'Carousel',
      content: 'Carousel section with multiple items',
      image_url: form.carouselItem1Image || null, // Use first image as representative
      sort_order: sortOrder,
      published: published, // Explicitly include the published state
      metadata: metadata
    };
    
    let result;
    
    if (existingSection) {
      // Update existing section
      console.log(`Updating existing carousel section (ID: ${existingSection.id}) with published=${published}`);
      
      result = await supabase
        .from('case_study_sections')
        .update(sectionData)
        .eq('id', existingSection.id);
      
      // Remove this ID from the set of sections to delete
      existingSectionIds.delete(existingSection.id);
    } else {
      // Insert new section
      console.log(`Creating new carousel section with published=${published}`);
      
      result = await supabase
        .from('case_study_sections')
        .insert(sectionData);
    }
    
    if (result.error) {
      console.error('Error saving carousel section:', result.error);
      throw new Error(`Failed to save carousel section: ${result.error.message}`);
    }
    
    console.log('Carousel section processed successfully');
  } catch (error: any) {
    console.error('Error in processCarouselSection:', error);
    throw new Error(`Failed to process carousel section: ${error.message}`);
  }
};
