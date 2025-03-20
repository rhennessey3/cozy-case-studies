
import { caseStudies as localCaseStudies, CaseStudy } from '@/data/caseStudies';

/**
 * Get all case studies
 * @returns Promise that resolves to an array of case studies
 */
export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  // Return local case studies data
  return Promise.resolve(localCaseStudies);
};

/**
 * Get a specific case study by slug
 * @param slug The slug of the case study to retrieve
 * @returns Promise that resolves to a case study or undefined if not found
 */
export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  // Find the case study in local data
  const caseStudy = localCaseStudies.find(study => study.slug === slug);
  
  // When in admin mode and creating a new case study, we don't want to throw an error
  if (!caseStudy && window.location.pathname.includes('/admin/case-studies/')) {
    // Return a blank/default case study with the requested slug
    return Promise.resolve({
      id: "new",
      title: "",
      slug: slug,
      summary: "",
      description: "",
      coverImage: "",
      category: "",
      content: {
        intro: "",
        challenge: "",
        approach: "",
        solution: "",
        results: "",
        conclusion: ""
      }
    });
  }
  
  if (!caseStudy) {
    throw new Error(`Case study with slug "${slug}" not found`);
  }
  
  return Promise.resolve(caseStudy);
};
