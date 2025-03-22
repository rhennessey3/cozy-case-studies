
/**
 * @deprecated Local storage is no longer used for case study storage
 * All case study data is now stored in the Supabase database
 */

import { CaseStudyForm } from '@/types/caseStudy';

export const LOCAL_CASE_STUDIES_KEY = 'local_case_studies';

/**
 * @deprecated Use database functions instead
 */
export const getLocalCaseStudies = () => {
  console.warn('Local storage is no longer used for case studies');
  return [];
};

/**
 * @deprecated Use database functions instead
 */
export const getLocalCaseStudyBySlug = () => {
  console.warn('Local storage is no longer used for case studies');
  return null;
};

/**
 * @deprecated Use database functions instead
 */
export const saveLocalCaseStudy = (form: CaseStudyForm, isNew: boolean, slug?: string) => {
  console.warn('Local storage is no longer used for case studies');
  return { success: false, slug: '', caseStudyId: '' };
};
