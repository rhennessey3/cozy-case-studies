
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processFourParagraphsSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number,
  published = true
) => {
  // Check if the four paragraphs section already exists
  const { data: existingSection, error: sectionQueryError } = await supabase
    .from('case_study_sections')
    .select('id')
    .eq('case_study_id', caseStudyId)
    .eq('component', 'fourParagraphs')
    .maybeSingle();
  
  if (sectionQueryError && !sectionQueryError.message.includes('No rows found')) {
    console.error('Error checking for four paragraphs section:', sectionQueryError);
    throw new Error(`Failed to check for four paragraphs section: ${sectionQueryError.message}`);
  }
  
  // Prepare metadata for the four paragraphs
  const metadata = {
    subtitle: form.fourParaSubtitle || 'With Photo',
    paragraphs: [
      {
        title: form.fourPara1Title || '',
        content: form.fourPara1Content || ''
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
  
  if (existingSection) {
    // Remove from the set of sections to delete
    existingSectionIds.delete(existingSection.id);
    
    // Update existing section
    const { error: updateError } = await supabase
      .from('case_study_sections')
      .update({
        title: form.fourParaTitle || '4 Small Paragraphs',
        content: '', // No main content, using metadata
        image_url: form.fourParaImage || null,
        metadata,
        sort_order: sortOrder,
        published
      })
      .eq('id', existingSection.id);
    
    if (updateError) {
      console.error('Error updating four paragraphs section:', updateError);
      throw new Error(`Failed to update four paragraphs section: ${updateError.message}`);
    }
  } else {
    // Create new section
    const { error: insertError } = await supabase
      .from('case_study_sections')
      .insert({
        case_study_id: caseStudyId,
        component: 'fourParagraphs',
        title: form.fourParaTitle || '4 Small Paragraphs',
        content: '', // No main content, using metadata
        image_url: form.fourParaImage || null,
        metadata,
        sort_order: sortOrder,
        published
      });
    
    if (insertError) {
      console.error('Error creating four paragraphs section:', insertError);
      throw new Error(`Failed to create four paragraphs section: ${insertError.message}`);
    }
  }
};
