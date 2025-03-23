
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { v4 as uuidv4 } from 'uuid';

export const processAlignmentSection = async (
  form: CaseStudyForm,
  caseStudyId: string,
  existingSectionIds: Set<string>,
  sortOrder: number = 1,
  published: boolean = true // Default to published if not specified
) => {
  try {
    console.log(`Processing alignment section with published=${published}, alignment=${form.alignment || 'left'}`);
    console.log('Alignment section content:', {
      title: form.subhead || 'Alignment Section',
      content: form.introductionParagraph || '',
      content_length: form.introductionParagraph?.length || 0,
      image_url: form.alignmentImage || null,
      metadata: { alignment: form.alignment || 'left' }
    });
    
    // Check if this section already exists - but get ALL matching sections
    const { data: existingSections, error: fetchError } = await supabase
      .from('case_study_sections')
      .select('id, content, title')
      .eq('case_study_id', caseStudyId)
      .eq('component', 'alignment');
      
    if (fetchError) {
      console.error('Error checking for existing alignment sections:', fetchError);
      throw new Error(`Failed to check for existing alignment sections: ${fetchError.message}`);
    }
    
    // Generate a unique ID for this section
    const sectionId = existingSections && existingSections.length > 0 
      ? existingSections[0].id 
      : `alignment-${uuidv4()}`;
    
    // Prepare the section data - ensure all values are included
    const sectionData = {
      id: sectionId,
      case_study_id: caseStudyId,
      component: 'alignment',
      title: form.subhead || 'Alignment Section',
      content: form.introductionParagraph || '',
      image_url: form.alignmentImage || null,
      sort_order: sortOrder,
      published: published, // Explicitly include the published state
      metadata: {
        alignment: form.alignment || 'left'
      }
    };
    
    // Log for debugging
    console.log('Saving alignment section with data:', {
      id: sectionData.id,
      title: sectionData.title,
      content_length: sectionData.content?.length || 0,
      content_preview: sectionData.content?.substring(0, 30) + (sectionData.content?.length > 30 ? '...' : ''),
      image_url: sectionData.image_url ? 'Present' : 'Missing',
      alignment: sectionData.metadata.alignment
    });
    
    let result;
    
    if (existingSections && existingSections.length > 0) {
      // If multiple sections exist, we'll update the first one and delete the others
      console.log(`Found ${existingSections.length} existing alignment sections. Updating the first one and marking others for deletion.`);
      
      // Log the existing content vs new content
      if (existingSections[0].content !== sectionData.content || existingSections[0].title !== sectionData.title) {
        console.log('Updating content from:', {
          oldTitle: existingSections[0].title,
          oldContent: existingSections[0].content,
          oldContentLength: existingSections[0].content?.length || 0,
          newTitle: sectionData.title,
          newContent: sectionData.content,
          newContentLength: sectionData.content?.length || 0
        });
      }
      
      // Keep the first one
      const firstSection = existingSections[0];
      result = await supabase
        .from('case_study_sections')
        .update(sectionData)
        .eq('id', firstSection.id);
      
      // Remove this ID from the set of sections to delete
      existingSectionIds.delete(firstSection.id);
      
      // Add all other alignment sections to the delete list
      for (let i = 1; i < existingSections.length; i++) {
        console.log(`Marking extra alignment section ${existingSections[i].id} for deletion`);
        // Let the main section processor handle deletion
      }
    } else {
      // Insert new section
      console.log(`Creating new alignment section with published=${published}`);
      
      result = await supabase
        .from('case_study_sections')
        .insert(sectionData);
    }
    
    if (result.error) {
      console.error('Error saving alignment section:', result.error);
      throw new Error(`Failed to save alignment section: ${result.error.message}`);
    }
    
    // Verify the data was saved by immediately fetching it
    const { data: savedSection, error: verifyError } = await supabase
      .from('case_study_sections')
      .select('id, title, content, metadata')
      .eq('id', sectionId)
      .single();
      
    if (verifyError) {
      console.error('Error verifying saved alignment section:', verifyError);
    } else {
      console.log('Verification - Alignment section saved successfully:', {
        id: savedSection.id,
        title: savedSection.title,
        content_length: savedSection.content?.length || 0,
        content_preview: savedSection.content?.substring(0, 30) + (savedSection.content?.length > 30 ? '...' : ''),
        metadata: savedSection.metadata
      });
    }
    
    console.log('Alignment section processed successfully');
    return sectionData.id;
  } catch (error: any) {
    console.error('Error in processAlignmentSection:', error);
    throw new Error(`Failed to process alignment section: ${error.message}`);
  }
};
