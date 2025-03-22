
export interface CarouselItem {
  title: string;
  content: string;
  image?: string;
  titleField: string;
  contentField: string;
  imageField: string;
}

export interface ParagraphItem {
  title: string;
  content: string;
  titleField: string;
  contentField: string;
}

// Simplified interface - removed legacy ordering fields
export interface SectionWithOrder {
  id: string;
  type: 'alignment' | 'carousel' | 'fourParagraphs' | 'introduction'; 
  component: string; 
  title: string;
  content: string;
  sort_order: number; // Still needed for database compatibility
  published?: boolean;
  case_study_id?: string;
  image_url?: string;
  metadata?: any;
}
