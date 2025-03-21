
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

export interface SectionWithOrder {
  id: string;
  type: 'alignment' | 'carousel' | 'fourParagraphs' | 'introduction';
  component: string; // Match SectionResponse
  title: string; // Match SectionResponse
  content: string; // Match SectionResponse
  sort_order: number; // Match SectionResponse
  published?: boolean;
  case_study_id?: string; // Match SectionResponse
  image_url?: string; // Match SectionResponse
  metadata?: any; // Match SectionResponse
}
