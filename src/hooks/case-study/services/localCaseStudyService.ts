
import { CaseStudyForm } from '@/types/caseStudy';
import { createNewCaseStudyForm } from '../utils/fetchUtils';

/**
 * @deprecated This service has been deprecated in favor of database storage
 * It is kept only for backward compatibility and will be removed in a future release
 */
export const fetchLocalCaseStudy = (slug: string): {
  caseStudy: null;
  form: CaseStudyForm | null;
} => {
  console.warn('Local storage service is deprecated: Use database service instead');
  
  // For new case studies, return empty form
  if (slug === 'new') {
    return { 
      caseStudy: null, 
      form: createNewCaseStudyForm()
    };
  }
  
  // Return null for all other cases
  return { caseStudy: null, form: null };
};
