
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch case study sections from the database
 */
export const useCaseStudySections = (caseStudyId: string | undefined) => {
  const [dbSections, setDbSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSectionsFromDb = async () => {
      if (!caseStudyId) {
        console.log("No case study ID available to fetch sections");
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching sections for case study ID: ${caseStudyId}`);
        
        const { data: sections, error } = await supabase
          .from('case_study_sections')
          .select('*')
          .eq('case_study_id', caseStudyId)
          .eq('published', true)  // Only fetch published sections
          .order('sort_order', { ascending: true });
        
        if (error) {
          console.error("Error fetching case study sections:", error);
          setError(new Error(`Failed to fetch sections: ${error.message}`));
          setLoading(false);
          return;
        }
        
        console.log("Sections fetched from database:", sections);
        setDbSections(sections || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Failed to fetch sections:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    };

    setLoading(true);
    fetchSectionsFromDb();
  }, [caseStudyId]);

  return { dbSections, loading, error };
};
