
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch ALL case study sections from the database for admin view
 * Shows both published and unpublished sections
 */
export const useAdminCaseStudySections = (caseStudyId: string | undefined) => {
  const [dbSections, setDbSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSectionsFromDb = async () => {
      if (!caseStudyId) {
        console.log("Admin: No case study ID available to fetch sections");
        setLoading(false);
        return;
      }

      try {
        console.log(`Admin: Fetching ALL sections for case study ID: ${caseStudyId}`);
        
        const { data: sections, error } = await supabase
          .from('case_study_sections')
          .select('*')
          .eq('case_study_id', caseStudyId)
          .neq('component', 'editor_state')
          .order('sort_order', { ascending: true });
        
        if (error) {
          console.error("Admin: Error fetching case study sections:", error);
          setError(new Error(`Failed to fetch sections: ${error.message}`));
          setLoading(false);
          return;
        }
        
        console.log(`Admin: All sections fetched from database: ${sections?.length || 0}`, sections);
        
        // Log details about sections for admin view
        if (sections) {
          console.log(`Admin Panel - Sections Rendered:`, sections);
          sections.forEach(section => {
            console.log(`Admin Section ${section.id} (${section.component}) - published: ${section.published}`);
          });
        }
        
        setDbSections(sections || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Admin: Failed to fetch sections:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    };

    setLoading(true);
    fetchSectionsFromDb();
  }, [caseStudyId]);

  return { dbSections, loading, error };
};
