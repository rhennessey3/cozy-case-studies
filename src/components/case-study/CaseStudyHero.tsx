
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from '@/hooks/use-media-query';

interface CaseStudyHeroProps {
  title: string;
  coverImage: string;
  category: string;
}

const CaseStudyHero = ({
  title,
  coverImage,
  category
}: CaseStudyHeroProps) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return <section className={`${isExtraSmallScreen ? 'h-auto' : 'h-screen'} flex`}>
      <div className="w-full bg-[#f5f5f5] relative">
        {isExtraSmallScreen ? <>
            <AspectRatio ratio={1 / 1} className="w-full">
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            </AspectRatio>
            
            {/* Title section for mobile - moved right above the three sections */}
            <div className="w-full bg-[#221F26] flex items-center">
              <div className="container mx-auto px-4">
                <div className="py-4">
                  <h2 className="text-white text-2xl font-bold">
                    <span className="block px-0 py-1">{category}</span>
                    <span className="block text-[#89c5cc] text-xl mt-2 px-0">{title}</span>
                  </h2>
                </div>
              </div>
            </div>
          </> : <>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            </div>
            
            {/* Title section for larger screens */}
            <div className="absolute top-0 left-0 w-full md:w-[50%] bg-[#221F26] flex items-center pt-4 md:pt-0 md:bottom-[calc(20%+1.5rem)] md:top-auto">
              <div className="container mx-auto px-4">
                <div className="py-4 md:py-4">
                  <h2 className="text-white text-2xl md:text-3xl font-bold">
                    <span className="block px-4 md:px-[22px] py-1">{category}</span>
                    <span className="block text-[#89c5cc] text-xl md:text-2xl mt-2 px-4 md:px-[25px]">{title}</span>
                  </h2>
                </div>
              </div>
            </div>
          </>}
        
        {/* Three sections container - Updated background color to match the title section */}
        <div className={`${isExtraSmallScreen ? 'relative' : 'absolute bottom-0'} left-0 right-0 h-auto md:h-[20%] bg-[#221F26] flex items-center`}>
          <div className="container mx-auto px-4 py-4 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-white">
              <div className="text-left">
                <h3 className={`text-[#89c5cc] ${isExtraSmallScreen ? 'text-xl' : 'text-base md:text-xl'} font-bold mb-2`}>Objective</h3>
                <p className="text-sm md:text-base">To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity.</p>
              </div>
              
              <div className="text-left">
                <h3 className={`text-[#89c5cc] ${isExtraSmallScreen ? 'text-xl' : 'text-base md:text-xl'} font-bold mb-2`}>Approach</h3>
                <p className="text-sm md:text-base">Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability.</p>
              </div>
              
              <div className="text-left">
                <h3 className={`text-[#89c5cc] ${isExtraSmallScreen ? 'text-xl' : 'text-base md:text-xl'} font-bold mb-2`}>Results</h3>
                <p className="text-sm md:text-base">30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default CaseStudyHero;
