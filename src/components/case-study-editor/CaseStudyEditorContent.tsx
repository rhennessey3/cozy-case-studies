
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CaseStudyBasicInfoTab from './CaseStudyBasicInfoTab';
import CaseStudyContentTab from './CaseStudyContentTab';
import { CaseStudyForm } from '@/types/caseStudy';
import { Loader2 } from 'lucide-react';

interface CaseStudyEditorContentProps {
  loading: boolean;
  saving: boolean;
  form: CaseStudyForm;
  slug?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<{ success: boolean, slug?: string } | undefined>;
}

const CaseStudyEditorContent: React.FC<CaseStudyEditorContentProps> = ({
  loading,
  saving,
  form,
  slug,
  handleChange,
  handleContentChange,
  handleImageUploaded,
  handleSubmit
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
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
          onClick={() => navigate('/admin/case-studies')}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={saving}
        >
          {saving ? 'Saving...' : slug === 'new' ? 'Create Case Study' : 'Update Case Study'}
        </Button>
      </div>
    </form>
  );
};

export default CaseStudyEditorContent;
