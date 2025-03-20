
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

  // Handler for reordering carousel items using fromIndex and toIndex
  const handleReorderCarouselItems = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    // Create a copy of the items array
    const newItems = [...carouselItems];
    
    // Remove the item from its original position
    const [movedItem] = newItems.splice(fromIndex, 1);
    
    // Insert the item at the new position
    newItems.splice(toIndex, 0, movedItem);
    
    // Update each field based on the new order
    newItems.forEach((item, index) => {
      const positionNumber = index + 1;
      
      // Create synthetic events for each field that needs to be updated
      const titleEvent = {
        target: {
          name: `carouselItem${positionNumber}Title`,
          value: item.title || ''
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      const contentEvent = {
        target: {
          name: `carouselItem${positionNumber}Content`,
          value: item.content || ''
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      // Apply the updates
      handleContentChange(titleEvent);
      handleContentChange(contentEvent);
      
      // For images, we need to call handleImageUploaded
      if (item.image) {
        handleImageUploaded(`carouselItem${positionNumber}Image`, item.image);
      }
    });
  };

  return {
    carouselItems,
    handleReorderCarouselItems
  };
};
