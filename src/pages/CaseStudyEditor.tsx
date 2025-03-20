
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCaseStudyEditor } from '@/hooks/use-case-study-editor';
import CaseStudySidebar from '@/components/case-study-editor/CaseStudySidebar';
import CaseStudyEditorHeader from '@/components/case-study-editor/CaseStudyEditorHeader';
import CaseStudyEditorContent from '@/components/case-study-editor/CaseStudyEditorContent';
import CaseStudyEditorLayout from '@/components/case-study-editor/CaseStudyEditorLayout';
import DeleteCaseStudyDialog from '@/components/case-study-editor/DeleteCaseStudyDialog';
import CaseStudyEditorAuth from '@/components/case-study-editor/CaseStudyEditorAuth';

const CaseStudyEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
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
    <CaseStudyEditorAuth>
      <CaseStudyEditorLayout>
        <CaseStudyEditorHeader 
          headingText={getHeadingText()}
          onLogout={handleLogout}
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
              onViewLive={handleViewLive}
              onDelete={() => setDeleteDialogOpen(true)}
              showViewLive={!!slug && slug !== 'new'}
              showDelete={!!slug && slug !== 'new'}
            />
          </div>
        </div>

        {slug && slug !== 'new' && (
          <DeleteCaseStudyDialog 
            open={deleteDialogOpen} 
            onOpenChange={setDeleteDialogOpen} 
            slug={slug}
          />
        )}
      </CaseStudyEditorLayout>
    </CaseStudyEditorAuth>
  );
};

export default CaseStudyEditor;
