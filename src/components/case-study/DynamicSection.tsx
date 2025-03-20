import React from 'react';
import { StrapiCaseStudySection } from '@/types/strapi';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';

interface DynamicSectionProps {
  section: StrapiCaseStudySection;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ section }) => {
  const { __component } = section;
  const type = __component.split('.')[1]; // Get component type after the dot
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Helper function to get image URL without Strapi reference
  const getImageUrl = (imageData: any, fallbackUrl: string) => {
    if (!imageData?.data) return fallbackUrl;
    
    // Get URL from the data structure
    const url = imageData.data.attributes.url;
    // If the URL is already absolute, use it directly
    if (url.startsWith('http')) return url;
    // Otherwise treat it as a relative path
    return url;
  };
  
  // Set background color based on component type or explicitly defined color
  const bgColorClass = section.backgroundColor !== 'custom' 
    ? `bg-${section.backgroundColor || 'white'}` 
    : type === 'introduction' ? 'bg-white'
    : type === 'textleftalignedwithphoto' && section.altbackgroundcolor ? 'bg-[#f9f9f9]'
    : type === 'textrighttalignedwithphoto' && section.altbackgroundcolor ? 'bg-[#f9f9f9]'
    : type === 'slider' ? 'bg-[#221F26]'
    : type === '4smallparagraphswithphoto' ? 'bg-[#f3f3f3]'
    : 'bg-white';
  
  // Determine if text should be light on dark backgrounds
  const isTextLight = type === 'slider';
  
  // Render the appropriate section based on component type
  switch (type) {
    case 'introduction':
      return (
        <section className={cn(isExtraSmallScreen ? "py-4" : "py-8", bgColorClass)}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col">
              <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-4 md:mb-0">
                <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-2 md:mb-4`}>
                  {section.introductionHeading}
                </h2>
                <h3 className={`${isExtraSmallScreen ? 'text-xl' : 'text-2xl'} font-medium mb-2 md:mb-4 text-cozy-600 leading-tight`}>
                  {section.introductionSubheading}
                </h3>
                
                <div className="prose prose-lg max-w-none">
                  <div 
                    className={isExtraSmallScreen ? "text-base" : ""} 
                    dangerouslySetInnerHTML={{ __html: section.introductionBodyContent || '' }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    
    case 'textleftalignedwithphoto':
      return (
        <section className={cn(isExtraSmallScreen ? "py-4" : "py-12", bgColorClass)}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-4 md:mb-0">
                <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-2 md:mb-4`}>
                  {section.textleftalignedHeading}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div 
                    className={isExtraSmallScreen ? "text-base" : ""} 
                    dangerouslySetInnerHTML={{ __html: section.textleftalignedBodyContent || section.content || '' }} 
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={getImageUrl(
                      section.textleftalignedPhoto || section.image,
                      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800"
                    )} 
                    alt={section.textleftalignedHeading || section.title || "Case study image"} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    
    case 'textrighttalignedwithphoto':
      return (
        <section className={cn(isExtraSmallScreen ? "py-4" : "py-12", bgColorClass)}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={getImageUrl(
                      section.textleftalignedPhoto || section.image,
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
                    )} 
                    alt={section.textleftalignedHeading || section.title || "Case study image"} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-8 mb-4 md:mb-0 order-1 md:order-2">
                <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-2 md:mb-4`}>
                  {section.textleftalignedHeading}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div 
                    className={isExtraSmallScreen ? "text-base" : ""} 
                    dangerouslySetInnerHTML={{ __html: section.textleftalignedBodyContent || section.content || '' }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
      
    case 'slider':
      return (
        <section className={cn(isExtraSmallScreen ? "py-6" : "py-12", bgColorClass)}>
          <div className="container mx-auto px-4">
            <h2 className={cn(
              isExtraSmallScreen ? "text-2xl" : "text-3xl",
              "font-bold text-white mb-3 md:mb-8 text-left"
            )}>
              {section.casestudysliderprimaryheading}
            </h2>
            
            <div className="relative px-4 md:px-12">
              <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {section.casestudyslidercontent?.map((item, index) => (
                    <CarouselItem key={index} className="basis-full md:basis-1/3">
                      <div className="flex flex-col items-start h-full">
                        <div className="w-full aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg shadow-lg relative">
                          <img 
                            src={getImageUrl(
                              item.casestudysliderphoto,
                              "https://images.unsplash.com/photo-1642964057919-6c2ce94ffc13?auto=format&fit=crop&q=80&w=800"
                            )} 
                            alt={item.caststudysliderheading || "Slider image"} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-[#89c5cc] mb-2 text-left">
                          {item.caststudysliderheading}
                        </h3>
                        <p className="text-gray-300 text-left">
                          {item.casestudysliderbodycontent}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {isMobile && (
                  <>
                    <CarouselPrevious 
                      className="absolute bg-[#89c5cc]/80 text-white hover:bg-[#70b0b8] border-none left-0 top-[50%] -translate-y-1/2 z-10 -translate-x-1/2"
                    />
                    <CarouselNext 
                      className="absolute bg-[#89c5cc]/80 text-white hover:bg-[#70b0b8] border-none right-0 top-[50%] -translate-y-1/2 z-10 translate-x-1/2"
                    />
                  </>
                )}
              </Carousel>
            </div>
          </div>
        </section>
      );
    
    case '4smallparagraphswithphoto':
      return (
        <section className={cn(isExtraSmallScreen ? "py-6" : "py-12", bgColorClass)}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-full md:w-2/3">
                <h2 className={cn(
                  isExtraSmallScreen ? "text-2xl" : "text-3xl",
                  "font-bold text-[#221F26] mb-3 md:mb-8 text-left"
                )}>
                  {section.primaryheadingfoursmallparagraphs}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <div>
                    <h3 className={cn(
                      isExtraSmallScreen ? "text-lg" : "text-xl",
                      "font-semibold text-[#403E43] mb-2 text-left"
                    )}>
                      {section.heading1}
                    </h3>
                    <p className="text-[#222222] text-left mb-3 md:mb-6">
                      {section.paragraph1}
                    </p>
                    
                    <h3 className={cn(
                      isExtraSmallScreen ? "text-lg" : "text-xl",
                      "font-semibold text-[#403E43] mb-2 text-left"
                    )}>
                      {section.heading2}
                    </h3>
                    <p className="text-[#222222] text-left">
                      {section.paragraph2}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className={cn(
                      isExtraSmallScreen ? "text-lg" : "text-xl",
                      "font-semibold text-[#403E43] mb-2 text-left"
                    )}>
                      {section.heading3}
                    </h3>
                    <p className="text-[#222222] text-left mb-3 md:mb-6">
                      {section.paragraph3}
                    </p>
                    
                    <h3 className={cn(
                      isExtraSmallScreen ? "text-lg" : "text-xl",
                      "font-semibold text-[#403E43] mb-2 text-left"
                    )}>
                      {section.heading4}
                    </h3>
                    <p className="text-[#222222] text-left">
                      {section.paragraph4}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 mt-3 md:mt-0">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={getImageUrl(
                      section.fourheadingphoto,
                      "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&q=80&w=800"
                    )} 
                    alt={section.primaryheadingfoursmallparagraphs || "Four paragraphs image"} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    
    case 'hero':
      // Hero is handled separately in CaseStudyContent component
      return null;
      
    default:
      // For any other component type, render a generic section
      return (
        <section className={cn(
          isExtraSmallScreen ? "py-4" : "py-12", 
          bgColorClass
        )}>
          <div className="container mx-auto px-4">
            {section.title && (
              <h2 className={cn(
                "text-left",
                isTextLight ? "text-white" : "text-[#221F26]",
                isExtraSmallScreen ? "text-2xl" : "text-3xl",
                "font-bold",
                isExtraSmallScreen ? "mb-3" : "mb-6"
              )}>
                {section.title}
              </h2>
            )}
            
            <div className={cn(
              "flex flex-col md:flex-row items-center",
              isExtraSmallScreen ? "gap-3" : "gap-6",
              section.layout === 'center' && "justify-center text-center",
              section.layout === 'full' && "w-full"
            )}>
              {/* Content with image */}
              {section.image?.data && section.content && (
                <>
                  {/* Image component - always on right for 'left' layout */}
                  <div className={cn(
                    "w-full md:w-1/2 order-2",
                    section.layout === 'left' && "md:order-2",
                    section.layout === 'right' && "md:order-1",
                    section.layout === 'full' && "md:w-full"
                  )}>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={getImageUrl(section.image, "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800")} 
                        alt={section.title || "Section image"} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Text component - always on left for 'left' layout */}
                  <div className={cn(
                    "w-full md:w-1/2 order-1",
                    section.layout === 'left' && "md:order-1 pr-0 md:pr-8",
                    section.layout === 'right' && "md:order-2 pl-0 md:pl-8",
                    section.layout === 'full' && "md:w-full",
                    isExtraSmallScreen ? "mb-3" : "mb-0"
                  )}>
                    <div className={cn(
                      "prose prose-lg max-w-none",
                      isTextLight && "prose-invert"
                    )}>
                      <div 
                        className={isExtraSmallScreen ? "text-base" : ""} 
                        dangerouslySetInnerHTML={{ __html: section.content }} 
                      />
                    </div>
                  </div>
                </>
              )}
              
              {/* Content only, no image */}
              {!section.image?.data && section.content && (
                <div className={cn(
                  "w-full",
                  section.layout === 'center' && "text-center max-w-3xl mx-auto"
                )}>
                  <div className={cn(
                    "prose prose-lg max-w-none",
                    isTextLight && "prose-invert"
                  )}>
                    <div 
                      className={isExtraSmallScreen ? "text-base" : ""} 
                      dangerouslySetInnerHTML={{ __html: section.content }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      );
  }
};

export default DynamicSection;
