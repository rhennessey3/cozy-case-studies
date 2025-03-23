
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { v4 as uuidv4 } from 'uuid';

export const processCarouselSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number = 2,
  published: boolean = true, // Default to published if not specified
  sectionIdOverride?: string // Allow passing a specific section ID for updates
) => {
  // Make validation less strict - only log a warning but still proceed
  if (!form.carouselItem1Title && !form.carouselItem1Content && !form.carouselItem1Image) {
    console.log('Carousel section has minimal data, but proceeding anyway');
  }
  
  // Generate a unique ID for this section
  const sectionId = sectionIdOverride || `carousel-${caseStudyId}-${uuidv4().substring(0, 8)}`;
  
  try {
    console.log(`Processing carousel section with published=${published}, id=${sectionId}`);
    
    // Check if this section already exists (if we have a specific ID to look for)
    let existingSection = null;
    
    if (sectionIdOverride) {
      const { data, error: fetchError } = await supabase
        .from('case_study_sections')
        .select('id')
        .eq('id', sectionIdOverride)
        .maybeSingle();
        
      if (fetchError) {
        console.error('Error checking for existing carousel section:', fetchError);
        throw new Error(`Failed to check for existing carousel section: ${fetchError.message}`);
      }
      
      existingSection = data;
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
      id: sectionId, // Use the generated or provided section ID
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
      console.log(`Creating new carousel section with published=${published}, id=${sectionId}`);
      
      result = await supabase
        .from('case_study_sections')
        .insert(sectionData);
    }
    
    if (result.error) {
      console.error('Error saving carousel section:', result.error);
      throw new Error(`Failed to save carousel section: ${result.error.message}`);
    }
    
    console.log('Carousel section processed successfully');
    return sectionId; // Return the section ID for reference
  } catch (error: any) {
    console.error('Error in processCarouselSection:', error);
    throw new Error(`Failed to process carousel section: ${error.message}`);
  }
};
