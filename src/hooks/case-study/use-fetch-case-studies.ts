
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/data/caseStudies';
import { toast } from 'sonner';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';

const LOCAL_CASE_STUDIES_KEY = 'local_case_studies';

type CaseStudiesState = CaseStudy[];

export const useFetchCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudiesState>([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = async () => {
    setLoading(true);
    
    // Check if we're in local auth mode
    const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
    const localAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
    
    // Try to get case studies from local storage first if in local auth mode
    if (isLocalAuthOnly || localAuthState === 'true') {
      console.log('Fetching case studies from local storage');
      const localCaseStudiesString = localStorage.getItem(LOCAL_CASE_STUDIES_KEY);
      
      if (localCaseStudiesString) {
        try {
          const localCaseStudies = JSON.parse(localCaseStudiesString);
          
          // Format the local case studies to match the expected CaseStudy structure
          const formattedLocalCaseStudies = localCaseStudies.map((cs: any) => ({
            id: cs.id,
            title: cs.title,
            slug: cs.slug,
            category: cs.category || 'Uncategorized',
            summary: cs.summary || '',
            description: cs.description || '',
            coverImage: cs.coverImage || '',
            height: cs.height || '',
            content: cs.content || {
              intro: '',
              challenge: '',
              approach: '',
              solution: '',
              results: '',
              conclusion: ''
            },
            created_at: cs.created_at || new Date().toISOString()
          }));
          
          setCaseStudies(formattedLocalCaseStudies);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing local case studies:', error);
        }
      }
      
      // If no local case studies found or error occurred, return empty array
      setCaseStudies([]);
      setLoading(false);
      return;
    }
    
    // If not in local auth mode, fetch from Supabase
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('id, title, slug, category, summary, description, cover_image, height, created_at')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching case studies:', error);
        toast.error('Failed to fetch case studies');
        setCaseStudies([]);
      } else if (data) {
        // Format Supabase response to match CaseStudy type
        const formattedCaseStudies = data.map(item => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          category: item.category || 'Uncategorized',
          summary: item.summary || '',
          description: item.description || '',
          coverImage: item.cover_image || '',
          height: item.height || '',
          content: {
            intro: '',
            challenge: '',
            approach: '',
            solution: '',
            results: '',
            conclusion: ''
          }
        }));
        
        setCaseStudies(formattedCaseStudies);
      }
    } catch (error) {
      console.error('Exception fetching case studies:', error);
      toast.error('Failed to fetch case studies');
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  return {
    caseStudies,
    loading,
    refetchCaseStudies: fetchCaseStudies
  };
};
