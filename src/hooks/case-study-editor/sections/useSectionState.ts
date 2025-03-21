
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';

export const useSectionState = (caseStudyId: string | null) => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch sections from the database
  const fetchSections = useCallback(async () => {
    if (!caseStudyId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching sections:', error);
        setError(error.message);
        toast.error('Error loading sections: ' + error.message);
        setLoading(false);
        return;
      }
      
      console.log('Admin Panel - Sections Fetched:', data);
      setSections(data || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch sections:', err);
      setError('Failed to fetch sections: ' + (err instanceof Error ? err.message : String(err)));
      toast.error('Error loading sections');
      setLoading(false);
    }
  }, [caseStudyId]);
  
  // Load sections on initial render and when caseStudyId changes
  useEffect(() => {
    fetchSections();
  }, [fetchSections, caseStudyId]);
  
  // Add a new section
  const addSection = useCallback(async (componentType: string) => {
    if (!caseStudyId) {
      toast.error('Cannot add section: No case study selected');
      return;
    }
    
    // Get max sort order
    const maxSortOrder = sections.length > 0
      ? Math.max(...sections.map(s => s.sort_order || 0))
      : 0;
    
    // Create section with next sort order
    const newSection = createSection(componentType, caseStudyId, maxSortOrder + 1);
    
    try {
      const { data, error } = await supabase
        .from('case_study_sections')
        .insert(newSection)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding section:', error);
        toast.error('Error adding section: ' + error.message);
        return;
      }
      
      // Add the new section to the local state
      setSections(prev => [...prev, data]);
      toast.success(`${componentType} section added`);
      
      // Return the new section
      return data;
    } catch (err) {
      console.error('Failed to add section:', err);
      toast.error('Failed to add section');
      return null;
    }
  }, [caseStudyId, sections]);
  
  // Toggle published state for a section
  const togglePublished = useCallback(async (sectionId: string, isPublished: boolean) => {
    console.log(`Toggling Section ID: ${sectionId}, New Published State: ${isPublished}`);
    
    try {
      // Update the published state in the database
      const { error: updateError } = await supabase
        .from('case_study_sections')
        .update({ published: isPublished })
        .eq('id', sectionId);
      
      if (updateError) {
        console.error('Error updating section published state:', updateError);
        toast.error('Error updating section: ' + updateError.message);
        return false;
      }
      
      // Fetch the updated data to verify the change
      const { data, error: selectError } = await supabase
        .from('case_study_sections')
        .select('*')
        .eq('id', sectionId)
        .single();
      
      if (selectError) {
        console.error('Error verifying section update:', selectError);
        return false;
      }
      
      console.log("Updated Section Data:", data);
      
      // Update the local state
      setSections(prev => 
        prev.map(section => 
          section.id === sectionId 
            ? { ...section, published: isPublished } 
            : section
        )
      );
      
      toast.success(`Section ${isPublished ? 'published' : 'unpublished'}`);
      return true;
    } catch (err) {
      console.error('Failed to toggle published state:', err);
      toast.error('Failed to update section');
      return false;
    }
  }, []);
  
  // Remove a section
  const removeSection = useCallback(async (sectionId: string) => {
    try {
      const { error } = await supabase
        .from('case_study_sections')
        .delete()
        .eq('id', sectionId);
      
      if (error) {
        console.error('Error removing section:', error);
        toast.error('Error removing section: ' + error.message);
        return;
      }
      
      // Remove the section from local state
      setSections(prev => prev.filter(section => section.id !== sectionId));
      toast.success('Section removed');
    } catch (err) {
      console.error('Failed to remove section:', err);
      toast.error('Failed to remove section');
    }
  }, []);
  
  return {
    sections,
    loading,
    error,
    fetchSections,
    addSection,
    togglePublished,
    removeSection
  };
};
