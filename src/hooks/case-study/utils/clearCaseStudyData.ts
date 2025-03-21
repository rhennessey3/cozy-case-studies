
import { LOCAL_CASE_STUDIES_KEY } from './localStorageUtils';
import { toast } from 'sonner';

/**
 * Clear all case study data from local storage
 */
export const clearLocalCaseStudyData = (): void => {
  try {
    localStorage.removeItem(LOCAL_CASE_STUDIES_KEY);
    toast.success('All local case study data has been cleared');
    console.log('All local case study data has been cleared');
  } catch (error) {
    console.error('Error clearing local case study data:', error);
    toast.error('Failed to clear local case study data');
  }
};
