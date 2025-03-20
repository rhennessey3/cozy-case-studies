
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useDeleteCaseStudy = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteCaseStudy = async (slug: string) => {
    if (!slug || slug === 'new') return;

    try {
      setIsDeleting(true);
      toast.loading('Deleting case study...');
      
      const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
      
      if (isLocalAuthOnly) {
        // Handle local storage deletion
        const localCaseStudies = JSON.parse(localStorage.getItem('local_case_studies') || '[]');
        const updatedCaseStudies = localCaseStudies.filter((cs: any) => cs.slug !== slug);
        localStorage.setItem('local_case_studies', JSON.stringify(updatedCaseStudies));
      } else {
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
