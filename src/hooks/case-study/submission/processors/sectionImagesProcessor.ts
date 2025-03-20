
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';

export const processSectionImages = async (form: CaseStudyForm, caseStudyId: string) => {
  // Handle section images
  const sectionImageFields = [
    { name: 'introImage', component: 'intro' },
    { name: 'challengeImage', component: 'challenge' },
    { name: 'approachImage', component: 'approach' },
    { name: 'solutionImage', component: 'solution' },
    { name: 'resultsImage', component: 'results' },
    { name: 'conclusionImage', component: 'conclusion' }
  ];
  
  for (const field of sectionImageFields) {
    const imageUrl = form[field.name as keyof typeof form] as string;
    
    // Check if section exists
    const { data: existingSection, error: sectionQueryError } = await supabase
      .from('case_study_sections')
      .select('id')
      .eq('case_study_id', caseStudyId)
      .eq('component', field.component)
      .single();
      
    if (sectionQueryError && !sectionQueryError.message.includes('No rows found')) {
      console.error(`Error checking for section ${field.component}:`, sectionQueryError);
      continue;
    }
    
    if (existingSection) {
      // Update existing section
      const { error: updateSectionError } = await supabase
        .from('case_study_sections')
        .update({
          image_url: imageUrl || null
        })
        .eq('id', existingSection.id);
        
      if (updateSectionError) {
        console.error(`Error updating section ${field.component}:`, updateSectionError);
      }
    } else if (imageUrl) {
      // Create new section
      const { error: createSectionError } = await supabase
        .from('case_study_sections')
        .insert({
          case_study_id: caseStudyId,
          component: field.component,
          image_url: imageUrl,
          content: form[field.component as keyof typeof form] as string,
          sort_order: sectionImageFields.indexOf(field) + 1
        });
        
      if (createSectionError) {
        console.error(`Error creating section ${field.component}:`, createSectionError);
      }
    }
  }
};
