
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { createSection } from '@/components/case-study-editor/sections/utils/createSection';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

// Helper to convert between database component types and our application types
const mapComponentTypeToSectionType = (componentType: string): SectionWithOrder['type'] => {
  switch (componentType) {
    case 'alignment':
      return 'alignment';
    case 'carousel':
      return 'carousel';
    case 'fourParagraphs':
      return 'fourParagraphs';
    case 'introduction':
      return 'introduction';
    default:
      console.warn(`Unknown component type: ${componentType}, defaulting to 'alignment'`);
      return 'alignment';
  }
};

export const useSectionState = (caseStudyId: string | null) => {
  const [sections, setSections] = useState<any[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Toggle section open/closed state (UI only)
  const toggleSection = useCallback((id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);
  
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
    
    // Convert the string componentType to a valid section type
    const sectionType = mapComponentTypeToSectionType(componentType);
    
    // Create section with next sort order
    const newSection = createSection(sectionType, maxSortOrder + 1);
    
    // Convert SectionWithOrder to the database format
    const dbSection = {
      case_study_id: caseStudyId,
      component: componentType,
      title: newSection.name,
      sort_order: newSection.order,
      published: newSection.published,
      content: '',
    };
    
    try {
      const { data, error } = await supabase
        .from('case_study_sections')
        .insert(dbSection)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding section:', error);
        toast.error('Error adding section: ' + error.message);
        return;
      }
      
      // Add the new section to the local state
      setSections(prev => [...prev, data]);
      
      // Auto-open the new section
      setOpenSections(prev => ({
        ...prev,
        [data.id]: true
      }));
      
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
      
      // Remove from open sections state
      setOpenSections(prev => {
        const updated = { ...prev };
        delete updated[sectionId];
        return updated;
      });
      
      toast.success('Section removed');
    } catch (err) {
      console.error('Failed to remove section:', err);
      toast.error('Failed to remove section');
    }
  }, []);
  
  // Move a section up or down
  const moveSection = useCallback(async (sectionId: string, direction: 'up' | 'down') => {
    const sectionsList = [...sections];
    const sectionIndex = sectionsList.findIndex(s => s.id === sectionId);
    
    if (sectionIndex === -1) {
      toast.error('Section not found');
      return;
    }
    
    // Cannot move up if already at the top
    if (direction === 'up' && sectionIndex === 0) return;
    
    // Cannot move down if already at the bottom
    if (direction === 'down' && sectionIndex === sectionsList.length - 1) return;
    
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    const section = sectionsList[sectionIndex];
    const targetSection = sectionsList[targetIndex];
    
    // Swap sort orders
    const tempOrder = section.sort_order;
    
    try {
      // Update the current section
      const { error: error1 } = await supabase
        .from('case_study_sections')
        .update({ sort_order: targetSection.sort_order })
        .eq('id', section.id);
      
      if (error1) {
        console.error('Error updating section order:', error1);
        toast.error('Error reordering sections');
        return;
      }
      
      // Update the target section
      const { error: error2 } = await supabase
        .from('case_study_sections')
        .update({ sort_order: tempOrder })
        .eq('id', targetSection.id);
      
      if (error2) {
        console.error('Error updating section order:', error2);
        toast.error('Error reordering sections');
        return;
      }
      
      // Update the local state
      section.sort_order = targetSection.sort_order;
      targetSection.sort_order = tempOrder;
      sectionsList.sort((a, b) => a.sort_order - b.sort_order);
      setSections(sectionsList);
      
      toast.success(`Section moved ${direction}`);
    } catch (err) {
      console.error('Failed to move section:', err);
      toast.error('Failed to reorder sections');
    }
  }, [sections]);
  
  // Alias for togglePublished to match legacy interface
  const toggleSectionPublished = togglePublished;
  
  return {
    sections,
    openSections,
    toggleSection,
    loading,
    error,
    fetchSections,
    addSection,
    togglePublished,
    removeSection,
    moveSection,
    toggleSectionPublished
  };
};
