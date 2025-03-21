
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MoveUp, MoveDown } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

export interface CarouselSectionProps {
  formData: any;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onImageUpload: (field: string, url: string) => void;
  onReorderItems: (fromIndex: number, toIndex: number) => void;
  carouselItems: any[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  formData,
  onContentChange,
  onImageUpload,
  onReorderItems,
  carouselItems
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="carouselTitle">Carousel Title</Label>
        <Input
          id="carouselTitle"
          name="carouselTitle"
          value={formData.carouselTitle || ''}
          onChange={onContentChange}
          placeholder="Main carousel title"
        />
      </div>

      {carouselItems.map((item, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Slide {index + 1}</h3>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onReorderItems(index, index - 1)}
                disabled={index === 0}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onReorderItems(index, index + 1)}
                disabled={index === carouselItems.length - 1}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor={item.titleField}>Title</Label>
            <Input
              id={item.titleField}
              name={item.titleField}
              value={formData[item.titleField] || ''}
              onChange={onContentChange}
              placeholder="Slide title"
            />
          </div>
          
          <div>
            <Label htmlFor={item.contentField}>Content</Label>
            <Textarea
              id={item.contentField}
              name={item.contentField}
              value={formData[item.contentField] || ''}
              onChange={onContentChange}
              placeholder="Slide content"
              className="min-h-[100px]"
            />
          </div>
          
          <div>
            <Label className="block mb-2">Image</Label>
            <ImageUploader
              imageUrl={formData[item.imageField] || ''}
              onImageUploaded={(url) => onImageUpload(item.imageField, url)}
              aspectRatio="3:2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarouselSection;
