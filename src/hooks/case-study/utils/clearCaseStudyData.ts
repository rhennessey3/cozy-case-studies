
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

/**
 * Clear data for a specific case study from local storage
 */
export const clearSpecificCaseStudy = (slug: string): void => {
  try {
    // Get current case studies
    const storedData = localStorage.getItem(LOCAL_CASE_STUDIES_KEY);
    if (!storedData) {
      toast.info('No case study data found to clear');
      return;
    }
    
    // Parse and filter out the specific case study
    const caseStudies = JSON.parse(storedData);
    const filteredStudies = caseStudies.filter((study: any) => study.slug !== slug);
    
    // Save the filtered list back to local storage
    localStorage.setItem(LOCAL_CASE_STUDIES_KEY, JSON.stringify(filteredStudies));
    
    toast.success(`Case study "${slug}" has been cleared`);
    console.log(`Case study "${slug}" has been cleared from local storage`);
  } catch (error) {
    console.error(`Error clearing case study "${slug}":`, error);
    toast.error(`Failed to clear case study "${slug}"`);
  }
};

/**
 * Clear sections state from session storage
 * This helps with debugging the sections persistence issue
 */
export const clearSectionsState = (caseStudySlug: string): void => {
  try {
    const sessionKey = `case-study-sections-${caseStudySlug}`;
    sessionStorage.removeItem(sessionKey);
    toast.success('Sections state has been cleared');
    console.log('Sections state has been cleared from session storage');
  } catch (error) {
    console.error('Error clearing sections state:', error);
    toast.error('Failed to clear sections state');
  }
};
