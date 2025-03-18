
// This file re-exports the refactored strapi service functions
// for backward compatibility

import { testStrapiConnection } from './strapi/connectionTest';
import { getCaseStudies, getCaseStudyBySlug } from './strapi/caseStudies';

// Re-export functions to maintain the same API
export { 
  testStrapiConnection,
  getCaseStudies,
  getCaseStudyBySlug
};
