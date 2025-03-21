
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionResponse } from './types/sectionTypes';

export const useSectionFetch = (caseStudyId: string | null) => {
  const [sections, setSections] = useState<SectionResponse[]>([]);
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
  
  return {
    sections,
    setSections,
    loading,
    error,
    fetchSections
  };
};
