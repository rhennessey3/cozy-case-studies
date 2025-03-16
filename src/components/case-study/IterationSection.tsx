
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { useMediaQuery } from '@/hooks/use-media-query';

interface IterationSectionProps {
  caseStudy: CaseStudy;
}

const IterationSection: React.FC<IterationSectionProps> = ({ caseStudy }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  const isVerySmallScreen = useMediaQuery('(max-width: 420px)');

  return (
    <section className={`${isExtraSmallScreen ? 'py-8' : 'py-16'} bg-[#221F26]`}>
      <div className="container mx-auto px-4">
        <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-4 md:mb-12 text-left`}>Implementation Process</h2>
        
        <div className="relative px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
          >
            <CarouselContent>
              <CarouselItem className="basis-full md:basis-1/3">
                <div className="flex flex-col items-start h-full">
                  <div className="w-full aspect-square mb-4 md:mb-6 overflow-hidden rounded-lg shadow-lg relative">
                    <img 
                      src="https://images.unsplash.com/photo-1642964057919-6c2ce94ffc13?auto=format&fit=crop&q=80&w=800" 
                      alt="Initial wireframes" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#89c5cc] mb-2 md:mb-4 text-left">Planning</h3>
                  <p className="text-gray-300 text-left">
                    {caseStudy.content.approach.split('.')[0]}. 
                  </p>
                </div>
              </CarouselItem>
              
              <CarouselItem className="basis-full md:basis-1/3">
                <div className="flex flex-col items-start h-full">
                  <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg relative">
                    <img 
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
                      alt="Development process" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">Development</h3>
                  <p className="text-gray-300 text-left">
                    {caseStudy.content.solution.split('.')[0]}.
                  </p>
                </div>
              </CarouselItem>
              
              <CarouselItem className="basis-full md:basis-1/3">
                <div className="flex flex-col items-start h-full">
                  <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg relative">
                    <img 
                      src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800" 
                      alt="Final implementation" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">Results</h3>
                  <p className="text-gray-300 text-left">
                    {caseStudy.content.results}
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            {!isVerySmallScreen && (
              <>
                <CarouselPrevious 
                  className={`absolute bg-[#89c5cc]/80 text-white hover:bg-[#70b0b8] border-none ${isExtraSmallScreen ? "left-0" : isMobile ? "left-0" : "left-0"} top-1/3 -translate-y-1/2 z-10 -translate-x-1/2`}
                />
                <CarouselNext 
                  className={`absolute bg-[#89c5cc]/80 text-white hover:bg-[#70b0b8] border-none ${isExtraSmallScreen ? "right-0" : isMobile ? "right-0" : "right-0"} top-1/3 -translate-y-1/2 z-10 translate-x-1/2`}
                />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default IterationSection;
