
// Re-export hooks
export { useFetchCaseStudies } from './use-fetch-case-studies';
export { useFetchCaseStudy } from './use-fetch-case-study';
export { useCaseStudyForm } from './use-case-study-form';
export { useCaseStudySubmit } from './use-case-study-submit';

// Re-export utilities
export { 
  isAdminMode, 
  mapCaseStudyToForm, 
  createNewCaseStudyForm, 
  fetchSectionImages,
  isLocalAuthMode,
  checkSupabaseAuth,
  getLocalCaseStudies,
  getLocalCaseStudyBySlug
} from './utils';

// Re-export services
export {
  fetchCaseStudyFromService,
  fetchLocalCaseStudy,
  fetchCaseStudiesFromSupabase,
  processSectionImages
} from './services';

// Re-export submission utilities
export {
  useFormSubmitHandling,
  processSupabaseDatabase,
  checkSupabaseSession
} from './submission';
