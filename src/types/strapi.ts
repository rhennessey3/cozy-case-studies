
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
  
  // Mapping to your Strapi component structure
  herocomponent?: {
    id: number;
    Objective?: string;
    Approach?: string;
    Results?: string;
  };
  
  TextSectionComponent?: {
    id: number;
    text?: string;
    content?: string;
    layout?: "left" | "right" | "center" | "full";
  };
  
  sections?: {
    id: number;
    text?: string;
    content?: string;
    layout?: "left" | "right" | "center" | "full";
  }[];
  
  // Original sections field for backward compatibility
  sections_old?: StrapiCaseStudySection[];
  
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCaseStudySection {
  id: number;
  __component: string;
  title?: string;
  content?: string;
  image?: StrapiImage;
  layout?: "left" | "right" | "center" | "full";
  backgroundColor?: string;
  // Hero section specific fields
  objective?: string;
  approach?: string;
  results?: string;
  category?: string;
  coverImage?: StrapiImage;
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
