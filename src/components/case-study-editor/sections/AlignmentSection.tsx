
import React from 'react';
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
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="subhead">Section Title</Label>
        <Input 
          id="subhead" 
          name="subhead" 
          value={formData.subhead || ''} 
          onChange={onContentChange} 
          placeholder="Section title" 
        />
      </div>

      <div>
        <Label htmlFor="introductionParagraph">Content</Label>
        <Textarea 
          id="introductionParagraph" 
          name="introductionParagraph" 
          value={formData.introductionParagraph || ''} 
          onChange={onContentChange} 
          placeholder="Section content"
          className="min-h-[150px]"
        />
      </div>

      <div>
        <Label className="block mb-2">Image</Label>
        <ImageUploader 
          imageUrl={formData.alignmentImage || ''} 
          onImageUploaded={(url) => onImageUpload('alignmentImage', url)}
          aspectRatio="16:9"
        />
      </div>

      <div>
        <Label className="block mb-2">Image Alignment</Label>
        <RadioGroup 
          defaultValue={formData.alignment || 'right'} 
          onValueChange={onAlignmentChange}
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
