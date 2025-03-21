
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/ImageUploader';

export interface FourParagraphsSectionProps {
  formData: any;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onImageUpload: (field: string, url: string) => void;
  paragraphItems: any[];
}

const FourParagraphsSection: React.FC<FourParagraphsSectionProps> = ({
  formData,
  onContentChange,
  onImageUpload,
  paragraphItems
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="fourParaTitle">Section Title</Label>
        <Input
          id="fourParaTitle"
          name="fourParaTitle"
          value={formData.fourParaTitle || ''}
          onChange={onContentChange}
          placeholder="Main section title"
        />
      </div>
      
      <div>
        <Label htmlFor="fourParaSubtitle">Subtitle</Label>
        <Input
          id="fourParaSubtitle"
          name="fourParaSubtitle"
          value={formData.fourParaSubtitle || ''}
          onChange={onContentChange}
          placeholder="Section subtitle"
        />
      </div>
      
      {paragraphItems.map((item, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <h3 className="font-medium">Paragraph {index + 1}</h3>
          
          <div>
            <Label htmlFor={item.titleField}>Title</Label>
            <Input
              id={item.titleField}
              name={item.titleField}
              value={formData[item.titleField] || ''}
              onChange={onContentChange}
              placeholder="Paragraph title"
            />
          </div>
          
          <div>
            <Label htmlFor={item.contentField}>Content</Label>
            <Textarea
              id={item.contentField}
              name={item.contentField}
              value={formData[item.contentField] || ''}
              onChange={onContentChange}
              placeholder="Paragraph content"
              className="min-h-[100px]"
            />
          </div>
        </div>
      ))}
      
      <div>
        <Label className="block mb-2">Section Image</Label>
        <ImageUploader
          imageUrl={formData.fourParaImage || ''}
          onImageUploaded={(url) => onImageUpload('fourParaImage', url)}
          aspectRatio="16:9"
        />
      </div>
    </div>
  );
};

export default FourParagraphsSection;
