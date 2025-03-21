
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';

export interface SectionResponse {
  id: string;
  case_study_id: string;
  component: string;
  title: string;
  content: string;
  sort_order: number;
  published: boolean;
  image_url?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
}

export interface UseSectionStateReturn {
  sections: SectionResponse[];
  openSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  loading: boolean;
  error: string | null;
  fetchSections: () => Promise<void>;
  addSection: (componentType: string) => Promise<SectionResponse | null>;
  togglePublished: (sectionId: string, isPublished: boolean) => Promise<boolean>;
  removeSection: (sectionId: string) => Promise<void>;
  moveSection: (sectionId: string, direction: 'up' | 'down') => Promise<void>;
  toggleSectionPublished: (sectionId: string, isPublished: boolean) => Promise<boolean>;
}
