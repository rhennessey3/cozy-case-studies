
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
        title: section.title || '[Empty title]',
        content_length: section.content?.length || 0,
        content_preview: section.content ? (section.content.substring(0, 50) + (section.content?.length > 50 ? '...' : '')) : '[Empty content]',
        image: section.image_url ? 'Present' : 'Missing',
        metadata: section.metadata
      })));
    }
    
    try {
      // Handle each section type separately using the new schema
      for (const section of updatedSections) {
        switch (section.component) {
          case 'alignment':
            await persistAlignmentSection(section, caseStudyId);
            break;
          case 'carousel':
            await persistCarouselSection(section, caseStudyId);
            break;
          case 'fourParagraphs':
            await persistFourParagraphsSection(section, caseStudyId);
            break;
          case 'introduction':
            await persistIntroductionSection(section, caseStudyId);
            break;
          default:
            // For backward compatibility, save to the legacy table
            await persistLegacySection(section, caseStudyId);
            break;
        }
      }
      
      // Check for sections that need to be deleted
      await deleteRemovedSections(updatedSections, caseStudyId);
      
      console.log('useSectionPersistence: All sections saved successfully');
      return true;
    } catch (err) {
      console.error('useSectionPersistence: Exception saving sections:', err);
      toast.error('Error saving sections to database');
      return false;
    }
  }, []);
  
  // Helper function to delete sections that are no longer needed
  const deleteRemovedSections = async (updatedSections: SectionResponse[], caseStudyId: string) => {
    try {
      // Get IDs from the updated sections by type
      const sectionsByType = {
        alignment: updatedSections.filter(s => s.component === 'alignment').map(s => s.id),
        carousel: updatedSections.filter(s => s.component === 'carousel').map(s => s.id),
        fourParagraphs: updatedSections.filter(s => s.component === 'fourParagraphs').map(s => s.id),
        introduction: updatedSections.filter(s => s.component === 'introduction').map(s => s.id),
      };
      
      // Get all existing sections for this case study from each table
      const { data: existingAlignmentSections } = await supabase
        .from('case_study_alignment_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
        
      const { data: existingCarouselSections } = await supabase
        .from('case_study_carousel_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
        
      const { data: existingFourParagraphsSections } = await supabase
        .from('case_study_four_paragraph_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
        
      const { data: existingIntroductionSections } = await supabase
        .from('case_study_introduction_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
      
      // Delete alignment sections that are no longer needed
      if (existingAlignmentSections && existingAlignmentSections.length > 0) {
        const alignmentToDelete = existingAlignmentSections
          .filter(s => !sectionsByType.alignment.includes(s.id))
          .map(s => s.id);
          
        if (alignmentToDelete.length > 0) {
          console.log(`Deleting ${alignmentToDelete.length} alignment sections`);
          await supabase
            .from('case_study_alignment_sections')
            .delete()
            .in('id', alignmentToDelete);
        }
      }
      
      // Delete carousel sections that are no longer needed
      if (existingCarouselSections && existingCarouselSections.length > 0) {
        const carouselToDelete = existingCarouselSections
          .filter(s => !sectionsByType.carousel.includes(s.id))
          .map(s => s.id);
          
        if (carouselToDelete.length > 0) {
          console.log(`Deleting ${carouselToDelete.length} carousel sections`);
          await supabase
            .from('case_study_carousel_sections')
            .delete()
            .in('id', carouselToDelete);
        }
      }
      
      // Delete four paragraphs sections that are no longer needed
      if (existingFourParagraphsSections && existingFourParagraphsSections.length > 0) {
        const fourParagraphsToDelete = existingFourParagraphsSections
          .filter(s => !sectionsByType.fourParagraphs.includes(s.id))
          .map(s => s.id);
          
        if (fourParagraphsToDelete.length > 0) {
          console.log(`Deleting ${fourParagraphsToDelete.length} four paragraphs sections`);
          await supabase
            .from('case_study_four_paragraph_sections')
            .delete()
            .in('id', fourParagraphsToDelete);
        }
      }
      
      // Delete introduction sections that are no longer needed
      if (existingIntroductionSections && existingIntroductionSections.length > 0) {
        const introductionToDelete = existingIntroductionSections
          .filter(s => !sectionsByType.introduction.includes(s.id))
          .map(s => s.id);
          
        if (introductionToDelete.length > 0) {
          console.log(`Deleting ${introductionToDelete.length} introduction sections`);
          await supabase
            .from('case_study_introduction_sections')
            .delete()
            .in('id', introductionToDelete);
        }
      }
    } catch (error) {
      console.error('Error deleting removed sections:', error);
      throw error;
    }
  };
  
  // Helper function to persist alignment sections to the dedicated table
  const persistAlignmentSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      const alignmentValue = section.metadata && typeof section.metadata === 'object' 
        ? (section.metadata as any).alignment || 'left' 
        : 'left';
      
      // Check if section exists
      const { data: existingSection } = await supabase
        .from('case_study_alignment_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (existingSection) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_alignment_sections')
          .update({
            title: section.title,
            content: section.content,
            image_url: section.image_url,
            alignment: alignmentValue,
            sort_order: section.sort_order,
            published: section.published
          })
          .eq('id', section.id);
          
        if (error) {
          console.error(`Error updating alignment section ${section.id}:`, error);
          throw error;
        }
        
        console.log(`Successfully updated alignment section ${section.id}`);
      } else {
        // Insert new section
        const { error } = await supabase
          .from('case_study_alignment_sections')
          .insert({
            id: section.id,
            case_study_id: caseStudyId,
            title: section.title,
            content: section.content,
            image_url: section.image_url,
            alignment: alignmentValue,
            sort_order: section.sort_order,
            published: section.published
          });
          
        if (error) {
          console.error(`Error inserting alignment section ${section.id}:`, error);
          throw error;
        }
        
        console.log(`Successfully inserted new alignment section ${section.id}`);
      }
    } catch (error) {
      console.error('Error persisting alignment section:', error);
      throw error;
    }
  };
  
  // Helper function to persist carousel sections
  const persistCarouselSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Extract carousel items from metadata
      const carouselItems = section.metadata && typeof section.metadata === 'object' && section.metadata.items
        ? section.metadata.items
        : [];
      
      // Check if section exists
      const { data: existingSection } = await supabase
        .from('case_study_carousel_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (existingSection) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_carousel_sections')
          .update({
            title: section.title,
            sort_order: section.sort_order,
            published: section.published
          })
          .eq('id', section.id);
          
        if (error) {
          console.error(`Error updating carousel section ${section.id}:`, error);
          throw error;
        }
      } else {
        // Insert new section
        const { error } = await supabase
          .from('case_study_carousel_sections')
          .insert({
            id: section.id,
            case_study_id: caseStudyId,
            title: section.title,
            sort_order: section.sort_order,
            published: section.published
          });
          
        if (error) {
          console.error(`Error inserting carousel section ${section.id}:`, error);
          throw error;
        }
      }
      
      // Now handle carousel items
      // First, delete existing items
      const { error: deleteError } = await supabase
        .from('case_study_carousel_items')
        .delete()
        .eq('carousel_section_id', section.id);
        
      if (deleteError) {
        console.error(`Error deleting carousel items for section ${section.id}:`, deleteError);
        throw deleteError;
      }
      
      // Then insert the new/updated items
      if (carouselItems && carouselItems.length > 0) {
        const carouselItemsToInsert = carouselItems.map((item: any, index: number) => ({
          carousel_section_id: section.id,
          title: item.title || '',
          content: item.content || '',
          image_url: item.image || '',
          sort_order: index
        }));
        
        const { error: insertError } = await supabase
          .from('case_study_carousel_items')
          .insert(carouselItemsToInsert);
          
        if (insertError) {
          console.error(`Error inserting carousel items for section ${section.id}:`, insertError);
          throw insertError;
        }
        
        console.log(`Successfully updated carousel section ${section.id} with ${carouselItemsToInsert.length} items`);
      } else {
        console.log(`Carousel section ${section.id} has no items`);
      }
    } catch (error) {
      console.error('Error persisting carousel section:', error);
      throw error;
    }
  };
  
  // Helper function to persist four paragraphs sections
  const persistFourParagraphsSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Extract data from metadata
      const subtitle = section.metadata && typeof section.metadata === 'object' 
        ? (section.metadata as any).subtitle || '' 
        : '';
        
      const paragraphs = section.metadata && typeof section.metadata === 'object' && section.metadata.paragraphs
        ? section.metadata.paragraphs
        : [];
      
      // Check if section exists
      const { data: existingSection } = await supabase
        .from('case_study_four_paragraph_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (existingSection) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_four_paragraph_sections')
          .update({
            title: section.title,
            subtitle: subtitle,
            image_url: section.image_url,
            sort_order: section.sort_order,
            published: section.published
          })
          .eq('id', section.id);
          
        if (error) {
          console.error(`Error updating four paragraphs section ${section.id}:`, error);
          throw error;
        }
      } else {
        // Insert new section
        const { error } = await supabase
          .from('case_study_four_paragraph_sections')
          .insert({
            id: section.id,
            case_study_id: caseStudyId,
            title: section.title,
            subtitle: subtitle,
            image_url: section.image_url,
            sort_order: section.sort_order,
            published: section.published
          });
          
        if (error) {
          console.error(`Error inserting four paragraphs section ${section.id}:`, error);
          throw error;
        }
      }
      
      // Now handle paragraph items
      // First, delete existing items
      const { error: deleteError } = await supabase
        .from('case_study_paragraph_items')
        .delete()
        .eq('paragraph_section_id', section.id);
        
      if (deleteError) {
        console.error(`Error deleting paragraph items for section ${section.id}:`, deleteError);
        throw deleteError;
      }
      
      // Then insert the new/updated items
      if (paragraphs && paragraphs.length > 0) {
        const paragraphItemsToInsert = paragraphs.map((para: any, index: number) => ({
          paragraph_section_id: section.id,
          title: para.title || '',
          content: para.content || '',
          sort_order: index
        }));
        
        const { error: insertError } = await supabase
          .from('case_study_paragraph_items')
          .insert(paragraphItemsToInsert);
          
        if (insertError) {
          console.error(`Error inserting paragraph items for section ${section.id}:`, insertError);
          throw insertError;
        }
        
        console.log(`Successfully updated four paragraphs section ${section.id} with ${paragraphItemsToInsert.length} paragraphs`);
      } else {
        console.log(`Four paragraphs section ${section.id} has no paragraphs`);
      }
    } catch (error) {
      console.error('Error persisting four paragraphs section:', error);
      throw error;
    }
  };
  
  // Helper function to persist introduction sections
  const persistIntroductionSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Extract subhead from metadata
      const subheadTwo = section.metadata && typeof section.metadata === 'object' 
        ? (section.metadata as any).subheadTwo || '' 
        : '';
      
      // Check if section exists
      const { data: existingSection } = await supabase
        .from('case_study_introduction_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (existingSection) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_introduction_sections')
          .update({
            title: section.title,
            content: section.content,
            subhead_two: subheadTwo,
            sort_order: section.sort_order,
            published: section.published
          })
          .eq('id', section.id);
          
        if (error) {
          console.error(`Error updating introduction section ${section.id}:`, error);
          throw error;
        }
        
        console.log(`Successfully updated introduction section ${section.id}`);
      } else {
        // Insert new section
        const { error } = await supabase
          .from('case_study_introduction_sections')
          .insert({
            id: section.id,
            case_study_id: caseStudyId,
            title: section.title,
            content: section.content,
            subhead_two: subheadTwo,
            sort_order: section.sort_order,
            published: section.published
          });
          
        if (error) {
          console.error(`Error inserting introduction section ${section.id}:`, error);
          throw error;
        }
        
        console.log(`Successfully inserted new introduction section ${section.id}`);
      }
    } catch (error) {
      console.error('Error persisting introduction section:', error);
      throw error;
    }
  };
  
  // Legacy section persistence for backward compatibility
  const persistLegacySection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Check if section exists
      const { data: existingSection } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (existingSection) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_sections')
          .update({
            component: section.component,
            title: section.title,
            content: section.content,
            image_url: section.image_url,
            metadata: section.metadata,
            sort_order: section.sort_order,
            published: section.published
          })
          .eq('id', section.id);
          
        if (error) {
          console.error(`Error updating legacy section ${section.id}:`, error);
          throw error;
        }
      } else {
        // Insert new section
        const { error } = await supabase
          .from('case_study_sections')
          .insert({
            id: section.id,
            case_study_id: caseStudyId,
            component: section.component,
            title: section.title,
            content: section.content,
            image_url: section.image_url,
            metadata: section.metadata,
            sort_order: section.sort_order,
            published: section.published
          });
          
        if (error) {
          console.error(`Error inserting legacy section ${section.id}:`, error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error persisting legacy section:', error);
      throw error;
    }
  };
  
  // Helper function to verify sections were saved correctly
  const verifySectionSave = useCallback(async (caseStudyId: string, component: string = 'alignment') => {
    try {
      let data;
      let error;
      
      // Query the appropriate table based on the component type
      switch (component) {
        case 'alignment':
          ({ data, error } = await supabase
            .from('case_study_alignment_sections')
            .select('*')
            .eq('case_study_id', caseStudyId));
          break;
          
        case 'carousel':
          ({ data, error } = await supabase
            .from('case_study_carousel_sections')
            .select('*, case_study_carousel_items(*)')
            .eq('case_study_id', caseStudyId));
          break;
          
        case 'fourParagraphs':
          ({ data, error } = await supabase
            .from('case_study_four_paragraph_sections')
            .select('*, case_study_paragraph_items(*)')
            .eq('case_study_id', caseStudyId));
          break;
          
        case 'introduction':
          ({ data, error } = await supabase
            .from('case_study_introduction_sections')
            .select('*')
            .eq('case_study_id', caseStudyId));
          break;
          
        default:
          // For backward compatibility, query the legacy table
          ({ data, error } = await supabase
            .from('case_study_sections')
            .select('*')
            .eq('case_study_id', caseStudyId)
            .eq('component', component));
          break;
      }
      
      if (error) {
        console.error(`Verification error for ${component} sections:`, error);
        return null;
      }
      
      if (data) {
        console.log(`VERIFICATION: ${component} sections in database after save:`, data.map((section: any) => ({
          id: section.id,
          title: section.title || '[Empty title]',
          content_length: section.content?.length || 0,
          content_preview: section.content ? (section.content.substring(0, 50) + (section.content?.length > 50 ? '...' : '')) : '[Empty content]',
          image: section.image_url ? 'Present' : 'Missing',
          items_count: section.case_study_carousel_items?.length || section.case_study_paragraph_items?.length || 0
        })));
      }
      
      return data;
    } catch (err) {
      console.error(`Error verifying ${component} sections:`, err);
      return null;
    }
  }, []);
  
  return {
    persistSections,
    verifySectionSave
  };
};
