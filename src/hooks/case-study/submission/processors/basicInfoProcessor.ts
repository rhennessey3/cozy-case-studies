
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processBasicInfo = async (form: CaseStudyForm, slug?: string) => {
  // Ensure required fields are present
  if (!form.title.trim()) throw new Error('Title is required');
  if (!form.slug.trim()) throw new Error('Slug is required');
  if (!form.coverImage) throw new Error('Cover image is required');
  
  // Prepare case study data
  const caseStudyData = {
    title: form.title.trim(),
    slug: form.slug.trim(),
    summary: form.summary.trim() || 'No summary provided',
    description: form.description?.trim() || null,
    cover_image: form.coverImage,
    category: form.category.trim() || 'Uncategorized',
    height: form.height?.trim() || null
  };
  
  let caseStudyId;

  if (slug) {
    // Update existing case study
    const { error: caseStudyError } = await supabase
      .from('case_studies')
      .update(caseStudyData)
      .eq('slug', slug);
      
    if (caseStudyError) throw caseStudyError;
    
    // Get case study ID
    const { data: caseStudyIdData, error: caseStudyIdError } = await supabase
      .from('case_studies')
      .select('id')
      .eq('slug', slug)
      .single();
      
    if (caseStudyIdError) throw caseStudyIdError;
    
    caseStudyId = caseStudyIdData.id;
  } else {
    // Create new case study
    const { data: newCaseStudy, error: caseStudyError } = await supabase
      .from('case_studies')
      .insert(caseStudyData)
      .select('id')
      .single();
      
    if (caseStudyError) throw caseStudyError;
    
    caseStudyId = newCaseStudy.id;
  }
  
  return { caseStudyId };
};
