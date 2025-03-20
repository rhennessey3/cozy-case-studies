
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCaseStudies } from '@/hooks/case-study';
import CaseStudyEditorLayout from '@/components/case-study-editor/CaseStudyEditorLayout';
import CaseStudyEditorHeader from '@/components/case-study-editor/CaseStudyEditorHeader';
import CaseStudySidebar from '@/components/case-study-editor/CaseStudySidebar';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';

const AdminCaseStudies = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { caseStudies, loading: caseStudiesLoading } = useFetchCaseStudies();
  
  // Check local authentication as a fallback
  const isLocallyAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
  
  // User is authenticated if they're authenticated via context OR locally authenticated in local auth mode
  const effectivelyAuthenticated = isAuthenticated || (isLocalAuthOnly && isLocallyAuthenticated) || isLocallyAuthenticated;
  
  React.useEffect(() => {
    // If not authenticated at all, redirect to login
    if (!effectivelyAuthenticated) {
      navigate('/admin/login');
    }
  }, [effectivelyAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleViewLive = () => {
    window.open('/case-studies', '_blank');
  };

  const createNewCaseStudy = () => {
    navigate('/admin/case-studies/new');
  };

  return (
    <CaseStudyEditorLayout>
      <CaseStudyEditorHeader 
        headingText="CASE STUDIES"
        onViewLive={handleViewLive}
        onLogout={handleLogout}
        showViewLive={true}
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
              onCreateNew={createNewCaseStudy}
            />
          )}
        </div>
        
        <div className="md:col-span-3 flex flex-col justify-center items-center h-[70vh] bg-gray-50 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-medium text-gray-600">No Case Study Selected</h2>
            <p className="text-gray-500 max-w-md">
              Select a case study from the sidebar or create a new one to get started.
            </p>
            <Button 
              onClick={createNewCaseStudy}
              className="mt-4 flex gap-2 items-center"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Create New Case Study
            </Button>
          </div>
        </div>
      </div>
    </CaseStudyEditorLayout>
  );
};

export default AdminCaseStudies;
