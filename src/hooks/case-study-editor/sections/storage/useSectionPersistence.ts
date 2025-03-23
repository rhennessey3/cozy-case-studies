
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook for persisting sections to Supabase
 */
export const useSectionPersistence = () => {
  const persistSections = useCallback(async (
    updatedSections: SectionResponse[], 
    caseStudyId: string | null
  ) => {
    if (!caseStudyId) {
      console.warn('useSectionPersistence: Cannot save sections: No case study ID provided');
      return;
    }
    
    console.log(`useSectionPersistence: Saving ${updatedSections.length} sections to database`);
    
    // Log alignment sections specifically before saving
    const alignmentSections = updatedSections.filter(section => section.component === 'alignment');
    if (alignmentSections.length > 0) {
      console.log('ALIGNMENT SECTIONS BEFORE SAVE:', alignmentSections.map(section => ({
        id: section.id,
        title: section.title,
        content_length: section.content?.length || 0,
        content_preview: section.content?.substring(0, 50) + (section.content?.length > 50 ? '...' : ''),
        image: section.image_url ? 'Present' : 'Missing',
        metadata: section.metadata
      })));
    }
    
    try {
      // Get all existing sections for this case study
      const { data: existingSections, error: fetchError } = await supabase
        .from('case_study_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
      
      if (fetchError) {
        throw new Error(`Failed to fetch existing sections: ${fetchError.message}`);
      }
      
      // Get IDs from the new sections
      const updatedSectionIds = new Set(updatedSections.map(section => section.id));
      
      // Find sections to delete (they exist in DB but not in our new list)
      const sectionsToDelete = existingSections?.filter(
        section => !updatedSectionIds.has(section.id)
      );
      
      await deleteRemovedSections(sectionsToDelete);
      await upsertSections(updatedSections, caseStudyId);
      
      console.log('useSectionPersistence: All sections saved successfully');
      return true;
    } catch (err) {
      console.error('useSectionPersistence: Exception saving sections:', err);
      toast.error('Error saving sections to database');
      return false;
    }
  }, []);
  
  // Helper function to delete sections that are no longer needed
  const deleteRemovedSections = async (sectionsToDelete: { id: string }[] | undefined) => {
    if (sectionsToDelete && sectionsToDelete.length > 0) {
      console.log(`useSectionPersistence: Deleting ${sectionsToDelete.length} removed sections`);
      
      for (const section of sectionsToDelete) {
        const { error: deleteError } = await supabase
          .from('case_study_sections')
          .delete()
          .eq('id', section.id);
          
        if (deleteError) {
          console.error(`Error deleting section ${section.id}:`, deleteError);
        }
      }
    }
  };
  
  // Helper function to upsert sections (create or update)
  const upsertSections = async (sections: SectionResponse[], caseStudyId: string) => {
    // Process each section individually to avoid race conditions
    for (const [index, section] of sections.entries()) {
      // Deep clone the section to avoid reference issues
      const sectionToSave = JSON.parse(JSON.stringify(section));
      
      // Check if section exists
      const { data: existingSection } = await supabase
        .from('case_study_sections')
        .select('id, content, title')
        .eq('id', section.id)
        .maybeSingle();
      
      const sectionData = {
        ...sectionToSave,
        case_study_id: caseStudyId,
        sort_order: index // Update sort order based on array position
      };
      
      if (existingSection) {
        // Compare content before update to debug issues
        if (section.component === 'alignment') {
          console.log(`CONTENT COMPARISON for alignment section ${section.id}:`, {
            existing_length: existingSection.content?.length || 0,
            existing_preview: existingSection.content?.substring(0, 50) + (existingSection.content?.length > 50 ? '...' : '') || '',
            new_length: section.content?.length || 0,
            new_preview: section.content?.substring(0, 50) + (section.content?.length > 50 ? '...' : '') || '',
            title_changed: existingSection.title !== section.title
          });
        }
        
        // Update existing section - use upsert to ensure all fields are updated
        const { error: updateError } = await supabase
          .from('case_study_sections')
          .upsert(sectionData);
          
        if (updateError) {
          console.error(`Error updating section ${section.id}:`, updateError);
        } else {
          console.log(`Successfully updated section ${section.id} (${section.component})`);
        }
      } else {
        // Insert new section
        const { error: insertError } = await supabase
          .from('case_study_sections')
          .insert(sectionData);
          
        if (insertError) {
          console.error(`Error inserting section ${section.id}:`, insertError);
        } else {
          console.log(`Successfully inserted new section ${section.id} (${section.component})`);
        }
      }
    }
  };
  
  // Helper function to verify sections were saved correctly
  const verifySectionSave = useCallback(async (caseStudyId: string, component: string = 'alignment') => {
    const { data: verifiedSections, error: verifyError } = await supabase
      .from('case_study_sections')
      .select('*')
      .eq('case_study_id', caseStudyId)
      .eq('component', component);
      
    if (verifyError) {
      console.error('Verification error:', verifyError);
      return null;
    } 
    
    if (verifiedSections) {
      console.log(`VERIFICATION: ${component} sections in database after save:`, verifiedSections.map(section => ({
        id: section.id,
        title: section.title,
        content_length: section.content?.length || 0,
        content_preview: section.content?.substring(0, 50) + (section.content?.length > 50 ? '...' : ''),
        image: section.image_url ? 'Present' : 'Missing',
        metadata: section.metadata
      })));
    }
    
    return verifiedSections;
  }, []);
  
  return {
    persistSections,
    verifySectionSave
  };
};
