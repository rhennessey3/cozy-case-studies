import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processAlignmentSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number = 1,
  published: boolean = true // Default to published if not specified
) => {
  // Make validation less strict - only log a warning but still proceed
  if (!form.subhead && !form.introductionParagraph && !form.alignmentImage) {
    console.log('Alignment section has minimal data, but proceeding anyway');
  }
  
  // Generate a stable ID based on section type and case study
  const sectionId = `alignment-${caseStudyId}`;
  
  try {
    console.log(`Processing alignment section with published=${published}`);
    
    // Check if this section already exists - but get ALL matching sections
    const { data: existingSections, error: fetchError } = await supabase
      .from('case_study_sections')
      .select('id')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'alignment');
      
    if (fetchError) {
      console.error('Error checking for existing alignment sections:', fetchError);
      throw new Error(`Failed to check for existing alignment sections: ${fetchError.message}`);
    }
    
    // Prepare the section data
    const sectionData = {
      case_study_id: caseStudyId,
      component: 'alignment',
      title: form.subhead || 'Alignment Section',
      content: form.introductionParagraph || '',
      image_url: form.alignmentImage || null,
      sort_order: sortOrder,
      published: published, // Explicitly include the published state
      metadata: {
        alignment: form.alignment || 'left'
      }
    };
    
    let result;
    
    if (existingSections && existingSections.length > 0) {
      // If multiple sections exist, we'll update the first one and delete the others
      console.log(`Found ${existingSections.length} existing alignment sections. Updating the first one and marking others for deletion.`);
      
      // Keep the first one
      const firstSection = existingSections[0];
      result = await supabase
        .from('case_study_sections')
        .update(sectionData)
        .eq('id', firstSection.id);
      
      // Remove this ID from the set of sections to delete
      existingSectionIds.delete(firstSection.id);
      
      // Add all other alignment sections to the delete list
      for (let i = 1; i < existingSections.length; i++) {
        console.log(`Marking extra alignment section ${existingSections[i].id} for deletion`);
        // Let the main section processor handle deletion
      }
    } else {
      // Insert new section
      console.log(`Creating new alignment section with published=${published}`);
      
      result = await supabase
        .from('case_study_sections')
        .insert(sectionData);
    }
    
    if (result.error) {
      console.error('Error saving alignment section:', result.error);
      throw new Error(`Failed to save alignment section: ${result.error.message}`);
    }
    
    console.log('Alignment section processed successfully');
  } catch (error: any) {
    console.error('Error in processAlignmentSection:', error);
    throw new Error(`Failed to process alignment section: ${error.message}`);
  }
};
