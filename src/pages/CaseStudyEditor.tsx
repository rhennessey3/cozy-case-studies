
import React, { useEffect } from 'react';
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

const CaseStudyEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
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
