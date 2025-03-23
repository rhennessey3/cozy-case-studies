
import React, { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ImageUploader from '@/components/ImageUploader';

export interface AlignmentSectionProps {
  formData: any;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onImageUpload: (field: string, url: string) => void;
  onAlignmentChange: (value: string) => void;
}

const AlignmentSection: React.FC<AlignmentSectionProps> = ({ 
  formData, 
  onContentChange, 
  onImageUpload,
  onAlignmentChange
}) => {
  // Log the form data when it changes
  useEffect(() => {
    console.log('AlignmentSection rendering with data:', {
      subhead: formData.subhead || '[empty]',
      introductionParagraph: formData.introductionParagraph || '[empty]',
      introductionParagraphLength: formData.introductionParagraph?.length || 0,
      alignmentImage: formData.alignmentImage ? '[image present]' : '[no image]',
      alignment: formData.alignment || 'left'
    });
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    console.log(`AlignmentSection input changed: ${fieldName} = ${fieldValue.substring(0, 30)}${fieldValue.length > 30 ? '...' : ''}`);
    
    // Pass the change event directly to the parent component
    onContentChange(e);
  };

  const handleImageUpload = (url: string) => {
    console.log(`AlignmentSection image uploaded: ${url.substring(0, 30)}...`);
    onImageUpload('alignmentImage', url);
  };

  const handleAlignmentChange = (value: string) => {
    console.log(`AlignmentSection alignment changed to: ${value}`);
    onAlignmentChange(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="subhead">Section Title</Label>
        <Input 
          id="subhead" 
          name="subhead" 
          value={formData.subhead || ''} 
          onChange={handleInputChange} 
          placeholder="Section title" 
        />
        <div className="text-xs text-muted-foreground mt-1">
          {formData.subhead ? `Title: "${formData.subhead}"` : 'No title yet'}
        </div>
      </div>

      <div>
        <Label htmlFor="introductionParagraph">Content</Label>
        <Textarea 
          id="introductionParagraph" 
          name="introductionParagraph" 
          value={formData.introductionParagraph || ''} 
          onChange={handleInputChange} 
          placeholder="Section content"
          className="min-h-[150px]"
        />
        <div className="text-xs text-muted-foreground mt-1">
          {formData.introductionParagraph ? `${formData.introductionParagraph.length} characters` : 'No content yet'}
        </div>
      </div>

      <div>
        <Label className="block mb-2">Image</Label>
        <ImageUploader 
          imageUrl={formData.alignmentImage || ''} 
          onImageUploaded={handleImageUpload}
          aspectRatio="16:9"
        />
      </div>

      <div>
        <Label className="block mb-2">Image Alignment</Label>
        <RadioGroup 
          defaultValue={formData.alignment || 'left'} 
          value={formData.alignment || 'left'}
          onValueChange={handleAlignmentChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="left" id="alignment-left" />
            <Label htmlFor="alignment-left">Left</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="right" id="alignment-right" />
            <Label htmlFor="alignment-right">Right</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AlignmentSection;
