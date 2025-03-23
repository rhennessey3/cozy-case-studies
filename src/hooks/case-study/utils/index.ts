
export { isAdminMode, mapCaseStudyToForm, createNewCaseStudyForm, fetchSectionImages } from './fetchUtils';
export { isLocalAuthMode, checkSupabaseAuth } from './authUtils';
export { isAdminRoute } from '../../isAdminRoute';

/**
 * @deprecated These imports are maintained for backwards compatibility only
 * They no longer provide actual functionality as local storage is not used
 */
export { getLocalCaseStudies, getLocalCaseStudyBySlug } from './localStorageUtils';
