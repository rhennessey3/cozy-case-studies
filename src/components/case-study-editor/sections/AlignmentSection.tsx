
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ImageUploader from '@/components/ImageUploader';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';

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
        
        <CollapsibleContent className="pt-4 space-y-6">
          {/* Improved subhead field with better labeling */}
          <FormItem className="space-y-2">
            <FormLabel htmlFor="subhead" className="text-gray-700 font-medium">Section Heading</FormLabel>
            <FormControl>
              <Input 
                id="subhead" 
                name="subhead" 
                value={subhead || ''} 
                onChange={onChange} 
                placeholder="Enter a heading for this section"
                className="bg-gray-50 border-gray-200"
              />
            </FormControl>
            <FormDescription className="text-xs text-gray-500">
              This will appear as the main title for this section
            </FormDescription>
          </FormItem>
          
          {/* Improved alignment controls with better visual indication */}
          <FormItem className="space-y-2">
            <FormLabel className="text-gray-700 font-medium">Content Alignment</FormLabel>
            <RadioGroup 
              value={alignment || 'left'}
              onValueChange={onAlignmentChange}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                <RadioGroupItem value="left" id="left" />
                <Label htmlFor="left" className="cursor-pointer">Left</Label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                <RadioGroupItem value="right" id="right" />
                <Label htmlFor="right" className="cursor-pointer">Right</Label>
              </div>
            </RadioGroup>
            <FormDescription className="text-xs text-gray-500">
              Choose whether the image appears on the left or right side of the text
            </FormDescription>
          </FormItem>
          
          {/* Improved paragraph textarea with better sizing */}
          <FormItem className="space-y-2">
            <FormLabel htmlFor="introductionParagraph" className="text-gray-700 font-medium">Content Text</FormLabel>
            <FormControl>
              <Textarea 
                id="introductionParagraph" 
                name="introductionParagraph" 
                value={introductionParagraph || ''} 
                onChange={onChange} 
                placeholder="Enter the content for this section"
                className="bg-gray-50 border-gray-200 w-full min-h-[120px]"
                rows={5}
              />
            </FormControl>
            <FormDescription className="text-xs text-gray-500">
              This text will appear next to the image
            </FormDescription>
          </FormItem>
          
          {/* Improved image uploader with preview and clear instructions */}
          <FormItem className="space-y-2">
            <FormLabel className="text-gray-700 font-medium">Section Image</FormLabel>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <ImageUploader 
                onImageUploaded={onImageUpload} 
                currentImageUrl={alignmentImage}
              />
              {alignmentImage && (
                <div className="mt-2">
                  <img 
                    src={alignmentImage} 
                    alt="Section preview" 
                    className="max-h-40 rounded-md border border-gray-300" 
                  />
                </div>
              )}
            </div>
            <FormDescription className="text-xs text-gray-500">
              Upload an image to appear alongside the text (recommended size: 800×600px)
            </FormDescription>
          </FormItem>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default AlignmentSection;
