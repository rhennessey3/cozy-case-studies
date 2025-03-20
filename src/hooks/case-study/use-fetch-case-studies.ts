
import { useState, useEffect, useCallback } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudies } from '@/services';
import { toast } from 'sonner';

export const useFetchCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCaseStudies();
      setCaseStudies(data);
    } catch (error) {
      console.error('Failed to fetch case studies:', error);
      toast.error('Failed to fetch case studies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  return { 
    caseStudies, 
    loading,
    refetchCaseStudies: fetchCaseStudies
  };
};
