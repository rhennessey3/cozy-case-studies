
import axios from 'axios';
import { StrapiResponse, StrapiCaseStudy } from '../types/strapi';
import { caseStudies as localCaseStudies, CaseStudy } from '@/data/caseStudies';

// You should replace this with your actual Strapi API URL
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Helper function to transform Strapi case study to our app's format
const transformStrapiCaseStudy = (strapiData: StrapiResponse<StrapiCaseStudy>): CaseStudy[] => {
  return strapiData.data.map(item => {
    const caseStudy = item.attributes;
    return {
      id: item.id.toString(),
      title: caseStudy.title,
      slug: caseStudy.slug,
      summary: caseStudy.summary,
      description: caseStudy.description || undefined,
      // Handle image URL (assuming Strapi is hosted at STRAPI_URL)
      coverImage: caseStudy.coverImage?.data?.attributes?.url 
        ? `${STRAPI_URL}${caseStudy.coverImage.data.attributes.url}`
        : "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      category: caseStudy.category,
      height: caseStudy.height || undefined,
      content: {
        intro: caseStudy.content.intro,
        challenge: caseStudy.content.challenge,
        approach: caseStudy.content.approach,
        solution: caseStudy.content.solution,
        results: caseStudy.content.results,
        conclusion: caseStudy.content.conclusion,
      }
    };
  });
};

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    const response = await axios.get<StrapiResponse<StrapiCaseStudy>>(
      `${API_URL}/case-studies?populate=coverImage`
    );
    return transformStrapiCaseStudy(response.data);
  } catch (error) {
    console.error('Error fetching case studies from Strapi:', error);
    // Fallback to local case studies
    return localCaseStudies;
  }
};

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  try {
    const response = await axios.get<StrapiResponse<StrapiCaseStudy>>(
      `${API_URL}/case-studies?filters[slug][$eq]=${slug}&populate=coverImage`
    );
    const caseStudies = transformStrapiCaseStudy(response.data);
    return caseStudies[0]; // Return the first (and should be only) matching case study
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug} from Strapi:`, error);
    // Fallback to local case study
    return localCaseStudies.find(study => study.slug === slug);
  }
};
