
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { processAlignmentSection } from './sectionTypes/alignmentProcessor';
import { processCarouselSection } from './sectionTypes/carouselProcessor';
import { processFourParagraphsSection } from './sectionTypes/fourParagraphsProcessor';

export const processCustomSections = async (form: CaseStudyForm, caseStudyId: string) => {
  // Parse custom sections if available
  let customSections = [];
  try {
    if (form.customSections) {
      customSections = JSON.parse(form.customSections);
    }
  } catch (e) {
    console.error("Failed to parse custom sections", e);
    return;
  }
  
  // First, get all existing custom sections
  const { data: existingSections, error: sectionsQueryError } = await supabase
    .from('case_study_sections')
    .select('id, component')
    .eq('case_study_id', caseStudyId)
    .in('component', ['alignment', 'carousel', 'fourParagraphs']);
    
  if (sectionsQueryError) {
    console.error('Error fetching existing sections:', sectionsQueryError);
    return;
  }
  
  const existingSectionIds = new Set(existingSections?.map(s => s.id) || []);
  
  // Process custom sections from the form
  if (customSections.length > 0) {
    // Sort sections by order property
    customSections.sort((a: any, b: any) => a.order - b.order);
    
    for (const [index, section] of customSections.entries()) {
      // Use the section's order if available, otherwise use the index + base offset
      const sortOrder = section.order !== undefined 
        ? section.order 
        : index + 7; // Start after the 6 standard sections
      
      if (section.type === 'alignment') {
        await processAlignmentSection(form, caseStudyId, existingSectionIds, sortOrder);
      } else if (section.type === 'carousel') {
        await processCarouselSection(form, caseStudyId, existingSectionIds, sortOrder);
      } else if (section.type === 'fourParagraphs') {
        await processFourParagraphsSection(form, caseStudyId, existingSectionIds, sortOrder);
      }
    }
  }
  
  // Delete any sections that were removed
  if (existingSectionIds.size > 0) {
    const sectionsToDelete = Array.from(existingSectionIds);
    const { error: deleteError } = await supabase
      .from('case_study_sections')
      .delete()
      .in('id', sectionsToDelete);
      
    if (deleteError) {
      console.error('Error deleting removed sections:', deleteError);
    }
  }
};
