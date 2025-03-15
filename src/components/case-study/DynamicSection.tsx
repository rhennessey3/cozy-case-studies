
import React from 'react';
import { StrapiCaseStudySection } from '@/types/strapi';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface DynamicSectionProps {
  section: StrapiCaseStudySection;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ section }) => {
  const { __component, title, content, image, layout = 'left', backgroundColor = 'white' } = section;
  const type = __component.split('.')[1]; // Get component type after the dot
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
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
  
  return (
    <section className={cn("py-16", bgColorClass)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={cn(
            "text-left",
            isTextLight ? "text-white" : "text-[#221F26]",
            isExtraSmallScreen ? "text-2xl" : "text-3xl",
            "font-bold mb-8"
          )}>
            {title}
          </h2>
        )}
        
        <div className={cn(
          "flex flex-col md:flex-row items-center gap-8",
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
                    src={`${import.meta.env.VITE_STRAPI_API_URL}${image.data.attributes.url}`} 
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
                layout === 'full' && "md:w-full"
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
        </div>
      </div>
    </section>
  );
};

export default DynamicSection;
