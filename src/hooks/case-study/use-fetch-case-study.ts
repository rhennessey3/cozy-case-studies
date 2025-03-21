
import { useState, useEffect, useCallback } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { CaseStudyForm } from '@/types/caseStudy';
import { isLocalAuthMode } from './utils/authUtils';
import { fetchCaseStudyFromService } from './services/caseStudyService';
import { fetchLocalCaseStudy } from './services/localCaseStudyService';
import { toast } from 'sonner';

export const useFetchCaseStudy = (slug?: string) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CaseStudyForm | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const fetchCaseStudy = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }
    
    // Reset state when slug changes to avoid showing previous data during loading
    setCaseStudy(null);
    setForm(null);
    setLoading(true);
    
    try {
      // Check if we're in local auth mode
      if (isLocalAuthMode()) {
        const { caseStudy: localCaseStudy, form: localForm } = fetchLocalCaseStudy(slug);
        
        setCaseStudy(localCaseStudy);
        setForm(localForm);
        setLoading(false);
        return;
      }
      
      // Not in local auth mode, fetch from service
      const { caseStudy: remoteCaseStudy, form: remoteForm } = await fetchCaseStudyFromService(slug);
      
      setCaseStudy(remoteCaseStudy);
      setForm(remoteForm);
    } catch (error) {
      console.error("Error fetching case study:", error);
      toast.error(`Failed to fetch case study: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Initial fetch
  useEffect(() => {
    fetchCaseStudy();
  }, [fetchCaseStudy, fetchCount]);

  // Function to manually trigger a refetch
  const refetch = useCallback(() => {
    setFetchCount(prev => prev + 1);
    return fetchCaseStudy();
  }, [fetchCaseStudy]);

  return { caseStudy, loading, form, refetch };
};
