
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SectionResponse } from './types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook for persisting sections to Supabase
 */
export const useSectionStorage = (caseStudyId: string | null) => {
  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch sections from Supabase
  const fetchSections = useCallback(async () => {
    if (!caseStudyId) {
      console.log('useSectionStorage: No caseStudyId provided, setting empty sections');
      setIsLoading(false);
      setSections([]);
      return;
    }
    
    console.log(`useSectionStorage: Fetching sections for case study ${caseStudyId}`);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('useSectionStorage: Error fetching sections from database:', error);
        setError(error.message);
        setIsLoading(false);
        return;
      }
      
      console.log(`useSectionStorage: Fetched ${data?.length || 0} sections from database`);
      if (data && data.length > 0) {
        console.log('useSectionStorage: First few sections:', data.slice(0, 2));
        
        // Look for alignment sections specifically
        const alignmentSections = data.filter(section => section.component === 'alignment');
        if (alignmentSections.length > 0) {
          console.log('ALIGNMENT SECTIONS FOUND:', alignmentSections.map(section => ({
            id: section.id,
            title: section.title,
            content_length: section.content?.length || 0,
            content_preview: section.content?.substring(0, 50) + (section.content?.length > 50 ? '...' : ''),
            image: section.image_url ? 'Present' : 'Missing',
            metadata: section.metadata
          })));
        }
      }
      setSections(data || []);
    } catch (err) {
      console.error('useSectionStorage: Exception fetching sections:', err);
      setError('Failed to fetch sections');
    } finally {
      setIsLoading(false);
    }
  }, [caseStudyId]);
  
  // Initial load of sections
  useEffect(() => {
    console.log('useSectionStorage: Initial load effect triggered');
    fetchSections();
  }, [fetchSections]);
  
  // Save sections to Supabase
  const persistSections = useCallback(async (updatedSections: SectionResponse[]) => {
    if (!caseStudyId) {
      console.warn('useSectionStorage: Cannot save sections: No case study ID provided');
      return;
    }
    
    console.log(`useSectionStorage: Saving ${updatedSections.length} sections to database`);
    
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
      
      // Delete sections that are no longer needed
      if (sectionsToDelete && sectionsToDelete.length > 0) {
        console.log(`useSectionStorage: Deleting ${sectionsToDelete.length} removed sections`);
        
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
      
      // Process each section individually to avoid race conditions
      for (const [index, section] of updatedSections.entries()) {
        // Check if section exists
        const { data: existingSection } = await supabase
          .from('case_study_sections')
          .select('id, content, title')
          .eq('id', section.id)
          .maybeSingle();
        
        const sectionData = {
          ...section,
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
          
          // Update existing section
          const { error: updateError } = await supabase
            .from('case_study_sections')
            .update(sectionData)
            .eq('id', section.id);
            
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
      
      console.log('useSectionStorage: All sections saved successfully');
      
      // Verify storage by immediately fetching alignment sections
      const { data: verifiedSections, error: verifyError } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .eq('component', 'alignment');
        
      if (verifyError) {
        console.error('Verification error:', verifyError);
      } else if (verifiedSections) {
        console.log('VERIFICATION: Alignment sections in database after save:', verifiedSections.map(section => ({
          id: section.id,
          title: section.title,
          content_length: section.content?.length || 0,
          content_preview: section.content?.substring(0, 50) + (section.content?.length > 50 ? '...' : ''),
          image: section.image_url ? 'Present' : 'Missing',
          metadata: section.metadata
        })));
      }
      
      // Refresh sections after successful save
      await fetchSections();
    } catch (err) {
      console.error('useSectionStorage: Exception saving sections:', err);
      toast.error('Error saving sections to database');
      setError('Failed to save sections');
    }
  }, [caseStudyId, fetchSections]);
  
  // Implement a refresh function
  const refresh = useCallback(() => {
    console.log('useSectionStorage: Refreshing sections from database');
    fetchSections();
  }, [fetchSections]);
  
  return {
    sections,
    setSections: persistSections,
    isLoading,
    error,
    refresh
  };
};
