
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ImageUploader from '@/components/ImageUploader';

interface AlignmentSectionProps {
  formKey: string;
  subhead: string;
  introductionParagraph: string;
  alignmentImage: string;
  alignment: string;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded: (field: string, url: string) => void;
  handleAlignmentChange: (value: string) => void;
}

const AlignmentSection: React.FC<AlignmentSectionProps> = ({
  formKey,
  subhead,
  introductionParagraph,
  alignmentImage,
  alignment,
  handleContentChange,
  handleImageUploaded,
  handleAlignmentChange
}) => {
  // Debug logging to track what's happening with the section title
  useEffect(() => {
    console.log('AlignmentSection rendering with data:', {
      subhead: subhead || '[empty]',
      introductionParagraphLength: introductionParagraph?.length || 0,
      alignmentImage: alignmentImage || '[no image]',
      alignment
    });
  }, [subhead, introductionParagraph, alignmentImage, alignment]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('AlignmentSection title changed to:', e.target.value);
    handleContentChange(e);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subhead">Section Title</Label>
        <Input
          id="subhead"
          name="subhead"
          value={subhead || ''}
          onChange={handleTitleChange}
          className="w-full"
          placeholder="Enter section title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="introductionParagraph">Content</Label>
        <Textarea
          id="introductionParagraph"
          name="introductionParagraph"
          value={introductionParagraph || ''}
          onChange={handleContentChange}
          className="min-h-[120px]"
          placeholder="Enter section content"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alignmentImage">Image</Label>
        <ImageUploader
          currentImage={alignmentImage}
          onImageUploaded={(url) => handleImageUploaded('alignmentImage', url)}
          id="alignmentImage"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alignment">Alignment</Label>
        <RadioGroup
          id="alignment"
          value={alignment || 'left'}
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
