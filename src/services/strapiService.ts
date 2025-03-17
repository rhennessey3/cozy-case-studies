
import axios from 'axios';
import { StrapiResponse, StrapiCaseStudy, StrapiLegacyCaseStudyContent, StrapiCaseStudySection } from '../types/strapi';
import { caseStudies as localCaseStudies, CaseStudy } from '@/data/caseStudies';
import { toast } from '@/components/ui/use-toast';

// Get the Strapi API URL from environment variables
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

// Add debug mode to easily toggle verbose logging
const DEBUG = import.meta.env.VITE_DEBUG_MODE === 'true' || true;

// Log environment variable information on startup
console.log('==========================================');
console.log('Strapi Configuration:');
console.log(`VITE_STRAPI_API_URL env variable: ${import.meta.env.VITE_STRAPI_API_URL ? 'Set ✅' : 'Not set ❌'}`);
console.log(`Using Strapi URL: ${STRAPI_URL}`);
console.log(`API endpoint: ${API_URL}/case-studies`);
console.log(`Frontend URL: ${FRONTEND_URL}`);
console.log(`Debug mode: ${DEBUG ? 'Enabled ✅' : 'Disabled ❌'}`);
console.log('==========================================');

// Helper function to transform image URL
const getImageUrl = (image: any): string => {
  if (!image?.data) return "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800";
  
  // Handle both relative and absolute URLs
  const imageUrl = image.data.attributes.url;
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  return `${STRAPI_URL}${imageUrl}`;
};

// Helper function to transform Strapi case study to our app's format
const transformStrapiCaseStudy = (strapiData: StrapiResponse<StrapiCaseStudy>): CaseStudy[] => {
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

/**
 * Tests the connection to the Strapi CMS
 * @returns A promise that resolves to an object with connection status information
 */
export const testStrapiConnection = async () => {
  try {
    console.log(`Testing connection to Strapi CMS at ${STRAPI_URL}`);
    console.log(`Frontend URL: ${FRONTEND_URL}`);
    
    // Try hitting multiple endpoints to diagnose specific issues
    // First try without /api to see if the base URL is reachable
    try {
      await axios.get(STRAPI_URL, { 
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Origin': FRONTEND_URL
        }
      });
    } catch (baseUrlError) {
      console.log("Base URL not reachable, trying with /api path");
    }
    
    // Now try the standard /api endpoint
    const response = await axios.get(`${STRAPI_URL}/api`, { 
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Origin': FRONTEND_URL
      }
    });
    
    // If we get here, connection was successful
    console.log('✅ Successfully connected to Strapi CMS');
    toast({
      title: "Connection Successful",
      description: `Connected to Strapi CMS at ${STRAPI_URL}`,
      variant: "default"
    });
    
    return {
      success: true,
      url: STRAPI_URL,
      status: response.status,
      statusText: response.statusText,
      message: 'Successfully connected to Strapi CMS'
    };
  } catch (error) {
    console.error('❌ Failed to connect to Strapi CMS:', error);
    
    let errorMessage = 'Unknown error occurred';
    let status: string | number = 'Unknown';
    let statusText = '';
    
    if (axios.isAxiosError(error)) {
      statusText = error.message;
      errorMessage = error.message;
      status = error.response?.status?.toString() || 'Network Error';
      
      // Check if this is a CORS error
      if (error.code === 'ERR_NETWORK' || (error.message && error.message.includes('Network Error'))) {
        errorMessage = `CORS Error: Your frontend (${FRONTEND_URL}) is not allowed to access the Strapi API. Please add your frontend URL to the CORS settings in Strapi.`;
        status = 'CORS Error';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Connection timed out. Strapi CMS may be down or unreachable.';
      } else if (error.response?.status === 404) {
        // This is likely due to Strapi not being configured or the endpoint path being incorrect
        errorMessage = `404 Not Found: The Strapi API endpoint was not found at ${STRAPI_URL}/api. This could be because:
          1. The Strapi instance is not running
          2. Strapi has a different API path
          3. The URL format is incorrect (many Strapi Cloud instances use /api as their endpoint)
          
          Try checking if the URL is correct in your Strapi Cloud dashboard.`;
      } else if (error.response?.status === 403) {
        errorMessage = 'Access forbidden. Please check Strapi permissions.';
      }
    }
    
    toast({
      title: "Connection Failed",
      description: errorMessage,
      variant: "destructive"
    });
    
    return {
      success: false,
      url: STRAPI_URL,
      status,
      statusText,
      message: errorMessage
    };
  }
};

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
      if (error.code === 'ERR_NETWORK' || (error.message && error.message.includes('Network Error'))) {
        console.log('CORS Error: Your frontend is not allowed to access the Strapi API.');
        toast({
          title: "CORS Error",
          description: `Add ${FRONTEND_URL} to allowed origins in Strapi CORS settings.`,
          variant: "destructive"
        });
      } else if (status === 403) {
        console.log('Error 403: Check Strapi permissions. Make sure "find" permission is enabled for public role.');
        toast({
          title: "Permission Error",
          description: "Strapi returned a 403 Forbidden error. Please check that public permissions are enabled for case studies.",
          variant: "destructive"
        });
      } else if (status === 404) {
        console.log('Error 404: Check that the collection type "case-studies" exists in Strapi');
        toast({
          title: "API Error",
          description: "Could not find case studies in Strapi. Check your collection types.",
          variant: "destructive"
        });
      } else if (error.code === 'ECONNREFUSED') {
        console.log('Connection refused: Make sure Strapi is running at ' + STRAPI_URL);
        toast({
          title: "Connection Error",
          description: `Could not connect to Strapi at ${STRAPI_URL}. Make sure the server is running.`,
          variant: "destructive"
        });
      } else {
        console.log('Check your Strapi API settings and permissions');
        toast({
          title: "API Error",
          description: `Failed to fetch data from Strapi: ${error.message}`,
          variant: "destructive"
        });
      }
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
      const status = error.response?.status;
      console.log(`API request failed with status: ${status}`);
      console.log(`Error message: ${error.message}`);
      
      // Different toast messages based on status code
      if (error.code === 'ERR_NETWORK' || (error.message && error.message.includes('Network Error'))) {
        toast({
          title: "CORS Error",
          description: `Add ${FRONTEND_URL} to allowed origins in Strapi CORS settings.`,
          variant: "destructive"
        });
      } else if (status === 403) {
        toast({
          title: "Permission Error",
          description: "Strapi returned a 403 Forbidden error. Please check permissions for case studies.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "API Error",
          description: `Failed to fetch case study: ${error.message}`,
          variant: "destructive"
        });
      }
    }
    
    console.log(`Falling back to local case study with slug ${slug}`);
    // Fallback to local case study
    return localCaseStudies.find(study => study.slug === slug);
  }
};
