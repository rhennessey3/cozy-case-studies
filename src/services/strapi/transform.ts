
import { StrapiResponse, StrapiCaseStudy } from '@/types/strapi';
import { CaseStudy } from '@/data/caseStudies';
import { getImageUrl, generateContentFromSections } from './utils';
import { DEBUG } from './config';

// Helper function to transform Strapi case study to our app's format
export const transformStrapiCaseStudy = (strapiData: StrapiResponse<StrapiCaseStudy>): CaseStudy[] => {
  if (DEBUG) console.log("Raw Strapi data:", JSON.stringify(strapiData, null, 2));
  
  return strapiData.data.map(item => {
    const caseStudy = item.attributes;
    console.log("Processing case study:", caseStudy.title);
    
    // Add a hero section if not present
    const heroSectionExists = caseStudy.sections && caseStudy.sections.some(s => s.__component === 'case-study.hero');
    
    const sections = [...(caseStudy.sections || [])];
    
    if (!heroSectionExists) {
      sections.unshift({
        id: 0,
        __component: 'case-study.hero',
        // Hero uses main case study data
      });
    }
    
    // Handle both new modular sections and legacy content structure
    const content = generateContentFromSections(caseStudy.sections) || {
      intro: "",
      challenge: "",
      approach: "",
      solution: "",
      results: "",
      conclusion: ""
    };
    
    return {
      id: item.id.toString(),
      title: caseStudy.title,
      slug: caseStudy.slug,
      summary: caseStudy.summary || caseStudy.title, // Default to title if no summary
      description: caseStudy.description || undefined,
      coverImage: getImageUrl(caseStudy.coverImage),
      category: caseStudy.category || "Case Study", // Default category
      height: caseStudy.height || undefined,
      content,
      sections
    };
  });
};
