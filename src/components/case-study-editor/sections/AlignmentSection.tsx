
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ImageUploader from '@/components/ImageUploader';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface AlignmentSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  subhead: string;
  alignment: string;
  introductionParagraph: string;
  alignmentImage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onAlignmentChange: (value: string) => void;
  onImageUpload: (url: string) => void;
}

const AlignmentSection: React.FC<AlignmentSectionProps> = ({
  isOpen,
  onToggle,
  subhead,
  alignment,
  introductionParagraph,
  alignmentImage,
  onChange,
  onAlignmentChange,
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
            <h2 className="text-xl font-bold">Case Study Left or Right Aligned</h2>
            <ChevronDown 
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="subhead" className="text-gray-500">Subhead</Label>
              <Input 
                id="subhead" 
                name="subhead" 
                value={subhead || ''} 
                onChange={onChange} 
                placeholder="Lorem Ipsum Lorem Ipsum"
                className="bg-gray-50 border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-500">Alignment</Label>
              <RadioGroup 
                defaultValue={alignment || 'left'}
                className="flex items-center space-x-2"
                onValueChange={onAlignmentChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="left" id="left" />
                  <Label htmlFor="left">Left</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="right" id="right" />
                  <Label htmlFor="right">Right</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <Label htmlFor="introductionParagraph" className="text-gray-500">Case Study Introduction Paragraph</Label>
            <Textarea 
              id="introductionParagraph" 
              name="introductionParagraph" 
              value={introductionParagraph || ''} 
              onChange={onChange} 
              placeholder="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              className="bg-gray-50 border-gray-200 w-full"
              rows={6}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-500">Upload Image</Label>
            <ImageUploader 
              onImageUploaded={onImageUpload} 
              currentImageUrl={alignmentImage}
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default AlignmentSection;
