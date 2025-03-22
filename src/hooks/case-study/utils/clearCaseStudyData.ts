
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
 * @deprecated These functions have been removed as local storage is no longer used
 */
export const clearLocalCaseStudyData = (): void => {
  console.warn('Local storage functionality has been removed');
};

/**
 * @deprecated These functions have been removed as local storage is no longer used
 */
export const clearSpecificCaseStudy = (): void => {
  console.warn('Local storage functionality has been removed');
};
