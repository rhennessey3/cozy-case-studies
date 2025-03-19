import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ImageUploader from '@/components/ImageUploader';

interface CaseStudyContentTabProps {
  form: {
    intro: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string;
    conclusion: string;
    alignment?: string;
    subhead?: string;
    introductionParagraph?: string;
    alignmentImage?: string;
    carouselTitle?: string;
    carouselItem1Title?: string;
    carouselItem1Content?: string;
    carouselItem1Image?: string;
    carouselItem2Title?: string;
    carouselItem2Content?: string;
    carouselItem2Image?: string;
    carouselItem3Title?: string;
    carouselItem3Content?: string;
    carouselItem3Image?: string;
    fourParaTitle?: string;
    fourParaSubtitle?: string;
    fourPara1Title?: string;
    fourPara1Content?: string;
    fourPara2Title?: string;
    fourPara2Content?: string;
    fourPara3Title?: string;
    fourPara3Content?: string;
    fourPara4Title?: string;
    fourPara4Content?: string;
    fourParaImage?: string;
  };
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleImageUploaded?: (field: string, url: string) => void;
}

const CaseStudyContentTab: React.FC<CaseStudyContentTabProps> = ({ 
  form, 
  handleContentChange,
  handleImageUploaded = () => {} 
}) => {
  const handleAlignmentChange = (value: string) => {
    const event = {
      target: {
        name: 'alignment',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleContentChange(event);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <h2 className="text-xl font-bold mb-6">Case Study Header</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="subhead-one" className="text-gray-500">Subhead One</Label>
            <Input 
              id="subhead-one" 
              name="challenge" 
              value={form.challenge} 
              onChange={handleContentChange} 
              placeholder="Challenge"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subhead-one-paragraph" className="text-gray-500">Subhead One Paragraph</Label>
            <Textarea 
              id="subhead-one-paragraph" 
              name="intro" 
              value={form.intro} 
              onChange={handleContentChange} 
              placeholder="Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="subhead-two" className="text-gray-500">Subhead Two</Label>
            <Input 
              id="subhead-two" 
              name="approach" 
              value={form.approach} 
              onChange={handleContentChange} 
              placeholder="Approach"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subhead-two-paragraph" className="text-gray-500">Subhead Two Paragraph</Label>
            <Textarea 
              id="subhead-two-paragraph" 
              name="solution" 
              value={form.solution} 
              onChange={handleContentChange} 
              placeholder="Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="subhead-three" className="text-gray-500">Subhead Three</Label>
            <Input 
              id="subhead-three" 
              name="results" 
              value={form.results} 
              onChange={handleContentChange} 
              placeholder="Results"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subhead-three-paragraph" className="text-gray-500">Subhead Three Paragraph</Label>
            <Textarea 
              id="subhead-three-paragraph" 
              name="conclusion" 
              value={form.conclusion} 
              onChange={handleContentChange} 
              placeholder="Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <h2 className="text-xl font-bold mb-6">Case Study Introduction</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="challenge" className="text-gray-500">Subhead</Label>
            <Input 
              id="challenge" 
              name="challenge" 
              value={form.challenge} 
              onChange={handleContentChange} 
              placeholder="This is the introduction of the case study"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approach" className="text-gray-500">Subhead two</Label>
            <Input 
              id="approach" 
              name="approach" 
              value={form.approach} 
              onChange={handleContentChange} 
              placeholder="It's a pretty awesome case study"
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="intro-content" className="text-gray-500">Case Study Introduction Paragraph</Label>
          <Textarea 
            id="intro-content" 
            name="intro" 
            value={form.intro} 
            onChange={handleContentChange} 
            placeholder="Enter your case study introduction paragraph here..."
            className="bg-gray-50 border-gray-200 w-full"
            rows={6}
          />
        </div>
      </Card>

      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <h2 className="text-xl font-bold mb-6">Case Study Left or Right Aligned</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="subhead" className="text-gray-500">Subhead</Label>
            <Input 
              id="subhead" 
              name="subhead" 
              value={form.subhead || ''} 
              onChange={handleContentChange} 
              placeholder="Lorem Ipsum Lorem Ipsum"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-500">Alignment</Label>
            <RadioGroup 
              defaultValue={form.alignment || 'left'}
              className="flex items-center space-x-2"
              onValueChange={handleAlignmentChange}
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
            value={form.introductionParagraph || ''} 
            onChange={handleContentChange} 
            placeholder="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            className="bg-gray-50 border-gray-200 w-full"
            rows={6}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-500">Upload Image</Label>
          <ImageUploader 
            onImageUploaded={(url) => handleImageUploaded('alignmentImage', url)} 
            currentImageUrl={form.alignmentImage}
          />
        </div>
      </Card>

      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <h2 className="text-xl font-bold mb-6">Case Study Carousel</h2>
        
        <div className="space-y-2 mb-6">
          <Label htmlFor="carouselTitle" className="text-gray-500">Carousel Title</Label>
          <Input 
            id="carouselTitle" 
            name="carouselTitle" 
            value={form.carouselTitle || '3 Column Slider'} 
            onChange={handleContentChange} 
            placeholder="3 Column Slider"
            className="bg-gray-50 border-gray-200"
          />
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Carousel Item 1</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="carouselItem1Title" className="text-gray-500">Item Title</Label>
            <Input 
              id="carouselItem1Title" 
              name="carouselItem1Title" 
              value={form.carouselItem1Title || 'Planning'} 
              onChange={handleContentChange} 
              placeholder="Planning"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="carouselItem1Content" className="text-gray-500">Item Content</Label>
            <Textarea 
              id="carouselItem1Content" 
              name="carouselItem1Content" 
              value={form.carouselItem1Content || ''} 
              onChange={handleContentChange} 
              placeholder="Enter content for the first carousel item"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-500">Item Image</Label>
            <ImageUploader 
              onImageUploaded={(url) => handleImageUploaded('carouselItem1Image', url)} 
              currentImageUrl={form.carouselItem1Image}
            />
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Carousel Item 2</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="carouselItem2Title" className="text-gray-500">Item Title</Label>
            <Input 
              id="carouselItem2Title" 
              name="carouselItem2Title" 
              value={form.carouselItem2Title || 'Development'} 
              onChange={handleContentChange} 
              placeholder="Development"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="carouselItem2Content" className="text-gray-500">Item Content</Label>
            <Textarea 
              id="carouselItem2Content" 
              name="carouselItem2Content" 
              value={form.carouselItem2Content || ''} 
              onChange={handleContentChange} 
              placeholder="Enter content for the second carousel item"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-500">Item Image</Label>
            <ImageUploader 
              onImageUploaded={(url) => handleImageUploaded('carouselItem2Image', url)} 
              currentImageUrl={form.carouselItem2Image}
            />
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold mb-4">Carousel Item 3</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="carouselItem3Title" className="text-gray-500">Item Title</Label>
            <Input 
              id="carouselItem3Title" 
              name="carouselItem3Title" 
              value={form.carouselItem3Title || 'Results'} 
              onChange={handleContentChange} 
              placeholder="Results"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="carouselItem3Content" className="text-gray-500">Item Content</Label>
            <Textarea 
              id="carouselItem3Content" 
              name="carouselItem3Content" 
              value={form.carouselItem3Content || ''} 
              onChange={handleContentChange} 
              placeholder="Enter content for the third carousel item"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-500">Item Image</Label>
            <ImageUploader 
              onImageUploaded={(url) => handleImageUploaded('carouselItem3Image', url)} 
              currentImageUrl={form.carouselItem3Image}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <h2 className="text-xl font-bold mb-6">Four Small Paragraphs with Photo</h2>
        
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fourParaTitle" className="text-gray-500">Section Title</Label>
              <Input 
                id="fourParaTitle" 
                name="fourParaTitle" 
                value={form.fourParaTitle || '4 Small Paragraphs'} 
                onChange={handleContentChange} 
                placeholder="4 Small Paragraphs"
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fourParaSubtitle" className="text-gray-500">Section Subtitle</Label>
              <Input 
                id="fourParaSubtitle" 
                name="fourParaSubtitle" 
                value={form.fourParaSubtitle || 'With Photo'} 
                onChange={handleContentChange} 
                placeholder="With Photo"
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-4">Paragraph 1</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="fourPara1Title" className="text-gray-500">Paragraph Title</Label>
            <Input 
              id="fourPara1Title" 
              name="fourPara1Title" 
              value={form.fourPara1Title || 'Paragraph 1'} 
              onChange={handleContentChange} 
              placeholder="Paragraph 1"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fourPara1Content" className="text-gray-500">Paragraph Content</Label>
            <Textarea 
              id="fourPara1Content" 
              name="fourPara1Content" 
              value={form.fourPara1Content || ''} 
              onChange={handleContentChange} 
              placeholder="Enter content for the first paragraph"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-4">Paragraph 2</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="fourPara2Title" className="text-gray-500">Paragraph Title</Label>
            <Input 
              id="fourPara2Title" 
              name="fourPara2Title" 
              value={form.fourPara2Title || 'Paragraph 2'} 
              onChange={handleContentChange} 
              placeholder="Paragraph 2"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fourPara2Content" className="text-gray-500">Paragraph Content</Label>
            <Textarea 
              id="fourPara2Content" 
              name="fourPara2Content" 
              value={form.fourPara2Content || ''} 
              onChange={handleContentChange} 
              placeholder="Enter content for the second paragraph"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-4">Paragraph 3</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="fourPara3Title" className="text-gray-500">Paragraph Title</Label>
            <Input 
              id="fourPara3Title" 
              name="fourPara3Title" 
              value={form.fourPara3Title || 'Paragraph 3'} 
              onChange={handleContentChange} 
              placeholder="Paragraph 3"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fourPara3Content" className="text-gray-500">Paragraph Content</Label>
            <Textarea 
              id="fourPara3Content" 
              name="fourPara3Content" 
              value={form.fourPara3Content || ''} 
              onChange={handleContentChange} 
              placeholder="Enter content for the third paragraph"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Paragraph 4</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="fourPara4Title" className="text-gray-500">Paragraph Title</Label>
            <Input 
              id="fourPara4Title" 
              name="fourPara4Title" 
              value={form.fourPara4Title || 'Paragraph 4'} 
              onChange={handleContentChange} 
              placeholder="Paragraph 4"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fourPara4Content" className="text-gray-500">Paragraph Content</Label>
            <Textarea 
              id="fourPara4Content" 
              name="fourPara4Content" 
              value={form.fourPara4Content || ''} 
              onChange={handleContentChange} 
              placeholder="Enter content for the fourth paragraph"
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-500">Section Image</Label>
          <ImageUploader 
            onImageUploaded={(url) => handleImageUploaded('fourParaImage', url)} 
            currentImageUrl={form.fourParaImage}
            label="Four Paragraphs Image"
          />
        </div>
      </Card>
    </div>
  );
};

export default CaseStudyContentTab;
