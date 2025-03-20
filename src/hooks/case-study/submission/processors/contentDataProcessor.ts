
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

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
    // Update content
    const { error: contentError } = await supabase
      .from('case_study_content')
      .update(contentData)
      .eq('case_study_id', caseStudyId);
      
    if (contentError) throw contentError;
  } else {
    // Create content
    const { error: contentError } = await supabase
      .from('case_study_content')
      .insert({
        ...contentData,
        case_study_id: caseStudyId
      });
      
    if (contentError) throw contentError;
  }
};
