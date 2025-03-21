
import { useState, useEffect } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { fetchCaseStudiesFromSupabase } from './services/supabaseService';

export const useFetchCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = async () => {
    setLoading(true);
    
    // Fetch from Supabase
    const supabaseCaseStudies = await fetchCaseStudiesFromSupabase();
    setCaseStudies(supabaseCaseStudies);
    setLoading(false);
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
