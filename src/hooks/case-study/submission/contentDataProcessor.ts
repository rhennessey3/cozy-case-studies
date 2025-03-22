
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

/**
 * Processes and saves case study content data to Supabase
 * @param form The case study form data
 * @param caseStudyId The ID of the case study
 * @param slug Optional slug for updating existing case studies
 */
export const processContentData = async (form: CaseStudyForm, caseStudyId: string, slug?: string) => {
  // Prepare content data
  const contentData = {
    intro: form.intro,
    challenge: form.challenge,
    approach: form.approach,
    solution: form.solution,
    results: form.results,
    conclusion: form.conclusion
  };

  if (slug) {
    // Update existing content
    const { error } = await supabase
      .from('case_study_content')
      .update(contentData)
      .eq('case_study_id', caseStudyId);
      
    if (error) throw error;
  } else {
    // Create new content
    const { error } = await supabase
      .from('case_study_content')
      .insert({
        ...contentData,
        case_study_id: caseStudyId
      });
      
    if (error) throw error;
  }
};
