
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
  component: string; 
  title: string;
  content: string;
  sort_order: number;
  published?: boolean;
  case_study_id?: string;
  image_url?: string;
  metadata?: any;
  name?: string; // For backward compatibility
  order?: number; // For backward compatibility
}
