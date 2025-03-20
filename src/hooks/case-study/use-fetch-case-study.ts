
import { useState, useEffect } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { CaseStudyForm } from '@/types/caseStudy';
import { isLocalAuthMode } from './utils/authUtils';
import { fetchCaseStudyFromService } from './services/caseStudyService';
import { fetchLocalCaseStudy } from './services/localCaseStudyService';

export const useFetchCaseStudy = (slug?: string) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CaseStudyForm | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      // Reset state when slug changes to avoid showing previous data during loading
      setCaseStudy(null);
      setForm(null);
      setLoading(true);
      
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
      setLoading(false);
    };

    fetchCaseStudy();
  }, [slug]);

  return { caseStudy, loading, form };
};
