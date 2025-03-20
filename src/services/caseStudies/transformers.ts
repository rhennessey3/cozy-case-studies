
import { CaseStudy } from '@/data/caseStudies';

/**
 * Transforms raw case study data from Supabase into our CaseStudy type
 */
export const transformCaseStudyData = (data: any): CaseStudy => {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    description: data.description || '',
    coverImage: data.cover_image,
    category: data.category,
    height: data.height || '',
    content: data.case_study_content?.[0] ? {
      intro: data.case_study_content[0].intro || '',
      challenge: data.case_study_content[0].challenge || '',
      approach: data.case_study_content[0].approach || '',
      solution: data.case_study_content[0].solution || '',
      results: data.case_study_content[0].results || '',
      conclusion: data.case_study_content[0].conclusion || ''
    } : {
      intro: '',
      challenge: '',
      approach: '',
      solution: '',
      results: '',
      conclusion: ''
    },
    customSections: data.customSections || "[]" // Adding customSections property
  };
};
