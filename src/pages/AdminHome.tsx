
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CaseStudyEditorLayout from '@/components/case-study-editor/CaseStudyEditorLayout';
import CaseStudyEditorHeader from '@/components/case-study-editor/CaseStudyEditorHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Settings, Home } from 'lucide-react';
import { toast } from 'sonner';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';

const AdminHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  // Check local authentication as a fallback
  const isLocallyAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
  
  // User is authenticated if they're authenticated via context OR locally authenticated in local auth mode
  const effectivelyAuthenticated = isAuthenticated || (isLocalAuthOnly && isLocallyAuthenticated) || isLocallyAuthenticated;
  
  React.useEffect(() => {
    // If not authenticated at all, redirect to login
    if (!effectivelyAuthenticated) {
      navigate('/admin/login');
      toast.error('You must be logged in to access this page');
    }
  }, [effectivelyAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
    toast('Logged out successfully');
  };

  return (
    <CaseStudyEditorLayout>
      <CaseStudyEditorHeader 
        headingText="ADMIN DASHBOARD"
        onViewLive={() => {}}
        onLogout={handleLogout}
        showViewLive={false}
        showDelete={false}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Case Studies
            </CardTitle>
            <CardDescription>
              Manage your case studies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Create, edit, and delete case studies that showcase your work.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/admin/case-studies')} className="w-full">
              Go to Case Studies
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow opacity-60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>
              Manage your site settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Configure site settings, user accounts, and permissions.
            </p>
          </CardContent>
          <CardFooter>
            <Button disabled variant="outline" className="w-full">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow opacity-60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Site Content
            </CardTitle>
            <CardDescription>
              Edit your website content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Update homepage, about page, and other site content.
            </p>
          </CardContent>
          <CardFooter>
            <Button disabled variant="outline" className="w-full">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>
    </CaseStudyEditorLayout>
  );
};

export default AdminHome;
