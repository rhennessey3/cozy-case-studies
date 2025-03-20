
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import ImageUploader from '@/components/ImageUploader';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface ParagraphItem {
  title: string;
  content: string;
  titleField: string;
  contentField: string;
}

interface FourParagraphsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  sectionTitle: string;
  sectionSubtitle: string;
  paragraphs: ParagraphItem[];
  sectionImage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onImageUpload: (url: string) => void;
}

const FourParagraphsSection: React.FC<FourParagraphsSectionProps> = ({
  isOpen,
  onToggle,
  sectionTitle,
  sectionSubtitle,
  paragraphs,
  sectionImage,
  onChange,
  onImageUpload
}) => {
  return (
    <Collapsible 
      open={isOpen}
      onOpenChange={onToggle}
      className="w-full"
    >
      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <CollapsibleTrigger className="w-full text-left focus:outline-none">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold">Four Small Paragraphs with Photo</h2>
            <ChevronDown 
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-4">
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fourParaTitle" className="text-gray-500">Section Title</Label>
                <Input 
                  id="fourParaTitle" 
                  name="fourParaTitle" 
                  value={sectionTitle || '4 Small Paragraphs'} 
                  onChange={onChange} 
                  placeholder="4 Small Paragraphs"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fourParaSubtitle" className="text-gray-500">Section Subtitle</Label>
                <Input 
                  id="fourParaSubtitle" 
                  name="fourParaSubtitle" 
                  value={sectionSubtitle || 'With Photo'} 
                  onChange={onChange} 
                  placeholder="With Photo"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </div>
          
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-4">Paragraph {index + 1}</h3>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor={paragraph.titleField} className="text-gray-500">Paragraph Title</Label>
                <Input 
                  id={paragraph.titleField} 
                  name={paragraph.titleField} 
                  value={paragraph.title || `Paragraph ${index + 1}`} 
                  onChange={onChange} 
                  placeholder={`Paragraph ${index + 1}`}
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={paragraph.contentField} className="text-gray-500">Paragraph Content</Label>
                <Textarea 
                  id={paragraph.contentField} 
                  name={paragraph.contentField} 
                  value={paragraph.content || ''} 
                  onChange={onChange} 
                  placeholder={`Enter content for paragraph ${index + 1}`}
                  className="bg-gray-50 border-gray-200"
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          <div className="space-y-2">
            <Label className="text-gray-500">Section Image</Label>
            <ImageUploader 
              onImageUploaded={onImageUpload} 
              currentImageUrl={sectionImage}
              label="Four Paragraphs Image"
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default FourParagraphsSection;
