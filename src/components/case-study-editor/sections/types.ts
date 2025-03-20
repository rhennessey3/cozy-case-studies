
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
  type: 'alignment' | 'carousel' | 'fourParagraphs';
  name: string;
  order: number;
}
