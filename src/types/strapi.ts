
export interface StrapiResponse<T> {
  data: StrapiData<T>[];
  meta: StrapiMeta;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          url: string;
        };
        small: {
          url: string;
        };
        medium: {
          url: string;
        };
        large: {
          url: string;
        };
      };
    };
  };
}

export interface StrapiCaseStudy {
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  coverImage: StrapiImage;
  category: string;
  height: string | null;
  sections: StrapiCaseStudySection[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCaseStudySection {
  id: number;
  __component: string;
  
  // Hero component fields
  objectiveheading?: string;
  approachheading?: string;
  resultsheading?: string;
  casestudytitle?: string;
  objectiveparagraph?: string;
  approachparagraph?: string;
  resultsparagraph?: string;
  
  // Introduction component fields
  introductionHeading?: string;
  introductionSubheading?: string;
  introductionBodyContent?: string;
  layout?: "left" | "right" | "center" | "full";
  
  // Text with photo fields (left or right aligned)
  textleftalignedHeading?: string;
  textleftalignedBodyContent?: string;
  textleftalignedPhoto?: StrapiImage;
  altbackgroundcolor?: boolean;
  
  // Slider component fields
  casestudysliderprimaryheading?: string;
  casestudyslidercontent?: {
    casestudysliderphoto?: StrapiImage;
    caststudysliderheading?: string;
    casestudysliderbodycontent?: string;
  }[];
  
  // Four small paragraphs component fields
  primaryheadingfoursmallparagraphs?: string;
  heading1?: string;
  paragraph1?: string;
  heading2?: string;
  paragraph2?: string;
  heading3?: string;
  paragraph3?: string;
  heading4?: string;
  paragraph4?: string;
  fourheadingphoto?: StrapiImage;
  
  // Generic fields for all components
  title?: string;
  content?: string;
  image?: StrapiImage;
  backgroundColor?: string;
}

// For backward compatibility
export interface StrapiLegacyCaseStudyContent {
  intro: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string;
  conclusion: string;
}
