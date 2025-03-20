
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CaseStudyBasicInfoTab from './CaseStudyBasicInfoTab';
import CaseStudyContentTab from './CaseStudyContentTab';
import { CaseStudyForm } from '@/types/caseStudy';
import { Loader2, AlertTriangle, Eye, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CaseStudyEditorContentProps {
  loading: boolean;
  saving: boolean;
  form: CaseStudyForm;
  slug?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<{ success: boolean, slug?: string } | undefined>;
  onViewLive?: () => void;
  onDelete?: () => void;
  showViewLive?: boolean;
  showDelete?: boolean;
}

const CaseStudyEditorContent: React.FC<CaseStudyEditorContentProps> = ({
  loading,
  saving,
  form,
  slug,
  handleChange,
  handleContentChange,
  handleImageUploaded,
  handleSubmit,
  onViewLive,
  onDelete,
  showViewLive = false,
  showDelete = false
}) => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
  const [authError, setAuthError] = useState<string | null>(null);
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check local auth state
        const localAuth = localStorage.getItem('admin_authenticated');
        
        // If we're in local auth only mode and have local auth, we're good to go
        if (isLocalAuthOnly && localAuth === 'true') {
          console.log('User is authenticated via local auth in local-only mode');
          setAuthStatus('authenticated');
          return;
        }
        
        // If no local auth but we're in local auth only mode, user is not authenticated
        if (isLocalAuthOnly && localAuth !== 'true') {
          console.log('User is not authenticated via local auth in local-only mode');
          setAuthError('You must be logged in to create or edit case studies');
          setAuthStatus('unauthenticated');
          return;
        }
        
        // If we're not in local auth only mode, check local auth first as a fallback
        if (localAuth === 'true') {
          console.log('User is authenticated via local auth');
          setAuthStatus('authenticated');
          return;
        }
        
        // If no local auth, try Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth check error:', error);
          setAuthError(`Authentication error: ${error.message}`);
          setAuthStatus('unauthenticated');
          return;
        }
        
        if (data.session) {
          console.log('User is authenticated via Supabase');
          setAuthStatus('authenticated');
          return;
        }
        
        // If we got here, user is not authenticated
        console.log('User is not authenticated');
        setAuthError('You must be logged in to create or edit case studies');
        setAuthStatus('unauthenticated');
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthError(`Failed to verify authentication: ${(error as Error).message}`);
        setAuthStatus('unauthenticated');
      }
    };
    
    checkAuth();
  }, [isLocalAuthOnly]);

  const handleRedirectToLogin = () => {
    // Don't clear authentication state if using local auth
    if (!isLocalAuthOnly) {
      localStorage.removeItem('admin_authenticated');
    }
    
    // Redirect to login
    navigate('/admin/login');
    toast.info('Please log in to continue');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (authStatus === 'checking') {
    return (
      <div className="flex flex-col justify-center items-center space-y-4 py-8">
        <Loader2 size={24} className="animate-spin text-primary" />
        <p className="text-muted-foreground">Verifying authentication...</p>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="space-y-6 py-8">
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {authError || 'You must be logged in to create or edit case studies'}
          </AlertDescription>
        </Alert>
        <Button onClick={handleRedirectToLogin} className="mt-4">
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <TabsList className="mb-0">
          <TabsTrigger value="basics">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          {showViewLive && onViewLive && (
            <Button
              type="button"
              variant="outline"
              onClick={onViewLive}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View Live
            </Button>
          )}
          
          {showDelete && onDelete && (
            <Button
              type="button"
              variant="outline"
              onClick={onDelete}
              className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="basics">
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
          onClick={() => navigate('/admin/case-studies')}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? 'Saving...' : slug === 'new' ? 'Create Case Study' : 'Update Case Study'}
        </Button>
      </div>
    </form>
  );
};

export default CaseStudyEditorContent;
