
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { getLocalCaseStudyBySlug } from './utils/localStorageUtils';
import { isLocalAuthMode } from './utils/authUtils';

export const useDeleteCaseStudy = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteCaseStudy = async (slug: string) => {
    if (!slug || slug === 'new') return;

    try {
      setIsDeleting(true);
      toast.loading('Deleting case study...');
      
      // Check if we're in local auth mode or if the case study exists in local storage
      const isLocalAuthOnly = isLocalAuthMode();
      const localCaseStudy = getLocalCaseStudyBySlug(slug);
      
      // Handle local storage deletion - do this for both local auth mode and when we find a local case study
      if (isLocalAuthOnly || localCaseStudy) {
        console.log(`Deleting case study from local storage: ${slug}`);
        const localCaseStudies = JSON.parse(localStorage.getItem('local_case_studies') || '[]');
        const updatedCaseStudies = localCaseStudies.filter((cs: any) => cs.slug !== slug);
        localStorage.setItem('local_case_studies', JSON.stringify(updatedCaseStudies));
        
        // If we're in local auth mode or we've successfully deleted a local case study, return success
        if (isLocalAuthOnly || (localCaseStudies.length !== updatedCaseStudies.length)) {
          toast.dismiss();
          toast.success('Case study deleted successfully');
          navigate('/admin/case-studies');
          return true;
        }
      }
      
      // If not in local auth mode, try to delete from Supabase
      if (!isLocalAuthOnly) {
        // Handle Supabase deletion
        const { data: caseStudyData, error: fetchError } = await supabase
          .from('case_studies')
          .select('id')
          .eq('slug', slug)
          .maybeSingle(); // Changed from .single() to .maybeSingle() to handle case when no rows are found

        if (fetchError) {
          throw new Error(`Failed to find case study: ${fetchError.message}`);
        }

        if (!caseStudyData?.id) {
          // If we've already handled local deletion successfully, we don't need to throw an error
          if (localCaseStudy) {
            toast.dismiss();
            toast.success('Case study deleted successfully');
            navigate('/admin/case-studies');
            return true;
          }
          throw new Error('Case study not found');
        }

        const caseStudyId = caseStudyData.id;

        // Delete case study content
        const { error: contentError } = await supabase
          .from('case_study_content')
          .delete()
          .eq('case_study_id', caseStudyId);

        if (contentError) {
          throw new Error(`Failed to delete case study content: ${contentError.message}`);
        }

        // Delete case study sections
        const { error: sectionsError } = await supabase
          .from('case_study_sections')
          .delete()
          .eq('case_study_id', caseStudyId);

        if (sectionsError) {
          throw new Error(`Failed to delete case study sections: ${sectionsError.message}`);
        }

        // Delete the case study itself
        const { error: deleteError } = await supabase
          .from('case_studies')
          .delete()
          .eq('id', caseStudyId);

        if (deleteError) {
          throw new Error(`Failed to delete case study: ${deleteError.message}`);
        }
      }

      toast.dismiss();
      toast.success('Case study deleted successfully');
      navigate('/admin/case-studies');
      return true;
    } catch (error: any) {
      toast.dismiss();
      toast.error(`Error deleting case study: ${error.message}`);
      console.error('Delete error:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    deleteCaseStudy
  };
};
