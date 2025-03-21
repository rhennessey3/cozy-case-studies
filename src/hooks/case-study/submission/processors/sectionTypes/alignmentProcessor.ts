
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processAlignmentSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number = 1,
  published: boolean = true // Default to published if not specified
) => {
  // Validation: check if we have the essential data
  if (!form.subhead || !form.introductionParagraph) {
    console.log('Missing required data for alignment section, skipping');
    return;
  }
  
  // Generate a stable ID based on section type and case study
  const sectionId = `alignment-${caseStudyId}`;
  
  try {
    console.log(`Processing alignment section with published=${published}`);
    
    // Check if this section already exists
    const { data: existingSection, error: fetchError } = await supabase
      .from('case_study_sections')
      .select('id')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'alignment')
      .maybeSingle();
      
    if (fetchError) {
      console.error('Error checking for existing alignment section:', fetchError);
      throw new Error(`Failed to check for existing alignment section: ${fetchError.message}`);
    }
    
    // Prepare the section data
    const sectionData = {
      case_study_id: caseStudyId,
      component: 'alignment',
      title: form.subhead,
      content: form.introductionParagraph,
      image_url: form.alignmentImage || null,
      sort_order: sortOrder,
      published: published, // Explicitly include the published state
      metadata: {
        alignment: form.alignment || 'left'
      }
    };
    
    let result;
    
    if (existingSection) {
      // Update existing section
      console.log(`Updating existing alignment section (ID: ${existingSection.id}) with published=${published}`);
      
      result = await supabase
        .from('case_study_sections')
        .update(sectionData)
        .eq('id', existingSection.id);
      
      // Remove this ID from the set of sections to delete
      existingSectionIds.delete(existingSection.id);
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
