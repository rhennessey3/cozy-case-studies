
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useCaseStudyEditor } from '@/hooks/use-case-study-editor';
import CaseStudySidebar from '@/components/case-study-editor/CaseStudySidebar';
import CaseStudyEditorHeader from '@/components/case-study-editor/CaseStudyEditorHeader';
import CaseStudyEditorContent from '@/components/case-study-editor/CaseStudyEditorContent';
import CaseStudyEditorLayout from '@/components/case-study-editor/CaseStudyEditorLayout';

const CaseStudyEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const {
    loading,
    saving,
    caseStudies,
    caseStudiesLoading,
    form,
    handleChange,
    handleContentChange,
    handleImageUploaded,
    handleSubmit,
    createNewCaseStudy
  } = useCaseStudyEditor(slug);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

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

  // Create the dynamic heading text based on the current case study or "new" state
  const getHeadingText = () => {
    if (loading) return 'LOADING...';
    if (slug === 'new') return 'CREATE CASE STUDY';
    return form?.title ? `EDIT: ${form.title.toUpperCase()}` : 'EDIT CASE STUDY';
  };

  return (
    <CaseStudyEditorLayout>
      <CaseStudyEditorHeader 
        headingText={getHeadingText()}
        onCreateNew={createNewCaseStudy}
        onViewLive={handleViewLive}
        onLogout={handleLogout}
        showViewLive={!!slug && slug !== 'new'}
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
    </CaseStudyEditorLayout>
  );
};

export default CaseStudyEditor;
