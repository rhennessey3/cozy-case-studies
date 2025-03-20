
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/ImageUploader';
import { CaseStudyForm } from '@/types/caseStudy';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface CaseStudyBasicInfoTabProps {
  form: CaseStudyForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUploaded: (field: string, imageUrl: string) => void;
}

const CaseStudyBasicInfoTab: React.FC<CaseStudyBasicInfoTabProps> = ({ 
  form, 
  handleChange, 
  handleImageUploaded 
}) => {
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    header: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section }: { title: string, section: keyof typeof openSections }) => (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-xl font-bold">{title}</h2>
      <ChevronDown 
        className={`h-5 w-5 transition-transform duration-200 ${openSections[section] ? 'transform rotate-180' : ''}`} 
      />
    </div>
  );

  // Helper component for required field labels
  const RequiredLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
    <Label htmlFor={htmlFor} className="flex items-center">
      {children} <span className="text-red-500 ml-1">*</span>
    </Label>
  );

  return (
    <div className="space-y-6">
      <Collapsible 
        open={openSections.basicInfo}
        onOpenChange={() => toggleSection('basicInfo')}
        className="w-full"
      >
        <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
          <CollapsibleTrigger className="w-full text-left focus:outline-none">
            <SectionHeader title="Basic Information" section="basicInfo" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <RequiredLabel htmlFor="title">Title</RequiredLabel>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter case study title"
                  className={!form.title.trim() ? "border-red-300" : ""}
                />
              </div>
              <div className="space-y-2">
                <RequiredLabel htmlFor="slug">Slug</RequiredLabel>
                <Input
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="Enter URL slug (e.g., my-case-study)"
                  className={!form.slug.trim() ? "border-red-300" : ""}
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <RequiredLabel htmlFor="coverImage">Cover Image</RequiredLabel>
              <ImageUploader
                label="Upload Cover Image"
                currentImageUrl={form.coverImage}
                onImageUploaded={(url) => handleImageUploaded('coverImage', url)}
                className={!form.coverImage ? "border-red-300 border rounded" : ""}
              />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible 
        open={openSections.header}
        onOpenChange={() => toggleSection('header')}
        className="w-full"
      >
        <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
          <CollapsibleTrigger className="w-full text-left focus:outline-none">
            <SectionHeader title="Case Study Header" section="header" />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <RequiredLabel htmlFor="subhead-one">Challenge</RequiredLabel>
                <Input 
                  id="subhead-one" 
                  name="challenge" 
                  value={form.challenge} 
                  onChange={handleChange} 
                  placeholder="Challenge"
                  className={`bg-gray-50 border-gray-200 ${!form.challenge.trim() ? "border-red-300" : ""}`}
                />
              </div>
              
              <div className="space-y-2">
                <RequiredLabel htmlFor="subhead-one-paragraph">Challenge Description</RequiredLabel>
                <Textarea 
                  id="subhead-one-paragraph" 
                  name="intro" 
                  value={form.intro} 
                  onChange={handleChange} 
                  placeholder="Describe the challenge..."
                  className={`bg-gray-50 border-gray-200 ${!form.intro.trim() ? "border-red-300" : ""}`}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <RequiredLabel htmlFor="subhead-two">Approach</RequiredLabel>
                <Input 
                  id="subhead-two" 
                  name="approach" 
                  value={form.approach} 
                  onChange={handleChange} 
                  placeholder="Approach"
                  className={`bg-gray-50 border-gray-200 ${!form.approach.trim() ? "border-red-300" : ""}`}
                />
              </div>
              
              <div className="space-y-2">
                <RequiredLabel htmlFor="subhead-two-paragraph">Approach Description</RequiredLabel>
                <Textarea 
                  id="subhead-two-paragraph" 
                  name="solution" 
                  value={form.solution} 
                  onChange={handleChange} 
                  placeholder="Describe the approach..."
                  className={`bg-gray-50 border-gray-200 ${!form.solution.trim() ? "border-red-300" : ""}`}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <RequiredLabel htmlFor="subhead-three">Results</RequiredLabel>
                <Input 
                  id="subhead-three" 
                  name="results" 
                  value={form.results} 
                  onChange={handleChange} 
                  placeholder="Results"
                  className={`bg-gray-50 border-gray-200 ${!form.results.trim() ? "border-red-300" : ""}`}
                />
              </div>
              
              <div className="space-y-2">
                <RequiredLabel htmlFor="subhead-three-paragraph">Results Description</RequiredLabel>
                <Textarea 
                  id="subhead-three-paragraph" 
                  name="conclusion" 
                  value={form.conclusion} 
                  onChange={handleChange} 
                  placeholder="Describe the results..."
                  className={`bg-gray-50 border-gray-200 ${!form.conclusion.trim() ? "border-red-300" : ""}`}
                  rows={3}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default CaseStudyBasicInfoTab;
