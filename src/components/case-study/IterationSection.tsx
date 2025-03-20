
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

  // Since 'sections' property doesn't exist on CaseStudy type,
  // we'll simply use default values

  // Default carousel title
  const carouselTitle = '3 Column Slider';
  
  // Fallback items using content from the case study
  const displayItems = [
    {
      title: "Planning",
      content: caseStudy.content.approach.split('.')[0],
      image: "https://images.unsplash.com/photo-1642964057919-6c2ce94ffc13?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Development",
      content: caseStudy.content.solution.split('.')[0],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Results",
      content: caseStudy.content.results,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className={`${isExtraSmallScreen ? 'py-6' : 'py-12'} bg-[#221F26]`}>
      <div className="container mx-auto px-4">
        <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-3 md:mb-8 text-left`}>
          {carouselTitle}
        </h2>
        
        <div className="relative px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
          >
            <CarouselContent>
              {displayItems.map((item, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/3">
                  <div className="flex flex-col items-start h-full">
                    <div className="w-full aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg shadow-lg relative">
                      <img 
                        src={item.image || `https://images.unsplash.com/photo-${1642964057919 + index}-6c2ce94ffc13?auto=format&fit=crop&q=80&w=800`} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#89c5cc] mb-2 text-left">{item.title}</h3>
                    <p className="text-gray-300 text-left">
                      {item.content}
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
};

export default IterationSection;
