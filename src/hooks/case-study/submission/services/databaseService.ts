
import { supabase } from '@/integrations/supabase/client';
import { CaseStudyForm } from '@/types/caseStudy';
import { 
  processBasicInfo, 
  processContentData, 
  processCustomSections 
} from '../processors';
import { processSectionImages } from '../../services/supabaseService';
import { checkSupabaseAuth } from '../../utils';

/**
 * Process the case study in Supabase database
 */
export const processSupabaseDatabase = async (
  form: CaseStudyForm, 
  isNew: boolean, 
  slug?: string
): Promise<{ success: boolean; slug: string; caseStudyId?: string }> => {
  try {
    const editSlug = isNew ? null : slug;
    console.log('Using slug to process:', editSlug);
    
    const { caseStudyId } = await processBasicInfo(form, editSlug);
    
    if (!caseStudyId) {
      throw new Error('Failed to process case study basic info');
    }
    
    console.log('Case study ID retrieved:', caseStudyId);
    
    await processContentData(form, caseStudyId, editSlug);
    
    await processSectionImages(form, caseStudyId);
    
    await processCustomSections(form, caseStudyId);
    
    return { success: true, slug: form.slug, caseStudyId };
  } catch (error: any) {
    console.error('Database operation error:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated with Supabase
 */
export const checkSupabaseSession = async (): Promise<boolean> => {
  return await checkSupabaseAuth();
};
