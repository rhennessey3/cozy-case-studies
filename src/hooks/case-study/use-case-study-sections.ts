
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch case study sections from the database
 */
export const useCaseStudySections = (caseStudyId: string | undefined, onlyPublished: boolean = true) => {
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
        console.log(`Fetching sections for case study ID: ${caseStudyId}, onlyPublished: ${onlyPublished}`);
        
        let query = supabase
          .from('case_study_sections')
          .select('*')
          .eq('case_study_id', caseStudyId)
          .order('sort_order', { ascending: true });
        
        // Only filter by published status if onlyPublished is true
        if (onlyPublished) {
          query = query.eq('published', true);
          console.log('Filtering to only include published sections');
        }
        
        const { data: sections, error } = await query;
        
        if (error) {
          console.error("Error fetching case study sections:", error);
          setError(new Error(`Failed to fetch sections: ${error.message}`));
          setLoading(false);
          return;
        }
        
        console.log(`Sections fetched from database: ${sections?.length || 0}`, sections);
        
        // Log more details about the sections
        if (sections) {
          console.log(`${onlyPublished ? 'Live Page' : 'Admin Panel'} - Sections Rendered:`, sections);
          sections.forEach(section => {
            console.log(`Section ${section.id} (${section.component}) - published: ${section.published}`);
          });
        }
        
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
  }, [caseStudyId, onlyPublished]);

  return { dbSections, loading, error };
};
