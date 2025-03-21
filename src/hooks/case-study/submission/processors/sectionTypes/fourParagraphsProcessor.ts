
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processFourParagraphsSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number = 3,
  published: boolean = true // Default to published if not specified
) => {
  // Validation: check if we have the essential data
  if (!form.fourPara1Title || !form.fourPara1Content) {
    console.log('Missing required data for four paragraphs section, skipping');
    return;
  }
  
  // Generate a stable ID based on section type and case study
  const sectionId = `four-paragraphs-${caseStudyId}`;
  
  try {
    console.log(`Processing four paragraphs section with published=${published}`);
    
    // Check if this section already exists
    const { data: existingSection, error: fetchError } = await supabase
      .from('case_study_sections')
      .select('id')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'fourParagraphs')
      .maybeSingle();
      
    if (fetchError) {
      console.error('Error checking for existing four paragraphs section:', fetchError);
      throw new Error(`Failed to check for existing four paragraphs section: ${fetchError.message}`);
    }
    
    // Prepare the metadata for four paragraphs
    const metadata = {
      title: form.fourParaTitle || 'Four Paragraphs',
      subtitle: form.fourParaSubtitle || '',
      image: form.fourParaImage || null,
      paragraphs: [
        {
          title: form.fourPara1Title,
          content: form.fourPara1Content
        },
        {
          title: form.fourPara2Title || '',
          content: form.fourPara2Content || ''
        },
        {
          title: form.fourPara3Title || '',
          content: form.fourPara3Content || ''
        },
        {
          title: form.fourPara4Title || '',
          content: form.fourPara4Content || ''
        }
      ]
    };
    
    // Prepare the section data
    const sectionData = {
      case_study_id: caseStudyId,
      component: 'fourParagraphs',
      title: form.fourParaTitle || 'Four Paragraphs',
      content: 'Section with four descriptive paragraphs',
      image_url: form.fourParaImage || null,
      sort_order: sortOrder,
      published: published, // Explicitly include the published state
      metadata: metadata
    };
    
    let result;
    
    if (existingSection) {
      // Update existing section
      console.log(`Updating existing four paragraphs section (ID: ${existingSection.id}) with published=${published}`);
      
      result = await supabase
        .from('case_study_sections')
        .update(sectionData)
        .eq('id', existingSection.id);
      
      // Remove this ID from the set of sections to delete
      existingSectionIds.delete(existingSection.id);
    } else {
      // Insert new section
      console.log(`Creating new four paragraphs section with published=${published}`);
      
      result = await supabase
        .from('case_study_sections')
        .insert(sectionData);
    }
    
    if (result.error) {
      console.error('Error saving four paragraphs section:', result.error);
      throw new Error(`Failed to save four paragraphs section: ${result.error.message}`);
    }
    
    console.log('Four paragraphs section processed successfully');
  } catch (error: any) {
    console.error('Error in processFourParagraphsSection:', error);
    throw new Error(`Failed to process four paragraphs section: ${error.message}`);
  }
};
