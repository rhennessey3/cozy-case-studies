
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { v4 as uuidv4 } from 'uuid';

/**
 * Logs alignment section details for debugging
 */
const logAlignmentDetails = (
  published: boolean,
  alignment: string,
  title: string,
  content: string,
  imageUrl: string | null
) => {
  console.log(`Processing alignment section with published=${published}, alignment=${alignment}`);
  console.log('Alignment section content to save:', {
    title: title || '[Empty title]',
    content_length: content?.length || 0,
    content_preview: content ? (content.substring(0, 50) + (content.length > 50 ? '...' : '')) : '[Empty content]',
    image_url: imageUrl || null,
    metadata: { alignment }
  });
};

/**
 * Verifies the saved section data by immediately fetching it
 */
const verifySavedSection = async (sectionId: string) => {
  // First check in the alignment sections table
  const { data: alignmentSection, error: alignmentError } = await supabase
    .from('case_study_alignment_sections')
    .select('id, title, content, alignment, image_url')
    .eq('id', sectionId)
    .single();
    
  if (!alignmentError && alignmentSection) {
    console.log('Verification - Alignment section saved successfully to alignment_sections table:', {
      id: alignmentSection.id,
      title: alignmentSection.title || '[Empty title]',
      content_length: alignmentSection.content?.length || 0,
      content_preview: alignmentSection.content ? (alignmentSection.content.substring(0, 30) + (alignmentSection.content.length > 30 ? '...' : '')) : '[Empty content]',
      image: alignmentSection.image_url ? 'Present' : 'Missing',
      alignment: alignmentSection.alignment
    });
    return;
  }
  
  // If not found in alignment table, check legacy table
  const { data: savedSection, error: verifyError } = await supabase
    .from('case_study_sections')
    .select('id, title, content, metadata, image_url')
    .eq('id', sectionId)
    .single();
    
  if (verifyError) {
    console.error('Error verifying saved alignment section:', verifyError);
    return;
  }
  
  // Safely access alignment from metadata
  const alignmentValue = typeof savedSection.metadata === 'object' && savedSection.metadata 
    ? (savedSection.metadata as { alignment?: string }).alignment || 'left'
    : 'left';
  
  console.log('Verification - Alignment section saved successfully to legacy table:', {
    id: savedSection.id,
    title: savedSection.title || '[Empty title]',
    content_length: savedSection.content?.length || 0,
    content_preview: savedSection.content ? (savedSection.content.substring(0, 30) + (savedSection.content.length > 30 ? '...' : '')) : '[Empty content]',
    image: savedSection.image_url ? 'Present' : 'Missing',
    metadata: savedSection.metadata,
    alignment: alignmentValue
  });
};

/**
 * Creates or updates an alignment section for a case study
 */
export const processAlignmentSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number = 1,
  published: boolean = true
) => {
  try {
    // Extract and normalize data from form
    const title = form.subhead || 'Alignment Section'; // Use a better default than just an empty string
    const content = form.introductionParagraph || '';
    const imageUrl = form.alignmentImage || null;
    const alignment = form.alignment || 'left';
    
    console.log('ALIGNMENT PROCESSING - Using title from form.subhead:', title);
    
    // Log details for debugging
    logAlignmentDetails(published, alignment, title, content, imageUrl);
    
    // First check if there's an alignment section in the new dedicated table
    const { data: existingAlignmentSections, error: alignmentFetchError } = await supabase
      .from('case_study_alignment_sections')
      .select('id, title, content, image_url, alignment')
      .eq('case_study_id', caseStudyId);
      
    if (alignmentFetchError) {
      console.error('Error checking for existing alignment sections in dedicated table:', alignmentFetchError);
    }
    
    // Then check in the legacy table
    const { data: existingSections, error: fetchError } = await supabase
      .from('case_study_sections')
      .select('id, content, title, image_url, metadata')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'alignment');
      
    if (fetchError) {
      console.error('Error checking for existing alignment sections in legacy table:', fetchError);
      throw new Error(`Failed to check for existing alignment sections: ${fetchError.message}`);
    }
    
    // Use alignment section from dedicated table if it exists, otherwise use from legacy table
    let sectionId;
    let useAlignmentTable = false;
    
    if (existingAlignmentSections?.length > 0) {
      sectionId = existingAlignmentSections[0].id;
      useAlignmentTable = true;
      console.log(`Found existing alignment section in dedicated table: ${sectionId}`);
    } else if (existingSections?.length > 0) {
      sectionId = existingSections[0].id;
      console.log(`Found existing alignment section in legacy table: ${sectionId}`);
    } else {
      sectionId = `alignment-${uuidv4()}`;
      console.log(`Creating new alignment section with ID: ${sectionId}`);
    }
    
    if (useAlignmentTable) {
      // Update or insert into alignment table
      const { error } = await supabase
        .from('case_study_alignment_sections')
        .upsert({
          id: sectionId,
          case_study_id: caseStudyId,
          title: title,
          content: content,
          image_url: imageUrl,
          alignment: alignment,
          sort_order: sortOrder,
          published: published,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
        
      if (error) {
        console.error('Error upserting to alignment section table:', error);
        throw new Error(`Failed to upsert to alignment section table: ${error.message}`);
      }
      
      console.log(`Successfully saved alignment section to dedicated table with title: "${title}"`);
    } else {
      // Prepare section data for legacy table
      const sectionData = {
        id: sectionId,
        case_study_id: caseStudyId,
        component: 'alignment',
        title: title,
        content: content,
        image_url: imageUrl,
        sort_order: sortOrder,
        published: published,
        metadata: { alignment } as any // Type assertion to avoid type checking issues
      };
      
      // Log what we're about to save
      console.log('Saving alignment section to legacy table with data:', {
        id: sectionData.id,
        title: sectionData.title || '[Empty title]',
        content_length: sectionData.content?.length || 0,
        content_preview: sectionData.content ? (sectionData.content.substring(0, 30) + (sectionData.content.length > 30 ? '...' : '')) : '[Empty content]',
        image_url: sectionData.image_url ? 'Present' : 'Missing',
        alignment: alignment
      });
      
      // Save to legacy table
      const { error } = await supabase
        .from('case_study_sections')
        .upsert(sectionData, { onConflict: 'id' });
        
      if (error) {
        console.error('Error upserting to legacy section table:', error);
        throw new Error(`Failed to upsert to legacy section table: ${error.message}`);
      }
      
      console.log(`Successfully saved alignment section to legacy table with title: "${title}"`);
    }
    
    // Remove the section ID from the list to delete
    if (useAlignmentTable) {
      // If we're using the alignment table, we can safely keep any entries in the legacy table
      // as they'll be ignored in the new system
    } else {
      // If we're using the legacy table, make sure we don't delete this section
      existingSectionIds.delete(sectionId);
    }
    
    // Verify the data was saved correctly
    await verifySavedSection(sectionId);
    
    console.log('Alignment section processed successfully');
    return sectionId;
  } catch (error: any) {
    console.error('Error in processAlignmentSection:', error);
    throw new Error(`Failed to process alignment section: ${error.message}`);
  }
};
