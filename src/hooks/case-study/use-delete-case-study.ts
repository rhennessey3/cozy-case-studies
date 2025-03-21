
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { isLocalAuthMode } from './utils/authUtils';

export const useDeleteCaseStudy = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteCaseStudy = async (slug: string) => {
    if (!slug || slug === 'new') return;

    try {
      setIsDeleting(true);
      // Use a specific message and ID to distinguish from section deletion
      const toastId = `delete-case-study-${slug}`;
      toast.loading('Deleting entire case study...', { id: toastId });
      
      // Since we're only using Supabase now, we can skip the local storage checks
      
      // Handle Supabase deletion
      const { data: caseStudyData, error: fetchError } = await supabase
        .from('case_studies')
        .select('id')
        .eq('slug', slug)
        .maybeSingle(); // Using maybeSingle() to handle case when no rows are found

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

      toast.dismiss(toastId);
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
