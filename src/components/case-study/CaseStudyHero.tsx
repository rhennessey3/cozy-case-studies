
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from '@/hooks/use-media-query';
import { Separator } from "@/components/ui/separator";

interface CaseStudyHeroProps {
  title: string;
  coverImage: string;
  category: string;
  objective?: string;
  approach?: string;
  results?: string;
}

const CaseStudyHero = ({
  title,
  coverImage,
  category,
  objective = "To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity.",
  approach = "Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability.",
  results = "30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution."
}: CaseStudyHeroProps) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return <section className={`${isExtraSmallScreen ? 'h-auto' : 'h-screen'} flex`}>
      <div className="w-full bg-[#f5f5f5] relative">
        {isExtraSmallScreen ? <>
            <AspectRatio ratio={1 / 1} className="w-full">
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            </AspectRatio>
            
            {/* Mobile view - title and sections in one continuous block */}
            <div className="w-full bg-[#221F26]">
              <div className="container mx-auto px-4">
                <div className="py-4 pb-0">
                  <h2 className="text-white text-2xl font-bold leading-tight">
                    <span className="block px-0 py-1">Case Study Name</span>
                  </h2>
                  <Separator className="bg-[#89c5cc] h-0.5 w-16 mt-2 mb-4" />
                </div>
              </div>
              
              {/* Three sections container for mobile - directly connected */}
              <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 gap-4 text-white">
                  <div className="text-left">
                    <h3 className="text-[#89c5cc] text-xl font-bold mb-2">Objective</h3>
                    <p className="text-sm">{objective}</p>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-[#89c5cc] text-xl font-bold mb-2">Approach</h3>
                    <p className="text-sm">{approach}</p>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-[#89c5cc] text-xl font-bold mb-2">Results</h3>
                    <p className="text-sm">{results}</p>
                  </div>
                </div>
              </div>
            </div>
          </> : <>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            </div>
            
            {/* Desktop view - title section directly connected to the three sections */}
            <div className="absolute bottom-[20%] left-0 w-full md:w-[50%] bg-[#221F26] rounded-tr-[2rem]">
              <div className="container mx-auto px-4">
                <div className="py-4 md:py-4 pb-0">
                  <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                    <span className="block px-4 md:px-[22px] py-1">Case Study Name</span>
                  </h2>
                  <Separator className="bg-[#89c5cc] h-0.5 w-24 ml-4 md:ml-[22px] mt-2 mb-4" />
                </div>
              </div>
            </div>
            
            {/* Three sections container for desktop - directly connected to title */}
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-[#221F26] flex items-center">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 gap-8 text-white">
                  <div className="text-left">
                    <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Objective</h3>
                    <p className="text-sm md:text-base">{objective}</p>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Approach</h3>
                    <p className="text-sm md:text-base">{approach}</p>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Results</h3>
                    <p className="text-sm md:text-base">{results}</p>
                  </div>
                </div>
              </div>
            </div>
          </>}
      </div>
    </section>;
};

export default CaseStudyHero;
