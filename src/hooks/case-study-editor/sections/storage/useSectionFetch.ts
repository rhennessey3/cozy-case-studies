
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SectionResponse } from '../types/sectionTypes';
import { toast } from 'sonner';

/**
 * Hook for fetching sections from Supabase
 */
export const useSectionFetch = (caseStudyId: string | null) => {
  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch sections from Supabase
  const fetchSections = useCallback(async () => {
    if (!caseStudyId) {
      console.log('useSectionFetch: No caseStudyId provided, setting empty sections');
      setIsLoading(false);
      setSections([]);
      return;
    }
    
    console.log(`useSectionFetch: Fetching sections for case study ${caseStudyId}`);
    setIsLoading(true);
    
    try {
      // We'll now fetch from the view that combines all section types
      const { data, error } = await supabase
        .from('case_study_sections_view')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('useSectionFetch: Error fetching sections from database:', error);
        setError(error.message);
        setIsLoading(false);
        return;
      }
      
      console.log(`useSectionFetch: Fetched ${data?.length || 0} sections from database`);
      if (data && data.length > 0) {
        console.log('useSectionFetch: First few sections:', data.slice(0, 2));
        
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
      
      // Convert the data to SectionResponse objects
      const sectionsData: SectionResponse[] = data ? data.map(item => ({
        id: item.id,
        case_study_id: item.case_study_id,
        component: item.component,
        title: item.title || '',
        content: item.content || '',
        sort_order: item.sort_order,
        published: item.published !== false, // default to true if null
        image_url: item.image_url || '',
        metadata: item.metadata || {},
        created_at: item.created_at,
        updated_at: item.updated_at
      })) : [];
      
      setSections(sectionsData);
    } catch (err) {
      console.error('useSectionFetch: Exception fetching sections:', err);
      setError('Failed to fetch sections');
    } finally {
      setIsLoading(false);
    }
  }, [caseStudyId]);
  
  return {
    sections,
    isLoading,
    error,
    fetchSections
  };
};
