
/**
 * @deprecated These functions are kept for compatibility only.
 * Local storage functionality has been removed.
 */

import { CaseStudy } from '@/types/caseStudy';

/**
 * @deprecated Local storage is no longer used for case studies
 */
export const getLocalCaseStudies = (): CaseStudy[] => {
  console.warn('Local storage functionality has been removed');
  return [];
};

/**
 * @deprecated Local storage is no longer used for case studies
 */
export const getLocalCaseStudyBySlug = (slug: string): CaseStudy | null => {
  console.warn('Local storage functionality has been removed');
  return null;
};
