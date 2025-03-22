
/**
 * @deprecated This module has been completely deprecated
 * All case study data is now stored in the Supabase database
 */

export const LOCAL_CASE_STUDIES_KEY = 'local_case_studies';

/**
 * @deprecated This function is no longer used
 */
export const getLocalCaseStudies = () => {
  console.warn('Local storage is no longer used for case studies');
  return [];
};

/**
 * @deprecated This function is no longer used
 */
export const getLocalCaseStudyBySlug = () => {
  console.warn('Local storage is no longer used for case studies');
  return null;
};

/**
 * @deprecated This function is no longer used
 */
export const saveLocalCaseStudy = () => {
  console.warn('Local storage is no longer used for case studies');
  return { success: false, slug: '', caseStudyId: '' };
};
