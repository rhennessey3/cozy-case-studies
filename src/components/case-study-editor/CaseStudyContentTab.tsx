
import React, { useState } from 'react';
import AlignmentSection from '@/components/case-study-editor/sections/AlignmentSection';
import CarouselSection from '@/components/case-study-editor/sections/CarouselSection';
import FourParagraphsSection from '@/components/case-study-editor/sections/FourParagraphsSection';

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
  const [openSections, setOpenSections] = useState({
    alignment: true,
    carousel: true,
    paragraphs: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAlignmentChange = (value: string) => {
    const event = {
      target: {
        name: 'alignment',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleContentChange(event);
  };

  // Prepare carousel items
  const carouselItems = [
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
  const handleReorderCarouselItems = (newItems: any[]) => {
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

  // Prepare paragraph items
  const paragraphItems = [
    {
      title: form.fourPara1Title || '',
      content: form.fourPara1Content || '',
      titleField: 'fourPara1Title',
      contentField: 'fourPara1Content',
    },
    {
      title: form.fourPara2Title || '',
      content: form.fourPara2Content || '',
      titleField: 'fourPara2Title',
      contentField: 'fourPara2Content',
    },
    {
      title: form.fourPara3Title || '',
      content: form.fourPara3Content || '',
      titleField: 'fourPara3Title',
      contentField: 'fourPara3Content',
    },
    {
      title: form.fourPara4Title || '',
      content: form.fourPara4Content || '',
      titleField: 'fourPara4Title',
      contentField: 'fourPara4Content',
    }
  ];

  return (
    <div className="space-y-8">
      <AlignmentSection
        isOpen={openSections.alignment}
        onToggle={() => toggleSection('alignment')}
        subhead={form.subhead || ''}
        alignment={form.alignment || 'left'}
        introductionParagraph={form.introductionParagraph || ''}
        alignmentImage={form.alignmentImage}
        onChange={handleContentChange}
        onAlignmentChange={handleAlignmentChange}
        onImageUpload={(url) => handleImageUploaded('alignmentImage', url)}
      />

      <CarouselSection
        isOpen={openSections.carousel}
        onToggle={() => toggleSection('carousel')}
        carouselTitle={form.carouselTitle || '3 Column Slider'}
        items={carouselItems}
        onChange={handleContentChange}
        onImageUpload={handleImageUploaded}
        onReorderItems={handleReorderCarouselItems}
      />

      <FourParagraphsSection
        isOpen={openSections.paragraphs}
        onToggle={() => toggleSection('paragraphs')}
        sectionTitle={form.fourParaTitle || '4 Small Paragraphs'}
        sectionSubtitle={form.fourParaSubtitle || 'With Photo'}
        paragraphs={paragraphItems}
        sectionImage={form.fourParaImage}
        onChange={handleContentChange}
        onImageUpload={(url) => handleImageUploaded('fourParaImage', url)}
      />
    </div>
  );
};

export default CaseStudyContentTab;
