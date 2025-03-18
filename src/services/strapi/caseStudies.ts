
import axios from 'axios';
import { StrapiResponse, StrapiCaseStudy } from '@/types/strapi';
import { caseStudies as localCaseStudies, CaseStudy } from '@/data/caseStudies';
import { toast } from '@/components/ui/use-toast';
import { API_URL, FRONTEND_URL, DEBUG } from './config';
import { transformStrapiCaseStudy } from './transform';
import { displayConnectionError } from './config';

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    if (DEBUG) console.log(`Fetching case studies from ${API_URL}/case-studies`);
    
    const response = await axios.get<StrapiResponse<StrapiCaseStudy>>(
      `${API_URL}/case-studies?populate=coverImage,sections,sections.image`,
      {
        headers: {
          'Origin': FRONTEND_URL
        }
      }
    );
    
    if (DEBUG) console.log(`Retrieved ${response.data.data.length} case studies from Strapi`);
    
    return transformStrapiCaseStudy(response.data);
  } catch (error) {
    console.error('Error fetching case studies from Strapi:', error);
    
    // Show more helpful error message and toast notification
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.log(`API request failed with status: ${status}`);
      console.log(`Error message: ${error.message}`);
      
      // Different error messages based on status code
      displayConnectionError(error);
    }
    
    console.log('Falling back to local case studies data');
    // Fallback to local case studies
    return localCaseStudies;
  }
};

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  try {
    if (DEBUG) console.log(`Fetching case study with slug "${slug}" from Strapi`);
    
    const response = await axios.get<StrapiResponse<StrapiCaseStudy>>(
      `${API_URL}/case-studies?filters[slug][$eq]=${slug}&populate=coverImage,sections,sections.image`,
      {
        headers: {
          'Origin': FRONTEND_URL
        }
      }
    );
    
    if (DEBUG) {
      console.log(`Retrieved case study data for slug "${slug}"`);
      if (response.data.data.length === 0) {
        console.log('No matching case study found in Strapi');
      }
    }
    
    const caseStudies = transformStrapiCaseStudy(response.data);
    return caseStudies[0]; // Return the first (and should be only) matching case study
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug} from Strapi:`, error);
    
    // Show more helpful error message and toast notification
    if (axios.isAxiosError(error)) {
      displayConnectionError(error);
    }
    
    console.log(`Falling back to local case study with slug ${slug}`);
    // Fallback to local case study
    return localCaseStudies.find(study => study.slug === slug);
  }
};
