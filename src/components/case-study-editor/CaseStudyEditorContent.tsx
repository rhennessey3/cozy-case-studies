
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { CaseStudyForm } from '@/types/caseStudy';
import { supabase } from '@/integrations/supabase/client';
import CaseStudyBasicInfoTab from './CaseStudyBasicInfoTab';
import CaseStudyContentTab from './CaseStudyContentTab';
import EditorLoading from './components/EditorLoading';
import AuthErrorState from './components/AuthErrorState';

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
  cancelHref?: string;
  onCancel?: () => void;
  activeTab: string;
  caseStudyId?: string | null;
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
  showDelete = false,
  cancelHref,
  onCancel,
  activeTab,
  caseStudyId
}) => {
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
  const [authError, setAuthError] = useState<string | null>(null);
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
  const isNew = !slug || slug === 'new' || slug === '';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const localAuth = localStorage.getItem('admin_authenticated');
        
        if (isLocalAuthOnly && localAuth === 'true') {
          console.log('User is authenticated via local auth in local-only mode');
          setAuthStatus('authenticated');
          return;
        }
        
        if (isLocalAuthOnly && localAuth !== 'true') {
          console.log('User is not authenticated via local auth in local-only mode');
          setAuthError('You must be logged in to create or edit case studies');
          setAuthStatus('unauthenticated');
          return;
        }
        
        if (localAuth === 'true') {
          console.log('User is authenticated via local auth');
          setAuthStatus('authenticated');
          return;
        }
        
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

  if (loading) {
    return <EditorLoading />;
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
    return <AuthErrorState errorMessage={authError} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab}>
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
            caseStudyId={caseStudyId}
          />
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default CaseStudyEditorContent;
