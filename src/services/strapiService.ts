import axios from 'axios';
import { StrapiResponse, StrapiCaseStudy, StrapiLegacyCaseStudyContent, StrapiCaseStudySection } from '../types/strapi';
import { caseStudies as localCaseStudies, CaseStudy } from '@/data/caseStudies';

// Use the environment variable or fallback to a default URL
// This allows us to switch between development and production Strapi instances
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Add API token if available
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;
const headers = API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {};

// Helper function to transform image URL
const getImageUrl = (image: any): string => {
  if (!image?.data) return "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800";
  
  // If the URL already includes http/https, use it directly
  const imageUrl = image.data.attributes.url;
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Otherwise, prefix with STRAPI_URL
  return `${STRAPI_URL}${imageUrl}`;
};

// Helper function to transform Strapi case study to our app's format
const transformStrapiCaseStudy = (strapiData: StrapiResponse<StrapiCaseStudy>): CaseStudy[] => {
  return strapiData.data.map(item => {
    const caseStudy = item.attributes;
    
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
      summary: caseStudy.summary,
      description: caseStudy.description || undefined,
      coverImage: getImageUrl(caseStudy.coverImage),
      category: caseStudy.category,
      height: caseStudy.height || undefined,
      content,
      sections
    };
  });
};

// Helper to generate legacy content structure from modular sections
const generateContentFromSections = (sections: StrapiCaseStudySection[] = []): any => {
  if (!sections || sections.length === 0) return null;
  
  const content: any = {
    intro: "",
    challenge: "",
    approach: "",
    solution: "",
    results: "",
    conclusion: ""
  };
  
  // Map component types to content fields
  sections.forEach(section => {
    if (!section.__component) return;
    
    const type = section.__component.split('.')[1]; // Get component type after the dot
    
    switch(type) {
      case 'intro':
        content.intro = section.content || "";
        break;
      case 'challenge':
        content.challenge = section.content || "";
        break;
      case 'approach':
        content.approach = section.content || "";
        break;
      case 'solution':
        content.solution = section.content || "";
        break;
      case 'results':
        content.results = section.content || "";
        break;
      case 'conclusion':
        content.conclusion = section.content || "";
        break;
    }
  });
  
  return content;
};

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    console.log('Fetching case studies from:', `${API_URL}/case-studies`);
    const response = await axios.get<StrapiResponse<StrapiCaseStudy>>(
      `${API_URL}/case-studies?populate=coverImage,sections,sections.image`,
      { headers }
    );
    return transformStrapiCaseStudy(response.data);
  } catch (error) {
    console.error('Error fetching case studies from Strapi:', error);
    // Log details about the error for debugging
    if (axios.isAxiosError(error)) {
      console.log('API Response:', error.response?.data);
    }
    // Fallback to local case studies
    return localCaseStudies;
  }
};

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  try {
    console.log('Fetching case study with slug:', slug, 'from:', `${API_URL}/case-studies`);
    const response = await axios.get<StrapiResponse<StrapiCaseStudy>>(
      `${API_URL}/case-studies?filters[slug][$eq]=${slug}&populate=coverImage,sections,sections.image`,
      { headers }
    );
    
    if (!response.data.data || response.data.data.length === 0) {
      console.log('No case study found with slug:', slug);
      throw new Error('Case study not found');
    }
    
    const caseStudies = transformStrapiCaseStudy(response.data);
    return caseStudies[0]; // Return the first (and should be only) matching case study
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug} from Strapi:`, error);
    // Log details about the error for debugging
    if (axios.isAxiosError(error)) {
      console.log('API Response:', error.response?.data);
    }
    
    console.log('Falling back to local case study data');
    // Fallback to local case study
    return localCaseStudies.find(study => study.slug === slug);
  }
};
