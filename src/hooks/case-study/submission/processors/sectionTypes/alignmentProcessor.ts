
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processAlignmentSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number,
  published = true
) => {
  // Check if the alignment section already exists
  const { data: existingSection, error: sectionQueryError } = await supabase
    .from('case_study_sections')
    .select('id')
    .eq('case_study_id', caseStudyId)
    .eq('component', 'alignment')
    .maybeSingle();
  
  if (sectionQueryError && !sectionQueryError.message.includes('No rows found')) {
    console.error('Error checking for alignment section:', sectionQueryError);
    throw new Error(`Failed to check for alignment section: ${sectionQueryError.message}`);
  }
  
  // Prepare metadata
  const metadata = {
    alignment: form.alignment || 'left',
    subhead: form.subhead || '',
  };
  
  if (existingSection) {
    // Remove from the set of sections to delete
    existingSectionIds.delete(existingSection.id);
    
    // Update existing section
    const { error: updateError } = await supabase
      .from('case_study_sections')
      .update({
        title: form.subhead || 'Alignment Section',
        content: form.introductionParagraph || '',
        image_url: form.alignmentImage || null,
        metadata,
        sort_order: sortOrder,
        published
      })
      .eq('id', existingSection.id);
    
    if (updateError) {
      console.error('Error updating alignment section:', updateError);
      throw new Error(`Failed to update alignment section: ${updateError.message}`);
    }
  } else {
    // Create new section
    const { error: insertError } = await supabase
      .from('case_study_sections')
      .insert({
        case_study_id: caseStudyId,
        component: 'alignment',
        title: form.subhead || 'Alignment Section',
        content: form.introductionParagraph || '',
        image_url: form.alignmentImage || null,
        metadata,
        sort_order: sortOrder,
        published
      });
    
    if (insertError) {
      console.error('Error creating alignment section:', insertError);
      throw new Error(`Failed to create alignment section: ${insertError.message}`);
    }
  }
};
