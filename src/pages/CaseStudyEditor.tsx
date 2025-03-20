
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCaseStudyEditor } from '@/hooks/use-case-study-editor';
import CaseStudySidebar from '@/components/case-study-editor/CaseStudySidebar';
import CaseStudyEditorHeader from '@/components/case-study-editor/CaseStudyEditorHeader';
import CaseStudyEditorContent from '@/components/case-study-editor/CaseStudyEditorContent';
import CaseStudyEditorLayout from '@/components/case-study-editor/CaseStudyEditorLayout';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';
import { supabase } from '@/integrations/supabase/client';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CaseStudyEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Check local authentication as a fallback
  const isLocallyAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
  
  // User is authenticated if they're authenticated via context OR locally authenticated in local auth mode
  const effectivelyAuthenticated = isAuthenticated || (isLocalAuthOnly && isLocallyAuthenticated) || isLocallyAuthenticated;
  
  useEffect(() => {
    // If not authenticated at all, redirect to login
    if (!effectivelyAuthenticated) {
      navigate('/admin/login');
      toast.error('You must be logged in to access this page');
    }
  }, [effectivelyAuthenticated, navigate]);
  
  const {
    loading,
    saving,
    caseStudy,
    caseStudies,
    caseStudiesLoading,
    form,
    handleChange,
    handleContentChange,
    handleImageUploaded,
    handleSubmit,
    createNewCaseStudy
  } = useCaseStudyEditor(slug);
  
  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
    toast('Logged out successfully');
  };

  const handleViewLive = () => {
    if (slug) {
      window.open(`/case-studies/${slug}`, '_blank');
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!slug || slug === 'new') return;

    try {
      toast.loading('Deleting case study...');
      
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
          .single();

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
    } catch (error: any) {
      toast.dismiss();
      toast.error(`Error deleting case study: ${error.message}`);
      console.error('Delete error:', error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  // Create the dynamic heading text based on the current case study or "new" state
  const getHeadingText = () => {
    if (loading) return 'LOADING...';
    if (slug === 'new') return 'CREATE CASE STUDY';
    return form?.title ? `EDIT: ${form.title.toUpperCase()}` : 'EDIT CASE STUDY';
  };

  // If not authenticated, content will handle redirection
  if (!effectivelyAuthenticated) {
    return (
      <CaseStudyEditorLayout>
        <div className="py-8 flex justify-center items-center">
          <Loader2 size={24} className="animate-spin text-primary" />
        </div>
      </CaseStudyEditorLayout>
    );
  }

  return (
    <CaseStudyEditorLayout>
      <CaseStudyEditorHeader 
        headingText={getHeadingText()}
        onViewLive={handleViewLive}
        onLogout={handleLogout}
        onDelete={handleDeleteClick}
        showViewLive={!!slug && slug !== 'new'}
        showDelete={!!slug && slug !== 'new'}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
        <div className="md:col-span-1">
          {caseStudiesLoading ? (
            <div className="bg-gray-50 p-4 rounded-lg flex justify-center items-center h-40">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <CaseStudySidebar 
              caseStudies={caseStudies} 
              currentSlug={slug} 
              onCreateNew={createNewCaseStudy}
            />
          )}
        </div>
        
        <div className="md:col-span-3">
          <CaseStudyEditorContent
            loading={loading}
            saving={saving}
            form={form}
            slug={slug}
            handleChange={handleChange}
            handleContentChange={handleContentChange}
            handleImageUploaded={handleImageUploaded}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this case study?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the case study and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CaseStudyEditorLayout>
  );
};

export default CaseStudyEditor;
