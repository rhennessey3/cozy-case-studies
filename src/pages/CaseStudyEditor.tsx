
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import Footer from '@/components/Footer';
import CaseStudySidebar from '@/components/case-study-editor/CaseStudySidebar';
import CaseStudyBasicInfoTab from '@/components/case-study-editor/CaseStudyBasicInfoTab';
import CaseStudyContentTab from '@/components/case-study-editor/CaseStudyContentTab';
import { useCaseStudyEditor } from '@/hooks/use-case-study-editor';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const CaseStudyEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  const { isAuthenticated, logout } = useAuth();
  
  const {
    loading,
    saving,
    caseStudies,
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
  
  useEffect(() => {
    const handleBodyClassChange = () => {
      setIsDrawerOpen(document.body.classList.contains('drawer-open'));
    };
    const observer = new MutationObserver(handleBodyClassChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      {isSmallScreen ? (
        <TopNavbar className="fixed top-0 left-0 right-0 z-50" />
      ) : (
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white" />
      )}
      
      <div 
        className={cn(
          "fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out z-30",
          !isSmallScreen && (isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"),
          isSmallScreen && "pt-16"
        )}
      >
        <ScrollArea className="h-full">
          <section className="min-h-screen bg-white py-20">
            <div className="w-full px-4 md:px-6 lg:px-8">
              <div className="text-left max-w-screen-2xl mx-auto mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#EAEAEA]">
                  <h1 className="text-3xl md:text-4xl font-[900] text-[#1b1b1b]">
                    {slug ? 'EDIT CASE STUDY' : 'CREATE CASE STUDY'}
                  </h1>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={createNewCaseStudy}
                    >
                      New Case Study
                    </Button>
                    {slug && (
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/case-studies/${slug}`)}
                      >
                        View Live
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="max-w-4xl mx-auto">
                  <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
                  <div className="md:col-span-1">
                    <CaseStudySidebar 
                      caseStudies={caseStudies} 
                      currentSlug={slug} 
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Tabs defaultValue="basics">
                        <TabsList className="mb-4">
                          <TabsTrigger value="basics">Basic Info</TabsTrigger>
                          <TabsTrigger value="content">Content</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="basics">
                          <CaseStudyBasicInfoTab 
                            form={form} 
                            handleChange={handleChange} 
                            handleImageUploaded={handleImageUploaded} 
                          />
                        </TabsContent>
                        
                        <TabsContent value="content">
                          <CaseStudyContentTab 
                            form={form} 
                            handleContentChange={handleContentChange} 
                            handleImageUploaded={handleImageUploaded}
                          />
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => navigate('/case-studies')}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={saving}
                        >
                          {saving ? 'Saving...' : slug ? 'Update Case Study' : 'Create Case Study'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </section>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseStudyEditor;
