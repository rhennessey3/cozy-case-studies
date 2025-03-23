
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
      return false;
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
      // Process each section individually to ensure proper saving
      for (const section of updatedSections) {
        console.log(`Saving section ${section.id} (${section.component})`);
        
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
      
      // After saving all sections, check if any sections need to be deleted
      await cleanupOrphanedSections(updatedSections, caseStudyId);
      
      console.log('useSectionPersistence: All sections saved successfully');
      return true;
    } catch (err) {
      console.error('useSectionPersistence: Exception saving sections:', err);
      toast.error('Error saving sections to database');
      return false;
    }
  }, []);
  
  // Helper function to delete orphaned sections
  const cleanupOrphanedSections = async (currentSections: SectionResponse[], caseStudyId: string) => {
    try {
      // Get IDs of all current sections by type
      const currentIds = {
        alignment: currentSections.filter(s => s.component === 'alignment').map(s => s.id),
        carousel: currentSections.filter(s => s.component === 'carousel').map(s => s.id),
        fourParagraphs: currentSections.filter(s => s.component === 'fourParagraphs').map(s => s.id),
        introduction: currentSections.filter(s => s.component === 'introduction').map(s => s.id)
      };
      
      // Fetch existing sections from each table
      const { data: alignmentSections } = await supabase
        .from('case_study_alignment_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
      
      const { data: carouselSections } = await supabase
        .from('case_study_carousel_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
      
      const { data: fourParagraphsSections } = await supabase
        .from('case_study_four_paragraph_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
      
      const { data: introductionSections } = await supabase
        .from('case_study_introduction_sections')
        .select('id')
        .eq('case_study_id', caseStudyId);
      
      // Delete orphaned sections
      if (alignmentSections && alignmentSections.length > 0) {
        const toDelete = alignmentSections
          .filter(s => !currentIds.alignment.includes(s.id))
          .map(s => s.id);
          
        if (toDelete.length > 0) {
          console.log(`Deleting ${toDelete.length} orphaned alignment sections`);
          await supabase
            .from('case_study_alignment_sections')
            .delete()
            .in('id', toDelete);
        }
      }
      
      if (carouselSections && carouselSections.length > 0) {
        const toDelete = carouselSections
          .filter(s => !currentIds.carousel.includes(s.id))
          .map(s => s.id);
          
        if (toDelete.length > 0) {
          console.log(`Deleting ${toDelete.length} orphaned carousel sections`);
          await supabase
            .from('case_study_carousel_sections')
            .delete()
            .in('id', toDelete);
        }
      }
      
      if (fourParagraphsSections && fourParagraphsSections.length > 0) {
        const toDelete = fourParagraphsSections
          .filter(s => !currentIds.fourParagraphs.includes(s.id))
          .map(s => s.id);
          
        if (toDelete.length > 0) {
          console.log(`Deleting ${toDelete.length} orphaned four paragraphs sections`);
          await supabase
            .from('case_study_four_paragraph_sections')
            .delete()
            .in('id', toDelete);
        }
      }
      
      if (introductionSections && introductionSections.length > 0) {
        const toDelete = introductionSections
          .filter(s => !currentIds.introduction.includes(s.id))
          .map(s => s.id);
          
        if (toDelete.length > 0) {
          console.log(`Deleting ${toDelete.length} orphaned introduction sections`);
          await supabase
            .from('case_study_introduction_sections')
            .delete()
            .in('id', toDelete);
        }
      }
    } catch (error) {
      console.error('Error cleaning up orphaned sections:', error);
      throw error;
    }
  };
  
  // Helper functions for each section type
  const persistAlignmentSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Extract alignment from metadata
      const alignmentValue = section.metadata && typeof section.metadata === 'object' 
        ? (section.metadata as any).alignment || 'left' 
        : 'left';
      
      // Check if section exists
      const { data } = await supabase
        .from('case_study_alignment_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (data) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_alignment_sections')
          .update({
            title: section.title,
            content: section.content,
            image_url: section.image_url,
            alignment: alignmentValue,
            sort_order: section.sort_order,
            published: section.published,
            updated_at: new Date().toISOString()
          })
          .eq('id', section.id);
          
        if (error) {
          console.error(`Error updating alignment section ${section.id}:`, error);
          throw error;
        }
        
        console.log(`Updated alignment section ${section.id}`);
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
        
        console.log(`Inserted new alignment section ${section.id}`);
      }
    } catch (error) {
      console.error('Error persisting alignment section:', error);
      throw error;
    }
  };
  
  const persistCarouselSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Extract carousel items from metadata
      const carouselItems = section.metadata && typeof section.metadata === 'object' && (section.metadata as any).items
        ? (section.metadata as any).items
        : [];
      
      // Check if section exists
      const { data } = await supabase
        .from('case_study_carousel_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (data) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_carousel_sections')
          .update({
            title: section.title,
            sort_order: section.sort_order,
            published: section.published,
            updated_at: new Date().toISOString()
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
      
      // Handle carousel items
      // First, delete existing items
      const { error: deleteError } = await supabase
        .from('case_study_carousel_items')
        .delete()
        .eq('carousel_section_id', section.id);
        
      if (deleteError) {
        console.error(`Error deleting carousel items for section ${section.id}:`, deleteError);
        throw deleteError;
      }
      
      // Then insert new items
      if (carouselItems && carouselItems.length > 0) {
        const itemsToInsert = carouselItems.map((item: any, index: number) => ({
          carousel_section_id: section.id,
          title: item.title || '',
          content: item.content || '',
          image_url: item.image || '',
          sort_order: index
        }));
        
        const { error: insertError } = await supabase
          .from('case_study_carousel_items')
          .insert(itemsToInsert);
          
        if (insertError) {
          console.error(`Error inserting carousel items for section ${section.id}:`, insertError);
          throw insertError;
        }
      }
      
      console.log(`Processed carousel section ${section.id}`);
    } catch (error) {
      console.error('Error persisting carousel section:', error);
      throw error;
    }
  };
  
  const persistFourParagraphsSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Extract metadata
      const subtitle = section.metadata && typeof section.metadata === 'object' 
        ? (section.metadata as any).subtitle || '' 
        : '';
        
      const paragraphs = section.metadata && typeof section.metadata === 'object' && (section.metadata as any).paragraphs
        ? (section.metadata as any).paragraphs
        : [];
      
      // Check if section exists
      const { data } = await supabase
        .from('case_study_four_paragraph_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (data) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_four_paragraph_sections')
          .update({
            title: section.title,
            subtitle: subtitle,
            image_url: section.image_url,
            sort_order: section.sort_order,
            published: section.published,
            updated_at: new Date().toISOString()
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
      
      // Handle paragraph items
      // First, delete existing items
      const { error: deleteError } = await supabase
        .from('case_study_paragraph_items')
        .delete()
        .eq('paragraph_section_id', section.id);
        
      if (deleteError) {
        console.error(`Error deleting paragraph items for section ${section.id}:`, deleteError);
        throw deleteError;
      }
      
      // Then insert new items
      if (paragraphs && paragraphs.length > 0) {
        const itemsToInsert = paragraphs.map((item: any, index: number) => ({
          paragraph_section_id: section.id,
          title: item.title || '',
          content: item.content || '',
          sort_order: index
        }));
        
        const { error: insertError } = await supabase
          .from('case_study_paragraph_items')
          .insert(itemsToInsert);
          
        if (insertError) {
          console.error(`Error inserting paragraph items for section ${section.id}:`, insertError);
          throw insertError;
        }
      }
      
      console.log(`Processed four paragraphs section ${section.id}`);
    } catch (error) {
      console.error('Error persisting four paragraphs section:', error);
      throw error;
    }
  };
  
  const persistIntroductionSection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Extract metadata
      const subheadTwo = section.metadata && typeof section.metadata === 'object' 
        ? (section.metadata as any).subheadTwo || '' 
        : '';
      
      // Check if section exists
      const { data } = await supabase
        .from('case_study_introduction_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (data) {
        // Update existing section
        const { error } = await supabase
          .from('case_study_introduction_sections')
          .update({
            title: section.title,
            content: section.content,
            subhead_two: subheadTwo,
            sort_order: section.sort_order,
            published: section.published,
            updated_at: new Date().toISOString()
          })
          .eq('id', section.id);
          
        if (error) {
          console.error(`Error updating introduction section ${section.id}:`, error);
          throw error;
        }
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
      }
      
      console.log(`Processed introduction section ${section.id}`);
    } catch (error) {
      console.error('Error persisting introduction section:', error);
      throw error;
    }
  };
  
  const persistLegacySection = async (section: SectionResponse, caseStudyId: string) => {
    try {
      // Check if section exists
      const { data } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('id', section.id)
        .maybeSingle();
      
      if (data) {
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
      
      console.log(`Processed legacy section ${section.id}`);
    } catch (error) {
      console.error('Error persisting legacy section:', error);
      throw error;
    }
  };
  
  // Function to verify sections were saved correctly
  const verifySectionSave = useCallback(async (caseStudyId: string, component: string = 'alignment') => {
    try {
      console.log(`Verifying ${component} sections for case study ${caseStudyId}`);
      
      let data;
      let error;
      
      // Query the appropriate table based on component type
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
          // Legacy table
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
        console.log(`VERIFICATION: Found ${data.length} ${component} sections in database:`, 
          data.map((section: any) => ({
            id: section.id,
            title: section.title || '[No title]',
            content: section.content ? `${section.content.substring(0, 30)}...` : '[No content]',
            image: section.image_url ? 'Present' : 'Missing'
          }))
        );
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
