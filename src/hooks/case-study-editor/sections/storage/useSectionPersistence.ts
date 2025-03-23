
import { supabase } from '@/integrations/supabase/client';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook for persisting sections to Supabase
 * This handles the actual database operations
 */
export const useSectionPersistence = () => {
  /**
   * Persist all sections to Supabase
   */
  const persistSections = async (sections: SectionResponse[], caseStudyId: string): Promise<boolean> => {
    if (!sections || sections.length === 0) {
      console.log('No sections to persist');
      return true;
    }
    
    console.log(`useSectionPersistence: Saving ${sections.length} sections to database`);
    
    // Check for alignment sections specifically to debug
    const alignmentSections = sections.filter(section => section.component === 'alignment');
    if (alignmentSections.length > 0) {
      console.log('ALIGNMENT SECTIONS BEFORE SAVE:', alignmentSections.map(section => ({
        id: section.id,
        title: section.title,
        content_length: section.content?.length || 0,
        content_preview: section.content ? (section.content.substring(0, 50) + '...') : '[Empty content]',
        image: section.image_url ? 'Present' : 'Missing',
        metadata: section.metadata
      })));
    }
    
    // Process each section individually
    for (const section of sections) {
      console.log(`Saving section ${section.id} (${section.component})`);
      
      try {
        if (section.component === 'alignment') {
          await persistAlignmentSection(section, caseStudyId);
        } else {
          // For all other section types, save to the general sections table
          await persistGeneralSection(section, caseStudyId);
        }
      } catch (error) {
        console.error(`Error persisting section ${section.id}:`, error);
        return false;
      }
    }
    
    console.log('useSectionPersistence: All sections saved successfully');
    return true;
  };
  
  /**
   * Persist an alignment section to the dedicated table or legacy table
   */
  const persistAlignmentSection = async (section: SectionResponse, caseStudyId: string) => {
    console.log(`Persisting alignment section with title: "${section.title}"`);
    
    // Check if alignment specific data is available
    const alignment = section.metadata?.alignment || 'left';
    
    try {
      // First try to save to dedicated alignment table
      const { error } = await supabase
        .from('case_study_alignment_sections')
        .upsert({
          id: section.id,
          case_study_id: caseStudyId,
          title: section.title, // Use the title directly from the section
          content: section.content || '',
          image_url: section.image_url || '',
          alignment: alignment,
          sort_order: section.sort_order,
          published: section.published !== false,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
        
      if (error) {
        console.warn('Failed to save to dedicated alignment table, falling back to legacy table:', error);
        
        // Fallback to legacy table
        const { error: legacyError } = await supabase
          .from('case_study_sections')
          .upsert({
            id: section.id,
            case_study_id: caseStudyId,
            component: 'alignment',
            title: section.title, // Use the title directly from the section
            content: section.content || '',
            image_url: section.image_url || '',
            sort_order: section.sort_order,
            published: section.published !== false,
            metadata: { alignment }
          }, { onConflict: 'id' });
          
        if (legacyError) {
          throw new Error(`Failed to save alignment section to legacy table: ${legacyError.message}`);
        }
      }
      
      console.log(`Updated alignment section ${section.id} with title "${section.title}"`);
      return true;
    } catch (error) {
      console.error('Error in persistAlignmentSection:', error);
      throw error;
    }
  };
  
  /**
   * Persist a general section to the legacy table
   */
  const persistGeneralSection = async (section: SectionResponse, caseStudyId: string) => {
    console.log(`Persisting ${section.component} section with title: "${section.title}"`);
    
    try {
      const { error } = await supabase
        .from('case_study_sections')
        .upsert({
          id: section.id,
          case_study_id: caseStudyId,
          component: section.component,
          title: section.title,
          content: section.content || '',
          image_url: section.image_url || '',
          sort_order: section.sort_order,
          published: section.published !== false,
          metadata: section.metadata || {}
        }, { onConflict: 'id' });
        
      if (error) {
        throw new Error(`Failed to save ${section.component} section: ${error.message}`);
      }
      
      console.log(`Updated ${section.component} section ${section.id}`);
      return true;
    } catch (error) {
      console.error(`Error in persistGeneralSection for ${section.component}:`, error);
      throw error;
    }
  };
  
  /**
   * Verify that a section type was saved correctly
   */
  const verifySectionSave = async (caseStudyId: string, component: string = 'alignment') => {
    console.log(`Verifying ${component} sections for case study ${caseStudyId}`);
    
    try {
      if (component === 'alignment') {
        // First check dedicated alignment table
        const { data: alignmentSections, error: alignmentError } = await supabase
          .from('case_study_alignment_sections')
          .select('id, title, content, alignment, image_url')
          .eq('case_study_id', caseStudyId);
          
        if (!alignmentError && alignmentSections && alignmentSections.length > 0) {
          console.log('VERIFICATION: Found', alignmentSections.length, 'alignment sections in database:', alignmentSections.map(section => ({
            id: section.id,
            title: section.title || '[No title]',
            content: section.content ? section.content.substring(0, 20) + '...' : '[No content]',
            image: section.image_url ? 'Present' : 'Missing'
          })));
          
          return alignmentSections;
        }
      }
      
      // Fallback to legacy table for any component type
      const { data: sections, error } = await supabase
        .from('case_study_sections')
        .select('id, title, content, component, image_url, metadata')
        .eq('case_study_id', caseStudyId)
        .eq('component', component);
        
      if (error) {
        console.error(`Error verifying ${component} sections:`, error);
        return null;
      }
      
      console.log(`VERIFICATION: Found ${sections?.length || 0} ${component} sections in legacy table:`, sections);
      return sections;
    } catch (err) {
      console.error(`Error in verifySectionSave for ${component}:`, err);
      return null;
    }
  };
  
  return {
    persistSections,
    verifySectionSave
  };
};
