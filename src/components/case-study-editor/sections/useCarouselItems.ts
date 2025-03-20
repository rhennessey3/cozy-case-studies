
import { CarouselItem } from './types';

interface CarouselFormState {
  carouselItem1Title?: string;
  carouselItem1Content?: string;
  carouselItem1Image?: string;
  carouselItem2Title?: string;
  carouselItem2Content?: string;
  carouselItem2Image?: string;
  carouselItem3Title?: string;
  carouselItem3Content?: string;
  carouselItem3Image?: string;
}

export const useCarouselItems = (
  form: CarouselFormState,
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handleImageUploaded: (field: string, url: string) => void
) => {
  // Prepare carousel items
  const carouselItems: CarouselItem[] = [
    {
      title: form.carouselItem1Title || '',
      content: form.carouselItem1Content || '',
      image: form.carouselItem1Image,
      titleField: 'carouselItem1Title',
      contentField: 'carouselItem1Content',
      imageField: 'carouselItem1Image',
    },
    {
      title: form.carouselItem2Title || '',
      content: form.carouselItem2Content || '',
      image: form.carouselItem2Image,
      titleField: 'carouselItem2Title',
      contentField: 'carouselItem2Content',
      imageField: 'carouselItem2Image',
    },
    {
      title: form.carouselItem3Title || '',
      content: form.carouselItem3Content || '',
      image: form.carouselItem3Image,
      titleField: 'carouselItem3Title',
      contentField: 'carouselItem3Content',
      imageField: 'carouselItem3Image',
    }
  ];

  // Handler for reordering carousel items
  const handleReorderCarouselItems = (newItems: CarouselItem[]) => {
    // Update each field based on the new order
    const fieldUpdates = newItems.map((item, index) => {
      const oldIndex = carouselItems.findIndex(oldItem => 
        oldItem.titleField === item.titleField &&
        oldItem.contentField === item.contentField &&
        oldItem.imageField === item.imageField
      );
      
      // Create synthetic events for each field that needs to be updated
      const updates = [] as React.ChangeEvent<HTMLInputElement>[];
      
      // Only create updates if the item has moved
      if (oldIndex !== index) {
        const positionNumber = index + 1;
        
        updates.push({
          target: {
            name: `carouselItem${positionNumber}Title`,
            value: item.title || ''
          }
        } as React.ChangeEvent<HTMLInputElement>);
        
        updates.push({
          target: {
            name: `carouselItem${positionNumber}Content`,
            value: item.content || ''
          }
        } as React.ChangeEvent<HTMLInputElement>);
        
        if (item.image) {
          // For images, we need to call handleImageUploaded
          handleImageUploaded(`carouselItem${positionNumber}Image`, item.image);
        }
      }
      
      return updates;
    }).flat();
    
    // Apply all the updates
    fieldUpdates.forEach(event => handleContentChange(event));
  };

  return {
    carouselItems,
    handleReorderCarouselItems
  };
};
