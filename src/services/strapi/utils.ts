
import { StrapiCaseStudySection } from '@/types/strapi';
import { STRAPI_URL, DEBUG } from './config';

// Helper function to transform image URL
export const getImageUrl = (image: any): string => {
  if (!image?.data) return "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800";
  
  // Handle both relative and absolute URLs
  const imageUrl = image.data.attributes.url;
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  return `${STRAPI_URL}${imageUrl}`;
};

// Helper to generate legacy content structure from modular sections
export const generateContentFromSections = (sections: StrapiCaseStudySection[] = []): any => {
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
