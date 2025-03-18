
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from '@/components/ImageUploader';

interface CaseStudyBasicInfoTabProps {
  form: {
    title: string;
    slug: string;
    summary: string;
    description: string;
    coverImage: string;
    category: string;
    height: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUploaded: (field: string, imageUrl: string) => void;
}

const CaseStudyBasicInfoTab: React.FC<CaseStudyBasicInfoTabProps> = ({ 
  form, 
  handleChange, 
  handleImageUploaded 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-medium">Title</label>
          <Input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            placeholder="Case Study Title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Slug</label>
          <Input 
            name="slug" 
            value={form.slug} 
            onChange={handleChange} 
            placeholder="case-study-slug"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="font-medium">Summary</label>
        <Textarea 
          name="summary" 
          value={form.summary} 
          onChange={handleChange} 
          placeholder="Brief summary of the case study"
          required
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <label className="font-medium">Description (Optional)</label>
        <Textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Detailed description"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImageUploader
          label="Cover Image"
          currentImageUrl={form.coverImage}
          onImageUploaded={(url) => handleImageUploaded('coverImage', url)}
        />
        
        <div className="space-y-2">
          <label className="font-medium">Category</label>
          <Input 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            placeholder="UX Design, Branding, etc."
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="font-medium">Height (Optional)</label>
        <Input 
          name="height" 
          value={form.height} 
          onChange={handleChange} 
          placeholder="tall"
        />
        <p className="text-sm text-gray-500">Use "tall" to make the card taller in the grid</p>
      </div>
    </div>
  );
};

export default CaseStudyBasicInfoTab;
