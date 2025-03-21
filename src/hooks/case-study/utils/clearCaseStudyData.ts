
import { LOCAL_CASE_STUDIES_KEY } from './localStorageUtils';
import { toast } from 'sonner';

/**
 * Clear all case study data from local storage
 */
export const clearLocalCaseStudyData = (): void => {
  try {
    localStorage.removeItem(LOCAL_CASE_STUDIES_KEY);
    
    // Clear any UI state from session storage
    const sessionKeys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('case-study-ui-state-')) {
        sessionKeys.push(key);
      }
    }
    
    sessionKeys.forEach(key => {
      sessionStorage.removeItem(key);
    });
    
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
    
    // Clear UI state from session storage
    const uiStateKey = `case-study-ui-state-${slug}-open`;
    sessionStorage.removeItem(uiStateKey);
    
    toast.success(`Case study "${slug}" has been cleared`);
    console.log(`Case study "${slug}" has been cleared from local storage`);
  } catch (error) {
    console.error(`Error clearing case study "${slug}":`, error);
    toast.error(`Failed to clear case study "${slug}"`);
  }
};

/**
 * Clear UI state from session storage
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
