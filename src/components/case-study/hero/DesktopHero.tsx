
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { CaseStudyHeroProps } from '../CaseStudyHero';

type DesktopHeroProps = Omit<CaseStudyHeroProps, 'category'>;

const DesktopHero: React.FC<DesktopHeroProps> = ({
  title,
  coverImage,
  objective,
  approach,
  results,
  objectiveHeading,
  approachHeading,
  resultsHeading
}) => {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
      </div>
      
      {/* Desktop view - title section directly connected to the three sections */}
      <div className="absolute bottom-[20%] left-0 w-full md:w-[50%] bg-[#221F26] rounded-tr-[2rem]">
        <div className="container mx-auto px-4">
          <div className="py-4 md:py-4 pb-0">
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">
              <span className="block px-4 md:px-[22px] py-1">{title}</span>
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
              <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">{objectiveHeading}</h3>
              <p className="text-sm md:text-base">{objective}</p>
            </div>
            
            <div className="text-left">
              <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">{approachHeading}</h3>
              <p className="text-sm md:text-base">{approach}</p>
            </div>
            
            <div className="text-left">
              <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">{resultsHeading}</h3>
              <p className="text-sm md:text-base">{results}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopHero;
