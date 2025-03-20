
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processFourParagraphsSection = async (
  form: CaseStudyForm, 
  caseStudyId: string, 
  existingSectionIds: Set<string>,
  sortOrder: number
) => {
  // Handle four paragraphs section
  const fourParaData = {
    case_study_id: caseStudyId,
    component: 'fourParagraphs',
    title: form.fourParaTitle || '4 Small Paragraphs',
    content: '',
    image_url: form.fourParaImage || null,
    sort_order: sortOrder,
    metadata: {
      subtitle: form.fourParaSubtitle || 'With Photo',
      paragraphs: [
        {
          title: form.fourPara1Title || 'Paragraph 1',
          content: form.fourPara1Content || ''
        },
        {
          title: form.fourPara2Title || 'Paragraph 2',
          content: form.fourPara2Content || ''
        },
        {
          title: form.fourPara3Title || 'Paragraph 3',
          content: form.fourPara3Content || ''
        },
        {
          title: form.fourPara4Title || 'Paragraph 4',
          content: form.fourPara4Content || ''
        }
      ]
    }
  };
  
  // Check if four paragraphs section exists
  const { data: existingFourParaSection, error: fourParaSectionQueryError } = await supabase
    .from('case_study_sections')
    .select('id')
    .eq('case_study_id', caseStudyId)
    .eq('component', 'fourParagraphs')
    .single();
    
  if (fourParaSectionQueryError && !fourParaSectionQueryError.message.includes('No rows found')) {
    console.error('Error checking for four paragraphs section:', fourParaSectionQueryError);
  } else if (existingFourParaSection) {
    // Update existing four paragraphs section
    existingSectionIds.delete(existingFourParaSection.id);
    
    const { error: updateFourParaError } = await supabase
      .from('case_study_sections')
      .update(fourParaData)
      .eq('id', existingFourParaSection.id);
      
    if (updateFourParaError) {
      console.error('Error updating four paragraphs section:', updateFourParaError);
    }
  } else {
    // Create new four paragraphs section
    const { error: createFourParaError } = await supabase
      .from('case_study_sections')
      .insert(fourParaData);
      
    if (createFourParaError) {
      console.error('Error creating four paragraphs section:', createFourParaError);
    }
  }
};
