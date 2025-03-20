
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import ImageUploader from '@/components/ImageUploader';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselItem {
  title: string;
  content: string;
  image?: string;
  titleField: string;
  contentField: string;
  imageField: string;
}

interface CarouselSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  carouselTitle: string;
  items: CarouselItem[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onImageUpload: (field: string, url: string) => void;
  onReorderItems?: (newItems: CarouselItem[]) => void;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  isOpen,
  onToggle,
  carouselTitle,
  items,
  onChange,
  onImageUpload,
  onReorderItems
}) => {
  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (!onReorderItems) return;
    
    const newItems = [...items];
    
    if (direction === 'up' && index > 0) {
      // Swap with the item above
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      onReorderItems(newItems);
    } else if (direction === 'down' && index < items.length - 1) {
      // Swap with the item below
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      onReorderItems(newItems);
    }
  };
  
  return (
    <Collapsible 
      open={isOpen}
      onOpenChange={onToggle}
      className="w-full"
    >
      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <CollapsibleTrigger className="w-full text-left focus:outline-none">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold">Case Study Carousel</h2>
            <ChevronDown 
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-4">
          <div className="space-y-2 mb-6">
            <Label htmlFor="carouselTitle" className="text-gray-500">Carousel Title</Label>
            <Input 
              id="carouselTitle" 
              name="carouselTitle" 
              value={carouselTitle || '3 Column Slider'} 
              onChange={onChange} 
              placeholder="3 Column Slider"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold">Carousel Item {index + 1}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    disabled={index === 0}
                    onClick={() => moveItem(index, 'up')}
                    className="h-8 w-8 rounded-full"
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span className="sr-only">Move up</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    disabled={index === items.length - 1}
                    onClick={() => moveItem(index, 'down')}
                    className="h-8 w-8 rounded-full"
                  >
                    <ArrowDown className="h-4 w-4" />
                    <span className="sr-only">Move down</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor={`${item.titleField}`} className="text-gray-500">Item Title</Label>
                <Input 
                  id={`${item.titleField}`} 
                  name={item.titleField} 
                  value={item.title || ''} 
                  onChange={onChange} 
                  placeholder={`Item ${index + 1} Title`}
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor={`${item.contentField}`} className="text-gray-500">Item Content</Label>
                <Textarea 
                  id={`${item.contentField}`} 
                  name={item.contentField} 
                  value={item.content || ''} 
                  onChange={onChange} 
                  placeholder={`Enter content for carousel item ${index + 1}`}
                  className="bg-gray-50 border-gray-200"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-500">Item Image</Label>
                <ImageUploader 
                  onImageUploaded={(url) => onImageUpload(item.imageField, url)} 
                  currentImageUrl={item.image}
                />
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default CarouselSection;
