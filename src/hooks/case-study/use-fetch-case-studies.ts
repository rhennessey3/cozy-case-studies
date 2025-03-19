
import { useState, useEffect } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudies } from '@/services';
import { toast } from 'sonner';

export const useFetchCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
        toast.error('Failed to fetch case studies');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  return { caseStudies, loading };
};
