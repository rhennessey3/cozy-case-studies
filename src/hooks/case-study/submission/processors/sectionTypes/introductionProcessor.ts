
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processIntroductionSection = async (
  form: CaseStudyForm, 
  caseStudyId: string, 
  existingSectionIds: Set<string>,
  sortOrder: number
) => {
  // Handle introduction section
  const introductionData = {
    case_study_id: caseStudyId,
    component: 'introduction',
    content: form.intro || '',
    title: form.challenge || '',
    metadata: { 
      subheadTwo: form.approach || ''
    },
    sort_order: sortOrder
  };
  
  // Check if introduction section exists
  const { data: existingIntroductionSection, error: introductionSectionQueryError } = await supabase
    .from('case_study_sections')
    .select('id')
    .eq('case_study_id', caseStudyId)
    .eq('component', 'introduction')
    .single();
    
  if (introductionSectionQueryError && !introductionSectionQueryError.message.includes('No rows found')) {
    console.error('Error checking for introduction section:', introductionSectionQueryError);
  } else if (existingIntroductionSection) {
    // Update existing introduction section
    existingSectionIds.delete(existingIntroductionSection.id);
    
    const { error: updateIntroductionError } = await supabase
      .from('case_study_sections')
      .update(introductionData)
      .eq('id', existingIntroductionSection.id);
      
    if (updateIntroductionError) {
      console.error('Error updating introduction section:', updateIntroductionError);
    }
  } else {
    // Create new introduction section
    const { error: createIntroductionError } = await supabase
      .from('case_study_sections')
      .insert(introductionData);
      
    if (createIntroductionError) {
      console.error('Error creating introduction section:', createIntroductionError);
    }
  }
};
