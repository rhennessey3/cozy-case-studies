
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUploader from '@/components/ImageUploader';
import { CaseStudyForm } from '@/types/caseStudy';

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
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the basic details for this case study.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={form.category}
                onValueChange={(value) => {
                  const event = {
                    target: { name: 'category', value }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(event);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-design">Web Design</SelectItem>
                  <SelectItem value="mobile-app">Mobile App</SelectItem>
                  <SelectItem value="branding">Branding</SelectItem>
                  <SelectItem value="ui-ux">UI/UX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Select
                name="height"
                value={form.height}
                onValueChange={(value) => {
                  const event = {
                    target: { name: 'height', value }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(event);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a height" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="extra-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Enter a brief summary"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter a detailed description"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUploader
              label="Upload Cover Image"
              currentImageUrl={form.coverImage}
              onImageUploaded={(url) => handleImageUploaded('coverImage', url)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Section Images</CardTitle>
          <CardDescription>Upload images for each section of the case study.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              label="Introduction Image"
              currentImageUrl={form.introImage}
              onImageUploaded={(url) => handleImageUploaded('introImage', url)}
            />
            
            <ImageUploader
              label="Challenge Image"
              currentImageUrl={form.challengeImage}
              onImageUploaded={(url) => handleImageUploaded('challengeImage', url)}
            />
            
            <ImageUploader
              label="Approach Image"
              currentImageUrl={form.approachImage}
              onImageUploaded={(url) => handleImageUploaded('approachImage', url)}
            />
            
            <ImageUploader
              label="Solution Image"
              currentImageUrl={form.solutionImage}
              onImageUploaded={(url) => handleImageUploaded('solutionImage', url)}
            />
            
            <ImageUploader
              label="Results Image"
              currentImageUrl={form.resultsImage}
              onImageUploaded={(url) => handleImageUploaded('resultsImage', url)}
            />
            
            <ImageUploader
              label="Conclusion Image"
              currentImageUrl={form.conclusionImage}
              onImageUploaded={(url) => handleImageUploaded('conclusionImage', url)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudyBasicInfoTab;
