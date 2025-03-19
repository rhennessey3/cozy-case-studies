
import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
    </div>
  );
};

export default CaseStudyBasicInfoTab;
