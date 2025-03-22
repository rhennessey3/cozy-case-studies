
import { toast } from 'sonner';

/**
 * Clear UI state from session storage for a specific case study
 * @param caseStudySlug The slug of the case study
 */
export const clearSectionsState = (caseStudySlug: string): void => {
  try {
    const sessionKey = `case-study-ui-state-${caseStudySlug}-open`;
    sessionStorage.removeItem(sessionKey);
    toast.success('UI state has been cleared');
    console.log('UI state has been cleared from session storage');
  } catch (error) {
    console.error('Error clearing UI state:', error);
    toast.error('Failed to clear UI state');
  }
};

/**
 * @deprecated Local storage is no longer used for case studies. Use database operations instead.
 */
export const clearLocalCaseStudyData = (): void => {
  toast.info('Local storage is no longer used for case studies');
  console.log('This function is deprecated. Data is now stored in the database.');
};

/**
 * @deprecated Local storage is no longer used for case studies. Use database operations instead.
 */
export const clearSpecificCaseStudy = (slug: string): void => {
  toast.info('Local storage is no longer used for case studies');
  console.log('This function is deprecated. Data is now stored in the database.');
};
