
import React from 'react';
import { StrapiCaseStudySection } from '@/types/strapi';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface DynamicSectionProps {
  section: StrapiCaseStudySection;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ section }) => {
  const { __component, title, content, image, layout = 'left', backgroundColor = 'white' } = section;
  const type = __component?.split('.')[1] || 'text-section'; // Default to text-section if no component type
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  console.log("Rendering dynamic section:", section);
  
  // Set background color based on component type or explicitly defined color
  const bgColorClass = backgroundColor !== 'custom' 
    ? `bg-${backgroundColor}` 
    : type === 'intro' || type === 'approach' ? 'bg-white'
    : type === 'challenge' || type === 'solution' ? 'bg-[#f9f9f9]'
    : type === 'results' ? 'bg-[#f3f3f3]'
    : type === 'conclusion' ? 'bg-[#221F26]'
    : 'bg-white';
  
  // Determine if text should be light on dark backgrounds
  const isTextLight = backgroundColor === 'custom' && type === 'conclusion';
  
  // Process image URL to handle both relative and absolute URLs
  const getImageUrl = (image: any): string => {
    if (!image?.data) return "";
    
    const imageUrl = image.data.attributes.url;
    // If URL already includes http/https, use it directly
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Otherwise, prefix with API URL from environment variable
    const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
    return `${STRAPI_URL}${imageUrl}`;
  };

  console.log('Rendering section type:', type, 'with layout:', layout);
  if (image) {
    console.log('Image data:', image);
  }
  
  return (
    <section className={cn(
      isExtraSmallScreen ? "py-4" : "py-12", 
      bgColorClass
    )}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={cn(
            "text-left",
            isTextLight ? "text-white" : "text-[#221F26]",
            isExtraSmallScreen ? "text-2xl" : "text-3xl",
            "font-bold",
            isExtraSmallScreen ? "mb-3" : "mb-6"
          )}>
            {title}
          </h2>
        )}
        
        <div className={cn(
          "flex flex-col md:flex-row items-center",
          isExtraSmallScreen ? "gap-3" : "gap-6",
          layout === 'center' && "justify-center text-center",
          layout === 'full' && "w-full"
        )}>
          {/* Content with image */}
          {image && content && (
            <>
              {/* Image component - always on right for 'left' layout */}
              <div className={cn(
                "w-full md:w-1/2 order-2",
                layout === 'left' && "md:order-2",
                layout === 'right' && "md:order-1",
                layout === 'full' && "md:w-full"
              )}>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={getImageUrl(image)} 
                    alt={title || "Section image"} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Text component - always on left for 'left' layout */}
              <div className={cn(
                "w-full md:w-1/2 order-1",
                layout === 'left' && "md:order-1 pr-0 md:pr-8",
                layout === 'right' && "md:order-2 pl-0 md:pl-8",
                layout === 'full' && "md:w-full",
                isExtraSmallScreen ? "mb-3" : "mb-0"
              )}>
                <div className={cn(
                  "prose prose-lg max-w-none",
                  isTextLight && "prose-invert"
                )}>
                  <div 
                    className={isExtraSmallScreen ? "text-base" : ""} 
                    dangerouslySetInnerHTML={{ __html: content }} 
                  />
                </div>
              </div>
            </>
          )}
          
          {/* Content only, no image */}
          {!image && content && (
            <div className={cn(
              "w-full",
              layout === 'center' && "text-center max-w-3xl mx-auto"
            )}>
              <div className={cn(
                "prose prose-lg max-w-none",
                isTextLight && "prose-invert"
              )}>
                <div 
                  className={isExtraSmallScreen ? "text-base" : ""} 
                  dangerouslySetInnerHTML={{ __html: content }} 
                />
              </div>
            </div>
          )}
          
          {/* Image only, no content */}
          {image && !content && (
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={getImageUrl(image)} 
                  alt={title || "Section image"} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
          
          {/* If neither content nor image, show a placeholder message */}
          {!image && !content && (
            <div className="w-full py-8 text-center text-gray-500">
              <p>This section has no content or image.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicSection;
