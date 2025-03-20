
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter case study title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="Enter URL slug (e.g., my-case-study)"
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label>Cover Image</Label>
              <ImageUploader
                label="Upload Cover Image"
                currentImageUrl={form.coverImage}
                onImageUploaded={(url) => handleImageUploaded('coverImage', url)}
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
                <Label htmlFor="subhead-one" className="text-gray-500">Subhead One</Label>
                <Input 
                  id="subhead-one" 
                  name="challenge" 
                  value={form.challenge} 
                  onChange={handleChange} 
                  placeholder="Challenge"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subhead-one-paragraph" className="text-gray-500">Subhead One Paragraph</Label>
                <Textarea 
                  id="subhead-one-paragraph" 
                  name="intro" 
                  value={form.intro} 
                  onChange={handleChange} 
                  placeholder="Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
                  className="bg-gray-50 border-gray-200"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="subhead-two" className="text-gray-500">Subhead Two</Label>
                <Input 
                  id="subhead-two" 
                  name="approach" 
                  value={form.approach} 
                  onChange={handleChange} 
                  placeholder="Approach"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subhead-two-paragraph" className="text-gray-500">Subhead Two Paragraph</Label>
                <Textarea 
                  id="subhead-two-paragraph" 
                  name="solution" 
                  value={form.solution} 
                  onChange={handleChange} 
                  placeholder="Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
                  className="bg-gray-50 border-gray-200"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subhead-three" className="text-gray-500">Subhead Three</Label>
                <Input 
                  id="subhead-three" 
                  name="results" 
                  value={form.results} 
                  onChange={handleChange} 
                  placeholder="Results"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subhead-three-paragraph" className="text-gray-500">Subhead Three Paragraph</Label>
                <Textarea 
                  id="subhead-three-paragraph" 
                  name="conclusion" 
                  value={form.conclusion} 
                  onChange={handleChange} 
                  placeholder="Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
                  className="bg-gray-50 border-gray-200"
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
