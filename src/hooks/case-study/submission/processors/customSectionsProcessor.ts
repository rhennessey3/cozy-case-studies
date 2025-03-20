
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { processAlignmentSection } from './sectionTypes/alignmentProcessor';
import { processCarouselSection } from './sectionTypes/carouselProcessor';
import { processFourParagraphsSection } from './sectionTypes/fourParagraphsProcessor';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/contexts/AuthContext';

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
  
  // First, check if we have a valid session
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    console.error('Session error when processing custom sections:', sessionError);
    throw new Error(`Session error: ${sessionError.message}`);
  }
  
  if (!sessionData.session) {
    console.error('No valid session found for processing custom sections');
    
    // Attempt emergency authentication
    console.log('Attempting emergency authentication...');
    try {
      // Sign out first to ensure clean state
      await supabase.auth.signOut();
      
      // Try to authenticate
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });
      
      if (error) {
        console.error('Emergency authentication failed:', error);
        throw new Error(`Authentication failed: ${error.message}`);
      }
      
      if (!data.session) {
        throw new Error('No session created after emergency authentication');
      }
      
      console.log('Emergency authentication succeeded');
    } catch (authError) {
      console.error('Emergency authentication exception:', authError);
      throw new Error('Authentication required to process sections');
    }
  }
  
  // Verify we now have a valid session
  const { data: verificationData } = await supabase.auth.getSession();
  if (!verificationData.session) {
    throw new Error('Failed to establish a valid session after authentication attempts');
  }
  
  console.log('Valid session confirmed, processing custom sections');
  
  // First, get all existing custom sections
  const { data: existingSections, error: sectionsQueryError } = await supabase
    .from('case_study_sections')
    .select('id, component')
    .eq('case_study_id', caseStudyId)
    .in('component', ['alignment', 'carousel', 'fourParagraphs']);
    
  if (sectionsQueryError) {
    console.error('Error fetching existing sections:', sectionsQueryError);
    throw new Error(`Failed to fetch existing sections: ${sectionsQueryError.message}`);
  }
  
  const existingSectionIds = new Set(existingSections?.map(s => s.id) || []);
  
  // Process custom sections from the form
  if (customSections.length > 0) {
    // Sort sections by order property
    customSections.sort((a: any, b: any) => a.order - b.order);
    
    // Log authentication state for debugging
    console.log('Processing custom sections with valid authentication');
    
    for (const [index, section] of customSections.entries()) {
      // Use the section's order if available, otherwise use the index + base offset
      const sortOrder = section.order !== undefined 
        ? section.order 
        : index + 7; // Start after the 6 standard sections
      
      try {
        if (section.type === 'alignment') {
          await processAlignmentSection(form, caseStudyId, existingSectionIds, sortOrder);
        } else if (section.type === 'carousel') {
          await processCarouselSection(form, caseStudyId, existingSectionIds, sortOrder);
        } else if (section.type === 'fourParagraphs') {
          await processFourParagraphsSection(form, caseStudyId, existingSectionIds, sortOrder);
        }
      } catch (sectionError: any) {
        console.error(`Error processing ${section.type} section:`, sectionError);
        throw new Error(`Failed to process ${section.type} section: ${sectionError.message}`);
      }
    }
  }
  
  // Delete any sections that were removed
  if (existingSectionIds.size > 0) {
    const sectionsToDelete = Array.from(existingSectionIds);
    
    // Log the deletion attempt for debugging
    console.log('Attempting to delete sections:', sectionsToDelete);
    
    const { error: deleteError } = await supabase
      .from('case_study_sections')
      .delete()
      .in('id', sectionsToDelete);
      
    if (deleteError) {
      console.error('Error deleting removed sections:', deleteError);
      throw new Error(`Failed to delete removed sections: ${deleteError.message}`);
    }
  }
  
  console.log('Custom sections processing completed successfully');
};
