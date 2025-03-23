
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
  const { data: savedSection, error: verifyError } = await supabase
    .from('case_study_sections')
    .select('id, title, content, metadata, image_url')
    .eq('id', sectionId)
    .single();
    
  if (verifyError) {
    console.error('Error verifying saved alignment section:', verifyError);
    return;
  }
  
  console.log('Verification - Alignment section saved successfully:', {
    id: savedSection.id,
    title: savedSection.title || '[Empty title]',
    content_length: savedSection.content?.length || 0,
    content_preview: savedSection.content ? (savedSection.content.substring(0, 30) + (savedSection.content.length > 30 ? '...' : '')) : '[Empty content]',
    image: savedSection.image_url ? 'Present' : 'Missing',
    metadata: savedSection.metadata
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
    const title = form.subhead || '';
    const content = form.introductionParagraph || '';
    const imageUrl = form.alignmentImage || null;
    const alignment = form.alignment || 'left';
    
    // Log details for debugging
    logAlignmentDetails(published, alignment, title, content, imageUrl);
    
    // Check for existing alignment sections
    const { data: existingSections, error: fetchError } = await supabase
      .from('case_study_sections')
      .select('id, content, title, image_url, metadata')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'alignment');
      
    if (fetchError) {
      console.error('Error checking for existing alignment sections:', fetchError);
      throw new Error(`Failed to check for existing alignment sections: ${fetchError.message}`);
    }
    
    // Generate or use existing section ID
    const sectionId = existingSections?.length > 0 
      ? existingSections[0].id 
      : `alignment-${uuidv4()}`;
    
    // Prepare section data
    const sectionData = {
      id: sectionId,
      case_study_id: caseStudyId,
      component: 'alignment',
      title,
      content,
      image_url: imageUrl,
      sort_order: sortOrder,
      published,
      metadata: { alignment }
    };
    
    // Log what we're about to save
    console.log('Saving alignment section with data:', {
      id: sectionData.id,
      title: sectionData.title || '[Empty title]',
      content_length: sectionData.content?.length || 0,
      content_preview: sectionData.content ? (sectionData.content.substring(0, 30) + (sectionData.content.length > 30 ? '...' : '')) : '[Empty content]',
      image_url: sectionData.image_url ? 'Present' : 'Missing',
      alignment: sectionData.metadata.alignment
    });
    
    let result;
    
    if (existingSections?.length > 0) {
      // Handle multiple existing sections case - update first, mark others for deletion
      if (existingSections.length > 1) {
        console.log(`Found ${existingSections.length} existing alignment sections. Updating the first one and marking others for deletion.`);
      }
      
      // Log content changes if applicable
      const firstSection = existingSections[0];
      console.log('CONTENT COMPARISON for alignment section update:', {
        old_title: firstSection.title || '[Empty title]',
        new_title: title || '[Empty title]',
        old_content_length: firstSection.content?.length || 0,
        new_content_length: content?.length || 0,
        old_content_preview: firstSection.content ? (firstSection.content.substring(0, 50) + (firstSection.content.length > 50 ? '...' : '')) : '[Empty content]',
        new_content_preview: content ? (content.substring(0, 50) + (content.length > 50 ? '...' : '')) : '[Empty content]',
        title_changed: firstSection.title !== title,
        content_changed: firstSection.content !== content,
        image_changed: firstSection.image_url !== imageUrl,
        alignment_changed: firstSection.metadata?.alignment !== alignment
      });
      
      // Update the first section
      result = await supabase
        .from('case_study_sections')
        .upsert(sectionData, { 
          onConflict: 'id',
          returning: 'minimal'
        });
      
      if (result?.error) {
        console.error('Error updating alignment section:', result.error);
        throw new Error(`Failed to update alignment section: ${result.error.message}`);
      }
      
      // Remove this ID from the list to delete
      existingSectionIds.delete(firstSection.id);
      
      // Mark other alignment sections for deletion
      for (let i = 1; i < existingSections.length; i++) {
        console.log(`Marking extra alignment section ${existingSections[i].id} for deletion`);
        // The main section processor will handle the actual deletion
      }
    } else {
      // Insert new section
      console.log(`Creating new alignment section with published=${published}`);
      result = await supabase
        .from('case_study_sections')
        .insert(sectionData);
        
      if (result?.error) {
        console.error('Error creating new alignment section:', result.error);
        throw new Error(`Failed to create alignment section: ${result.error.message}`);
      }
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
