
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processAlignmentSection = async (
  form: CaseStudyForm, 
  caseStudyId: string, 
  existingSectionIds: Set<string>,
  sortOrder: number
) => {
  if (form.subhead || form.introductionParagraph || form.alignmentImage) {
    // Handle alignment section
    const alignmentData = {
      case_study_id: caseStudyId,
      component: 'alignment',
      content: form.introductionParagraph || '',
      title: form.subhead || '',
      image_url: form.alignmentImage || null,
      metadata: { alignment: form.alignment || 'left' },
      sort_order: sortOrder
    };
    
    // Check if alignment section exists
    const { data: existingAlignmentSection, error: alignmentSectionQueryError } = await supabase
      .from('case_study_sections')
      .select('id')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'alignment')
      .single();
      
    if (alignmentSectionQueryError && !alignmentSectionQueryError.message.includes('No rows found')) {
      console.error('Error checking for alignment section:', alignmentSectionQueryError);
    } else if (existingAlignmentSection) {
      // Update existing alignment section
      existingSectionIds.delete(existingAlignmentSection.id);
      
      const { error: updateAlignmentError } = await supabase
        .from('case_study_sections')
        .update(alignmentData)
        .eq('id', existingAlignmentSection.id);
        
      if (updateAlignmentError) {
        console.error('Error updating alignment section:', updateAlignmentError);
      }
    } else {
      // Create new alignment section
      const { error: createAlignmentError } = await supabase
        .from('case_study_sections')
        .insert(alignmentData);
        
      if (createAlignmentError) {
        console.error('Error creating alignment section:', createAlignmentError);
      }
    }
  }
};
