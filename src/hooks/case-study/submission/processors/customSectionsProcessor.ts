
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { processAlignmentSection } from './sectionTypes/alignmentProcessor';
import { processCarouselSection } from './sectionTypes/carouselProcessor';
import { processFourParagraphsSection } from './sectionTypes/fourParagraphsProcessor';
import { toast } from 'sonner';

/**
 * Process custom sections from the case study form
 */
export const processCustomSections = async (form: CaseStudyForm, caseStudyId: string) => {
  // Check if we're using local auth only mode
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
  
  // In development mode or local auth only mode, skip actual processing
  if (import.meta.env.DEV || isLocalAuthOnly) {
    console.log('DEV MODE or LOCAL AUTH ONLY: Skipping custom sections processing with Supabase');
    console.log('Would have processed these custom sections:', form.customSections);
    return;
  }
  
  // Parse custom sections if available
  let customSections = [];
  try {
    if (form.customSections) {
      customSections = JSON.parse(form.customSections);
      console.log('Parsed custom sections before saving:', customSections);
    }
  } catch (e) {
    console.error("Failed to parse custom sections", e);
    return;
  }
  
  // First, check if we have a valid session
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    console.error('Session error when processing custom sections:', sessionError);
    toast.error(`Authentication error: ${sessionError.message}. Please log in again.`);
    throw new Error(`Session error: ${sessionError.message}`);
  }
  
  // If no session, notify user they need to log in
  if (!sessionData.session) {
    console.log('No valid session found for processing custom sections');
    toast.error('You must be logged in to create or edit case studies');
    throw new Error('Authentication required. Please log in to continue.');
  }
  
  console.log('Valid session confirmed, processing custom sections');
  
  // First, get all existing custom sections
  const { data: existingSections, error: sectionsQueryError } = await supabase
    .from('case_study_sections')
    .select('id, component, published')
    .eq('case_study_id', caseStudyId);
    
  if (sectionsQueryError) {
    console.error('Error fetching existing sections:', sectionsQueryError);
    toast.error(`Database error: ${sectionsQueryError.message}`);
    throw new Error(`Failed to fetch existing sections: ${sectionsQueryError.message}`);
  }
  
  console.log('Existing sections in database:', existingSections);
  
  const existingSectionIds = new Set(existingSections?.map(s => s.id) || []);
  
  // If we have specific fields in the form for alignment section,
  // process it even if not in customSections
  if ((form.subhead || form.introductionParagraph || form.alignmentImage) && 
      !customSections.some(s => s.type === 'alignment')) {
    console.log('Found alignment data in form but not in customSections array, adding it manually');
    console.log('Alignment data to be processed:', {
      subhead: form.subhead,
      introductionParagraph: form.introductionParagraph,
      alignmentImage: form.alignmentImage,
      alignment: form.alignment
    });
    
    try {
      await processAlignmentSection(form, caseStudyId, existingSectionIds, 0, true);
    } catch (error) {
      console.error('Error processing alignment data from form fields:', error);
    }
  }
  
  // Process custom sections from the form
  if (customSections.length > 0) {
    console.log('Processing custom sections with valid authentication');
    
    for (const [index, section] of customSections.entries()) {
      try {
        // Extract published state from the section
        const published = section.published !== false;
        console.log(`Section ${section.id} (${section.type}) published state:`, published);
        
        if (section.type === 'alignment') {
          await processAlignmentSection(form, caseStudyId, existingSectionIds, index, published);
        } else if (section.type === 'carousel') {
          await processCarouselSection(form, caseStudyId, existingSectionIds, index, published);
        } else if (section.type === 'fourParagraphs') {
          await processFourParagraphsSection(form, caseStudyId, existingSectionIds, index, published);
        } else if (section.type === 'introduction') {
          console.log('Introduction section will be handled separately');
        } else {
          console.log(`Unknown section type: ${section.type}, skipping`);
        }
      } catch (sectionError: any) {
        console.error(`Error processing ${section.type} section:`, sectionError);
        toast.error(`Failed to process ${section.type} section`);
        console.log(`Continuing with other sections despite error in ${section.type}`);
      }
    }
  }
  
  // Delete any sections that were removed
  if (existingSectionIds.size > 0) {
    const sectionsToDelete = Array.from(existingSectionIds);
    
    console.log('Attempting to delete sections:', sectionsToDelete);
    
    const { error: deleteError } = await supabase
      .from('case_study_sections')
      .delete()
      .in('id', sectionsToDelete);
      
    if (deleteError) {
      console.error('Error deleting removed sections:', deleteError);
      toast.error(`Failed to delete unnecessary sections`);
      throw new Error(`Failed to delete removed sections: ${deleteError.message}`);
    }
  }
  
  console.log('Custom sections processing completed successfully');
};
