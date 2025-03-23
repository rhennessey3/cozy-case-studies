
/**
 * @deprecated Local case study service is no longer used
 * This is maintained for compatibility with existing imports
 */

import { CaseStudy } from '@/data/caseStudies'; // Updated import path

/**
 * @deprecated Local storage is no longer used
 */
export const fetchLocalCaseStudy = async (slug: string): Promise<CaseStudy | null> => {
  console.warn('Local storage functionality has been removed');
  return null;
};
