
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch only PUBLISHED case study sections from the database for public view
 */
export const usePublicCaseStudySections = (caseStudyId: string | undefined) => {
  const [dbSections, setDbSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSectionsFromDb = async () => {
      if (!caseStudyId) {
        console.log("Public: No case study ID available to fetch sections");
        setLoading(false);
        return;
      }

      try {
        console.log(`Public: Fetching PUBLISHED sections for case study ID: ${caseStudyId}`);
        
        const { data: sections, error } = await supabase
          .from('case_study_sections')
          .select('*')
          .eq('case_study_id', caseStudyId)
          .eq('published', true)
          .neq('component', 'editor_state')
          .order('sort_order', { ascending: true });
        
        if (error) {
          console.error("Public: Error fetching published case study sections:", error);
          setError(new Error(`Failed to fetch published sections: ${error.message}`));
          setLoading(false);
          return;
        }
        
        console.log(`Public: Published sections fetched from database: ${sections?.length || 0}`, sections);
        
        // Log details about sections for public view
        if (sections) {
          console.log(`Live Page - Sections Rendered:`, sections);
          sections.forEach(section => {
            console.log(`Published Section ${section.id} (${section.component})`);
          });
        }
        
        setDbSections(sections || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Public: Failed to fetch published sections:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    };

    setLoading(true);
    fetchSectionsFromDb();
  }, [caseStudyId]);

  return { dbSections, loading, error };
};
