
import { useState, useEffect } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { isLocalAuthMode } from './utils/authUtils';
import { getLocalCaseStudies } from './utils/localStorageUtils';
import { fetchCaseStudiesFromSupabase } from './services/supabaseService';

export const useFetchCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = async () => {
    setLoading(true);
    
    // Check if we're in local auth mode
    if (isLocalAuthMode()) {
      console.log('Fetching case studies from local storage');
      const localCaseStudies = getLocalCaseStudies();
      setCaseStudies(localCaseStudies);
      setLoading(false);
      return;
    }
    
    // If not in local auth mode, fetch from Supabase
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
