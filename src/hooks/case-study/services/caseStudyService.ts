
import { CaseStudy } from '@/data/caseStudies';
import { CaseStudyForm } from '@/types/caseStudy';
import { getCaseStudyBySlug } from '@/services';
import { toast } from 'sonner';
import { fetchSectionImages, mapCaseStudyToForm, createNewCaseStudyForm, isAdminMode } from '../utils/fetchUtils';

/**
 * Fetch a case study from API via service
 */
export const fetchCaseStudyFromService = async (slug: string): Promise<{
  caseStudy: CaseStudy | null;
  form: CaseStudyForm | null;
}> => {
  try {
    const data = await getCaseStudyBySlug(slug);
    
    if (!data) {
      return { caseStudy: null, form: null };
    }
    
    // Check if we're in admin mode with a new case study
    if (data.id === "new" && isAdminMode()) {
      const form = mapCaseStudyToForm(data);
      return { caseStudy: data, form };
    }
    
    // For existing case studies, get section images
    const sectionImages = await fetchSectionImages(data.id);
    const form = mapCaseStudyToForm(data, sectionImages);
    
    return { caseStudy: data, form };
  } catch (error: any) {
    console.error('Failed to fetch case study:', error);
    
    // Only show toast error if not in admin mode with a new case study
    if (!isAdminMode()) {
      toast.error('Failed to fetch case study');
    }
    
    // For admin mode with a new case study, return empty form
    if (isAdminMode()) {
      const emptyForm = createNewCaseStudyForm();
      if (slug) {
        emptyForm.slug = slug;
      }
      return { caseStudy: null, form: emptyForm };
    }
    
    return { caseStudy: null, form: null };
  }
};
